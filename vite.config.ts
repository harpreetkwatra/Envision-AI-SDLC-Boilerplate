/// <reference types="vitest/config" />
import fs from 'node:fs'
import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { aiAssistantPlugin } from './vite-plugin-ai-assistant.ts'

/** Load simple KEY=value lines from `.env` / `.ENV` in project root (no multiline values). */
function readRootEnvFiles(root: string): Record<string, string> {
  const out: Record<string, string> = {}
  for (const name of ['.env', '.ENV']) {
    const full = path.join(root, name)
    if (!fs.existsSync(full)) continue
    const text = fs.readFileSync(full, 'utf8')
    for (const line of text.split(/\r?\n/)) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eq = trimmed.indexOf('=')
      if (eq <= 0) continue
      const key = trimmed.slice(0, eq).trim()
      let val = trimmed.slice(eq + 1).trim()
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1)
      }
      out[key] = val
    }
  }
  return out
}

/** Origin (protocol + host) for Strapi, or null if not a valid absolute URL. */
function strapiOrigin(url: string): string | null {
  if (!url || url.startsWith('/')) return null
  try {
    const u = new URL(url)
    return `${u.protocol}//${u.host}`
  } catch {
    return null
  }
}

/**
 * Path prefix where Strapi is mounted (e.g. `/strapi` for `https://host/strapi`).
 * Empty when Strapi is at the host root (`http://localhost:1337`).
 */
function strapiUpstreamPathPrefix(url: string): string {
  if (!url || url.startsWith('/')) return ''
  try {
    const p = new URL(url).pathname.replace(/\/$/, '')
    return p === '/' ? '' : p
  } catch {
    return ''
  }
}

/**
 * URL the browser uses for Strapi. Prefer explicit env; otherwise avoid a common
 * mistake: VITE_STRAPI_URL=http://localhost:1337 left in .ENV while API_STRAPI_URL points
 * at the real server (LAN or remote).
 */
function resolveStrapiClientUrl(fileEnv: Record<string, string>): string {
  const fromProcess = (process.env.VITE_STRAPI_URL ?? '').trim()
  if (fromProcess) return fromProcess

  const fromFileVite = (fileEnv.VITE_STRAPI_URL ?? '').trim()
  const apiUrl = (fileEnv.API_STRAPI_URL ?? '').trim()

  if (fromFileVite.startsWith('/')) return fromFileVite

  if (fromFileVite && apiUrl) {
    try {
      const vu = new URL(fromFileVite)
      const viteIsLocal =
        vu.hostname === 'localhost' || vu.hostname === '127.0.0.1'
      if (viteIsLocal) {
        const au = new URL(apiUrl)
        const apiIsLocal = au.hostname === 'localhost' || au.hostname === '127.0.0.1'
        if (!apiIsLocal) return apiUrl
      }
    } catch {
      /* ignore */
    }
  }

  return fromFileVite || apiUrl || ''
}

function resolveStrapiToken(fileEnv: Record<string, string>): string {
  const fromProcess = (process.env.VITE_STRAPI_API_TOKEN ?? '').trim()
  if (fromProcess) return fromProcess
  const fromFileVite = (fileEnv.VITE_STRAPI_API_TOKEN ?? '').trim()
  if (fromFileVite) return fromFileVite
  return (fileEnv.API_STRAPI_KEY ?? '').trim()
}

const ENVDLT_LEGACY_ACCOUNTS_SUFFIX = '/accounts/getAccountInfo'

/**
 * Preferred: `API_ENVDLT_BASE_URL` (e.g. `https://host/analytics/v1`, no trailing slash).
 * Legacy: `API_ENVDLT_URL` pointing at …/accounts/getAccountInfo — base is derived by stripping that path.
 */
function resolveEnvdltAnalyticsBase(fileEnv: Record<string, string>): string {
  const explicit = (fileEnv.API_ENVDLT_BASE_URL ?? '').trim().replace(/\/$/, '')
  if (explicit) return explicit

  const legacy = (fileEnv.API_ENVDLT_URL ?? '').trim()
  if (!legacy) return ''

  try {
    const u = new URL(legacy)
    let path = u.pathname.replace(/\/$/, '')
    if (path.endsWith(ENVDLT_LEGACY_ACCOUNTS_SUFFIX)) {
      path = path.slice(0, -ENVDLT_LEGACY_ACCOUNTS_SUFFIX.length).replace(/\/$/, '')
      return `${u.origin}${path || ''}`.replace(/\/$/, '') || u.origin
    }
  } catch {
    /* ignore */
  }
  return ''
}

/** Dev-server proxy: `/envdlt` + upstream pathname (same-origin browser → avoids CORS). */
function resolveEnvdltBaseClientUrlAndProxy(
  analyticsBase: string,
  mode: string,
): { clientBaseUrl: string; devProxy: { target: string } | null } {
  const raw = analyticsBase.trim().replace(/\/$/, '')
  if (!raw) return { clientBaseUrl: '', devProxy: null }

  if (raw.startsWith('/') || !(raw.startsWith('http://') || raw.startsWith('https://'))) {
    return { clientBaseUrl: raw, devProxy: null }
  }

  try {
    const u = new URL(raw.endsWith('/') ? raw : `${raw}/`)
    const target = `${u.protocol}//${u.host}`
    const pathWithQuery = `${u.pathname.replace(/\/$/, '')}${u.search}` || '/'
    if (mode === 'development') {
      return { clientBaseUrl: `/envdlt${pathWithQuery}`.replace(/\/$/, '') || '/envdlt', devProxy: { target } }
    }
    return { clientBaseUrl: raw, devProxy: null }
  } catch {
    return { clientBaseUrl: raw, devProxy: null }
  }
}

export default defineConfig(({ mode }) => {
  const root = process.cwd()
  const fileEnv = readRootEnvFiles(root)

  const strapiUrl = resolveStrapiClientUrl(fileEnv)
  const strapiToken = resolveStrapiToken(fileEnv)

  /** Inlined at build — full Strapi base from `.env` **`API_STRAPI_URL`** (used for rule catalog **`fetch`** so it hits the real API origin, not only `/strapi` proxy paths). */
  const strapiApiBaseUrlFromFile = (fileEnv.API_STRAPI_URL ?? '').trim().replace(/\/$/, '')

  process.env.VITE_STRAPI_URL = strapiUrl
  process.env.VITE_STRAPI_API_TOKEN = strapiToken

  const envdltAnalyticsBase = resolveEnvdltAnalyticsBase(fileEnv)
  const { clientBaseUrl: envdltClientBaseUrl, devProxy: envdltDevProxy } = resolveEnvdltBaseClientUrlAndProxy(
    envdltAnalyticsBase,
    mode,
  )
  const envdltApiKey = (fileEnv.API_ENVDLT_KEY ?? '').trim()
  process.env.VITE_ENVDLT_ANALYTICS_BASE_URL = envdltClientBaseUrl
  process.env.VITE_ENVDLT_API_KEY = envdltApiKey

  const proxyTarget =
    strapiOrigin(fileEnv.API_STRAPI_URL ?? '') ||
    strapiOrigin(strapiUrl) ||
    strapiOrigin(process.env.VITE_STRAPI_PROXY_TARGET ?? '')

  const strapiUpstreamPrefix =
    strapiUpstreamPathPrefix(fileEnv.API_STRAPI_URL ?? '') ||
    strapiUpstreamPathPrefix(process.env.VITE_STRAPI_PROXY_TARGET ?? '')

  const proxy: Record<
    string,
    { target: string; changeOrigin: boolean; rewrite: (p: string) => string }
  > = {}

  if (proxyTarget) {
    proxy['/strapi'] = {
      target: proxyTarget,
      changeOrigin: true,
      rewrite: (p: string) => {
        const withoutVitePrefix = p.replace(/^\/strapi/, '') || '/'
        if (!strapiUpstreamPrefix) return withoutVitePrefix
        return `${strapiUpstreamPrefix}${withoutVitePrefix}`
      },
    }
  }

  if (envdltDevProxy) {
    proxy['/envdlt'] = {
      target: envdltDevProxy.target,
      changeOrigin: true,
      rewrite: (p: string) => p.replace(/^\/envdlt/, '') || '/',
    }
  }

  return {
    define: {
      /** `API_ENVDLT_*` is not auto-exposed like `VITE_*` in `.env`; inline so `import.meta.env` is never empty. */
      'import.meta.env.VITE_ENVDLT_ANALYTICS_BASE_URL': JSON.stringify(envdltClientBaseUrl),
      'import.meta.env.VITE_ENVDLT_API_KEY': JSON.stringify(envdltApiKey),
      'import.meta.env.VITE_STRAPI_API_BASE_URL': JSON.stringify(strapiApiBaseUrlFromFile),
    },
    resolve: {
      alias: {
        '@': path.resolve(root, 'src'),
      },
    },
    plugins: [react(), aiAssistantPlugin()],
    server: {
      ...(Object.keys(proxy).length ? { proxy } : {}),
    },
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: ['vitest.setup.js'],
      include: ['features/**/dev/eng/**/*.test.{ts,tsx}'],
      passWithNoTests: true,
    },
  }
})

#!/usr/bin/env node
/**
 * Sync agent skills from `.ai/skills/*.md` to:
 * - Cursor: `.cursor/skills/<name>/SKILL.md`
 * - Claude: `.claude/skills/<name>/SKILL.md`
 *
 * Every `*.md` file in this directory is synced automatically.
 * Add a skill: create `{name}.md` with frontmatter `name: {name}`.
 * Remove a skill: delete the source `.md` file (orphan dirs are pruned on sync).
 *
 * Usage: node .ai/skills/.sync-skills.mjs
 *        npm run sync:skills
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const SKILLS_DIR = path.dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = path.resolve(SKILLS_DIR, '../..')
const CURSOR_SKILLS_DIR = path.join(REPO_ROOT, '.cursor', 'skills')
const CLAUDE_SKILLS_DIR = path.join(REPO_ROOT, '.claude', 'skills')

/**
 * @returns {string[]}
 */
function discoverSkillIds() {
  return fs
    .readdirSync(SKILLS_DIR)
    .filter((f) => f.endsWith('.md') && !f.startsWith('.'))
    .map((f) => f.slice(0, -3))
    .sort()
}

/**
 * @param {string} content
 * @returns {string | null}
 */
function parseFrontmatterName(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) return null
  const nameLine = match[1].match(/^name:\s*(.+)$/m)
  return nameLine ? nameLine[1].trim() : null
}

/**
 * @param {string} targetDir
 * @param {string} skillId
 * @param {string} content
 * @param {string} label
 */
function writeSkill(targetDir, skillId, content, label) {
  const skillDir = path.join(targetDir, skillId)
  fs.mkdirSync(skillDir, { recursive: true })
  const outPath = path.join(skillDir, 'SKILL.md')
  fs.writeFileSync(outPath, content.endsWith('\n') ? content : `${content}\n`, 'utf8')
  console.log(`wrote ${path.relative(REPO_ROOT, outPath)} (${label})`)
}

/**
 * @param {string} targetDir
 * @param {ReadonlySet<string>} syncedIds
 * @param {string} label
 */
function pruneOrphans(targetDir, syncedIds, label) {
  if (!fs.existsSync(targetDir)) return

  for (const entry of fs.readdirSync(targetDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue
    if (syncedIds.has(entry.name)) continue

    const orphanDir = path.join(targetDir, entry.name)
    fs.rmSync(orphanDir, { recursive: true, force: true })
    console.log(`pruned ${path.relative(REPO_ROOT, orphanDir)} (${label})`)
  }
}

function main() {
  const skillIds = discoverSkillIds()
  if (skillIds.length === 0) {
    console.error('sync-skills: no skill files found in .ai/skills/')
    process.exit(1)
  }

  for (const skillId of skillIds) {
    const sourcePath = path.join(SKILLS_DIR, `${skillId}.md`)
    if (!fs.existsSync(sourcePath)) {
      console.error(`sync-skills: missing source file: ${sourcePath}`)
      process.exit(1)
    }

    const content = fs.readFileSync(sourcePath, 'utf8').trimEnd()
    const frontmatterName = parseFrontmatterName(content)
    if (frontmatterName && frontmatterName !== skillId) {
      console.error(
        `sync-skills: frontmatter name "${frontmatterName}" does not match skill id "${skillId}" in ${sourcePath}`,
      )
      process.exit(1)
    }

    writeSkill(CURSOR_SKILLS_DIR, skillId, content, 'cursor')
    writeSkill(CLAUDE_SKILLS_DIR, skillId, content, 'claude')
  }

  const syncedIds = new Set(skillIds)
  pruneOrphans(CURSOR_SKILLS_DIR, syncedIds, 'cursor')
  pruneOrphans(CLAUDE_SKILLS_DIR, syncedIds, 'claude')
}

main()

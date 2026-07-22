#!/usr/bin/env node
/**
 * Sync agent skills from `.ai/skills/*.md` to:
 * - Cursor: `.cursor/skills/<name>/SKILL.md`
 * - Claude: `.claude/skills/<name>/SKILL.md`
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

/** @type {ReadonlyArray<string>} */
const SKILL_IDS = ['write-bsr', 'write-tests', 'write-doc']

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

function main() {
  for (const skillId of SKILL_IDS) {
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
}

main()

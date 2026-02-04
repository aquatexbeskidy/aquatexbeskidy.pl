#!/usr/bin/env node

import { execSync } from 'node:child_process'
import { existsSync } from 'node:fs'

if (process.env.CI) {
  console.log('ℹ️  CI environment detected, skipping husky check')
  process.exit(0)
}

function shouldReinstall() {
  if (!existsSync('node_modules')) {
    console.log('⚠️  node_modules does not exist')
    return true
  }

  if (!existsSync('.husky/_')) {
    console.log('⚠️  Husky is not configured')
    return true
  }

  try {
    const hooksPath = execSync('git config core.hooksPath', { encoding: 'utf-8' }).trim()

    if (hooksPath !== '.husky/_') {
      console.log('⚠️  Git hooks are not configured')
      return true
    }
  } catch {
    console.log('⚠️  Git hooks are not configured')
    return true
  }

  console.log('✅ Husky and git hooks are properly configured')
  return false
}

function reinstall() {
  console.log('🔄 Reinstalling node_modules...')
  try {
    execSync('pnpm install', {
      encoding: 'utf-8',
      stdio: 'inherit',
    })
    console.log('✅ Reinstallation complete')
  } catch (error) {
    console.error('❌ Reinstallation failed:', error.message)
    process.exit(1)
  }
}

if (shouldReinstall()) {
  reinstall()
}

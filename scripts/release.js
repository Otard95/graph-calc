const fs = require('fs')
const path = require('path')
const cp = require('child_process')
const inquirer = require('inquirer')
const chalk = require('chalk')

async function readFile(path) {
  return await new Promise((res, rej) => {
    fs.readFile(path, (err, data) => {
      if (err) return rej(err)
      res(data)
    })
  })
}
async function writeFile(path, data) {
  return await new Promise((res, rej) => {
    fs.writeFile(path, data, (err) => {
      if (err) return rej(err)
      res()
    })
  })
}

async function readJson(path) {
  return await readFile(path).then(res => JSON.parse(`${res}`))
}
async function writeJson(path, obj) {
  return await writeFile(path, JSON.stringify(obj, null, 2))
}

async function runCommand(command, liveOutput = false) {

  return await new Promise((res, rej) => {
    let out = ''
    const cmd = cp.exec(command, (err) => {
      if (err) rej(err)
    })
    cmd.stdout.on('data', data => {
      out += `${data}`
      if (liveOutput)
        console.log(`${data}`)
    })
    cmd.stderr.on('data', data => {
      out += `${data}`
      if (liveOutput)
        console.error(`${data}`)
    })
    cmd.on('exit', (code) => res({ ok: code === 0, out }))
  }) 

}

async function git(strings, ...exps) {

  let command = 'git '
  for (let i = 0; i < strings.length; i++) {
    const str = strings[i]
    const exp = i < exps.length ? exps[i] : ''
    command += `${str}${exp}`
  }

  return await runCommand(command)

}

function validateVersionNumber(next, prev) {

  if (!/^\d{1,2}\.\d{1,2}\.\d{1,2}$/.test(next))
    return 'Version number has invalid format'

  if (!prev) return true

  if (next === prev)
    return 'You need to select a new version number'

  const prevParts = prev.split('.')
  const nextParts = next.split('.')

  for (let i = 0; i < prevParts.length; i++) {
    const prevPart = prevParts[i]
    const nextPart = nextParts[i]
    if (Number(prevPart) < Number(nextPart))
      return true
    if (Number(prevPart) > Number(nextPart))
      return 'The new version cannot be a lower then the current'
  }
  
}

async function checkGitState () {
  console.log(chalk.blue('Verifying git state...'))
  const { ok, out: gitStatus } = await git`status -b --porcelain`

  if (!ok) {
    console.error(chalk.red('Failed to get git status:'), '\n', gitStatus)
    return false
  }

  const lines = gitStatus.split('\n').filter(line => line.length > 0)
  if (lines[0] !== '## main...origin/main') {
    if (!gitStatus.startsWith('## main...origin/main')) {
      console.error(chalk.red('You are not on branch main'))
    }
    if (lines[0].includes('[')) {
      console.error(chalk.red('You are not up to date with origin'))
    }
    if (lines.length > 1) {
      console.error(chalk.red('You have uncommitted changes'))
    }
    return false
  }
  return true
}

async function createReleaseCommit(version, comment) {

  const commentAddition = comment
    ? [
        '',
        '',
        comment
      ].join('\n')
    : ''

  console.log(chalk.blue('Committing version update...'))
  const {
    ok: commitOk,
    out: commitOut
  } = await git`commit -am "Automated release commit for v${version}${commentAddition}"`

  if (!commitOk) {
    console.error(chalk.red('Failed to commit changes:'), '\n', commitOut)
    return false
  }
  return true

}

async function tagRelease(version) {
  
  console.log(chalk.blue('Tag release...'))
  const {
    ok: tagOk,
    out: tagOut
  } = await git`tag v${version}`

  if (!tagOk) {
    console.error(chalk.red('Failed to tag:'), '\n', tagOut)
    return false
  }
  return true

}

async function pushWithTags() {

  console.log(chalk.blue('Push release to origin...'))
  const {
    ok: pushOk,
    out: pushOut
  } = await git`push origin --tags`

  if (!pushOk) {
    console.error(chalk.red('Failed to push:'), '\n', pushOut)
    return false
  }
  return true

}

async function build() {
  console.log(chalk.blue('\nCreating production build...\n'))
  return await runCommand('npm run build:prod --silent', true)
}

async function abortHard() {
  console.log('Attempt reset...')
  await git`reset --hard origin/main`
  console.error(chalk.red('Aborting!'))
}

async function main() {

  if (!(await checkGitState())) {
    console.error(chalk.red('Aborting!'))
    return 4
  }

  // Load package.json and config.json
  const packagePath = path.resolve(process.cwd(), 'package.json')
  const configPath = path.resolve(process.cwd(), 'src', 'utils', 'config.json')

  const package = await readJson(packagePath)
  const config = await readJson(configPath)

  const currentVersion = package.version
  const confVersion = config.version

  if (currentVersion !== confVersion) {
    console.error('Version in package.json and config.json do not match!')
    return 2
  }

  const answers = await inquirer
    .prompt([
      {
        name: 'newVersion',
        message: `New version number (current: ${currentVersion})`,
        validate: (input) => validateVersionNumber(input, currentVersion),
        suffix: ':'
      },
      {
        name: 'releaseComment',
        message: 'Comment on release (optional)',
        default: false,
        suffix: ':'
      }
    ])

  package.version = answers.newVersion
  config.version = answers.newVersion

  await writeJson(packagePath, package)
  await writeJson(configPath, config)

  await build()

  if (!(await createReleaseCommit(answers.newVersion, answers.releaseComment))) {
    console.error(chalk.red('Aborting!'))
    return 5
  }

  if (!(await tagRelease(answers.newVersion))) {
    await abortHard()
    return 6
  }

  if (!(await pushWithTags())) {
    await abortHard()
    return 7
  }

  console.log(chalk.green('Done!'))
  return 0

}

main()
  .then(exitCode => process.exitCode = exitCode)
  .catch(err => {
    console.log(chalk.red(`Unexpected error - ${err.message}`), '\n', err)
    process.exitCode = 1
  })

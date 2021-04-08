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

async function git(strings, ...exps) {

  let command = 'git '
  for (let i = 0; i < strings.length; i++) {
    const str = strings[i]
    const exp = i < exps.length ? exps[i] : ''
    command += `${str} ${exp} `
  }

  return await new Promise((res, rej) => {
    cp.exec(command, (err, stdout, stderr) => {
      if (err) rej(err)
      res(stdout || stderr)
    })
  }) 

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

async function main() {

  console.log(chalk.blue('Verifying git state...'))
  const gitStatus = await git`status -b --porcelain`
  
  if (gitStatus !== '## main...origin/main') {
    if (!gitStatus.startsWith('## main...origin/main')) {
      console.error(chalk.red('You are not on branch main'))
    }
    const lines = gitStatus.split('\n').filter(line => line.length > 0)
    if (lines[0].includes('[')) {
      console.error(chalk.red('You are not up to date with origin'))
    }
    if (lines.length > 1) {
      console.error(chalk.red('You have uncommitted changes'))
    }
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

  try {

    const answers = await inquirer
      .prompt([
        {
          name: 'newVersion',
          message: `New version number (current: ${currentVersion})`,
          validate: (input) => validateVersionNumber(input, currentVersion),
          suffix: ':'
        }
      ])

      package.version = answers.newVersion
      config.version = answers.newVersion

      await writeJson(packagePath, package)
      await writeJson(configPath, config)

  } catch (err) {
    console.error(err)
    return 3
  }

}

try {
  main()
    .then(exitCode => process.exitCode = exitCode)
} catch (err) {
  console.error(err.message, err)
  process.exit(1)
}

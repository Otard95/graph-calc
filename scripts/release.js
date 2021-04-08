const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')

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
  return await readFile(path, JSON.stringify(obj, null, 2))
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
    const prevPart = prevParts[i];
    const nextPart = nextParts[i];
    if (Number(prevPart) < Number(nextPart))
      return true
    if (Number(prevPart) > Number(nextPart))
      return 'The new version cannot be a lower then the current'
  }
  
}

async function main() {

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

      writeJson(packagePath, package)
      writeJson(configPath, config)

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

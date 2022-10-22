import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import fse from 'fs-extra'
const {copySync, removeSync, readFileSync, writeFileSync } = fse
const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = join(__dirname, '..')
const sourceDir = join(rootDir, 'source')
const outputDir = join(rootDir, 'dist')

removeSync(outputDir)
copySync(sourceDir, outputDir)
copySync(join(rootDir, 'README.md'), join(outputDir, 'README.md'))

const packageData = JSON.parse(readFileSync(join(rootDir, 'package.json')))
delete packageData.devDependencies
delete packageData.keywords
delete packageData.scripts
writeFileSync(join(outputDir, 'package.json'), JSON.stringify(packageData))
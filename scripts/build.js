import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import fse from 'fs-extra'
const {copySync, removeSync} = fse
const __dirname = dirname(fileURLToPath(import.meta.url))

const sourceDir = join(__dirname, '..', 'source')
const outputDir = join(__dirname, '..', 'dist')

removeSync(outputDir)
copySync(sourceDir, outputDir)
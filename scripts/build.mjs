import fs from 'fs-extra'
import { execSync } from 'child_process'
// import pkg from '../package.json'
import icons from './sets.mjs'

import gen from 'webfonts-generator'

const START_CODEPOINT = 0xe000
const name = 'icons-carbon'
const nameDisplay = 'Carbon'

fs.removeSync('temp')
fs.ensureDirSync('temp/dist')
fs.ensureDirSync('temp/icons')
fs.ensureDirSync(`build/${name}`)
fs.emptyDirSync(`build/${name}`)

const newIcons = Object.entries(icons).map(([key, value]) => {
    key = key.replace('codicon:', '')
    const [id, name] = value.split(':')
    const src = `./node_modules/feather-icons/dist/icons/${name}.svg`
    const dest = `temp/icons/${key}.svg`
    fs.copySync(src, dest)
    return key
})

execSync('npx svgo -f temp/icons/')

gen(
    {
      files: newIcons.map((i) => `./temp/icons/${i}.svg`),
      dest: `./temp/dist`,
      types: ['woff'],
      fontName: name,
      css: false,
      html: true,
      startCodepoint: START_CODEPOINT,
      fontHeight: 1000,
      normalize: true,
    },
    (error) => {
      if (error) {
        console.log('Font creation failed.', error)
        process.exit(1)
      }

      fs.copyFileSync(`./temp/dist/${name}.woff`, `build/${name}/${name}.woff`)
    }
)
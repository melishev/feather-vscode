import fs from 'fs-extra';
import { execSync } from 'child_process';
import pkg from '../package.json';
import icons from './icons.mjs';

import gen from 'webfonts-generator';

const START_CODEPOINT = 0xe000;
const name = 'icons-feather';
const nameDisplay = 'Feather';

fs.removeSync('temp');
fs.ensureDirSync('temp/dist');
fs.ensureDirSync('temp/icons');
fs.ensureDirSync('build');
fs.emptyDirSync('build');

const arrIconsName = Object.entries(icons).map(([key, value]) => {
  const src = `./node_modules/feather-icons/dist/icons/${value}.svg`;
  const dest = `temp/icons/${key}.svg`;
  fs.copySync(src, dest);
  return key;
});

execSync('npx oslllo-svg-fixer -s temp/icons -d temp/icons --sp');
// execSync('npx svgo -f temp/icons/ --config svgo-config.yml');
execSync('npx fantasticon');

// gen(
//   {
//     files: arrIconsName.map((i) => `./temp/icons/${i}.svg`),
//     dest: './temp/dist',
//     types: ['woff'],
//     fontName: name,
//     css: false,
//     html: true,
//     startCodepoint: START_CODEPOINT,
//     fontHeight: 1000,
//     normalize: false
//   },
//   (error) => {
//     if (error) {
//       console.log('Font creation failed.', error);
//       process.exit(1);
//     }

//     fs.copyFileSync(`./temp/dist/${name}.woff`, `build/${name}.woff`);
//   }
// );

fs.copyFileSync(`./temp/dist/${name}.woff`, `build/${name}.woff`);

/** Create extension file */
fs.writeJSONSync(
  `build/${name}.json`,
  {
    fonts: [
      {
        id: name,
        src: [
          {
            path: `./${name}.woff`,
            format: 'woff'
          }
        ],
        weight: 'normal',
        style: 'normal'
      }
    ],

    iconDefinitions: Object.fromEntries(
      arrIconsName.map((key, idx) => [
        key,
        { fontCharacter: '\\' + (START_CODEPOINT + idx).toString(16) }
      ])
    )
  },
  { spaces: 2 }
);

/** Create Package.json file */
fs.writeJSONSync(
  'build/package.json',
  {
    name: name,
    publisher: 'antfu',
    version: pkg.version,
    displayName: `${nameDisplay} Product Icons`,
    description: `${nameDisplay} Product Icons for VS Code`,
    icon: 'icon.png',
    categories: ['Themes'],
    engines: {
      vscode: pkg.engines.vscode
    },
    license: 'MIT',
    keywords: ['icon', 'theme', 'product', 'product-icon-theme'],
    extensionKind: ['ui'],
    contributes: {
      productIconThemes: [
        {
          id: name,
          label: `${nameDisplay} Icons`,
          path: `./${name}.json`
        }
      ]
    },
    repository: {
      type: 'git',
      url: 'https://github.com/antfu/vscode-icons-carbon.git'
    },
    bugs: {
      url: 'https://github.com/antfu/vscode-icons-carbon/issues'
    },
    author: {
      name: 'Anthony Fu'
    }
  },
  { spaces: 2 }
);

// /** Copy Readme file */
fs.copySync('README.md', 'build/README.md');

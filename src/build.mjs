import fs from 'fs-extra';
import { execSync } from 'child_process';
import Fantasticon from 'fantasticon';
import icons from './icons.mjs';

const name = 'feather-icons';

fs.removeSync('icons');
fs.ensureDirSync('icons');
fs.ensureDirSync('dist');
fs.emptyDirSync('dist');

const arrIcons = Object.entries(icons).map(([key, value], idx) => {
  const src = `./node_modules/feather-icons/dist/icons/${value}.svg`;
  const dest = `icons/${key}.svg`;
  fs.copySync(src, dest);
  return [key, { fontCharacter: '\\' + (0xf101 + idx).toString(16) }];
});

/** Create extension file */
fs.writeJSONSync(
  `dist/${name}.json`,
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

    iconDefinitions: Object.fromEntries(arrIcons)
  },
  { spaces: 2 }
);

execSync('npx oslllo-svg-fixer -s icons -d icons --sp', { stdio: 'inherit' });

Fantasticon.generateFonts({
  name,
  inputDir: './icons',
  outputDir: './dist',
  fontTypes: ['woff'],
  assetTypes: []
});

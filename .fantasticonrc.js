module.exports = {
  name: 'icons-feather',
  inputDir: './temp/icons',
  outputDir: './temp/dist',
  fontTypes: ['woff'],
  assetTypes: ['json', 'html', 'css'],
  formatOptions: {
    json: {
      // render the JSON human readable with two spaces indentation (default is none, so minified)
      indent: 2
    },
  },
};
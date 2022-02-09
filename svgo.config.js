module.exports = {
  plugins: [
    {
      name: 'convertPathData',
      params: {
        noSpaceAfterFlags: false
      }
    },
    {
      name: 'mergePaths',
      params: {
        noSpaceAfterFlags: false
      }
    },
    {
      name: 'removeAttrs',
      params: {
        attrs: "*:fill"
      }
    },
    {
      name: 'addAttributesToSVGElement',
      params: {
        attributes: [
          {
            fill: "currentColor"
          }
        ]
      }
    },
  ]
}
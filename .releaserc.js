export default {
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
      "@semantic-release/changelog",
      [
        "semantic-release-vsce",
        {
          packageVsix: true,
        },
      ],
    '@semantic-release/npm',
    [
      "@semantic-release/git",
      {
        assets: ["CHANGELOG.md"]
      }
    ],
    '@semantic-release/github',
  ],
  preset: "angular"
}
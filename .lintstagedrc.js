const path = require("path");

const buildNextEslintCommand = (filenames) =>
  `yarn workspace @se-2/nextjs eslint --fix ${filenames
    .map((f) => path.relative(path.join("packages", "nextjs"), f))
    .join(" ")}`;

module.exports = {
  // Type checking moved to pre-commit hook (needs full project, can't run on stashed partial files)
  "packages/nextjs/**/*.{ts,tsx}": [buildNextEslintCommand],
  "packages/contracts/**/*.{ts,tsx}": ["yarn workspace @se-2/contracts lint-staged --fix"],
  "packages/contracts/**/*.sol": ["forge fmt --root packages/contracts"],
  "packages/contracts/scripts-js/**/*.js": ["yarn workspace @se-2/contracts prettier --write"],
};

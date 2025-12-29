const path = require("path");

const buildNextEslintCommand = (filenames) =>
  `yarn workspace @se-2/nextjs eslint --fix ${filenames
    .map((f) => path.relative(path.join("packages", "nextjs"), f))
    .join(" ")}`;

module.exports = {
  // Type checking moved to pre-commit hook (needs full project, can't run on stashed partial files)
  "packages/nextjs/**/*.{ts,tsx}": [buildNextEslintCommand],
  "packages/hardhat/**/*.{ts,tsx}": ["yarn hardhat:lint-staged --fix"],
  "packages/foundry/**/*.sol": ["forge fmt --root packages/foundry"],
  "packages/foundry/**/*.js": ["yarn workspace @se-2/foundry prettier --write"],
};

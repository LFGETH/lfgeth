# Branch Analysis

Analysis of all branches in the repo to determine relevance for the fork.

## Local Branches

| Branch | Status | Notes |
|--------|--------|-------|
| `main` | Active | Hardhat 2.22.10 + hardhat-deploy (legacy deployment pattern) |
| `combine` | Active | Current working branch, identical to main |

## Remote Branches - Potentially Relevant

These branches have features/changes that may be worth incorporating:

### High Priority (Recent, Active Development)

| Branch | Last Activity | Commits Ahead | Purpose | Recommendation |
|--------|--------------|---------------|---------|----------------|
| `origin/yarn-v4` | 10 days ago | 8 | Upgrade to Yarn v4, add preapproved packages | **REVIEW** - May want yarn v4 |
| `origin/hardhat-v3` | 7 weeks ago | 10 | Hardhat 3.x + Ignition (replaces hardhat-deploy) | **REVIEW** - Modern Hardhat setup |
| `origin/foundry` | 7 weeks ago | 25 | Full Foundry integration | **KEY** - Need this for dual framework support |

### Medium Priority (Useful Features)

| Branch | Last Activity | Commits Ahead | Purpose | Recommendation |
|--------|--------------|---------------|---------|----------------|
| `origin/update-blockexplorer` | 9 weeks ago | 35 | Updates to use scaffold-ui package | Review if updating blockexplorer |
| `origin/feat/etherscan-v2` | 6 months ago | 7 | Etherscan v2 API verification | **USEFUL** - Better contract verification |
| `origin/add-eject-burner-option` | 6 months ago | 1 | Export burner wallet to punk wallet | Nice-to-have feature |
| `origin/nodejs22` | 5 months ago | 1 | Node.js 22 support | May be superseded by main already |

### UI/Component Experiments (Lower Priority)

| Branch | Last Activity | Commits Ahead | Purpose | Recommendation |
|--------|--------------|---------------|---------|----------------|
| `origin/remove-daisy-ui` | 8 months ago | 21 | Remove DaisyUI, custom components | **INTERESTING** if removing DaisyUI |
| `origin/tinker-shad` | 7 months ago | 6 | ShadCN UI migration experiment | Experiment, incomplete |
| `origin/tinker-shadcn` | 1 year, 3 months ago | older | Earlier ShadCN experiment | Stale, superseded by tinker-shad |
| `origin/address-input-v2` | 10 months ago | 2 | AddressInput component refactor | Small experiment |
| `origin/shadcn-address-input` | 10 months ago | similar | ShadCN address input | Experiment |
| `origin/refactor-adress-input` | 10 months ago | similar | Address input refactor | Experiment (note typo in name) |

## Remote Branches - Likely Stale/Deletable

These appear to be old PRs, experiments, or superseded work:

### Definitely Stale

| Branch | Last Activity | Reason |
|--------|--------------|--------|
| `origin/cli` | 1 year, 8 months ago | 150+ commits - This was the create-eth CLI development branch, now separate repo |
| `origin/hardhat-ignition` | 2 years ago | 18 commits - Old Ignition experiment, superseded by hardhat-v3 |
| `origin/create-eth-beta` | 8 months ago | MERGED into main |
| `origin/subgraph-package` | 1 year ago | 15 commits - Subgraph integration, likely abandoned |
| `origin/fix/compile-twice-foundry` | 1 year ago | Likely merged or fixed elsewhere |
| `origin/test-lint` | 1 year, 2 months ago | Testing lint setup |
| `origin/foundry-main--cp-env` | 1 year, 6 months ago | Old foundry env handling |
| `origin/tx-revert-example` | 1 year, 4 months ago | Example/demo branch |
| `origin/address-component-default-size` | 1 year, 3 months ago | Tiny fix, likely superseded |

### Probably Stale (Old Experiments)

| Branch | Last Activity | Reason |
|--------|--------------|--------|
| `origin/add-porto` | 5 months ago | 1 commit - "configure porto" - unclear purpose |
| `origin/pass-sf-template` | 5 months ago | 300+ commits - Massive, appears to be create-eth template work |
| `origin/beta-provider-updates` | 8 months ago | 2 commits - Provider pattern experiment |
| `origin/tinker-component-hooks` | 10 months ago | 4 commits - Package symlink experiment |
| `origin/feat/ipfs-manual` | 11 months ago | 10 commits - Manual IPFS deploy, may be in main now |
| `origin/faucet-button--test` | 11 months ago | Testing branch |
| `origin/feat/fleek` | 12 months ago | 3 commits - Fleek deployment, niche |
| `origin/injected-connector-fallback` | 12 months ago | 1 commit - Connector fallback |

## Recommendations

### For Your Fork Goals (Foundry + Hardhat dual support)

1. **Cherry-pick from `origin/foundry`** - This has the core Foundry integration
2. **Review `origin/hardhat-v3`** - Modern Hardhat setup with Ignition
3. **Consider `origin/feat/etherscan-v2`** - Better verification flow

### Branches to Potentially Delete

These can likely be pruned from your fork:
- `origin/cli` - Separate project now
- `origin/hardhat-ignition` - Superseded
- `origin/create-eth-beta` - Already merged
- `origin/subgraph-package` - Not needed
- `origin/test-lint` - Old test
- `origin/foundry-main--cp-env` - Old
- `origin/tx-revert-example` - Demo
- `origin/pass-sf-template` - create-eth specific
- All the `tinker-*` and `*-v2` experimental branches

### Branches to Keep Watching

- `origin/yarn-v4` - If you want modern Yarn
- `origin/remove-daisy-ui` - If removing DaisyUI is a goal

## Summary

- **Main branch** uses Hardhat 2.x with hardhat-deploy (legacy)
- **32 total remote branches**
- **1 merged** (create-eth-beta)
- **3 high-priority** for your goals (foundry, hardhat-v3, yarn-v4)
- **~20+ likely deletable** (old experiments, PRs, superseded work)

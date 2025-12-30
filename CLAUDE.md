# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Fork of Scaffold-ETH 2 with significant modernization.** This is a production-ready Ethereum development stack supporting dual smart contract frameworks (Hardhat 3 and Foundry) with a Next.js 16 frontend.

### Key Differences from Scaffold-ETH 2
- **Dual framework support**: Both Hardhat 3 (with Ignition) and Foundry in one monorepo
- **Modern tooling**: Yarn 4, Next.js 16, React 19, Tailwind v4, ESLint 9 flat config
- **No DaisyUI**: Custom Tailwind CSS components in `globals.css`
- **Transparent architecture**: Less "magic", more explicit control

## Tech Stack

| Layer | Technology |
|-------|------------|
| Package Manager | Yarn 4.12.0 (with `npmMinimalAgeGate: 7d` for supply chain security) |
| Smart Contracts | Hardhat 3.1.0 + Ignition OR Foundry |
| Frontend | Next.js 16.1.1 (App Router, Turbopack) |
| React | React 19.2.3 |
| Wallet | RainbowKit 2.2.10, wagmi 3.1.0, viem 2.43.3 |
| Styling | Tailwind CSS v4 (custom components, no DaisyUI) |
| Linting | ESLint 9 (flat config with typescript-eslint) |

## Project Structure

```
lfgeth/
├── packages/
│   ├── contracts/      # Unified smart contracts (Hardhat 3 + Foundry)
│   │   ├── contracts/  # Solidity source files (shared)
│   │   ├── test/       # Foundry tests (.t.sol)
│   │   ├── script/     # Foundry deploy scripts (.s.sol)
│   │   ├── scripts/    # Hardhat TypeScript scripts
│   │   ├── scripts-js/ # Foundry JavaScript utilities
│   │   ├── ignition/   # Hardhat Ignition modules
│   │   ├── lib/        # Foundry dependencies (forge-std, etc.)
│   │   └── deployments/# Foundry deployment artifacts
│   └── nextjs/         # Next.js 16 frontend
├── .husky/pre-commit   # Type checking + lint-staged
├── .lintstagedrc.js    # ESLint on staged files
└── .yarnrc.yml         # Yarn 4 config with security settings
```

## Commands

### Development Workflow
```bash
# Start local blockchain (choose one)
yarn chain              # Hardhat local network (default)
yarn foundry:chain      # Anvil local network

# Deploy contracts (choose one)
yarn deploy             # Hardhat Ignition deploy (default)
yarn foundry:deploy     # Foundry forge script deploy

# Start frontend
yarn start              # Next.js dev server (localhost:3000)
```

### Framework-Specific Commands

**Hardhat 3 (packages/contracts)**
```bash
yarn hardhat:chain          # Start Hardhat network
yarn hardhat:deploy         # Deploy via Ignition
yarn hardhat:compile        # Compile contracts
yarn hardhat:test           # Run tests
yarn hardhat:check-types    # TypeScript check
```

**Foundry (packages/contracts)**
```bash
yarn foundry:chain          # Start Anvil
yarn foundry:deploy         # Deploy via forge script
yarn foundry:compile        # forge build
yarn foundry:test           # forge test
```

**Frontend (packages/nextjs)**
```bash
yarn next:dev               # Dev server
yarn next:build             # Production build
yarn next:check-types       # TypeScript check
yarn next:lint              # ESLint
```

### Code Quality
```bash
yarn lint                   # Lint all packages
yarn format                 # Format all packages
yarn next:check-types       # Frontend type check (runs in pre-commit)
```

## Smart Contract Architecture

### Hardhat 3 + Ignition
Hardhat 3 uses **Ignition** for deployments (replaces hardhat-deploy):

```typescript
// packages/contracts/ignition/modules/YourContract.ts
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("YourContract", (m) => {
  const contract = m.contract("YourContract", [constructorArg1]);
  return { contract };
});
```

Deploy: `yarn hardhat:deploy`

### Foundry
Foundry uses forge scripts for deployment:

```solidity
// packages/contracts/script/Deploy.s.sol
contract DeployScript is Script {
    function run() external {
        vm.startBroadcast();
        new YourContract(constructorArg1);
        vm.stopBroadcast();
    }
}
```

Deploy: `yarn foundry:deploy`

### Contract Data Flow to Frontend
Both frameworks generate contract data that flows to the frontend:
1. Contracts compiled → ABIs generated
2. Deployment scripts run → addresses captured
3. `packages/nextjs/contracts/deployedContracts.ts` updated
4. Frontend hooks read type-safe contract data

External contracts: `packages/nextjs/contracts/externalContracts.ts`

## Frontend Architecture

### Contract Interaction Hooks
Located in `packages/nextjs/hooks/scaffold-eth/`:

```typescript
// Reading contract data
const { data } = useScaffoldReadContract({
  contractName: "YourContract",
  functionName: "getValue",
  args: [arg1],
});

// Writing to contracts
const { writeContractAsync } = useScaffoldWriteContract({
  contractName: "YourContract"
});
await writeContractAsync({
  functionName: "setValue",
  args: [newValue],
  value: parseEther("0.1"), // for payable functions
});

// Watching events
useScaffoldWatchContractEvent({
  contractName: "YourContract",
  eventName: "ValueChanged",
  onLogs: (logs) => console.log(logs),
});
```

### UI Components
From `@scaffold-ui/components`:
- `Address` - Display ETH addresses with copy/link
- `AddressInput` - ENS-aware address input
- `Balance` - ETH/token balance display
- `EtherInput` - Number input with ETH/USD conversion

### Styling (Tailwind v4, No DaisyUI)
Custom component classes defined in `packages/nextjs/styles/globals.css`:
- `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-ghost`, etc.
- `.badge`, `.badge-primary`
- `.modal`, `.modal-box`
- `.tooltip`, `.dropdown`
- `.loading`, `.skeleton`

Theme colors via CSS custom properties (`--color-primary`, `--color-base-100`, etc.)
Dark mode: `[data-theme="dark"]` selector

### Configuration
`packages/nextjs/scaffold.config.ts`:
- `targetNetworks` - chains to support
- `pollingInterval` - block polling frequency
- `onlyLocalBurnerWallet` - restrict burner wallet to local dev
- `walletConnectProjectId` - WalletConnect project ID

## Development Notes

### Pre-commit Hooks
The pre-commit hook runs:
1. `yarn next:check-types` - Full project TypeScript check (before lint-staged)
2. `yarn lint-staged` - ESLint on staged files only

Type checking runs first because it needs full project context (can't run on stashed partial files).

### ESLint Configuration
Uses ESLint 9 flat config (`packages/nextjs/eslint.config.mjs`):
- `@eslint/js` + `typescript-eslint` (not eslint-config-next)
- CommonJS globals for `.js` config files
- Ignores: `.next/`, `node_modules/`, `contracts/`

### Known Type Workarounds
- `burner-connector` has bundled rainbowkit version mismatch - uses type assertion
- Some scaffold hooks use `as unknown as` for complex wagmi type inference
- React 19 stricter JSX types require explicit `string` typing for map keys/children

### Debug UI
Visit `http://localhost:3000/debug` for auto-generated contract interaction UI.

## File Locations

| Purpose | Location |
|---------|----------|
| Smart contracts (Solidity) | `packages/contracts/contracts/` |
| Hardhat Ignition modules | `packages/contracts/ignition/modules/` |
| Hardhat TypeScript scripts | `packages/contracts/scripts/` |
| Foundry deploy scripts | `packages/contracts/script/` |
| Foundry JavaScript utilities | `packages/contracts/scripts-js/` |
| Foundry tests (.t.sol) | `packages/contracts/test/` |
| Foundry dependencies | `packages/contracts/lib/` |
| Hardhat config | `packages/contracts/hardhat.config.ts` |
| Foundry config | `packages/contracts/foundry.toml` |
| Frontend pages | `packages/nextjs/app/` |
| Frontend components | `packages/nextjs/components/` |
| Contract hooks | `packages/nextjs/hooks/scaffold-eth/` |
| Deployed contracts | `packages/nextjs/contracts/deployedContracts.ts` |
| Global styles | `packages/nextjs/styles/globals.css` |
| Scaffold config | `packages/nextjs/scaffold.config.ts` |

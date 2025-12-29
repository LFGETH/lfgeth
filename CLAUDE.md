# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Status

**This repo is a fork of Scaffold-ETH 2 undergoing major overhaul.** Goals:
- Support both Foundry and Hardhat in the same codebase
- Replace opaque "magic" components/commands with transparent, controlled alternatives
- Make the codebase suitable for production development, not just learning

The current code still reflects the original SE-2 structure. Update this file as changes are made.

## Current Structure (pre-overhaul)

Yarn monorepo with two packages:
- `packages/hardhat` - Solidity smart contracts, tests, and deployment scripts
- `packages/nextjs` - Next.js 15 frontend with App Router (not Pages Router)

Tech stack: NextJS, RainbowKit, Wagmi, Viem, Hardhat, TypeScript, TailwindCSS, DaisyUI.

## Commands (current SE-2 patterns)

```bash
# Development (run in separate terminals)
yarn chain          # Start local Hardhat network
yarn deploy         # Deploy contracts to local network
yarn start          # Start Next.js dev server (localhost:3000)

# Testing
yarn test                                    # Run all Hardhat tests
yarn hardhat:test --grep "test name"         # Run specific test

# Code quality
yarn lint           # Lint both packages
yarn format         # Format both packages
yarn next:check-types    # TypeScript check for frontend
yarn hardhat:check-types # TypeScript check for contracts

# Building & deployment
yarn next:build     # Build frontend
yarn vercel         # Deploy to Vercel
yarn verify         # Verify contracts on Etherscan
```

## Architecture (current SE-2 patterns, subject to change)

### Contract Data Flow
Deployed contract ABIs and addresses flow from Hardhat to the frontend:
1. `packages/hardhat/contracts/*.sol` - Solidity source files
2. `packages/hardhat/deploy/*.ts` - Deployment scripts (hardhat-deploy)
3. `yarn deploy` generates `packages/nextjs/contracts/deployedContracts.ts`
4. Frontend hooks read from `deployedContracts.ts` for type-safe contract interaction

External contracts (not deployed by you) go in `packages/nextjs/contracts/externalContracts.ts`.

### Frontend Contract Interaction Hooks (SE-2 patterns)
Located in `packages/nextjs/hooks/scaffold-eth/`. These wrap wagmi with SE-2 conveniences:

```typescript
// Reading contract data
const { data } = useScaffoldReadContract({
  contractName: "YourContract",
  functionName: "getValue",
  args: [arg1], // optional
});

// Writing to contracts
const { writeContractAsync } = useScaffoldWriteContract({ contractName: "YourContract" });
await writeContractAsync({
  functionName: "setValue",
  args: [newValue],
  value: parseEther("0.1"), // optional, for payable
});

// Reading events
const { data: events } = useScaffoldEventHistory({
  contractName: "YourContract",
  eventName: "ValueChanged",
  watch: true, // optional
});
```

### UI Components (SE-2 patterns)
Current components from `@scaffold-ui/components`:
- `Address` - Display ETH addresses
- `AddressInput` - ETH address input field
- `Balance` - Show ETH/USDC balance
- `EtherInput` - Number input with ETH/USD conversion

### Configuration
- `packages/nextjs/scaffold.config.ts` - Target network, polling interval, API keys
- Change `targetNetworks` array to deploy to different networks

## Development Workflow (current SE-2 approach)

1. Write/modify contracts in `packages/hardhat/contracts/`
2. Update deploy script in `packages/hardhat/deploy/` if needed
3. Run `yarn deploy` to deploy locally
4. Test at `http://localhost:3000/debug` for auto-generated contract UI
5. Write tests in `packages/hardhat/test/`
6. Build custom UI in `packages/nextjs/app/`

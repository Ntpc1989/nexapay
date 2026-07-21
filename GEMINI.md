# NexaPay Project Guidelines

Welcome to the NexaPay codebase! This file contains team-shared architecture, conventions, workflows, and guidelines to ensure code quality, consistency, and clean development.

---

## 🛠️ Tech Stack & Core Libraries

- **Framework**: Next.js 16 (App Router) & React 19
- **Language**: TypeScript (Strict mode)
- **Styling**: Tailwind CSS v4 (incorporating modern utility-first styling)
- **Web3 / Blockchain**:
  - [Wagmi v2](https://wagmi.sh) (React Hooks for Ethereum)
  - [Viem v2](https://viem.sh) (Lightweight, composable, and typescript-ready Ethereum library)
  - [RainbowKit v2](https://www.rainbowkit.com) (Responsive and customizable wallet connection UI)
- **Charting & Icons**: Recharts (for analytics & portfolio visualization), Lucide React (for icons)
- **Date Management**: `date-fns` (for human-readable and clean date rendering)

---

## 📁 Directory Structure

```text
src/
├── app/                  # Next.js App Router (pages, layouts, and API routes)
│   ├── api/              # Backend API endpoints (e.g., transactions, token logos)
│   ├── receive/          # Receive asset page
│   ├── send/             # Send asset page and dedicated client form
│   ├── swap/             # Swap asset page
│   ├── globals.css       # Tailwind CSS v4 styles and custom root utilities
│   ├── layout.tsx        # Root App layout and Shell wrapping
│   └── page.tsx          # Homepage / Dashboard
│
├── components/           # Reusable UI & Layout Components
│   ├── dashboard/        # Dashboard-specific widgets and hero sections
│   ├── layout/           # App layout containers (AppShell, headers, footers)
│   ├── portfolio/        # Portfolio cards, stats, and allocation charts
│   ├── receive/          # UI components for generating receiving QR/addresses
│   ├── send/             # Assets selector and Send transaction layouts
│   ├── swap/             # Swap form UI and exchange calculators
│   ├── transactions/     # Transaction history logs & cards
│   ├── ui/               # Core atomic design elements (Card, Section, StatCard, TokenLogo)
│   └── wallet/           # Wallet status and connection components
│
├── hooks/                # Custom React/Wagmi Hooks for modular state management
│   ├── useSendNative.ts  # Logic for sending native gas tokens (ETH, MATIC, etc.)
│   ├── useTokenBalances.ts # Balancing fetcher across multi-chain
│   ├── useTokenPrices.ts # Fetch and update token exchange rates
│   ├── useTransactions.ts # Historical log hooks
│   └── useWallet.ts      # Active wallet details & address state
│
├── lib/                  # Library configurations and shared helpers
│   ├── date.ts           # Date formatting utility functions
│   ├── tokens.ts         # Hardcoded asset/metadata lists & helpers
│   └── wagmi.ts          # Central RainbowKit/Wagmi Client Configuration
│
└── services/             # Direct external service integration layers
    ├── alchemy.ts        # Alchemy RPC/API direct requests
    ├── prices.ts         # Price oracle/fetching service
    └── transactions/     # Chain-specific historical transaction retrievers
        ├── arbitrum.ts   # Arbitrum Explorer/RPC log integration
        ├── base.ts       # Base Chain API history
        ├── ethereum.ts   # Mainnet Ethereum logs
        ├── optimism.ts   # Optimism transactions
        ├── polygon.ts    # Polygon network service
        └── types.ts      # Strong TypeScript interfaces for transactions
```

---

## 💻 Architectural Rules & Guidelines

### 1. Server vs. Client Components
- **Default to Server Components**: Keep pages in `src/app` as Server Components where possible to minimize JavaScript shipped to the client.
- **Client Components**: Mark files with `"use client"` at the very top ONLY when they require:
  - React Hooks (`useState`, `useEffect`, `useMemo`, etc.)
  - Wagmi/Viem hooks (`useAccount`, `useConnect`, etc.)
  - Interactive event listeners (`onClick`, `onChange`, etc.)
  - Browser-only APIs.
- Keep interactive client-side logic encapsulated in modular component subfolders (e.g. `src/components/send/SendAssetForm.tsx`) rather than converting whole pages into client components.

### 2. TypeScript Best Practices
- **No Implicit `any`**: Ensure all interfaces, props, functions, and state hooks are strictly typed.
- **Reused Interfaces**: Import shared interfaces (e.g., transaction objects, token structures) from `src/services/transactions/types.ts` or `src/lib/tokens.ts` rather than redefining them locally.
- Use discriminated unions for handling complex asynchronous states (e.g., loading, success, failure) to prevent impossible states.

### 3. Styling & Tailwind CSS v4
- Use Tailwind CSS v4 utility classes.
- Standard colors and typography are configured via custom properties or Tailwind classes in `src/app/globals.css`.
- Ensure dark mode and light mode readability are preserved.
- Keep HTML/JSX structures clean; break large elements down into smaller child components if the styling class lists become unreadable.

### 4. Web3 & Smart Contract Interaction
- **Wagmi Configurations**: Any new EVM chain or provider settings must be registered in `src/lib/wagmi.ts`.
- **Wagmi Hooks**: Prefer wrapping Wagmi hooks inside custom hooks (in `src/hooks/`) to keep components clean and mockable for future testing.
- **Viem Types**: When dealing with transactions, balances, or raw hex data, use Viem's built-in utility functions (e.g., `formatEther`, `parseEther`, `isAddress`) rather than home-brewed conversion logic.

### 5. Services and RPC Nodes
- RPC calls should go through the unified `services/` folder.
- Maintain API keys or custom endpoints inside `.env.local` as environment variables.
- Never hardcode sensitive environment variables in frontend code.

---

## 🚀 Running Tasks

### Development Server
```bash
npm run dev
```

### Build & Production Test
To check typescript compiler and build bundle:
```bash
npm run build
```

### Code Formatting and Linting
```bash
npm run lint
```

# Vyxel: Project Roadmap

## 1. Project Vision

**Vyxel** is engineered to be the definitive Web3 Super App for the **Arc ecosystem**. Our vision is to eliminate the fragmentation of decentralized applications by unifying identity, asset management, data exploration, and AI-driven interactions under a single, highly performant interface. Built on a bleeding-edge stack (Next.js 15, React 19, Wagmi, RainbowKit, and Viem), Vyxel provides an institutional-grade, intent-centric user experience that caters to both everyday users and advanced developers.

## 2. Current Status

We are currently in the **Foundational Phase (v0.1.x)**. 
The core Web3 connection infrastructure is operational. The application successfully authenticates users via RainbowKit and Wagmi, communicating with the Arc network through Viem. The primary modules—Dashboard, Wallet, Send, Receive, and Swap—are instantiated. Active development is heavily focused on redesigning the Dashboard to adhere to strict institutional design principles (high density, dark theme, zero placeholder data) while leveraging React 19 concurrent rendering and TanStack Query for optimal RPC data fetching.

## 3. Development Phases

### Phase 1: Foundation & Core Identity (Current)
Establish a resilient, type-safe architecture for core financial interactions.
*   Next.js 15 App Router & RSC scaffolding.
*   Wallet connectivity, session management, and Arc RPC configuration.
*   Basic token operations (Send, Receive, Swap).
*   Live portfolio valuation mapping without mock data.

### Phase 2: Super App Expansion
Introduce ecosystem-specific primitives to elevate the platform beyond a standard wallet interface.
*   **Staking Module**: Native delegation, unbonding, and yield tracking for Arc validators.
*   **Explorer Module**: Integrated block exploration, transaction decoding, and real-time gas tracking.
*   **Contracts Module**: Safe read/write UI for verified Arc smart contracts.

### Phase 3: Intelligence & Interoperability
Integrate advanced features that define the "Super App" experience.
*   **AI Copilot**: Natural language intent parsing to securely draft Viem transaction payloads (e.g., "Swap 50 ARC to USDC").
*   **Bridge Module**: Cross-chain asset transfers into the Arc ecosystem.
*   **Developer Tools**: On-chain data playgrounds, ABI dynamic resolvers, and local RPC management.

### Phase 4: Ecosystem Maturation
Finalize the horizontal scaling of the application to cover all Web3 verticals.
*   **Analytics Module**: Ecosystem-wide metrics, TVL visualizations, and wallet cohort analysis.
*   **NFT Module**: Gallery, metadata inspection, and marketplace aggregation.
*   **Governance Module**: Seamless integration with Arc proposals and on-chain voting.

## 4. Milestones

| Milestone | Target | Description |
| :--- | :--- | :--- |
| **M1: Alpha Core** | *Completed* | RainbowKit setup, Wagmi/Viem integration, basic routing. |
| **M2: Dashboard Revamp** | *In Progress* | Premium dark theme, strict Hero section (Status, Portfolio, Actions), React 19 data streaming. |
| **M3: Arc Explorer Beta** | *Upcoming* | Read-only block/tx data streaming via Next.js server-sent events. |
| **M4: AI Copilot V1** | *Upcoming* | Read-only AI intents utilizing Server Actions for model inference. |
| **M5: V1.0 Mainnet** | *Upcoming* | Fully audited, production-ready release of Wallet, Portfolio, Swap, and Staking. |

## 5. Completed Features

*   **Architecture**: Next.js 15 App Router structure and React Server Components baseline.
*   **Wallet Connectivity**: Multi-wallet support utilizing RainbowKit configured for the Arc network.
*   **Web3 State Layer**: Wagmi and Viem integration for type-safe EVM interactions.
*   **Core Modules Scaffolding**: Initial routing and state architecture for Wallet, Send, Receive, and Swap.
*   **Strict Styling Baseline**: Tailwind CSS setup with dynamic CSS variables for the premium dark theme.

## 6. In Progress

*   **Dashboard Redesign**: Implementing the strict high-information-density UI.
*   **Hero Section Constraints**: Isolating the UI to strictly display Wallet Status, Portfolio Summary, and Quick Actions.
*   **Data Integrity Enforcement**: Ripping out all mock data; enforcing strict loading/error boundaries when RPC data is unavailable via TanStack Query.
*   **Connection Reactivity**: Ensuring all UI components globally mount/unmount or lock gracefully based on the active wallet connection state.

## 7. Upcoming Features

*   **AI Intent Engine**: Drafting the Server Actions required to parse natural language into Viem unsigned transaction objects.
*   **Native Arc Staking**: Building the delegation UI and integrating Arc's specific staking contract ABIs.
*   **Transaction Activity Feed**: A unified, deeply indexed history of user interactions across Swap, Send, and Receive modules.
*   **Developer Contract UI**: A dynamic component that takes an ABI and auto-generates a form for contract interactions.

## 8. Long-Term Vision

Vyxel aims to be the **default operating system for the Arc ecosystem**. Over the next 18-24 months, the platform will transition from a passive portfolio manager into an active, intelligent agent. Users will rely on Vyxel's AI Copilot to execute complex multi-step DeFi strategies, developers will use Vyxel's built-in Dev Tools for contract verification and testing, and node operators will manage their infrastructure via the Staking and Analytics modules—all within a single, seamless, and secure Next.js environment.

## 9. Technical Goals

*   **100% Type Safety**: Maintain strict TypeScript adherence; all smart contract ABIs must be `const` asserted for Viem type inference.
*   **Performance Metrics**: Consistently achieve >95 on all Google Lighthouse scores (Performance, Accessibility, Best Practices, SEO).
*   **Zero-State Resilience**: Ensure the app functions smoothly during RPC degradation with graceful fallbacks and offline-first caching via TanStack Query.
*   **Optimal Rendering**: Maximize the use of React Server Components (RSC) to keep the client bundle size absolute minimal, offloading Web3 reads to the server where possible.

## 10. Release Checklist

For every major semantic version release, the following criteria must be met:

- [ ] **Build Validation**: `npm run build` executes with zero warnings and zero TypeScript errors.
- [ ] **Data Integrity**: Verified that no placeholder/mock financial data is present in production environments.
- [ ] **Web3 Resilience**: Fallback RPCs are configured and tested by simulating primary RPC downtime.
- [ ] **Security (CSP)**: Content Security Policy headers are strict and validated against script injections.
- [ ] **Responsive & A11y**: Mobile-first design is verified on physical devices; minimum WCAG AA contrast ratios are met.
- [ ] **Error Boundaries**: Next.js `error.tsx` boundaries are in place to catch and elegantly format Viem/RPC errors.
- [ ] **Performance Audit**: Bundle size analyzed; `"use client"` directives are strictly limited to leaf-node interactive components.

# Vyxel: Project Context & Architectural Overview

## 1. Introduction

**Vyxel** is the flagship Web3 Super App designed exclusively for the **Arc ecosystem**. It serves as the unified entry point for users, developers, and node operators to interact with decentralized applications, manage digital assets, and leverage advanced AI-driven blockchain interactions. 

As a Super App, Vyxel aggregates traditionally fragmented Web3 experiences into a single, highly performant interface. The platform is architected for extreme scalability, real-time data synchronization, and rigorous security standards required for production-grade financial applications.

## 2. Technology Stack

Vyxel utilizes a modern, bleeding-edge React ecosystem tailored for high-performance Web3 applications.

### Core Frameworks
*   **Framework**: Next.js 15 (App Router, React Server Components, Server Actions)
*   **UI Library**: React 19 (Concurrent rendering, updated hooks, transitions)
*   **Language**: TypeScript (Strict mode, explicit return types for critical paths)
*   **Styling**: Tailwind CSS (Utility-first, CSS variables for dynamic theming)

### Web3 & Data Layer
*   **EVM Interactions**: Viem (Type-safe, highly performant, lightweight Ethereum primitives)
*   **React Hooks for Web3**: Wagmi (Declarative reactive Web3 state)
*   **Wallet Management**: RainbowKit (Seamless, customizable wallet connection and UX)
*   **Asynchronous State**: TanStack Query (v5) (Caching, background fetching, RPC synchronization)

## 3. Core Architecture & Super App Modules

Vyxel operates on a modular architecture. Each domain operates independently but shares a unified authentication state, design system, and Web3 RPC provider context.

### 3.1 Wallet & Identity
*   **Scope**: Secure authentication, session management, multi-wallet connectivity, and Arc-specific identity resolution (e.g., Arc Naming Service).
*   **Implementation**: Leveraging RainbowKit with custom Wagmi connectors tailored for Arc-compatible wallets, utilizing SIWE (Sign-In with Ethereum) for off-chain session validation.

### 3.2 Portfolio & Asset Management
*   **Scope**: Unified dashboard for native Arc tokens, NFTs, and DeFi positions.
*   **Implementation**: Real-time indexing via TanStack Query polling or WebSockets. High-performance UI updates driven by React 19 concurrent features to ensure the app remains responsive during heavy RPC payloads.

### 3.3 AI Copilot & Intent Engine
*   **Scope**: Natural language interface for blockchain actions (e.g., "Stake 100 ARC to the highest yielding validator").
*   **Implementation**: AI intent parsing translated into secure, unsigned transaction payloads via Viem, heavily utilizing Server Actions for AI model inference without exposing API keys to the client.

### 3.4 Explorer & Analytics
*   **Scope**: Native block explorer, real-time transaction decoding, gas tracking, and network health metrics.
*   **Implementation**: Streamed data via Next.js Server-Sent Events (SSE) or WebSockets. Historical data fetched via TanStack Query with aggressive client-side caching.

### 3.5 Smart Contracts & Developer Tools
*   **Scope**: Read/Write interfaces for verified Arc contracts, ABI parsing, and verifiable deployments.
*   **Implementation**: Dynamic ABI resolution using Viem's advanced type inference.

### 3.6 DeFi & Staking
*   **Scope**: Native delegation, liquid staking derivatives, and yield farming strategies within the Arc ecosystem.
*   **Implementation**: Complex multi-step transaction flows with optimistic UI updates during transaction propagation.

## 4. Engineering Standards & Best Practices

As the Lead Staff Engineer, I mandate the following production guidelines for all Vyxel contributors:

### 4.1 State Management & Data Fetching
*   **Never store server/blockchain state in React context or local state.** Always use TanStack Query or Wagmi hooks to ensure cache consistency, deduplication, and automatic retries.
*   Use React 19 `useTransition` for non-blocking UI updates during heavy filtering or routing changes.

### 4.2 Web3 Resilience
*   **RPC Fallbacks**: Configure Wagmi with fallback RPC URLs to handle node rate-limiting or downtime seamlessly.
*   **Graceful Degradation**: If the blockchain network is congested, UI must reflect pending states accurately. Never assume a transaction has succeeded until `receipt.status === 'success'` and adequate block confirmations are met.
*   **Error Handling**: Parse all Viem/RPC errors to human-readable formats. "Internal JSON-RPC error" is unacceptable for user-facing surfaces.

### 4.3 Component Architecture
*   **Server by Default**: All Next.js 15 components must be React Server Components (`RSC`) by default.
*   **Leaf-Node Interactivity**: Use `"use client"` only at the lowest possible level in the component tree (e.g., buttons handling Web3 write operations, forms).

### 4.4 Type Safety
*   **Strict ABIs**: All smart contract interactions must use `const` asserted ABIs to leverage Viem's type inference. No manual casting of contract return types.
*   Avoid `any` or `ts-ignore` entirely. Use `unknown` with type guards if payload shapes are dynamic.

## 5. Security Posture
*   Never log raw transaction payloads, private keys, or PII.
*   All user inputs into the AI Copilot must be sanitized and validated server-side.
*   Vyxel uses Content Security Policy (CSP) headers strictly limiting executable scripts and RPC origins.

## 6. Current Project Status

At this phase of development, the foundational layer of Vyxel is established:
*   **Wallet Integration**: Wallet connectivity is fully functional utilizing RainbowKit.
*   **Ecosystem Focus**: Arc is designated and configured as the primary supported ecosystem.
*   **Module Status**: The core application currently includes **Dashboard, Wallet, Send, Receive, and Swap** modules.
*   **UI Work-in-Progress**: The main Dashboard is actively undergoing a fundamental redesign.
*   **Data Integrity Requirement**: Portfolio values **must never** utilize mock or fake data under any circumstance. If RPC data is unavailable, handle the loading or error state gracefully.
*   **Reactive State**: All user interfaces must inherently react and subscribe to the active wallet connection state (e.g., locking routes or components when disconnected).

## 7. UI & UX Principles

Vyxel aims for a professional, institutional-grade user experience. Contributors must adhere to the following design directives:
*   **Aesthetic**: Implement a premium, high-contrast Dark Theme.
*   **Layout**: Maintain high information density suitable for power users (financial applications).
*   **Responsiveness**: Strictly Mobile-first implementation; fluid scaling across viewports.
*   **Performance**: Fast navigation utilizing Next.js app router prefetching.
*   **Motion**: Minimal animations. Motion should be functional (state transitions, loading) over decorative.
*   **Accessibility (a11y)**: Proper ARIA roles, contrast ratios, and keyboard navigation support.
*   **Hero Section Constraints**: The primary dashboard hero section must strictly contain only:
    1. Wallet Status
    2. Portfolio Summary
    3. Quick Actions
*   **Zero-Placeholder Policy**: Never display placeholder financial values (e.g., `$0.00` or `$---`) if data is loading. Use skeleton loaders to prevent layout shift and misleading information.

## 8. Development Workflow

To ensure high-quality code integration, all engineering tasks must follow this Standard Operating Procedure (SOP):

**Before Coding:**
1.  **Context Gathering**: Read *only* the required files related to the specific feature or bug.
2.  **Proposal**: Explain the planned implementation approach clearly.
3.  **Impact Radius**: List the exact files intended for modification or creation.
4.  **Wait**: Halt and wait for Explicit Approval from the Lead/Reviewer before writing code.

**After Coding:**
*   **Delivery**: Return the modified or created files completely.
*   **No Snippets**: Never return partial code snippets. Provide the full file context to avoid copy-paste errors.
*   **Build Verification**: Always run and confirm `npm run build` succeeds locally.
*   **Testing Checklist**: Provide a checklist of manual or automated tests validating the specific feature/fix.
*   **Version Control**: Suggest a clear, conventional git commit message summarizing the changes.

## 9. Long-Term Vision

Vyxel is designed to scale horizontally. Every architectural decision, from directory structure to state management, must support future expansion into a complete Arc Super App ecosystem. The strategic roadmap includes the following deeply integrated modules:

*   **Wallet**: Native asset management & routing.
*   **Portfolio**: Cross-protocol yield tracking & historical performance.
*   **Explorer**: Block, transaction, and address tracking.
*   **Contracts**: Safe interactions and verifications.
*   **AI Copilot**: Conversational Web3 interactions and intent execution.
*   **Analytics**: On-chain data visualizations and ecosystem metrics.
*   **Staking**: Validator delegation and liquid staking management.
*   **Bridge**: Cross-chain messaging and liquidity transfers.
*   **NFT**: Gallery, metadata viewer, and marketplace aggregations.
*   **Governance**: Voting and proposal management.
*   **Developer Tools**: RPC management, testnet faucets, and ABI tools.

Please confirm when you are ready to proceed with generating ROADMAP.md.

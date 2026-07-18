"use client";

import React from "react";
import { WalletConnectButton } from "@/components/wallet/WalletConnectButton";
import { WalletStatusCard } from "@/components/wallet/WalletStatusCard";
import { PortfolioCard } from "@/components/portfolio/PortfolioCard";

export function AppShell() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              NexaPay
            </h1>

            <p className="mt-2 text-gray-600">
              Multi-chain Web3 Wallet Dashboard
            </p>
          </div>

          <WalletConnectButton />
        </div>

        {/* Dashboard Cards */}
        <div className="grid gap-6 lg:grid-cols-2">
          <WalletStatusCard />

          <PortfolioCard />
        </div>
      </div>
    </main>
  );
}
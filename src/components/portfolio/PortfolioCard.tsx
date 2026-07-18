"use client";

import { useWallet } from "@/hooks/useWallet";

export function PortfolioCard() {
  const wallet = useWallet();

  const balance = wallet.balance
    ? Number(wallet.balance.formatted).toFixed(4)
    : "0.0000";

  const symbol = wallet.balance?.symbol ?? "--";

  const network = wallet.chain?.name ?? "Unknown";

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          Portfolio
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Live wallet overview
        </p>
      </div>

      {!wallet.isConnected ? (
        <div className="rounded-xl bg-gray-50 p-6 text-center text-gray-500">
          Connect your wallet to view your portfolio.
        </div>
      ) : (
        <div className="space-y-5">
          <div className="rounded-xl bg-blue-600 p-5 text-white">
            <p className="text-sm opacity-80">
              Native Asset
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {balance} {symbol}
            </h2>

            <p className="mt-2 text-sm opacity-80">
              Network: {network}
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">
                Asset
              </span>

              <span className="font-medium">
                Balance
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span>{symbol}</span>

              <span>
                {balance}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
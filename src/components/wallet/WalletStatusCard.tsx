"use client";

import { useState } from "react";
import { useWallet } from "@/hooks/useWallet";

export function WalletStatusCard() {
  const wallet = useWallet();

  const [copied, setCopied] = useState(false);

  const shortAddress = wallet.address
    ? `${wallet.address.slice(0, 6)}...${wallet.address.slice(-4)}`
    : "";

  async function handleCopy() {
    if (!wallet.address) return;

    await navigator.clipboard.writeText(wallet.address);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">
          Wallet Status
        </h2>

        <span
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            wallet.isConnected
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {wallet.isConnected ? "🟢 Connected" : "🔴 Disconnected"}
        </span>
      </div>

      {!wallet.isConnected ? (
        <p className="text-gray-500">
          Connect your wallet to view details.
        </p>
      ) : (
        <div className="space-y-6">
          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-wide text-gray-500">
              Address
            </p>

            <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
              <span className="font-mono text-sm">
                {shortAddress}
              </span>

              <button
                onClick={handleCopy}
                className="font-medium text-blue-600 hover:text-blue-800"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-wide text-gray-500">
              Network
            </p>

            <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
              {wallet.chain?.name ?? "Unknown"}
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-wide text-gray-500">
              Chain ID
            </p>

            <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
              {wallet.chainId ?? "-"}
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-wide text-gray-500">
              Balance
            </p>

            <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
              {wallet.isBalanceLoading
                ? "Loading..."
                : wallet.balance
                ? `${Number(wallet.balance.formatted).toFixed(4)} ${
                    wallet.balance.symbol
                  }`
                : "0"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
"use client";

import Card from "@/components/ui/Card";
import { useWallet } from "@/hooks/useWallet";

export function ReceiveAssetCard() {
  const wallet = useWallet();

  const address = wallet.address ?? "";

  async function copyAddress() {
    if (!address) return;

    await navigator.clipboard.writeText(address);
  }

  return (
    <Card>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Receive Assets
          </h1>

          <p className="mt-2 text-zinc-400">
            Share your wallet address to receive crypto.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="mb-2 text-sm text-zinc-400">
            Wallet Address
          </p>

          <div className="break-all rounded-xl bg-black/30 p-4 font-mono text-sm text-white">
            {address || "Connect your wallet"}
          </div>
        </div>

        <button
          onClick={copyAddress}
          disabled={!address}
          className="w-full rounded-xl bg-emerald-600 py-3 font-semibold text-white transition hover:bg-emerald-500 disabled:opacity-50"
        >
          Copy Address
        </button>

        <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center text-zinc-500">
          QR Code Coming Next
        </div>
      </div>
    </Card>
  );
}
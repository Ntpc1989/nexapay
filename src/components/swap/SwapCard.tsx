"use client";

import Card from "@/components/ui/Card";

export function SwapCard() {
  return (
    <Card>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Swap Assets
          </h1>

          <p className="mt-2 text-zinc-400">
            Exchange one token for another.
          </p>
        </div>

        <div className="space-y-5">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <label className="mb-2 block text-sm text-zinc-400">
              From
            </label>

            <div className="rounded-xl bg-black/20 p-4 text-white">
              Token selector coming next...
            </div>
          </div>

          <div className="flex justify-center">
            <div className="rounded-full border border-white/10 bg-white/5 p-3 text-white">
              ⇅
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <label className="mb-2 block text-sm text-zinc-400">
              To
            </label>

            <div className="rounded-xl bg-black/20 p-4 text-white">
              Token selector coming next...
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-400">Rate</span>
              <span className="text-white">--</span>
            </div>

            <div className="mt-2 flex justify-between text-sm">
              <span className="text-zinc-400">Estimated Fee</span>
              <span className="text-white">--</span>
            </div>
          </div>

          <button
            disabled
            className="w-full rounded-xl bg-violet-600 py-3 font-semibold text-white opacity-50"
          >
            Swap
          </button>
        </div>
      </div>
    </Card>
  );
}
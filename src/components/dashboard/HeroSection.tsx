"use client";

import Link from "next/link";
import {
  ArrowDownLeft,
  ArrowUpRight,
  RefreshCcw,
  Sparkles,
} from "lucide-react";

import { WalletConnectButton } from "@/components/wallet/WalletConnectButton";

export function HeroSection() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.05] backdrop-blur-2xl">
      {/* Aurora */}
      <div className="absolute inset-0">
        <div className="absolute -left-28 -top-24 h-80 w-80 rounded-full bg-blue-500/20 blur-[140px]" />

        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-violet-500/20 blur-[160px]" />

        <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[150px]" />
      </div>

      <div className="relative grid gap-10 p-8 lg:grid-cols-[1.5fr_420px] lg:p-12">
        {/* LEFT */}

        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-500/10 px-4 py-2 text-sm font-medium text-sky-300">
            <Sparkles className="h-4 w-4" />
            Powered by Arc
          </div>

          <p className="mt-8 text-sm uppercase tracking-[0.35em] text-slate-400">
            Premium Web3 Dashboard
          </p>

          <h1 className="mt-4 text-5xl font-black leading-none md:text-7xl">
            <span className="gradient-text">Vyxel</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Securely manage digital assets across Ethereum, Base, Polygon and
            other EVM networks with a premium multi-chain experience.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">
              Wallet Ready
            </span>

            <span className="rounded-full border border-sky-500/20 bg-sky-500/10 px-4 py-2 text-sm text-sky-300">
              Multi Chain
            </span>

            <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
              Fast & Secure
            </span>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/send"
              className="primary-button flex items-center gap-2 px-6 py-4 font-semibold"
            >
              <ArrowUpRight className="h-5 w-5" />
              Send
            </Link>

            <Link
              href="/receive"
              className="glass flex items-center gap-2 px-6 py-4 font-semibold"
            >
              <ArrowDownLeft className="h-5 w-5" />
              Receive
            </Link>

            <Link
              href="/swap"
              className="glass flex items-center gap-2 px-6 py-4 font-semibold"
            >
              <RefreshCcw className="h-5 w-5" />
              Swap
            </Link>
          </div>
        </div>

        {/* RIGHT */}

        <div className="glass flex flex-col justify-between p-8">
          <div>
            <p className="text-sm text-slate-400">
              Portfolio Value
            </p>

            <h2 className="mt-2 text-5xl font-black">
              $42,841
            </h2>

            <div className="mt-3 inline-flex rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-400">
              ▲ +12.48%
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {["Ethereum", "Base", "Polygon", "Arbitrum"].map((network) => (
              <span
                key={network}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300"
              >
                {network}
              </span>
            ))}
          </div>

          <div className="my-8 h-px bg-white/10" />

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">
                Today
              </p>

              <p className="font-medium">
                {today}
              </p>
            </div>

            <WalletConnectButton />
          </div>
        </div>
      </div>
    </section>
  );
}
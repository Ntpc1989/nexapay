"use client";

import { useMemo } from "react";
import {
  Coins,
  Globe,
  TrendingUp,
  Wallet,
} from "lucide-react";

import Card from "@/components/ui/Card";

import { useWallet } from "@/hooks/useWallet";
import { useTokenBalances } from "@/hooks/useTokenBalances";
import { useTokenPrices } from "@/hooks/useTokenPrices";

export function OverviewStats() {
  const wallet = useWallet();
  const { balances } = useTokenBalances();
  const { prices, loading } = useTokenPrices();

  const nativeBalance = wallet.balance
    ? Number(wallet.balance.formatted)
    : 0;

  const nativePrice =
    wallet.chain?.id === 137
      ? prices?.polygon ?? 0
      : prices?.ethereum ?? 0;

  const portfolioValue = useMemo(() => {
    if (!prices) {
      return nativeBalance * nativePrice;
    }

    let total = nativeBalance * nativePrice;

    for (const token of balances) {
      const amount = Number(token.balance);

      let price = 0;

      switch (token.symbol) {
        case "USDC":
          price = prices.usdCoin;
          break;

        case "USDT":
          price = prices.tether;
          break;

        case "WETH":
          price = prices.ethereum;
          break;

        default:
          price = 0;
      }

      total += amount * price;
    }

    return total;
  }, [balances, nativeBalance, nativePrice, prices]);

  const cards = [
    {
      title: "Portfolio",
      value: loading
        ? "..."
        : `$${portfolioValue.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`,
      subtitle: "Live portfolio value",
      icon: TrendingUp,
      gradient: "from-emerald-500/20 to-emerald-500/5",
      iconColor: "text-emerald-400",
    },
    {
      title: "Assets",
      value: String(
        balances.length + (nativeBalance > 0 ? 1 : 0),
      ),
      subtitle: "Tracked assets",
      icon: Coins,
      gradient: "from-amber-500/20 to-amber-500/5",
      iconColor: "text-amber-400",
    },
    {
      title: "Network",
      value: wallet.chain?.name ?? "--",
      subtitle: "Connected chain",
      icon: Globe,
      gradient: "from-sky-500/20 to-sky-500/5",
      iconColor: "text-sky-400",
    },
    {
      title: "Wallet",
      value: wallet.isConnected
        ? "Connected"
        : "Offline",
      subtitle: wallet.isConnected
        ? "Ready"
        : "Not connected",
      icon: Wallet,
      gradient: "from-violet-500/20 to-violet-500/5",
      iconColor: wallet.isConnected
        ? "text-violet-400"
        : "text-red-400",
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <Card
            key={card.title}
            className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.05] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-sky-400/20 hover:bg-white/[0.08]"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-60`}
            />

            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">
                  {card.title}
                </p>

                <h3 className="mt-3 text-3xl font-bold tracking-tight text-white">
                  {card.value}
                </h3>

                <p className="mt-3 text-sm text-slate-400">
                  {card.subtitle}
                </p>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition-transform duration-300 group-hover:scale-110">
                <Icon
                  className={`h-7 w-7 ${card.iconColor}`}
                />
              </div>
            </div>

            <div className="relative mt-6 h-1 overflow-hidden rounded-full bg-white/5">
              <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-sky-400 via-cyan-400 to-violet-500" />
            </div>
          </Card>
        );
      })}
    </div>
  );
}
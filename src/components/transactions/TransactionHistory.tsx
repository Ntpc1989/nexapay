"use client";

import Card from "@/components/ui/Card";
import { formatRelativeTime } from "@/lib/date";
import { useTransactions } from "@/hooks/useTransactions";

const SPAM_KEYWORDS = [
  ".club",
  ".cfd",
  ".xyz",
  ".top",
  ".vip",
  ".click",
  ".site",
  "visit",
  "claim",
  "reward",
  "airdrop",
  "bonus",
];

function isSpamToken(asset: string) {
  if (!asset) return true;

  return SPAM_KEYWORDS.some((word) =>
    asset.toLowerCase().includes(word)
  );
}

function getExplorer(chain: string, hash: string) {
  switch (chain.toLowerCase()) {
    case "ethereum":
      return `https://etherscan.io/tx/${hash}`;

    case "polygon":
      return `https://polygonscan.com/tx/${hash}`;

    case "arbitrum":
      return `https://arbiscan.io/tx/${hash}`;

    case "optimism":
      return `https://optimistic.etherscan.io/tx/${hash}`;

    default:
      return `https://basescan.org/tx/${hash}`;
  }
}

function formatCategory(category: string) {
  switch (category.toLowerCase()) {
    case "erc20":
      return "Token";

    case "internal":
      return "Internal";

    default:
      return "Transfer";
  }
}

export function TransactionHistory() {
  const { transactions, loading } = useTransactions();

  const filteredTransactions = transactions.filter((tx) => {
    if (isSpamToken(tx.asset)) return false;
    if (!tx.asset.trim()) return false;
    if (Number(tx.value) <= 0) return false;

    return true;
  });

  return (
    <Card>
      {loading ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-zinc-400">
          Loading transactions...
        </div>
      ) : filteredTransactions.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-zinc-400">
          No transactions found.
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTransactions.map((tx) => (
            <div
              key={`${tx.hash}-${tx.category}`}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:border-sky-500/30 hover:bg-white/[0.05]"
            >
              <div className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-2xl">
                    {tx.category === "erc20" ? "🪙" : "💸"}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-lg text-white">
                        {tx.asset}
                      </h3>

                      <span className="rounded-full bg-sky-500/10 px-2 py-1 text-xs text-sky-300">
                        {tx.chain}
                      </span>

                      <span className="rounded-full bg-violet-500/10 px-2 py-1 text-xs text-violet-300">
                        {formatCategory(tx.category)}
                      </span>
                    </div>

                    <p className="mt-1 text-sm text-zinc-500">
                      {formatRelativeTime(tx.metadata.blockTimestamp)}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-bold text-white">
                    {Number(tx.value).toLocaleString(undefined, {
                      maximumFractionDigits: 6,
                    })}{" "}
                    {tx.asset}
                  </p>

                  <a
                    href={getExplorer(tx.chain, tx.hash)}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-block text-sm font-medium text-sky-400 transition hover:text-sky-300"
                  >
                    ↗ View Explorer
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
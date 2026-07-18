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
  ".xyz",
  "visit",
  "claim",
  "reward",
  "airdrop",
  "bonus",
];

function isSpamToken(asset: string) {
  if (!asset) return true;

  const lower = asset.toLowerCase();

  return SPAM_KEYWORDS.some((word) => lower.includes(word));
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

    case "base":
    default:
      return `https://basescan.org/tx/${hash}`;
  }
}

function formatCategory(category: string) {
  switch (category.toLowerCase()) {
    case "external":
      return "Transfer";

    case "erc20":
      return "Token";

    case "internal":
      return "Internal";

    default:
      return category;
  }
}

export function TransactionHistory() {
  const { transactions, loading } = useTransactions();

  const filteredTransactions = transactions.filter((tx) => {
    if (isSpamToken(tx.asset)) return false;

    if (!tx.asset || tx.asset.trim() === "") return false;

    if (Number(tx.value) <= 0) return false;

    return true;
  });

  return (
    <Card>
      <div>
        <h2 className="text-2xl font-bold text-white">
          Recent Transactions
        </h2>

        <p className="mt-1 text-sm text-zinc-400">
          Live multi-chain activity
        </p>
      </div>

      {loading ? (
        <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900 p-8 text-center text-zinc-400">
          Loading transactions...
        </div>
      ) : filteredTransactions.length === 0 ? (
        <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900 p-8 text-center text-zinc-400">
          No transactions found.
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {filteredTransactions.map((tx) => (
            <div
              key={`${tx.hash}-${tx.chain}-${tx.category}`}
              className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 transition hover:border-zinc-700"
            >
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-2xl">
                      {tx.category === "erc20" ? "🪙" : "💸"}
                    </span>

                    <h3 className="text-lg font-semibold text-white">
                      {tx.asset}
                    </h3>

                    <span className="rounded-full bg-emerald-500/15 px-2 py-1 text-xs font-semibold text-emerald-300">
                      {tx.chain}
                    </span>

                    <span className="rounded-full bg-blue-500/10 px-2 py-1 text-xs font-semibold text-blue-300">
                      {formatCategory(tx.category)}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-zinc-500">
                    {formatRelativeTime(tx.metadata.blockTimestamp)}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xs uppercase text-zinc-500">
                    Amount
                  </p>

                  <p className="text-xl font-bold text-white">
                    {Number(tx.value).toLocaleString(undefined, {
                      maximumFractionDigits: 6,
                    })}{" "}
                    {tx.asset}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <a
                  href={getExplorer(tx.chain, tx.hash)}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500"
                >
                  View Explorer ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
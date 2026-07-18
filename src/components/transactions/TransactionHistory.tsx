"use client";

import { useTransactions } from "@/hooks/useTransactions";

export function TransactionHistory() {
  const { transactions, loading } = useTransactions();

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          Recent Transactions
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Live transaction history
        </p>
      </div>

      {loading ? (
        <div className="py-8 text-center text-gray-500">
          Loading transactions...
        </div>
      ) : transactions.length === 0 ? (
        <div className="py-8 text-center text-gray-500">
          No transactions found.
        </div>
      ) : (
        <div className="space-y-4">
          {transactions.map((tx) => (
            <div
              key={tx.hash}
              className="rounded-xl border border-gray-200 p-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">
                  {tx.asset}
                </h3>

                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                  {tx.category}
                </span>
              </div>

              <p className="mt-3 text-lg font-bold">
                {tx.value} {tx.asset}
              </p>

              <p className="mt-2 text-sm text-gray-500">
                {new Date(
                  tx.metadata.blockTimestamp
                ).toLocaleString()}
              </p>

              <a
                href={`https://basescan.org/tx/${tx.hash}`}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block text-sm font-medium text-blue-600 hover:underline"
              >
                View on Basescan →
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
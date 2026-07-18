"use client";

import { useMemo } from "react";

import { useWallet } from "@/hooks/useWallet";
import { useTokenBalances } from "@/hooks/useTokenBalances";
import { useTokenPrices } from "@/hooks/useTokenPrices";

export function PortfolioCard() {
  const wallet = useWallet();
  const { balances, isLoading } = useTokenBalances();
  const { prices, loading } = useTokenPrices();

  const nativeBalance = wallet.balance
    ? Number(wallet.balance.formatted)
    : 0;

  const nativeSymbol = wallet.balance?.symbol ?? "--";

  const network = wallet.chain?.name ?? "Unknown";

  const nativePrice =
    wallet.chain?.id === 137
      ? prices?.polygon ?? 0
      : prices?.ethereum ?? 0;

  const portfolio = useMemo(() => {
    if (!prices) return [];

    const items = [
      {
        symbol: nativeSymbol,
        balance: nativeBalance,
        value: nativeBalance * nativePrice,
      },
      ...balances.map((token) => {
        const balance = Number(token.balance);

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
        }

        return {
          symbol: token.symbol,
          balance,
          value: balance * price,
        };
      }),
    ];

    return items;
  }, [
    balances,
    nativeBalance,
    nativePrice,
    nativeSymbol,
    prices,
  ]);

  const totalValue = portfolio.reduce(
    (sum, token) => sum + token.value,
    0
  );

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          Portfolio
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Live blockchain portfolio
        </p>
      </div>

      {!wallet.isConnected ? (
        <div className="rounded-xl bg-gray-50 p-6 text-center text-gray-500">
          Connect your wallet to view your portfolio.
        </div>
      ) : (
        <>
          <div className="mb-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
            <p className="text-sm opacity-80">
              Total Portfolio Value
            </p>

            <h2 className="mt-2 text-4xl font-bold">
              $
              {loading
                ? "..."
                : totalValue.toFixed(2)}
            </h2>

            <p className="mt-3 text-sm opacity-80">
              Network: {network}
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border border-gray-200">
            <div className="grid grid-cols-3 bg-gray-100 px-4 py-3 font-semibold">
              <span>Token</span>
              <span className="text-center">
                Balance
              </span>
              <span className="text-right">
                Value
              </span>
            </div>

            {(isLoading || loading) && (
              <div className="p-4 text-center text-gray-500">
                Loading portfolio...
              </div>
            )}

            {!isLoading &&
              !loading &&
              portfolio.map((token) => (
                <div
                  key={token.symbol}
                  className="grid grid-cols-3 border-t border-gray-100 px-4 py-3"
                >
                  <span className="font-medium">
                    {token.symbol}
                  </span>

                  <span className="text-center">
                    {token.balance.toFixed(4)}
                  </span>

                  <span className="text-right">
                    ${token.value.toFixed(2)}
                  </span>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
}
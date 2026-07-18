"use client";

import { useEffect, useState } from "react";

import { useWallet } from "./useWallet";

export type Transaction = {
  hash: string;
  from: string;
  to: string;
  asset: string;
  value: number;
  category: string;
  metadata: {
    blockTimestamp: string;
  };
};

export function useTransactions() {
  const { address, isConnected } = useWallet();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTransactions() {
      if (!address) {
        setTransactions([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const response = await fetch(
          `/api/transactions?address=${address}`
        );

        if (!response.ok) {
          throw new Error("Failed to load transactions.");
        }

        const data = await response.json();

        setTransactions(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (isConnected) {
      loadTransactions();
    }
  }, [address, isConnected]);

  return {
    transactions,
    loading,
  };
}
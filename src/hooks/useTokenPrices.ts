"use client";

import { useEffect, useState } from "react";

import {
  fetchTokenPrices,
  TokenPrices,
} from "@/services/prices";

export function useTokenPrices() {
  const [prices, setPrices] = useState<TokenPrices | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPrices() {
      try {
        const result = await fetchTokenPrices();
        setPrices(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadPrices();
  }, []);

  return {
    prices,
    loading,
  };
}
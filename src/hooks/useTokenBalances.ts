"use client";

import { useMemo } from "react";
import { useReadContracts } from "wagmi";
import { formatUnits } from "viem";

import { useWallet } from "./useWallet";
import { TOKENS } from "@/lib/tokens";

const erc20Abi = [
  {
    type: "function",
    stateMutability: "view",
    name: "balanceOf",
    inputs: [
      {
        name: "account",
        type: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
  },
] as const;

export function useTokenBalances() {
  const wallet = useWallet();

  const networkKey = useMemo(() => {
    switch (wallet.chain?.id) {
      case 1:
        return "ethereum";

      case 137:
        return "polygon";

      case 8453:
        return "base";

      case 42161:
        return "arbitrum";

      case 10:
        return "optimism";

      default:
        return null;
    }
  }, [wallet.chain?.id]);

  const tokens = networkKey ? TOKENS[networkKey] : [];

  const { data, isLoading } = useReadContracts({
    contracts:
      wallet.address && tokens.length
        ? tokens.map((token) => ({
            address: token.address,
            abi: erc20Abi,
            functionName: "balanceOf",
            args: [wallet.address],
          }))
        : [],
  });

  const balances = tokens.map((token, index) => ({
    symbol: token.symbol,
    address: token.address,
    decimals: token.decimals,
    chainId: wallet.chain?.id ?? 1,
    balance:
      data?.[index]?.status === "success"
        ? formatUnits(data[index].result, token.decimals)
        : "0",
  }));

  return {
    balances,
    isLoading,
  };
}
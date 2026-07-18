"use client";

import { useAccount, useBalance } from "wagmi";

export function useWallet() {
  // Connected wallet information
  const { address, chain, chainId, isConnected } = useAccount();

  // Native token balance (ETH, POL, BASE, etc.)
  const {
    data: balance,
    isLoading: isBalanceLoading,
    refetch,
  } = useBalance({
    address,
  });

  return {
    address,
    chain,
    chainId,
    isConnected,

    balance,

    isBalanceLoading,

    refreshBalance: refetch,
  };
}
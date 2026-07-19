"use client";

import { useEffect, useState } from "react";

type TokenLogoProps = {
  symbol: string;
  address?: string;
  chainId?: number;
  size?: number;
};

export default function TokenLogo({
  symbol,
  address,
  chainId,
  size = 40,
}: TokenLogoProps) {
  const [logo, setLogo] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!address || !chainId) return;

    async function loadLogo() {
      try {
        const res = await fetch(
          `/api/token-logo?address=${address}&chainId=${chainId}`
        );

        const data = await res.json();

        if (data.logo) {
          setLogo(data.logo);
        }
      } catch {
        setLogo(null);
      }
    }

    loadLogo();
  }, [address, chainId]);

  if (logo && !failed) {
    return (
      <img
        src={logo}
        alt={symbol}
        width={size}
        height={size}
        className="rounded-full bg-white"
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <div
      className="flex items-center justify-center rounded-full bg-zinc-700 font-bold text-white"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.4,
      }}
    >
      {symbol.slice(0, 2).toUpperCase()}
    </div>
  );
}
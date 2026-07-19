"use client";

import Image from "next/image";
import { useState } from "react";

type TokenLogoProps = {
  symbol: string;
  size?: number;
};

const LOGOS: Record<string, string> = {
  ETH: "ethereum",
  WETH: "ethereum",
  USDC: "usd-coin",
  USDT: "tether",
  DAI: "dai",
  MATIC: "matic-token",
  POL: "polygon-ecosystem-token",
  OP: "optimism",
  ARB: "arbitrum",
  LINK: "chainlink",
  UNI: "uniswap",
  AAVE: "aave",
  PEPE: "pepe",
  SHIB: "shiba-inu",
  WBTC: "wrapped-bitcoin",
  BTC: "bitcoin",
};

export default function TokenLogo({
  symbol,
  size = 40,
}: TokenLogoProps) {
  const [error, setError] = useState(false);

  const coin = LOGOS[symbol.toUpperCase()];

  if (coin && !error) {
    return (
      <Image
        src={`https://assets.coingecko.com/coins/images/${getCoinImageId(
          coin
        )}/small.png`}
        alt={symbol}
        width={size}
        height={size}
        className="rounded-full"
        onError={() => setError(true)}
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
      {symbol.charAt(0).toUpperCase()}
    </div>
  );
}

function getCoinImageId(slug: string) {
  const ids: Record<string, string> = {
    ethereum: "279",
    "usd-coin": "6319",
    tether: "325",
    dai: "9956",
    "matic-token": "4713",
    "polygon-ecosystem-token": "32440",
    optimism: "25244",
    arbitrum: "16547",
    chainlink: "877",
    uniswap: "12504",
    aave: "12645",
    bitcoin: "1",
    "wrapped-bitcoin": "7598",
    pepe: "29850",
    "shiba-inu": "11939",
  };

  return ids[slug] ?? "1";
}
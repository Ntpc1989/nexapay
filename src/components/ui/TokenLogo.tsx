"use client";

type TokenLogoProps = {
  symbol: string;
  size?: number;
};

const TOKEN_CONFIG: Record<
  string,
  {
    bg: string;
    label: string;
  }
> = {
  ETH: {
    bg: "bg-slate-700",
    label: "⬢",
  },
  WETH: {
    bg: "bg-slate-700",
    label: "⬢",
  },
  USDC: {
    bg: "bg-blue-600",
    label: "$",
  },
  USDT: {
    bg: "bg-emerald-600",
    label: "₮",
  },
  DAI: {
    bg: "bg-yellow-500",
    label: "D",
  },
  MATIC: {
    bg: "bg-purple-600",
    label: "M",
  },
  POL: {
    bg: "bg-purple-600",
    label: "P",
  },
  OP: {
    bg: "bg-red-600",
    label: "O",
  },
  ARB: {
    bg: "bg-sky-600",
    label: "A",
  },
};

export default function TokenLogo({
  symbol,
  size = 40,
}: TokenLogoProps) {
  const token =
    TOKEN_CONFIG[symbol.toUpperCase()] ?? {
      bg: "bg-zinc-700",
      label: symbol.charAt(0).toUpperCase(),
    };

  return (
    <div
      className={`${token.bg} flex items-center justify-center rounded-full text-sm font-bold text-white shadow`}
      style={{
        width: size,
        height: size,
      }}
    >
      {token.label}
    </div>
  );
}
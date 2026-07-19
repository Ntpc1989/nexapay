import { NextRequest, NextResponse } from "next/server";

const CHAIN_MAP: Record<number, string> = {
  1: "ethereum",
  137: "polygon",
  8453: "base",
  42161: "arbitrum",
  10: "optimism",
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const address = searchParams.get("address");
  const chainId = Number(searchParams.get("chainId"));

  if (!address) {
    return NextResponse.json({ logo: null });
  }

  const chain = CHAIN_MAP[chainId];

  if (!chain) {
    return NextResponse.json({ logo: null });
  }

  const trustWalletLogo = `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/${chain}/assets/${address}/logo.png`;

  return NextResponse.json({
    logo: trustWalletLogo,
  });
}
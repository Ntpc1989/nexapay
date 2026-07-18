import { NextRequest, NextResponse } from "next/server";

import { getBaseTransactions } from "@/services/transactions/base";
import { getEthereumTransactions } from "@/services/transactions/ethereum";
import { getPolygonTransactions } from "@/services/transactions/polygon";
import { getArbitrumTransactions } from "@/services/transactions/arbitrum";
import { getOptimismTransactions } from "@/services/transactions/optimism";

export async function GET(request: NextRequest) {
  try {
    const address = request.nextUrl.searchParams.get("address");

    if (!address) {
      return NextResponse.json(
        {
          error: "Wallet address is required.",
        },
        {
          status: 400,
        }
      );
    }

    const [
      baseTransactions,
      ethereumTransactions,
      polygonTransactions,
      arbitrumTransactions,
      optimismTransactions,
    ] = await Promise.all([
      getBaseTransactions(address),
      getEthereumTransactions(address),
      getPolygonTransactions(address),
      getArbitrumTransactions(address),
      getOptimismTransactions(address),
    ]);

    const transactions = [
      ...baseTransactions,
      ...ethereumTransactions,
      ...polygonTransactions,
      ...arbitrumTransactions,
      ...optimismTransactions,
    ].sort(
      (a, b) =>
        new Date(b.metadata.blockTimestamp).getTime() -
        new Date(a.metadata.blockTimestamp).getTime()
    );

    return NextResponse.json(transactions);
  } catch (error: any) {
    console.error("Server Error:", error);

    return NextResponse.json(
      {
        error: error?.message ?? "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}
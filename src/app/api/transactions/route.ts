import { NextRequest, NextResponse } from "next/server";
import { getBaseTransactions } from "@/services/transactions/base";
import { getEthereumTransactions } from "@/services/transactions/ethereum";

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

    const [baseTransactions, ethereumTransactions] = await Promise.all([
      getBaseTransactions(address),
      getEthereumTransactions(address),
    ]);

    const transactions = [
      ...baseTransactions,
      ...ethereumTransactions,
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
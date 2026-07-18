import { NextRequest, NextResponse } from "next/server";

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;

const BASE_RPC_URL = `https://base-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`;

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

    const response = await fetch(BASE_RPC_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: 1,
        jsonrpc: "2.0",
        method: "alchemy_getAssetTransfers",
        params: [
          {
            fromBlock: "0x0",
            toBlock: "latest",
            withMetadata: true,
            excludeZeroValue: true,
            category: [
              "external",
              "erc20",
            ],
            maxCount: "0xA",
            fromAddress: address,
          },
        ],
      }),
      cache: "no-store",
    });

    const data = await response.json();

    console.log("Alchemy Response:", data);

    if (!response.ok) {
      return NextResponse.json(
        {
          error: data,
        },
        {
          status: response.status,
        }
      );
    }

    return NextResponse.json(
      data.result?.transfers ?? []
    );
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
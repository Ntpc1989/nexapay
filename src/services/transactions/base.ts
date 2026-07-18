import { Transaction } from "./types";

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY!;

const BASE_RPC = `https://base-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`;

export async function getBaseTransactions(
  address: string
): Promise<Transaction[]> {
  const response = await fetch(BASE_RPC, {
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

  const transfers = data.result?.transfers ?? [];

  return transfers.map((tx: any) => ({
    ...tx,
    chain: "Base",
  }));
}
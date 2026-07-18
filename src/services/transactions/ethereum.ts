import { Transaction } from "./types";

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY!;

const ETHEREUM_RPC = `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`;

export async function getEthereumTransactions(
  address: string
): Promise<Transaction[]> {
  const response = await fetch(ETHEREUM_RPC, {
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
    chain: "Ethereum",
  }));
}
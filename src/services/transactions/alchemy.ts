import { Transaction } from "./types";

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY!;

export async function getAlchemyTransactions(
  network: string,
  chain: string,
  address: string
): Promise<Transaction[]> {
  const rpcUrl = `https://${network}.g.alchemy.com/v2/${ALCHEMY_API_KEY}`;

  const response = await fetch(rpcUrl, {
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

  if (!response.ok) {
    const text = await response.text();

    console.error(`${chain} request failed`);
    console.error(text);

    return [];
  }

  const data = await response.json();

  if (data.error) {
    console.error(`${chain} Alchemy error`);
    console.error(data.error);

    return [];
  }

  const transfers = data.result?.transfers ?? [];

  return transfers.map((tx: any) => ({
    ...tx,
    chain,
  }));
}
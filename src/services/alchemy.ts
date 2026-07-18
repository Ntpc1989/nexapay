const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;

const BASE_RPC_URL = `https://base-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`;

export async function getAssetTransfers(address: string) {
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

  if (!response.ok) {
    throw new Error("Failed to fetch transactions.");
  }

  const data = await response.json();

  return data.result.transfers ?? [];
}
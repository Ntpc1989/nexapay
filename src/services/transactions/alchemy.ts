import { Transaction } from "./types";

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY!;

export async function getAlchemyTransactions(
  network: string,
  chain: string,
  address: string
): Promise<Transaction[]> {
  const rpcUrl = `https://${network}.g.alchemy.com/v2/${ALCHEMY_API_KEY}`;

  async function fetchTransfers(direction: "from" | "to") {
    const response = await fetch(rpcUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
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
            category: ["external", "erc20"],
            maxCount: "0x64",
            ...(direction === "from"
              ? { fromAddress: address }
              : { toAddress: address }),
          },
        ],
      }),
    });

    if (!response.ok) {
      console.error(`${chain} ${direction} request failed`);
      return [];
    }

    const data = await response.json();

    if (data.error) {
      console.error(data.error);
      return [];
    }

    return data.result?.transfers ?? [];
  }

  const [outgoing, incoming] = await Promise.all([
    fetchTransfers("from"),
    fetchTransfers("to"),
  ]);

  const merged = [...outgoing, ...incoming];

  // Remove duplicate transactions using hash + chain
  const unique = merged.filter(
    (tx: any, index: number, self: any[]) =>
      index ===
      self.findIndex(
        (t) =>
          t.hash === tx.hash &&
          t.category === tx.category
      )
  );

  return unique.map((tx: any) => ({
    ...tx,
    chain,
  }));
}
export type TokenPrices = {
  polygon: number;
  ethereum: number;
  usdCoin: number;
  tether: number;
};

export async function fetchTokenPrices(): Promise<TokenPrices> {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=polygon-ecosystem-token,ethereum,usd-coin,tether&vs_currencies=usd",
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch token prices.");
  }

  const data = await response.json();

  return {
    polygon: data["polygon-ecosystem-token"].usd,
    ethereum: data.ethereum.usd,
    usdCoin: data["usd-coin"].usd,
    tether: data.tether.usd,
  };
}
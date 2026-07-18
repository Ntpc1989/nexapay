export type Token = {
  symbol: string;
  address: `0x${string}`;
  decimals: number;
};

export const TOKENS = {
  polygon: [
    {
      symbol: "USDC",
      address: "0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
      decimals: 6,
    },
    {
      symbol: "USDT",
      address: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
      decimals: 6,
    },
    {
      symbol: "WETH",
      address: "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
      decimals: 18,
    },
  ],

  ethereum: [
    {
      symbol: "USDC",
      address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606EB48",
      decimals: 6,
    },
    {
      symbol: "USDT",
      address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      decimals: 6,
    },
    {
      symbol: "WETH",
      address: "0xC02aaA39b223FE8D0A0E5C4F27eAD9083C756Cc2",
      decimals: 18,
    },
  ],

  base: [
    {
      symbol: "USDC",
      address: "0x833589fCD6EDB6E08f4c7C32D4f71b54bdA02913",
      decimals: 6,
    },
    {
      symbol: "WETH",
      address: "0x4200000000000000000000000000000000000006",
      decimals: 18,
    },
  ],

  arbitrum: [
    {
      symbol: "USDC",
      address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
      decimals: 6,
    },
    {
      symbol: "USDT",
      address: "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9",
      decimals: 6,
    },
    {
      symbol: "WETH",
      address: "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
      decimals: 18,
    },
  ],

  optimism: [
    {
      symbol: "USDC",
      address: "0x0b2c639c533813f4aa9d7837caf62653d097ff85",
      decimals: 6,
    },
    {
      symbol: "USDT",
      address: "0x94b008aa00579c1307b0ef2c499ad98a8ce58e58",
      decimals: 6,
    },
    {
      symbol: "WETH",
      address: "0x4200000000000000000000000000000000000006",
      decimals: 18,
    },
  ],
} as const;
import { getAlchemyTransactions } from "./alchemy";

export function getArbitrumTransactions(address: string) {
  return getAlchemyTransactions(
    "arb-mainnet",
    "Arbitrum",
    address
  );
}
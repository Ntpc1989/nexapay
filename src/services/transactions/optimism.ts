import { getAlchemyTransactions } from "./alchemy";

export function getOptimismTransactions(address: string) {
  return getAlchemyTransactions(
    "opt-mainnet",
    "Optimism",
    address
  );
}
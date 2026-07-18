import { getAlchemyTransactions } from "./alchemy";

export function getBaseTransactions(address: string) {
  return getAlchemyTransactions(
    "base-mainnet",
    "Base",
    address
  );
}
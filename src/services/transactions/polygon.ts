import { getAlchemyTransactions } from "./alchemy";

export function getPolygonTransactions(address: string) {
  return getAlchemyTransactions(
    "polygon-mainnet",
    "Polygon",
    address
  );
}
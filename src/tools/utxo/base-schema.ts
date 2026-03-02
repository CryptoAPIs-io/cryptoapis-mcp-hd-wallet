import * as z from "zod";

export const UtxoBlockchain = z.enum(["bitcoin", "bitcoin-cash", "litecoin", "dogecoin", "dash", "zcash"]);
export const UtxoNetwork = z.enum(["mainnet", "testnet"]);

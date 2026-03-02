import * as z from "zod";

export const EvmBlockchain = z.enum(["ethereum", "ethereum-classic", "binance-smart-chain", "tron", "polygon", "avalanche", "arbitrum", "base", "optimism"]);
export const EvmNetwork = z.enum(["mainnet", "mordor", "testnet", "nile", "sepolia", "amoy", "fuji"]);

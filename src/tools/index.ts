import { systemInfoTool } from "@cryptoapis-io/mcp-shared";
import { manageHdWalletTool } from "./manage/index.js";
import { hdWalletDataUtxoTool } from "./utxo/index.js";
import { hdWalletDataEvmTool } from "./evm/index.js";
import { hdWalletDataXrpTool } from "./xrp/index.js";

export const tools = [manageHdWalletTool, hdWalletDataUtxoTool, hdWalletDataEvmTool, hdWalletDataXrpTool, systemInfoTool] as const;

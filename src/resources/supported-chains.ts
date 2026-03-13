import type { SupportedChainsResource } from "@cryptoapis-io/mcp-shared";

/**
 * Supported chains resource for hd-wallet package.
 *
 * Covers manage_hd_wallet (all families), hd_wallet_data_evm, hd_wallet_data_utxo,
 * and hd_wallet_data_xrp tools.
 *
 * Blockchain->action mappings are derived from the tool schemas and descriptions.
 */
export const supportedChains: SupportedChainsResource = {
    evm: {
        blockchains: ["ethereum", "ethereum-classic", "binance-smart-chain", "tron", "polygon", "avalanche", "arbitrum", "base", "optimism"],
        networks: {
            ethereum: ["mainnet", "sepolia"],
            "ethereum-classic": ["mainnet", "mordor"],
            "binance-smart-chain": ["mainnet", "testnet"],
            tron: ["mainnet", "nile"],
            polygon: ["mainnet", "amoy"],
            avalanche: ["mainnet", "fuji"],
            arbitrum: ["mainnet", "sepolia"],
            base: ["mainnet", "sepolia"],
            optimism: ["mainnet", "sepolia"],
        },
        actions: {
            "sync-wallet": ["ethereum", "ethereum-classic", "binance-smart-chain", "tron", "polygon", "avalanche", "arbitrum", "base", "optimism"],
            "list-wallets": ["ethereum", "ethereum-classic", "binance-smart-chain", "tron", "polygon", "avalanche", "arbitrum", "base", "optimism"],
            "activate-wallet": ["ethereum", "ethereum-classic", "binance-smart-chain", "tron", "polygon", "avalanche", "arbitrum", "base", "optimism"],
            "delete-wallet": ["ethereum", "ethereum-classic", "binance-smart-chain", "tron", "polygon", "avalanche", "arbitrum", "base", "optimism"],
            "get-status": ["ethereum", "ethereum-classic", "binance-smart-chain", "tron", "polygon", "avalanche", "arbitrum", "base", "optimism"],
            "derive-receiving-address": ["ethereum", "ethereum-classic", "binance-smart-chain", "tron", "polygon", "avalanche", "arbitrum", "base", "optimism"],
            "list-addresses": ["ethereum", "ethereum-classic", "binance-smart-chain", "tron", "polygon", "avalanche", "arbitrum", "base", "optimism"],
            "list-transactions": ["ethereum", "ethereum-classic", "binance-smart-chain", "tron", "polygon", "avalanche", "arbitrum", "base", "optimism"],
            "prepare-transaction": ["ethereum", "ethereum-classic", "binance-smart-chain", "tron", "polygon", "avalanche", "arbitrum", "base", "optimism"],
            "list-assets": ["ethereum", "ethereum-classic", "binance-smart-chain", "tron", "polygon", "avalanche", "arbitrum", "base", "optimism"],
            "get-details": ["ethereum", "ethereum-classic", "binance-smart-chain", "tron", "polygon", "avalanche", "arbitrum", "base", "optimism"],
        },
    },
    utxo: {
        blockchains: ["bitcoin", "bitcoin-cash", "litecoin", "dogecoin", "dash", "zcash"],
        networks: {
            bitcoin: ["mainnet", "testnet"],
            "bitcoin-cash": ["mainnet", "testnet"],
            litecoin: ["mainnet", "testnet"],
            dogecoin: ["mainnet", "testnet"],
            dash: ["mainnet", "testnet"],
            zcash: ["mainnet", "testnet"],
        },
        actions: {
            "sync-wallet": ["bitcoin", "bitcoin-cash", "litecoin", "dogecoin", "dash", "zcash"],
            "list-wallets": ["bitcoin", "bitcoin-cash", "litecoin", "dogecoin", "dash", "zcash"],
            "activate-wallet": ["bitcoin", "bitcoin-cash", "litecoin", "dogecoin", "dash", "zcash"],
            "delete-wallet": ["bitcoin", "bitcoin-cash", "litecoin", "dogecoin", "dash", "zcash"],
            "get-status": ["bitcoin", "bitcoin-cash", "litecoin", "dogecoin", "dash", "zcash"],
            "derive-receiving-address": ["bitcoin", "bitcoin-cash", "litecoin", "dogecoin", "dash", "zcash"],
            "derive-change-address": ["bitcoin", "bitcoin-cash", "litecoin", "dogecoin", "dash", "zcash"],
            "list-addresses": ["bitcoin", "bitcoin-cash", "litecoin", "dogecoin", "dash", "zcash"],
            "list-transactions": ["bitcoin", "bitcoin-cash", "litecoin", "dogecoin", "dash", "zcash"],
            "list-utxos": ["bitcoin", "bitcoin-cash", "litecoin", "dogecoin", "dash", "zcash"],
            "prepare-transaction": ["bitcoin", "bitcoin-cash", "litecoin", "dogecoin", "dash", "zcash"],
            "list-assets": ["bitcoin", "bitcoin-cash", "litecoin", "dogecoin", "dash", "zcash"],
            "get-details": ["bitcoin", "bitcoin-cash", "litecoin", "dogecoin", "dash", "zcash"],
        },
    },
    xrp: {
        blockchains: ["xrp"],
        networks: {
            xrp: ["mainnet", "testnet"],
        },
        actions: {
            "sync-wallet": ["xrp"],
            "list-wallets": ["xrp"],
            "activate-wallet": ["xrp"],
            "delete-wallet": ["xrp"],
            "get-status": ["xrp"],
            "derive-receiving-address": ["xrp"],
            "list-addresses": ["xrp"],
            "list-transactions": ["xrp"],
            "list-assets": ["xrp"],
            "get-details": ["xrp"],
        },
    },
};

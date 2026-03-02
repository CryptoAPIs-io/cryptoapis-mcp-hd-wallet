# @cryptoapis-io/mcp-hd-wallet

MCP server for [Crypto APIs](https://cryptoapis.io/) HD Wallet (Wallet as a Service) product. Track and manage HD wallets by their **extended public key (xPub/yPub/zPub)** — no private keys ever leave your device.

> **API Version:** Compatible with Crypto APIs version **2024-12-12**

## How It Works

HD (Hierarchical Deterministic) wallets derive all addresses from a single extended public key (xPub). You sync your xPub with Crypto APIs, and the service tracks all derived addresses, balances, and transactions on your behalf.

1. **Sync your xPub** — provide your extended public key (xPub, yPub, or zPub) to start tracking
2. **Derive addresses** — generate new receiving and change addresses from the xPub
3. **Query wallet data** — get balances, list transactions, list UTXOs, and view assets across all derived addresses
4. **Prepare transactions** — build unsigned transactions ready for local signing with `@cryptoapis-io/mcp-signer`

Your private keys are **never** sent to or stored by Crypto APIs. Only the extended public key is used for address derivation and balance tracking.

## Features

- Sync wallets by extended public key (xPub/yPub/zPub)
- Derive receiving and change addresses from the xPub
- Query aggregated balances, transactions, and assets across all derived addresses
- List UTXOs for UTXO-based wallets
- Prepare unsigned transactions directly from wallet
- Supports EVM (Ethereum, Ethereum Classic, BSC, Polygon, Avalanche (C-Chain), Arbitrum, Base, Optimism, Tron), UTXO (Bitcoin, Bitcoin Cash, Litecoin, Dogecoin, Dash, Zcash), and XRP

## Prerequisites

- Node.js 18+
- [Crypto APIs](https://cryptoapis.io/) account and API key ([sign up](https://app.cryptoapis.io/signup) | [get API key](https://app.cryptoapis.io/api-keys))

## Installation

```bash
npm install @cryptoapis-io/mcp-hd-wallet
```

Or install all Crypto APIs MCP servers: `npm install @cryptoapis-io/mcp`

## Usage

```bash
# Run with API key
npx @cryptoapis-io/mcp-hd-wallet --api-key YOUR_API_KEY

# Or use environment variable
export CRYPTOAPIS_API_KEY=YOUR_API_KEY
npx @cryptoapis-io/mcp-hd-wallet

# HTTP transport
npx @cryptoapis-io/mcp-hd-wallet --transport http --port 3000 --api-key YOUR_API_KEY
```

### Claude Desktop

Add to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json` on macOS, `%APPDATA%\Claude\claude_desktop_config.json` on Windows):

```json
{
  "mcpServers": {
    "cryptoapis-hd-wallet": {
      "command": "npx",
      "args": ["-y", "@cryptoapis-io/mcp-hd-wallet"],
      "env": {
        "CRYPTOAPIS_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

### Cursor

Add to `.cursor/mcp.json` (project) or `~/.cursor/mcp.json` (global):

```json
{
  "mcpServers": {
    "cryptoapis-hd-wallet": {
      "command": "npx",
      "args": ["-y", "@cryptoapis-io/mcp-hd-wallet"],
      "env": {
        "CRYPTOAPIS_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

### MCP Inspector

```bash
npx @modelcontextprotocol/inspector npx @cryptoapis-io/mcp-hd-wallet --api-key YOUR_API_KEY
```

### n8n

1. Start the server in HTTP mode:
   ```bash
   npx @cryptoapis-io/mcp-hd-wallet --transport http --port 3000 --api-key YOUR_API_KEY
   ```
2. In your n8n workflow, add an **AI Agent** node
3. Under **Tools**, add an **MCP Client Tool** and set the URL to `http://localhost:3000/mcp`

> All servers default to port 3000. Use `--port` to assign different ports when running multiple servers.

## Available Tools

### `manage_hd_wallet`

Manage HD wallets (sync, activate, delete, list, status).

| Action | Description |
|--------|-------------|
| `sync-wallet` | Sync an HD wallet by extended public key (xPub/yPub/zPub) |
| `list-wallets` | List all synced HD wallets |
| `activate-wallet` | Activate a previously synced wallet |
| `delete-wallet` | Delete a synced wallet |
| `get-status` | Get sync status of a wallet |

### `hd_wallet_data_utxo`

Query UTXO HD wallet data (Bitcoin, Bitcoin Cash, Litecoin, Dogecoin, Dash, Zcash).

| Action | Description |
|--------|-------------|
| `get-details` | Get wallet balance and details |
| `derive-receiving-address` | Derive next receiving address |
| `derive-change-address` | Derive next change address |
| `list-addresses` | List all derived addresses |
| `list-transactions` | List wallet transactions |
| `list-utxos` | List unspent transaction outputs |
| `list-assets` | List assets held by wallet |
| `prepare-transaction` | Prepare an unsigned transaction from wallet |

### `hd_wallet_data_evm`

Query EVM HD wallet data (Ethereum, Ethereum Classic, BSC, Polygon, Avalanche (C-Chain), Arbitrum, Base, Optimism, Tron).

| Action | Description |
|--------|-------------|
| `get-details` | Get wallet balance and details |
| `derive-receiving-address` | Derive next receiving address |
| `list-addresses` | List all derived addresses |
| `list-transactions` | List wallet transactions |
| `list-assets` | List tokens held by wallet |
| `prepare-transaction` | Prepare an unsigned transaction from wallet |

### `hd_wallet_data_xrp`

Query XRP HD wallet data.

| Action | Description |
|--------|-------------|
| `get-details` | Get wallet balance and details |
| `derive-receiving-address` | Derive next receiving address |
| `list-addresses` | List all derived addresses |
| `list-transactions` | List wallet transactions |
| `list-assets` | List assets held by wallet |

## CLI Arguments

| Argument | Description | Default |
|----------|-------------|---------|
| `--api-key` | Crypto APIs API key | `CRYPTOAPIS_API_KEY` env var |
| `--transport` | Transport type: `stdio` or `http` | `stdio` |
| `--host` | HTTP host | `0.0.0.0` |
| `--port` | HTTP port | `3000` |
| `--path` | HTTP path | `/mcp` |
| `--stateless` | Enable stateless HTTP mode | `false` |

### HTTP API Key Modes

When using HTTP transport, the server supports two API key modes:

- **With `--api-key`:** The key is used for all requests. `x-api-key` request headers are ignored.
- **Without `--api-key`:** Each request must include an `x-api-key` header with a valid Crypto APIs key. This enables hosting a public server where each user provides their own key.

```bash
# Per-request key mode (multi-tenant)
npx @cryptoapis-io/mcp-hd-wallet --transport http --port 3000
# Clients send x-api-key header with each request
```

> Stdio transport always requires an API key at startup.

## Important: API Key Required

> **Warning:** Making requests without a valid API key — or with an incorrect one — may result in your IP being banned from the Crypto APIs ecosystem. Always ensure a valid API key is configured before starting any server.

## Hosted MCP Server

Crypto APIs provides an official hosted MCP server with all tools available via HTTP Streamable transport at [https://ai.cryptoapis.io/mcp](https://ai.cryptoapis.io/mcp). Pass your API key via the `x-api-key` header — no installation required.

## License

MIT

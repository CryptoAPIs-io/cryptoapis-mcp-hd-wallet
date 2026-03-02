import type { CryptoApisHttpClient, RequestMetadata } from "@cryptoapis-io/mcp-shared";

export type ListWalletsInput = RequestMetadata & {
    blockchain: string;
    network: string;
    limit?: number;
    offset?: number;
};

export async function listWallets(client: CryptoApisHttpClient, input: ListWalletsInput) {
    return client.request<unknown>("GET", `/hd-wallets/manage/${input.blockchain}/${input.network}`, {
        query: { context: input.context, limit: input.limit, offset: input.offset },
    });
}

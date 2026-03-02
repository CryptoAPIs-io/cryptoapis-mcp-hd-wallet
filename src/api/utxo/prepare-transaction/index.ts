import type { CryptoApisHttpClient, RequestMetadata } from "@cryptoapis-io/mcp-shared";

export type PrepareTransactionInput = {
    blockchain: string;
    network: string;
    extendedPublicKey: string;
    recipients: Array<{ address: string; amount: string }>;
    feePriority?: string;
} & RequestMetadata;

export async function prepareTransaction(client: CryptoApisHttpClient, input: PrepareTransactionInput) {
    return client.request<unknown>(
        "POST",
        `/hd-wallets/utxo/${input.blockchain}/${input.network}/${encodeURIComponent(input.extendedPublicKey)}/transactions/prepare`,
        {
            query: { context: input.context },
            body: {
                data: {
                    item: {
                        recipients: input.recipients,
                        fee: { priority: input.feePriority ?? "standard" },
                    },
                },
            },
        }
    );
}

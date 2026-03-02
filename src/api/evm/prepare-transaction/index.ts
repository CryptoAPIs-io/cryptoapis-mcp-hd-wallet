import type { CryptoApisHttpClient, RequestMetadata } from "@cryptoapis-io/mcp-shared";

export type PrepareTransactionInput = {
    blockchain: string;
    network: string;
    extendedPublicKey: string;
    fromAddress: string;
    toAddress: string;
    value: string;
    feePriority?: "slow" | "standard" | "fast";
    data?: string;
} & RequestMetadata;

export async function prepareTransaction(client: CryptoApisHttpClient, input: PrepareTransactionInput) {
    return client.request<unknown>(
        "POST",
        `/hd-wallets/evm/${input.blockchain}/${input.network}/${encodeURIComponent(input.extendedPublicKey)}/transactions/prepare`,
        {
            query: { context: input.context },
            body: {
                data: {
                    item: {
                        sender: input.fromAddress,
                        recipient: input.toAddress,
                        amount: input.value,
                        fee: { priority: input.feePriority ?? "standard" },
                        ...(input.data != null && { additionalData: input.data }),
                    },
                },
            },
        }
    );
}

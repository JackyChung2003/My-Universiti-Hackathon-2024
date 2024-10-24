// node_modules/thirdweb/dist/esm/wallets/wallet-connect/receiver/request-handlers/send-raw-transaction.js
async function handleSendRawTransactionRequest(options) {
  const { account, chainId, params: [rawTransaction] } = options;
  if (!account.sendRawTransaction) {
    throw new Error("The current account does not support sending raw transactions");
  }
  const txResult = await account.sendRawTransaction({
    rawTransaction,
    chainId
  });
  return txResult.transactionHash;
}

export {
  handleSendRawTransactionRequest
};
//# sourceMappingURL=chunk-DJIHHGTN.js.map

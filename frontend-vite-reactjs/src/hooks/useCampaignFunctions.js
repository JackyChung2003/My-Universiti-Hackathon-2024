// // import { useSendTransaction } from "thirdweb/react";
// // import { prepareContractCall } from "thirdweb";
// // import { CONTRACT } from "../utils/constants"; // Import the contract instance

// // export const useCampaignTransaction = () => {
// //   const { mutate: sendTransaction } = useSendTransaction();

// //   const createCampaignTransaction = (
// //     _title: string,
// //     _description: string,
// //     _target: bigint,
// //     _deadline: bigint
// //   ) => {
// //     const transaction = prepareContractCall({
// //       contract: CONTRACT, // Your contract instance
// //       method: "createCampaign", // Smart contract function name
// //       params: [
// //         _title,
// //         _description,
// //         _target,
// //         BigInt(new Date(Number(_deadline)).getTime()), // Deadline in milliseconds
// //       ], // Function arguments
// //     });

// //     sendTransaction(transaction, {
// //       onSuccess: (result) => console.log("Campaign created successfully:", result),
// //       onError: (error) => console.error("Transaction failed:", error),
// //     });
// //   };

// //   return { createCampaignTransaction };
// // };

// import { prepareContractCall, sendTransaction } from "thirdweb";

// import { CONTRACT } from "../utils/constants"; // Import the contract instance

// const transaction = await prepareContractCall({
//   contract:CONTRACT,
//   method: "function createCampaign(string _title, string _description, uint256 _target, uint256 _deadline) returns (uint256)",
//   params: [_title, _description, _target, _deadline]
// });
// const { transactionHash } = await sendTransaction({
//   transaction,
//   account
// });

import { useState } from "react";
import { prepareContractCall, sendTransaction } from "thirdweb";
import { CONTRACT } from "../utils/constants"; // Ensure correct import

export function useCreateCampaignTransaction(account) { // Corrected export
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createCampaignTransaction = async (
    title,
    description,
    target,
    deadline
  ) => {
    setLoading(true);
    setError(null);

    try {
      const transaction = await prepareContractCall({
        contract: CONTRACT, // Your contract instance
        method: "createCampaign", // Smart contract method name
        args: [
          title,
          description,
          BigInt(target), // Convert to BigInt for Solidity compatibility
          BigInt(new Date(deadline).getTime()), // Convert deadline to milliseconds
        ],
      });

      const { transactionHash } = await sendTransaction({
        transaction,
        account, // Pass user account address
      });

      console.log("Transaction successful:", transactionHash);
      return transactionHash;
    } catch (err) {
      console.error("Transaction failed:", err);
      setError(err.message || "Transaction failed");
      throw err; // Optional: re-throw error to handle in the component
    } finally {
      setLoading(false);
    }
  };

  return { createCampaignTransaction, loading, error };
}

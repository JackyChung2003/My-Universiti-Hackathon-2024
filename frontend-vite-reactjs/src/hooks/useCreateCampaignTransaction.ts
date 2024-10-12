import { useState } from "react";
import { prepareContractCall, sendTransaction } from "thirdweb";
import { CONTRACT } from "../utils/constants"; // Ensure correct import

// Define the function's return type
interface UseCreateCampaignTransaction {
  createCampaignTransaction: (
    title: string,
    description: string,
    target: number | string,
    deadline: string
  ) => Promise<string>;
  loading: boolean;
  error: string | null;
}

// Export the function properly using 'export default'
export default function useCreateCampaignTransaction(
  account: string
): UseCreateCampaignTransaction {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createCampaignTransaction = async (
    title: string,
    description: string,
    target: number | string,
    deadline: string
  ): Promise<string> => {
    setLoading(true);
    setError(null);

    try {
      const transaction = await prepareContractCall({
        contract: CONTRACT,
        method: "createCampaign",
        args: [
          title,
          description,
          BigInt(target),
          BigInt(new Date(deadline).getTime()),
        ],
      });

      const { transactionHash } = await sendTransaction({
        transaction,
        account,
      });

      console.log("Transaction successful:", transactionHash);
      return transactionHash;
    } catch (err: any) {
      console.error("Transaction failed:", err);
      setError(err.message || "Transaction failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createCampaignTransaction, loading, error };
}

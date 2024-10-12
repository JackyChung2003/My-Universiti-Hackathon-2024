// import { useContractRead } from "@thirdweb-dev/react";
// import { CONTRACT } from "../utils/constants";

// export const useTotalCampaigns = () => {
//   // Read the total campaigns using getTotalCampaigns function
// //   const { data: totalCampaigns, isLoading, error } = useContractRead(
// //     CONTRACT,
// //     "getTotalCampaigns"
// //   );

//   const { data: count, isLoading, refetch} = useReadContract({
//     contract: CONTRACT,
//     method: "getCount",
// });

//   return { totalCampaigns, isLoading, refetch  };
// };

import { prepareContractCall } from "thirdweb"
import { useSendTransaction } from "thirdweb/react";

export default function Component() {
  const { mutate: sendTransaction } = useSendTransaction();

  const contract = CONTRACT; // Initialize the contract variable

  const onClick = () => {
    const _title = "Sample Title";
    const _description = "Sample Description";
    const _target = 1000;
    const _deadline = Math.floor(Date.now() / 1000) + 86400; // 1 day from now

    const transaction = prepareContractCall({
      contract,
      method: "function createCampaign(string _title, string _description, uint256 _target, uint256 _deadline) returns (uint256)",
      params: [_title, _description, _target, _deadline]
    });
    sendTransaction(transaction);
  }
}
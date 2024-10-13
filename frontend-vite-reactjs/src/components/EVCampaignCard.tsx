// // import { client } from "@/app/client";
// // import Link from "next/link";
// import { getContract, defineChain} from "thirdweb";
// import { getRpcUrlForChain } from "thirdweb/chains";
// import { useReadContract } from "thirdweb/react";

// import { CONTRACT } from "../utils/constants";

// const holeskyRpcUrl = getRpcUrlForChain({ chain: 17000, client: CONTRACT.client });

// type CampaignCardProps = {
//     campaignAddress: string;
// };

// export const CampaignCard: React.FC<CampaignCardProps> = ({ campaignAddress }) => {
//     const contract = getContract({
//         client: CONTRACT.client,
//         chain: defineChain(17000),
//         // chain: holeskyRpcUrl,
//         address: campaignAddress,
//     });
    

//     // Fetch the campaign name
//     const { data: balance } = useReadContract({
//         contract: contract,
//         method: "getCampaignDetails",
//         params: [campaignAddress],
//     });

//     const { data: numberOfCampaigns, isLoading: loadingTotalCampaign, refetch} = useReadContract({
//         contract: CONTRACT,
//         method: "getAllCampaigns",
//     });

//     // // Fetch campaign description
//     // const { data: campaignDescription } = useReadContract({
//     //     contract: contract,
//     //     method: "description",
//     //     params: [],
//     // });

//     // // Fetch the goal amount
//     // const { data: goal, isLoading: isLoadingGoal } = useReadContract({
//     //     contract: contract,
//     //     method: "goal",
//     //     params: [],
//     // });

//     // // Fetch the current balance
//     // const { data: balance, isLoading: isLoadingBalance } = useReadContract({
//     //     contract: contract,
//     //     method: "getContractBalance",
//     //     params: [],
//     // });

//     // // Calculate the funding percentage
//     // const balancePercentage = Math.min(
//     //     (parseInt(balance?.toString() || "0") / parseInt(goal?.toString() || "1")) * 100,
//     //     100
//     // );

//     // // If balance is greater than or equal to goal, percentage should be 100
//     // if (balancePercentage >= 100) {
//     //     balancePercentage = 100;
//     // }

//     return (
//         <div className="flex flex-col justify-between max-w-sm p-6 bg-white border border-slate-200 rounded-lg shadow">
//             <div>
//                 <h5 className="mb-2 text-2xl font-bold tracking-tight">{balance}</h5>
//                 {/* {!isLoadingBalance && (
//                     <div className="mb-4">
//                         <div className="relative w-full h-6 bg-gray-200 rounded-full dark:bg-gray-700">
//                             <div
//                                 className="h-6 bg-blue-600 rounded-full dark:bg-blue-500 text-right"
//                                 style={{ width: `${balancePercentage}%` }}
//                             >
//                                 <p className="text-white text-xs p-1">${balance?.toString()}</p>
//                             </div>
//                             <p className="absolute top-0 right-0 text-white text-xs p-1">
//                                 {balancePercentage < 100 && `${balancePercentage.toFixed(0)}%`}
//                             </p>
//                         </div>
//                     </div>
//                 )}
//                 <h5 className="mb-2 text-2xl font-bold tracking-tight">{campaignName}</h5>
//                 <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{campaignDescription}</p> */}
//             </div>
                
//                 {/* <Link
//                     href={`/campaign/${campaignAddress}`}
//                     passHref={true}
//                 >
//                     <p className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
//                         View Campaign
//                         <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
//                             <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
//                         </svg>
//                     </p>
//                 </Link> */}
//             </div>
//     )
// };
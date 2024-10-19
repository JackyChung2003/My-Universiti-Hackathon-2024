import { Link, useParams } from 'react-router-dom';
import { TransactionButton, useReadContract } from 'thirdweb/react';
import { CONTRACT } from '../utils/constants';
import { prepareContractCall } from 'thirdweb';
import { useState } from 'react';
// import DisplayCampaignDetails from './DisplayCampaignDetails';

interface CampaignData  {
  name: string;
  description: string;
  goal: bigint;
  deadline: number;
  owner: string;
  paused: boolean;
  state: number;
}

const CampaignDetails: React.FC<{ data: any[] }> = () => {
  const [form, setForm] = useState({
    donationAmount: "",
  });

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  
  const { address } = useParams<{ address: string }>(); // Get the campaign address from the URL

  const { data: dataCampaignDetails, isLoading: loadingCampaignDetail, isError:errorCampaignDetail } = useReadContract({
    contract: CONTRACT,
    method: 'getCampaignDetails',
    // params: "[address]?.toString, // Pass the campaign address as an argument
    // params: ["0x479d9Fb099b6C8260629BBfee826D00F8AC1ea31"],
    params: address ? [address.toString()] : () => Promise.resolve(['' as const] as const),
  });
  
  const { data: allCampaignsDonors, isLoading: loadingAllCampaignsDonors, refetch: refetchAllCampaignsDonors } = useReadContract({
    contract: CONTRACT,
    method: "getCampaignDonors",
    params: address ? [address] : [''],
  });
  
  // Get the balance of the campaign
  const { data: campaignBalance, isLoading: loadingCampaignBalance, refetch: refetchCampaignBalance } = useReadContract({
    contract: CONTRACT,
    method: "getContractBalance",
    params: address ? [address] : [''],
  });

  //   const { data: CampaignBalance, isLoading: loadingCampaignBalance, refetch: refetchCampaignBalance} = useReadContract({
//     contract: CONTRACT,
//     method: "getContractBalance",
//     params: ["0x479d9Fb099b6C8260629BBfee826D00F8AC1ea31"],
// });
  if (!address) return <p>No campaign address found.</p>;
  if (loadingCampaignDetail) return <p>Loading campaign details...</p>;
  if (errorCampaignDetail || !dataCampaignDetails) return <p>Error loading campaign details.</p>;

  // const [name, description, goal, deadline, owner, paused, state] = CampaignDetails as [
  //   string,
  //   string,
  //   bigint,
  //   number,
  //   string,
  //   boolean,
  //   number
  // ];

  const campaignData: CampaignData = {
    name: dataCampaignDetails[0],
    description: dataCampaignDetails[1],
    goal: BigInt(dataCampaignDetails[2]),
    deadline: Number(dataCampaignDetails[3]),
    owner: dataCampaignDetails[4],
    paused: dataCampaignDetails[5],
    state: dataCampaignDetails[6],
  };

  // Helper function to map state codes to human-readable names
  const getStateName = (state: number): string => {
    // switch (state) {
    //   case 0:
    //     return 'Active';
    //   case 1:
    //     return 'Successful';
    //   case 2:
    //     return 'Failed';
    //   default:
    //     return 'Unknown';
    // }
    switch (state) {
      case 0:
        return 'Active';
      case 1:
        return 'Successful';
      case 2:
        return 'Failed';
      case 3:
        return 'Paused';
      case 4:
        return 'Canceled';
      case 5:
        return 'Finalized';
      case 6:
        return 'Expired';
      default:
        return 'Unknown';
    }
  };


  return (
    <div>
      {/* <h1>{campaignData.name}</h1>
      <p>{campaignData.description}</p>
      <p>Goal: {campaignData.goal.toString()} ETH</p>
      <p>Deadline: {new Date(campaignData.deadline * 1000).toLocaleString()}</p>
      <p>Owner: {campaignData.owner}</p>
      <p>Status: {campaignData.paused ? 'Paused' : 'Active'}</p>
      <p>State: {campaignData.state}</p> */}
      {/* {CampaignDetails?.map((campaign, index) => (
            <div key={index}>
              <p>Campaign Address: {campaign.campaignAddress}</p>
              <p>Owner: {campaign.owner}</p>
              <p>Name: {campaign.name}</p>
              <p>Creation Time: {campaign.creationTime.toString()}</p>
              <Link to={`/campaign/${campaign.campaignAddress}`}>
                <button>View Details</button>
              </Link>
            </div>
          ))} */}
      {/* <DisplayCampaignDetails data={campaignData} /> */}

      {/* // display the campaign details */}
      <h1>{campaignData.name}</h1>
      <p>{campaignData.description}</p>
      <p>Goal: {campaignData.goal.toString()} ETH</p>
      <p>Goal: {parseFloat(campaignData.goal.toString()) / 1e18} ETH</p>
      <p>Deadline: {new Date(campaignData.deadline * 1000).toLocaleString()}</p>
      <p>Deadline in uint256 : {campaignData.deadline}</p>
      {/* <p>Deadline: {new Date(campaignData[2][index] * 1000).toLocaleString()}</p> */}
      <p>Owner: {campaignData.owner}</p>
      <p>Status: {campaignData.paused ? 'Paused' : 'Active'}</p>
      {/* <p>State: {campaignData.state}</p> */}
      <p>State: {getStateName(campaignData.state)}</p>
      <p>Campaign Address: {address}</p>

      <input
        type="text"
        name="donationAmount"
        placeholder="donation amount in ETH"
        value={form.donationAmount}
        onChange={handleChange}
      />

      <TransactionButton
            transaction={() =>
              prepareContractCall({
                contract: CONTRACT,
                method: "fundCampaign",
                // params: [address, form.donationAmount.toString()] as const, // Pass the campaign address and donation amount as arguments
                // params: [address] as const, // Only pass the address as the parameter
                params: [address], // Only pass the address
                value: BigInt(Number(form.donationAmount) * 1000000000000000000 ) , // Send ETH amount as value
                // value: BigInt(0.01), // Send ETH amount as value
                
              })
            }
            onClick={() => console.log("Donation sent...")}
            onTransactionSent={() => console.log("Donation sent...")}
            // onTransactionConfirmed={() => refetch()}
            onTransactionConfirmed={(receipt) => {
              console.log("Donation confirmed", receipt.transactionHash);
              console.log("Donation logs:", receipt.logs); // Print all logs for debugging
              // refetch(); // Refetch campaigns on confirmation
              refetchAllCampaignsDonors();
              refetchCampaignBalance();
            
            }}
          >
            Fund Campaign
          </TransactionButton>

      <h1>Donors list</h1>
      {loadingAllCampaignsDonors ? (
        <p>Loading donors list...</p>
      ) : allCampaignsDonors && allCampaignsDonors.length > 0 ? (
        <ul>
          {allCampaignsDonors[0].map((donorAddress, index) => (
            <li key={index}>
              <p>
                <strong>Donor:</strong> {donorAddress.toString()}
                <Link to={`/user/${donorAddress}`}>
                  <button> | View Details(hover and click) | </button>
                </Link>
              </p>
              <p>
              <strong>Amount:</strong>{" "}
                {parseFloat(allCampaignsDonors[1][index].toString()) / 1e18} ETH
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No donors found.</p>
      )}

      <h1>Campaign Balance</h1>
      {loadingCampaignBalance ? (
        <p>Loading campaign balance...</p>
      ) : (
        <p>{campaignBalance ? parseFloat(campaignBalance.toString()) / 1e18 : 0} ETH</p>
      )}




    </div>
  );
};

export default CampaignDetails;

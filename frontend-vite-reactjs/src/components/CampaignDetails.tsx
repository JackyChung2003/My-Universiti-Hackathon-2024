import { useParams } from 'react-router-dom';
import { useReadContract } from 'thirdweb/react';
import { CONTRACT } from '../utils/constants';
import DisplayCampaignDetails from './DisplayCampaignDetails';

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
  const { address } = useParams<{ address: string }>(); // Get the campaign address from the URL

  const { data: dataCampaignDetails, isLoading: loadingCampaignDetail, isError:errorCampaignDetail } = useReadContract({
    contract: CONTRACT,
    method: 'getCampaignDetails',
    // params: "[address]?.toString, // Pass the campaign address as an argument
    // params: ["0x479d9Fb099b6C8260629BBfee826D00F8AC1ea31"],
    params: address ? [address.toString()] : () => Promise.resolve(['' as const] as const),
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
    switch (state) {
      case 0:
        return 'Active';
      case 1:
        return 'Successful';
      case 2:
        return 'Failed';
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
      <p>Deadline: {new Date(campaignData.deadline * 1000).toLocaleString()}</p>
      <p>Owner: {campaignData.owner}</p>
      <p>Status: {campaignData.paused ? 'Paused' : 'Active'}</p>
      <p>State: {campaignData.state}</p>
      <p>State: {getStateName(campaignData.state)}</p>
    </div>
  );
};

export default CampaignDetails;

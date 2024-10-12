import { TransactionButton, useReadContract, useSendTransaction  } from "thirdweb/react";
import React, { useState } from "react";
import { CONTRACT } from "../utils/constants";
import { prepareContractCall } from "thirdweb";
// import { useContractWrite, Web3Button} from "@thirdweb-dev/react";
import { useContract, useContractRead, useContractWrite, Web3Button } from "@thirdweb-dev/react";
// import { useCampaignFunctions } from "../hooks/useCampaignFunctions";
// import { useCampaignFunctions } from "../hooks/useCreateCampaignTransaction";

const CampaignInfoTemp: React.FC = () => {

  //   const { mutate: sendTransaction } = useSendTransaction();

  //   const onClick = () => {
  //       const transaction = prepareContractCall({
  //         contract,
  //         method: "function createCampaign(string _title, string _description, uint256 _target, uint256 _deadline) returns (uint256)",
  //         params: [_title, _description, _target, _deadline]
  //       });
  //       sendTransaction(transaction);
  //     };

    
  //   const { publishCampaign } = useCampaignFunctions(CONTRACT.address);
  //   const [form, setForm] = useState({
  //       title: "",
  //       description: "",
  //       target: "",
  //       deadline: "",
  //       image: "",
  //     });
  //     const [loading, setLoading] = useState(false);
  //     const [error, setError] = useState<string | null>(null);

  //     // Handle form input changes
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setForm({
  //     ...form,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // // Handle form submission
  // const handleSubmit = async () => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     await publishCampaign(form); // Call the publishCampaign function
  //     console.log("Campaign created successfully");
  //   } catch (error) {
  //     setError("Failed to create campaign");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

    


    // READ data from the smart contract using Method: getTotalCampaigns
    const { data: numberOfCampaigns, isLoading: loadingTotalCampaign, refetch} = useReadContract({
        contract: CONTRACT,
        method: "getTotalCampaigns",
    });



    return (
        // <div style={{marginTop: "20px"}}>

        //     {/* <Web3Button
        //      contractAddress={contractAddress}
        //      // Calls the "setName" function on your smart contract with "My Name" as the first argument
        //      action={() => mutateAsync({ args: ["My Name"] })}
        //    >
        //      Send Transaction
        //    </Web3Button> */}

        //     {/* READ the number of Campaign */}
        //     <h1> Total Campaign</h1>
        //     {loadingTotalCampaign ? (
        //         <p> Loading campaign number...</p>
        //     ) : (
        //         <p> Campaign Num: {numberOfCampaigns?.toString()}</p>
        //     )}


        //     <div style={{
        //         display: "flex",
        //         justifyContent: "center",
        //         gap: "10px",
        //         marginTop: "10px",
        //     }}>
        //         {/* <TransactionButton
        //             transaction={() => prepareContractCall({
        //                 contract: CONTRACT,
        //                 method: "decrement"
        //             })}
        //             onTransactionSent={() => console.log("decrementing....")}
        //             onTransactionConfirmed={() => refetch()}
        //         >-</TransactionButton>
                    
        //         <TransactionButton
        //             transaction={() => prepareContractCall({
        //                 contract: CONTRACT,
        //                 method: "increment"
        //             })}
        //             onTransactionSent={() => console.log("incrementing....")}
        //             onTransactionConfirmed={() => refetch()}
        //         >+</TransactionButton> */}

        //     </div>
        // </div>

        <div style={{ marginTop: "20px" }}>
            {/* Form to create a new campaign */}
            <h2>Create New Campaign</h2>
            <input
              type="text"
              name="title"
              placeholder="Campaign Title"
              // value={form.title}
              // onChange={handleChange}
            />
            <input
              type="text"
              name="description"
              placeholder="Campaign Description"
              // value={form.description}
              // onChange={handleChange}
            />
            <input
              type="text"
              name="target"
              placeholder="Target Amount (in ETH)"
              // value={form.target}
              // onChange={handleChange}
            />
            <input
              type="date"
              name="deadline"
              placeholder="Deadline"
              // value={form.deadline}
              // onChange={handleChange}
            />
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              // value={form.image}
              // onChange={handleChange}
            />
            {/* <button onClick={handleSubmit} disabled={loading}>
              {loading ? "Creating Campaign..." : "Create Campaign"}
            </button> */}
        
            {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
        
            {/* READ the number of Campaigns */}
            <h1>Total Campaigns</h1>
            {loadingTotalCampaign ? (
              <p>Loading campaign number...</p>
            ) : (
              <p>Campaign Num: {numberOfCampaigns?.toString()}</p>
            )}
        </div>
    )
}

export default CampaignInfoTemp; 

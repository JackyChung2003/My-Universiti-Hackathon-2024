// // // import { ConnectButton } from "thirdweb/react";
// // // import thirdwebIcon from "./thirdweb.svg";
// // // // import { client } from "./client-not-in-use";
// // // import { client } from "./utils/client";

// // // export function App() {
// // // 	return (
// // // 		<main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">
// // // 			<div className="py-20">
// // // 				<Header />

// // // 				<div className="flex justify-center mb-20">
// // // 					<ConnectButton
// // // 						client={client}
// // // 						appMetadata={{
// // // 							name: "Example app",
// // // 							url: "https://example.com",
// // // 						}}
// // // 					/>
// // // 				</div>

// // // 				<ThirdwebResources />
// // // 			</div>
// // // 		</main>
// // // 	);
// // // }

// // // function Header() {
// // // 	return (
// // // 		<header className="flex flex-col items-center mb-20 md:mb-20">
// // // 			<img
// // // 				src={thirdwebIcon}
// // // 				alt=""
// // // 				className="size-[150px] md:size-[150px]"
// // // 				style={{
// // // 					filter: "drop-shadow(0px 0px 24px #a726a9a8)",
// // // 				}}
// // // 			/>

// // // 			<h1 className="text-2xl md:text-6xl font-bold tracking-tighter mb-6 text-zinc-100">
// // // 				thirdweb SDK
// // // 				<span className="text-zinc-300 inline-block mx-1"> + </span>
// // // 				<span className="inline-block -skew-x-6 text-violet-500"> vite </span>
// // // 			</h1>

// // // 			<p className="text-zinc-300 text-base">
// // // 				Read the{" "}
// // // 				<code className="bg-zinc-800 text-zinc-300 px-2 rounded py-1 text-sm mx-1">
// // // 					README.md
// // // 				</code>{" "}
// // // 				file to get started.
// // // 			</p>
// // // 		</header>
// // // 	);
// // // }

// // // function ThirdwebResources() {
// // // 	return (
// // // 		<div className="grid gap-4 lg:grid-cols-3 justify-center">
// // // 			<ArticleCard
// // // 				title="thirdweb SDK Docs"
// // // 				href="https://portal.thirdweb.com/typescript/v5"
// // // 				description="thirdweb TypeScript SDK documentation"
// // // 			/>

// // // 			<ArticleCard
// // // 				title="Components and Hooks"
// // // 				href="https://portal.thirdweb.com/typescript/v5/react"
// // // 				description="Learn about the thirdweb React components and hooks in thirdweb SDK"
// // // 			/>

// // // 			<ArticleCard
// // // 				title="thirdweb Dashboard"
// // // 				href="https://thirdweb.com/dashboard"
// // // 				description="Deploy, configure, and manage your smart contracts from the dashboard."
// // // 			/>
// // // 		</div>
// // // 	);
// // // }

// // // function ArticleCard(props: {
// // // 	title: string;
// // // 	href: string;
// // // 	description: string;
// // // }) {
// // // 	return (
// // // 		<a
// // // 			href={`${props.href}?utm_source=vite-template`}
// // // 			target="_blank"
// // // 			className="flex flex-col border border-zinc-800 p-4 rounded-lg hover:bg-zinc-900 transition-colors hover:border-zinc-700"
// // // 			rel="noreferrer"
// // // 		>
// // // 			<article>
// // // 				<h2 className="text-lg font-semibold mb-2">{props.title}</h2>
// // // 				<p className="text-sm text-zinc-400">{props.description}</p>
// // // 			</article>
// // // 		</a>
// // // 	);
// // // }

// // import { ConnectButton } from "thirdweb/react";
// // import thirdwebIcon from "./thirdweb.svg";
// // // import { client } from "./client-not-in-use";
// // import { client } from "./utils/constants";
// // import Login from "./components/login";

// // export function App() {
// // 	return (
// // 		<div>
// // 			<h1> Counter</h1>
// // 			<Login />
// // 		</div>
// // 	);
// // }

// import React, { useState } from "react";
// import { ConnectButton, useActiveAccount } from "thirdweb/react";
// import { client, chain, CONTRACT } from "./utils/constants";  // Import your contract setup
// import { ethers } from "ethers";  // Import ethers properly for utils like parseEther
// import { useContractWrite, useContractRead, useContract } from "@thirdweb-dev/react";

// const App: React.FC = () => {
//   const account = useActiveAccount(); // Use thirdweb's active account hook
//   const [campaignId, setCampaignId] = useState("");
//   const [donationAmount, setDonationAmount] = useState("");

//   const [title, setTitle] = useState("EV Charger"); // Example title
//   const [description, setDescription] = useState("Help build a new EV charger"); // Example description
//   const [target, setTarget] = useState("1.0"); // Example target (in ETH)

//   // Fetch the contract using the thirdweb hook
//   const { contract } = useContract(CONTRACT.address);

//   // Prepare to call the createCampaign function
//   const { mutate: createCampaign } = useContractWrite(contract, "createCampaign");
  
//   // Prepare to call the donateToCampaign function
//   const { mutate: donateToCampaign } = useContractWrite(contract, "donateToCampaign");

//   // Function to create a new campaign
//   const handleCreateCampaign = async () => {
//     try {
//       createCampaign({
//         args: [
//           title, // Campaign title
//           description, // Campaign description
//           ethers.utils.parseEther(target), // Convert target from ETH to Wei
//           Math.floor(Date.now() / 1000) + 86400, // Deadline (1 day from now)
//         ],
//       });
//       alert("Campaign created successfully!");
//     } catch (error) {
//       console.error("Error creating campaign:", error);
//       alert("Error creating campaign.");
//     }
//   };

//   // Function to donate to a campaign
//   const handleDonateToCampaign = async () => {
//     try {
//       donateToCampaign({
//         args: [campaignId], // Campaign ID
//         overrides: {
//           value: ethers.utils.parseEther(donationAmount), // Donation amount in ETH
//         },
//       });
//       alert("Donation successful!");
//     } catch (error) {
//       console.error("Error donating to campaign:", error);
//       alert("Error donating to campaign.");
//     }
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         height: "100vh",
//       }}
//     >
//       {account ? (
//         <div style={{ textAlign: "center" }}>
//           {/* Connect Button to switch accounts */}
//           <ConnectButton
//             client={client}
//             chain={chain}
//             connectModal={{
//               size: "compact",
//             }}
//           />

//           {/* Create Campaign Section */}
//           <div>
//             <h2>Create a New Campaign</h2>
//             <button onClick={handleCreateCampaign}>Create Campaign</button>
//           </div>

//           {/* Donate to Campaign Section */}
//           <div>
//             <h2>Donate to a Campaign</h2>
//             <input
//               type="text"
//               placeholder="Campaign ID"
//               value={campaignId}
//               onChange={(e) => setCampaignId(e.target.value)}
//             />
//             <input
//               type="text"
//               placeholder="Donation Amount (in ETH)"
//               value={donationAmount}
//               onChange={(e) => setDonationAmount(e.target.value)}
//             />
//             <button onClick={handleDonateToCampaign}>Donate</button>
//           </div>
//         </div>
//       ) : (
//         <div style={{ textAlign: "center" }}>
//           {/* Connect Button when no account is active */}
//           <ConnectButton
//             client={client}
//             chain={chain}
//             connectModal={{
//               size: "compact",
//             }}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;

import { ConnectButton } from "thirdweb/react";
import thirdwebIcon from "./thirdweb.svg";
// import { client } from "./client-not-in-use";
import { client } from "./utils/constants";
import Login from "./components/login";
// import { useTotalCampaigns } from "./hooks/useTotalCampaigns";
import CampaignInfoTemp from "./components/CampaignInfoTemp";
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Routes, Route } from "react-router-dom";
// import CampaignDetails from './components/CampaignDetails';
import CampaignDetails from "./components/CampaignDetails";
import UserDetails from "./components/UserDetail";


import HorizontalNavbar from "./containers/Navigation/HorizontalNavBar";
import { useState } from "react";
import Dashboard from "./containers/Dashboard";
import Campaigns from "./containers/Campaigns";

export function App() {
	// const { totalCampaigns, isLoading, error } = useTotalCampaigns(contractAddress);

	const [isopen, setisopen] = useState(false);
	const toggle = () => {
	  setisopen(!isopen);
	};

	return (
		<div className="App">
			<HorizontalNavbar toggle={toggle} />
			
			<main>
				{/* <Router> */}
    			  <Routes>
    			    <Route path="/" element={<Login />} />
					<Route path="/campaign" element={<Campaigns />} />
    			    <Route path="/contact" element={<Login />} />
					<Route path="/campaign/:address" element={<CampaignDetails data={[]} />} />
					<Route path="/user/:donorAddress" element={<UserDetails />} />

    			  </Routes>
    			{/* </Router> */}
			</main>
		</div>

		// <div className="App">
		// 	<HorizontalNavbar toggle={toggle} />
		// 	<main>
     	// 	  <Routes>
     	// 	    <Route path="/" element={<Dashboard />} />
     	// 	    <Route path="/about" element={<Dashboard />} />
     	// 	    <Route path="/services" element={<Dashboard />} />
     	// 	    <Route path="/contact" element={<Dashboard />} />
     	// 	  </Routes>
     	// 	</main>
		// </div>
	);
}
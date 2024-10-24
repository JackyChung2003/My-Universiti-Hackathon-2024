import { Routes, Route } from "react-router-dom";

import HorizontalNavbar from "./containers/Navigation/HorizontalNavBar";
import { useEffect, useState } from "react";
import Dashboard from "./containers/Dashboard";
import Campaigns from "./containers/Campaign";
import CampaignDetails from "./containers/Campaign/[campaignAddress]";
import MapPage from "./containers/Map";
import SubscriptionPage from "./containers/Subscription";
import UserDetails from "./containers/User/[userAddress]";
import WelcomeUser from "./containers/Authentication";
import { useActiveAccount } from "thirdweb/react";

export function App() {
	
	const activeAccount = useActiveAccount();
	// console.log("address", activeAccount?.address);
	const [isConnected, setIsConnected] = useState(false); 

	const [isopen, setisopen] = useState(false);
	
	const toggle = () => {
	  setisopen(!isopen);
	};

	useEffect(() => {
		if (activeAccount?.address) {
		  setIsConnected(true);
		} else {
		  setIsConnected(false);
		}
		console.log("Address:", activeAccount?.address);
	  }, [activeAccount]);

	return (
		<div className="App">
			<HorizontalNavbar toggle={toggle} />
			<main>
			{!isConnected ? (
        		<WelcomeUser />
				) : (
    				  <Routes>
						<Route path="/" element={<Dashboard />} />
						<Route path="/campaign" element={<Campaigns />} />
						<Route path="/campaign/:address" element={<CampaignDetails data={[]} />} />
						<Route path="/user/:userAddress" element={<UserDetails />} />
						<Route path="/map" element={<MapPage/> } />
						<Route path="/subscription" element={<SubscriptionPage />} />
						<Route path="*" element={<WelcomeUser />} />
    				  </Routes>
				)}
			</main>
			{/* Footer */}
			<footer className="bg-[#051F20] text-white text-center py-2 w-full mt-auto">
      		  <p>© 2024 Power Stake - All Rights Reserved</p>
      		</footer>
		</div>
	);
}
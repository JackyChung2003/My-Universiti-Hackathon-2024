import Login from "./components/login";
import { Routes, Route } from "react-router-dom";

import HorizontalNavbar from "./containers/Navigation/HorizontalNavBar";
import { useState } from "react";
import Dashboard from "./containers/Dashboard";
import Campaigns from "./containers/Campaign";
import CampaignDetails from "./containers/Campaign/[campaignAddress]";
import MapPage from "./containers/Map";
import SubscriptionPage from "./containers/Subscription";
import UserDetails from "./containers/User/[userAddress]";
import Sidebar from "./containers/Navigation/SideNavBar";
// import StickyLayout from "./containers/test";
// import StickyLayout from "./containers/test";

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
    			    {/* <Route path="/" element={<Login />} /> */}
					<Route path="/" element={<Dashboard />} />
					<Route path="/campaign" element={<Campaigns />} />
    			    <Route path="/contact" element={<Login />} />
					<Route path="/campaign/:address" element={<CampaignDetails data={[]} />} />
					{/* <Route path="/user/:donorAddress" element={<UserDetails />} /> */}
					<Route path="/user/:userAddress" element={<UserDetails />} />
					{/* <Route path="/about" element={<StickyLayout />} /> */}
					<Route path="/map" element={<MapPage/> } />
					<Route path="/subscription" element={<SubscriptionPage />} />

    			  </Routes>
    			{/* </Router> */}
			</main>
			{/* Footer */}
			<footer className="bg-[#051F20] text-white text-center py-2 w-full mt-auto">
      		  <p>© 2024 Power Stake - All Rights Reserved</p>
      		</footer>
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
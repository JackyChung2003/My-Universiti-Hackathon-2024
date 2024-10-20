import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow, DirectionsRenderer } from "@react-google-maps/api";
import { Link } from "react-router-dom";
import logoImage from "../image/logo-name.png"; // Import the logo
import chargingStationImage from "../image/tell-us-demand.png"; // Placeholder for image in the form

const mapStyles = {
  height: "500px",
  width: "100%",
};

const MapPage: React.FC = () => {
  const [chargingStations, setChargingStations] = useState<any[]>([]);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [currentLocation, setCurrentLocation] = useState({
    lat: 3.139, // Default to Kuala Lumpur coordinates
    lng: 101.6869,
  });
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [selectedStation, setSelectedStation] = useState<any | null>(null);
  const [directionsResponse, setDirectionsResponse] = useState<any | null>(null);
  const [suggestMode, setSuggestMode] = useState(false); // Suggest mode toggle
  const [suggestedMarker, setSuggestedMarker] = useState<google.maps.LatLngLiteral | null>(null); // Green marker location
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    owner: "",
    visitFrequency: "",
    visitTime: [] as string[], // Set visitTime to an array of strings
    batteryLevel: "",
    crowdfunding: "",
  });

  // Function to handle closing of the InfoWindow
  const handleInfoWindowClose = () => {
    setSelectedStation(null);
    setDirectionsResponse(null); // Optionally clear the directions response as well
  };

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLoc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(userLoc);
          setCurrentLocation(userLoc); // Set map center to user location
        },
        () => {
          console.log("Geolocation not available");
        }
      );
    }
  }, []);

  // Search for nearby charging stations based on user's location
  useEffect(() => {
    if (map) {
      const service = new google.maps.places.PlacesService(map);

      const request: google.maps.places.PlaceSearchRequest = {
        location: currentLocation,
        radius: 10000, // Radius in meters (10 km)
        type: "electric_vehicle_charging_station",
      };

      service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          setChargingStations(results);
        }
      });
    }
  }, [map, currentLocation]);

  // Function to handle station click and show InfoWindow
  const handleMarkerClick = (station: any) => {
    setSelectedStation(station);
    // Request directions when a station is selected
    if (userLocation) {
      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin: userLocation,
          destination: {
            lat: station.geometry.location.lat(),
            lng: station.geometry.location.lng(),
          },
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            setDirectionsResponse(result);
          } else {
            console.error(`Directions request failed due to ${status}`);
          }
        }
      );
    }
  };

  // Handle clicking on the map to place a green marker in "suggest mode"
  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (suggestMode) {
      setSuggestedMarker({
        lat: event.latLng?.lat() || 0,
        lng: event.latLng?.lng() || 0,
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would send the form data and suggested location to your server
    console.log("Suggested location:", suggestedMarker);
    console.log("Form data:", formData);
  };

  // Sample request data for the cards
  const requestData = [
    {
      placeName: "Community Mall",
      description: "A great spot with high demand for a charging station",
      supporters: 120,
      location: "123 Main Street, Downtown",
      requestedBy: "JohnDoe123",
      dateRequested: "2024-09-12",
      estimatedCost: "$25,000",
      deadline: "2024-12-01",
    },
    {
      placeName: "Green Park",
      description: "Popular park where EV users gather frequently",
      supporters: 85,
      location: "456 Green Ave, City Center",
      requestedBy: "GreenEVFan",
      dateRequested: "2024-08-25",
      estimatedCost: "$15,000",
      deadline: "2024-11-15",
    },
    {
      placeName: "Tech District",
      description: "High-tech business area with EV commuters",
      supporters: 97,
      location: "789 Tech Blvd, Innovation City",
      requestedBy: "TechGuru",
      dateRequested: "2024-09-01",
      estimatedCost: "$30,000",
      deadline: "2024-12-20",
    },
  ];
  
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#FFFFFF" }}>
      {/* Navbar */}
      <header className="bg-white shadow-md w-full fixed top-0 z-10">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          {/* Company Logo */}
          <div className="flex items-center">
            <img src={logoImage} alt="Power Stake Logo" className="h-8" />
          </div>

          {/* Navigation Links */}
          <nav className="space-x-6">
            <Link
              to="/dashboard"
              className="font-bold px-4 py-2 text-gray-700 hover:text-white hover:bg-[#051F20] rounded-lg transition duration-300"
            >
              My Home
            </Link>
            <Link
              to="/campaign"
              className="font-bold px-4 py-2 text-gray-700 hover:text-white hover:bg-[#051F20] rounded-lg transition duration-300"
            >
              Campaign
            </Link>
            <Link
              to="/map"
              className="font-bold px-4 py-2 text-gray-700 hover:text-white hover:bg-[#051F20] rounded-lg transition duration-300"
              style={{ backgroundColor: "#051F20", color: "white" }} // Dark green for active link
            >
              Map
            </Link>
            <Link
              to="/subscription"
              className="font-bold px-4 py-2 text-gray-700 hover:text-white hover:bg-[#051F20] rounded-lg transition duration-300"
            >
              Subscriptions
            </Link>
          </nav>

          {/* Sign-up Button */}
          <div className="space-x-4">
            <button className="font-bold text-gray-700 hover:text-[#051F20]">Sign up</button>
          </div>
        </div>
      </header>

      {/* Main Content Section */}
      <div className="container mx-auto px-6" style={{ marginTop: "100px", backgroundColor: "#FFFFFF" }}>
        {/* Page Title and Toggle */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#051F20]">Explore Charging Stations and Community Requests</h1>
          {/* Switch Toggle for Suggest Mode */}
          <div className="flex rounded-lg bg-gray-200">
            <button
              onClick={() => setSuggestMode(false)}
              className={`px-6 py-2 rounded-lg  ${!suggestMode ? "bg-[#051F20] text-white" : "text-gray-600"}`}
            >
              View Nearby Stations
            </button>
            <button
              onClick={() => setSuggestMode(true)}
              className={`px-6 py-2 rounded-lg  ${suggestMode ? "bg-[#051F20] text-white" : "text-gray-600"}`}
            >
              Suggest New Charging Station
            </button>
          </div>
        </div>

        {/* Google Map */}
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} libraries={["places"]}>
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={12}
            center={currentLocation}
            onClick={handleMapClick} // Enable click to add marker in suggest mode
            onLoad={(map: any) => setMap(map)}
          >
            {/* Show charging stations */}
            {!suggestMode &&
              chargingStations.map((station, index) => (
                <Marker
                  key={index}
                  position={{
                    lat: station.geometry.location.lat(),
                    lng: station.geometry.location.lng(),
                  }}
                  title={station.name}
                  icon={{
                    url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
                  }}
                  onClick={() => handleMarkerClick(station)} // On marker click
                />
              ))}

            {/* Show user's current location */}
            {userLocation && (
              <Marker
                position={userLocation}
                icon={{
                  url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                }}
                title="You are here"
              />
            )}

            {/* Show suggested location (Green Marker) */}
            {suggestedMarker && suggestMode && (
              <Marker
                position={suggestedMarker}
                icon={{
                  url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
                }}
                title="Suggested Location"
              />
            )}

            {/* Directions Renderer to show the route */}
            {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}

            {/* InfoWindow for selected station */}
            {selectedStation && (
              <InfoWindow
                position={{
                  lat: selectedStation.geometry.location.lat(),
                  lng: selectedStation.geometry.location.lng(),
                }}
                onCloseClick={handleInfoWindowClose} // Updated onCloseClick handler
              >
                <div>
                  <h3>{selectedStation.name}</h3>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&origin=${userLocation?.lat},${userLocation?.lng}&destination=${selectedStation.geometry.location.lat()},${selectedStation.geometry.location.lng()}&travelmode=driving`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "blue", textDecoration: "underline" }}
                  >
                    Get Directions in Google Maps
                  </a>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
        {!suggestMode && (
  <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {requestData.map((request, index) => (
      <div key={index} className="bg-[#DAF1DE] p-4 rounded-lg shadow-md flex flex-col">
        <h3 className="text-lg font-bold mb-2 text-black">{request.placeName}</h3>
        <p className="text-black mb-2">{request.description}</p>
        
        <div className="flex mb-2">
          <div className="w-32 text-sm font-bold text-black">Location:</div>
          <div className="text-sm text-black">{request.location}</div>
        </div>
        <div className="flex mb-2">
          <div className="w-32 text-sm font-bold text-black">Requested By:</div>
          <div className="text-sm text-black">{request.requestedBy}</div>
        </div>
        <div className="flex mb-2">
          <div className="w-32 text-sm font-bold text-black">Date Requested:</div>
          <div className="text-sm text-black">{request.dateRequested}</div>
        </div>
        <div className="flex mb-2">
          <div className="w-32 text-sm font-bold text-black">Estimated Cost:</div>
          <div className="text-sm text-black">{request.estimatedCost}</div>
        </div>
        <div className="flex mb-2">
          <div className="w-32 text-sm font-bold text-black">Deadline:</div>
          <div className="text-sm text-black">{request.deadline}</div>
        </div>
        <div className="flex mb-4">
          <div className="w-32 text-sm font-bold text-black">Supporters:</div>
          <div className="text-sm text-black">{request.supporters}</div>
        </div>
        
        <div className="flex justify-between">
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg">View More</button>
          <button className="bg-[#051F20] text-white px-4 py-2 rounded-lg">Support</button>
        </div>
      </div>
    ))}
  </div>
)}

        {/* Suggest Location Section */}
        {suggestedMarker && suggestMode && (
          <div className="mt-6 flex space-x-6">
            {/* Left Side Image Card */}
            <div className="w-1/2 bg-white shadow-lg p-0 rounded-lg flex items-center justify-center">
              <img src={chargingStationImage} alt="Charging Station" className="rounded-lg h-full object-cover" />
            </div>

            {/* Right Side Form Card */}
            <div className="w-1/2 bg-[#DAF1DE] shadow-lg p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 text-black">Suggest a New Charging Station</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-black font-bold mb-2" htmlFor="name">
                    Place Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-black"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-black font-bold mb-2" htmlFor="description">
                    Description
                  </label>
                  <textarea
                    id="description"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-black"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>

                {/* Owner Question */}
                <div className="mb-4">
                  <label className="block text-black font-bold mb-2">Are you the owner of this place?</label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="Yes"
                        name="owner"
                        onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                        required
                      />
                      <span className="ml-2 text-black">Yes</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="No"
                        name="owner"
                        onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                        required
                      />
                      <span className="ml-2 text-black">No</span>
                    </label>
                  </div>
                </div>

                {/* Visit Frequency */}
                <div className="mb-4">
                  <label className="block text-black font-bold mb-2">How often do you visit this location?</label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="Daily"
                        name="visitFrequency"
                        onChange={(e) => setFormData({ ...formData, visitFrequency: e.target.value })}
                        required
                      />
                      <span className="ml-2 text-black">Daily</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="Weekly"
                        name="visitFrequency"
                        onChange={(e) => setFormData({ ...formData, visitFrequency: e.target.value })}
                        required
                      />
                      <span className="ml-2 text-black">Weekly</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="Monthly"
                        name="visitFrequency"
                        onChange={(e) => setFormData({ ...formData, visitFrequency: e.target.value })}
                        required
                      />
                      <span className="ml-2 text-black">Monthly</span>
                    </label>
                  </div>
                </div>

                {/* Visit Time */}
                <div className="mb-4">
                  <label className="block text-black font-bold mb-2">What time of day do you usually visit?</label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        value="Morning"
                        onChange={(e) =>
                          setFormData({ ...formData, visitTime: [...formData.visitTime, e.target.value] })
                        }
                      />
                      <span className="ml-2 text-black">Morning</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        value="Afternoon"
                        onChange={(e) =>
                          setFormData({ ...formData, visitTime: [...formData.visitTime, e.target.value] })
                        }
                      />
                      <span className="ml-2 text-black">Afternoon</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        value="Night"
                        onChange={(e) =>
                          setFormData({ ...formData, visitTime: [...formData.visitTime, e.target.value] })
                        }
                      />
                      <span className="ml-2 text-black">Night</span>
                    </label>
                  </div>
                </div>

                {/* Battery Level */}
                <div className="mb-4">
                  <label className="block text-black font-bold mb-2">
                    What is your average battery level when you arrive at this location?
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="Below 30%"
                        name="batteryLevel"
                        onChange={(e) => setFormData({ ...formData, batteryLevel: e.target.value })}
                        required
                      />
                      <span className="ml-2 text-black">Below 30%</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="30%-50%"
                        name="batteryLevel"
                        onChange={(e) => setFormData({ ...formData, batteryLevel: e.target.value })}
                        required
                      />
                      <span className="ml-2 text-black">30%-50%</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="50%-80%"
                        name="batteryLevel"
                        onChange={(e) => setFormData({ ...formData, batteryLevel: e.target.value })}
                        required
                      />
                      <span className="ml-2 text-black">50%-80%</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="Above 80%"
                        name="batteryLevel"
                        onChange={(e) => setFormData({ ...formData, batteryLevel: e.target.value })}
                        required
                      />
                      <span className="ml-2 text-black">Above 80%</span>
                    </label>
                  </div>
                </div>

                {/* Willing to Contribute */}
                <div className="mb-4">
                  <label className="block text-black font-bold mb-2">
                    Would you be willing to contribute to the crowdfunding for this charging station?
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="Yes"
                        name="crowdfunding"
                        onChange={(e) => setFormData({ ...formData, crowdfunding: e.target.value })}
                        required
                      />
                      <span className="ml-2 text-black">Yes</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="No"
                        name="crowdfunding"
                        onChange={(e) => setFormData({ ...formData, crowdfunding: e.target.value })}
                        required
                      />
                      <span className="ml-2 text-black">No</span>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end mt-auto">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#051F20] text-white font-bold rounded-lg"
                  >
                    Submit Suggestion
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <div className="my-10"></div>
      {/* Footer */}
      <footer className="bg-[#051F20] text-white text-center py-2 w-full mt-auto">
        <p>© 2024 Power Stake - All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default MapPage;

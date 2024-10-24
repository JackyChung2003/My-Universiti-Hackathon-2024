# PowerStake Crowdfunding Platform

**PowerStake** is an innovative Ethereum-based crowdfunding platform aimed at solving Malaysia's EV charging infrastructure gap. It leverages blockchain technology to ensure transparent and secure crowdfunding for the construction of EV charging stations.

---

<p align="center">
  <a href="#project-overview">Project Overview</a> •
  <a href="#project-structure">Project Structure</a> •
  <a href="#how-to-set-up-the-project-locally">Installation</a> •
  <a href="#features">Features</a> •
  <a href="#demo-video">Demo Video</a> •
  <a href="#explore-powerstake-live-demo-and-smart-contract">Live Demo & Smart Contract</a> •
  <a href="#license">License</a>
</p>

---

## Project Overview

As Malaysia works toward its goal of increasing electric vehicle (EV) adoption, the need for a well-developed charging infrastructure becomes more urgent. With a target of 10,000 EV charging stations by 2025, **PowerStake** aims to close the gap through a community-driven approach.

**PowerStake** allows investors, developers, and the community to collaborate on funding and building EV charging stations. The platform provides a transparent, secure, and decentralized way to crowdfund EV charging stations while enabling users to view and vote for proposed projects in real-time.

---

## Project Structure

This project consists of two main parts:

- **Backend (Smart Contract)**
- **Frontend (Vite + React.js)**

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14+)
- [npm](https://www.npmjs.com/get-npm) or [yarn](https://yarnpkg.com/)
- [Metamask](https://metamask.io/download/) (For interaction with the Ethereum blockchain)

## How to Set Up the Project Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/JackyChung2003/My-Universiti-Hackathon-2024
   cd My-Universiti-Hackathon-2024
   ```

### Backend Setup (Smart Contracts)

1. Navigate to the `backend-contract` directory:

   ```bash
   cd backend-contract
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Compile the smart contracts:

   ```bash
   npx hardhat compile
   ```

4. **Deploy to ThirdWeb**:
   To deploy the smart contract using ThirdWeb, you’ll need an API key which can be obtained from [ThirdWeb API Key](https://thirdweb.com/dashboard/settings/api-keys). Once you have the API key, use the following command:
   ```bash
   npx thirdweb deploy -k <YOUR_API_KEY>
   ```
   Substitute `<YOUR_API_KEY>` with the actual API key from your ThirdWeb account.

### Frontend Setup

1. Navigate to the `frontend-vite-reactjs` directory from `backend-contract`:

   ```bash
   cd ../frontend-vite-reactjs
   ```

   or directly navigate into the `frontend-vite-reactjs` directory:

   ```bash
   cd frontend-vite-reactjs
   ```

2. Install the dependencies:

   ```bash
   yarn
   ```

3. Configure the `.env` file for frontend by creating a `.env` file in the `frontend-vite-reactjs` folder and add the following:

   ```bash
   VITE_TEMPLATE_CLIENT_ID = <yout_client_id>
   VITE_GOOGLE_MAPS_API_KEY = <google_map_api>
   ```

   client_id can be obtain from [ThirdWeb API Key](https://thirdweb.com/dashboard/settings/api-keys).

4. Start the development server:

   ```bash
   yarn dev dev
   ```

5. Open the app in your browser at `http://localhost:5173/My-Universiti-Hackathon-2024/`.

## Features

- **Explore Nearby Charging Stations:**  
  Browse nearby EV charging stations on an interactive map, helping users find the closest available stations.

- **Suggest New Charging Stations:**  
  Users can suggest potential locations for new EV charging stations, adding to the community-driven development of infrastructure.

- **Vote for Proposals:**  
  Community members can vote on proposed EV charging station requests. This gives users the power to decide which locations are most needed.

- **Transparent Crowdfunding:**  
  Smart contracts ensure that all transactions are securely managed and visible on the Ethereum blockchain, promoting full transparency in the crowdfunding process.

- **Fund Allocation Tracking:**  
  Each campaign provides detailed information on fund allocation, deadlines, and includes voting mechanisms to approve or reject fund usage requests for project milestones.

## Demo Video
Watch the demo video to see how PowerStake works!
[![Power Stake Demo](https://i9.ytimg.com/vi_webp/8cRCD5kExVI/sddefault.webp?v=6717db06&sqp=CNji6bgG&rs=AOn4CLCKsYZ0qM6zWtkJ3TmTODQbsKzwEg)](https://www.youtube.com/watch?v=8cRCD5kExVI)

## Explore PowerStake: Live Demo and Smart Contract

PowerStake offers complete transparency and security through the power of Ethereum smart contracts and blockchain technology. Explore the live application and deployed contract to experience the features in action:

- **Live PowerStake Platform**:  
  Access the deployed frontend to explore the full PowerStake platform, where you can view nearby EV charging stations, propose new ones, and participate in crowdfunding campaigns:  
  [PowerStake Live Demo](https://jackychung2003.github.io/My-Universiti-Hackathon-2024/)

- **Smart Contract on ThirdWeb**:  
  The heart of PowerStake is the smart contract deployed on the Holesky Ethereum testnet, managing campaign creation, donations, and milestone-based fund releases. You can view the contract details and interact with it via the ThirdWeb platform:  
  [View Smart Contract on ThirdWeb](https://thirdweb.com/holesky/0xd6787384AA1c7876581a1ce46D19Cce0d545664e)

- **Blockchain Explorer**:  
  For full transparency, all transactions made through PowerStake are publicly visible on the blockchain. You can explore the contract's transaction history and verify the details on the Holesky Beacon Chain:  
  [View Smart Contract on Holesky Blockchain Explorer](https://holesky.beaconcha.in/address/0xd6787384aa1c7876581a1ce46d19cce0d545664e)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

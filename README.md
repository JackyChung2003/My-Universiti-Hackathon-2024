# PowerStake Crowdfunding Platform

**PowerStake** is an innovative Ethereum-based crowdfunding platform aimed at solving Malaysia's EV charging infrastructure gap. It leverages blockchain technology to ensure transparent and secure crowdfunding for the construction of EV charging stations.

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

- Browse nearby EV charging stations on a map.
- Suggest new charging stations.
- Vote for proposed EV charging station requests.
- Crowdfund campaigns for building EV charging stations.
- Transparency via blockchain with transaction details visible on the Ethereum blockchain explorer.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

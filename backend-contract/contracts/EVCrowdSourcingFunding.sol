// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// import {Crowdfunding} from "./Crowdfunding.sol";
import {EVCrowdfunding} from "./EVCrowdfunding.sol";
import {RequestManager} from "./RequestManager.sol";

contract CrowdfundingFactory {
    address public admin;
    address public owner;
    bool public paused;
    RequestManager public requestManager; // Reference to the RequestManager contract

    struct Campaign {
        address campaignAddress;
        address owner;
        string name;
        uint256 creationTime;
    }

    Campaign[] public campaigns;
    mapping(address => Campaign[]) public userCampaigns;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not the admin.");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner.");
        _;
    }

    modifier notPaused() {
        require(!paused, "Factory is paused.");
        _;
    }

    constructor() {
        owner = msg.sender;
        admin = msg.sender;
        // requestManager = RequestManager(_requestManager);
    }

    // constructor(address _requestManager) {
    //     admin = msg.sender;
    //     requestManager = RequestManager(_requestManager); // Set the RequestManager instance
    // }

    // constructor(address _requestManager) {
    //     owner = msg.sender;
    //     admin = msg.sender;
    //     requestManager = RequestManager(_requestManager); // Set the RequestManager instance
    // }

    // Create a new crowdfunding campaign
    function createCampaign(
        string memory _name,
        string memory _description,
        uint256 _goal,
        uint256 _durationInDays // ) public onlyOwner {
    ) public {
        EVCrowdfunding newCampaign = new EVCrowdfunding(
            msg.sender,
            _name,
            _description,
            _goal,
            _durationInDays
        );
        address campaignAddress = address(newCampaign);

        Campaign memory campaign = Campaign({
            campaignAddress: campaignAddress,
            owner: msg.sender,
            name: _name,
            creationTime: block.timestamp
        });

        // Push the campaign to the list of all campaigns
        campaigns.push(campaign);

        // Associate the campaign with the user who created it
        // userCampaigns[msg.sender].push(campaign);
        userCampaigns[msg.sender].push(campaigns[campaigns.length - 1]);
    }

    // Read functions to access campaign details
    function getCampaignDetails(
        address _campaignAddress
    )
        external
        view
        returns (
            string memory name,
            string memory description,
            uint256 goal,
            uint256 deadline,
            address owner,
            bool paused,
            EVCrowdfunding.CampaignState state
        )
    {
        EVCrowdfunding campaign = EVCrowdfunding(_campaignAddress);
        return (
            campaign.name(),
            campaign.description(),
            campaign.goal(),
            campaign.deadline(),
            campaign.owner(),
            campaign.paused(),
            campaign.state()
        );
    }

    // Function to get the donors and their contributions for a specific campaign
    function getCampaignDonors(
        address _campaignAddress
    )
        external
        view
        returns (address[] memory donors, uint256[] memory contributions)
    {
        // Crowdfunding campaign = Crowdfunding(_campaignAddress);
        // return campaign.getDonators(); // Calling the getDonators() from Crowdfunding.sol

        EVCrowdfunding campaign = EVCrowdfunding(_campaignAddress);
        (donors, contributions) = campaign.getDonators();

        // Check for consistency
        require(
            donors.length == contributions.length,
            "Mismatch in donor data."
        );
        return (donors, contributions);
    }

    function getContractBalance(
        address _campaignAddress
    ) external view returns (uint256) {
        EVCrowdfunding campaign = EVCrowdfunding(_campaignAddress);
        return campaign.getContractBalance();
    }

    // function getTiers(
    //     address _campaignAddress
    // ) external view returns (Crowdfunding.Tier[] memory) {
    //     Crowdfunding campaign = Crowdfunding(_campaignAddress);
    //     return campaign.getTiers();
    // }

    // function hasFundedTier(
    //     address _campaignAddress,
    //     address _backer,
    //     uint256 _tierIndex
    // ) external view returns (bool) {
    //     Crowdfunding campaign = Crowdfunding(_campaignAddress);
    //     return campaign.hasFundedTier(_backer, _tierIndex);
    // }

    function getCampaignStatus(
        address _campaignAddress
    ) external view returns (EVCrowdfunding.CampaignState) {
        EVCrowdfunding campaign = EVCrowdfunding(_campaignAddress);
        return campaign.getCampaignStatus();
    }

    // // Write functions to trigger campaign actions
    // function fundCampaign(
    //     address _campaignAddress,
    //     uint256 _tierIndex
    // ) external payable {
    //     Crowdfunding campaign = Crowdfunding(_campaignAddress);
    //     campaign.fund{value: msg.value}(_tierIndex);
    // }

    // Write functions to trigger campaign actions
    function fundCampaign(address _campaignAddress) external payable {
        EVCrowdfunding campaign = EVCrowdfunding(_campaignAddress);
        // campaign.fund{value: msg.value}();
        campaign.fund{value: msg.value}(msg.sender); // Pass user address explicitly
    }

    // function addTier(
    //     address _campaignAddress,
    //     string memory _name,
    //     uint256 _amount
    // ) external {
    //     Crowdfunding campaign = Crowdfunding(_campaignAddress);
    //     campaign.addTier(_name, _amount);
    // }

    // function removeTier(address _campaignAddress, uint256 _index) external {
    //     Crowdfunding campaign = Crowdfunding(_campaignAddress);
    //     campaign.removeTier(_index);
    // }

    function extendDeadline(
        address _campaignAddress,
        uint256 _daysToAdd
    ) external {
        EVCrowdfunding campaign = EVCrowdfunding(_campaignAddress);
        campaign.extendDeadline(_daysToAdd);
    }

    function togglePause(address _campaignAddress) external {
        EVCrowdfunding campaign = EVCrowdfunding(_campaignAddress);
        campaign.togglePause();
    }

    function withdraw(address _campaignAddress) external {
        EVCrowdfunding campaign = EVCrowdfunding(_campaignAddress);
        campaign.withdraw();
    }

    function refund(address _campaignAddress) external {
        EVCrowdfunding campaign = EVCrowdfunding(_campaignAddress);
        campaign.refund();
    }

    // Factory functions, get created campaigns
    // function getUserCampaigns(
    function getUserCreatedCampaigns(
        address _user
    ) external view returns (Campaign[] memory) {
        return userCampaigns[_user];
    }

    // Get all campaigns the user has contributed to
    function getUserFundedCampaigns(
        address _user
    ) external view returns (Campaign[] memory) {
        uint256 fundedCount = 0;

        // First, count the campaigns the user funded
        for (uint256 i = 0; i < campaigns.length; i++) {
            EVCrowdfunding campaign = EVCrowdfunding(
                campaigns[i].campaignAddress
            );

            // Destructure the backer struct returned by the mapping
            (uint256 contribution, ) = campaign.backers(_user);

            if (contribution > 0) {
                fundedCount++;
            }
        }

        // Create an array to store the campaigns the user funded
        Campaign[] memory fundedCampaigns = new Campaign[](fundedCount);
        uint256 index = 0;

        // Populate the array with the campaigns the user funded
        for (uint256 i = 0; i < campaigns.length; i++) {
            EVCrowdfunding campaign = EVCrowdfunding(
                campaigns[i].campaignAddress
            );
            (uint256 contribution, ) = campaign.backers(_user);

            if (contribution > 0) {
                fundedCampaigns[index] = campaigns[i];
                index++;
            }
        }

        return fundedCampaigns;
    }

    function getAllCampaigns() external view returns (Campaign[] memory) {
        return campaigns;
    }

    // function toggleFactoryPause() external onlyOwner {
    //     paused = !paused;
    // }

    function toggleFactoryPause() external {
        paused = !paused;
    }

    // Function to finalize a campaign
    function finalizeCampaign(address _campaignAddress) external {
        EVCrowdfunding campaign = EVCrowdfunding(_campaignAddress);
        campaign.finalizeCampaign();
    }

    // Function to get final amount collected for a campaign
    function getFinalAmountCollected(
        address _campaignAddress
    ) external view returns (uint256) {
        EVCrowdfunding campaign = EVCrowdfunding(_campaignAddress);
        return campaign.getFinalAmountCollected();
    }

    // Get all campaigns the user has contributed to
    // function myRecords() external view returns (Campaign[] memory) {
    //     uint256 fundedCount = 0;

    //     // First, count how many campaigns the user has donated to
    //     for (uint256 i = 0; i < campaigns.length; i++) {
    //         Crowdfunding campaign = Crowdfunding(campaigns[i].campaignAddress);
    //         if (campaign.backers(msg.sender) > 0) {
    //             fundedCount++;
    //         }
    //     }

    //     // Create an array to store the campaigns the user funded
    //     Campaign[] memory userFundedCampaigns = new Campaign[](fundedCount);
    //     uint256 index = 0;

    //     // Populate the array with the user's funded campaigns
    //     for (uint256 i = 0; i < campaigns.length; i++) {
    //         Crowdfunding campaign = Crowdfunding(campaigns[i].campaignAddress);
    //         if (campaign.backers(msg.sender) > 0) {
    //             userFundedCampaigns[index] = campaigns[i];
    //             index++;
    //         }
    //     }

    //     return userFundedCampaigns;
    // }

    // Create a request through the RequestManager
    // function createRequestForCampaign(
    //     address _campaign,
    //     string memory _title,
    //     string memory _description,
    //     address _recipient,
    //     uint256 _amount
    // ) public {
    //     requestManager.createRequest(
    //         _campaign,
    //         _title,
    //         _description,
    //         _recipient,
    //         _amount
    //     );
    // }

    // // Vote on a request for a campaign
    // function voteRequest(address _campaign, uint256 _requestId) public {
    //     requestManager.voteRequest(_campaign, _requestId);
    // }

    // // Finalize a request for a campaign
    // function finalizeRequest(address _campaign, uint256 _requestId) public {
    //     requestManager.finalizeRequest(_campaign, _requestId);
    // }

    // // Retrieve all requests for a campaign
    // function getCampaignRequests(
    //     address _campaign
    // ) public view returns (RequestManager.Request[] memory) {
    //     return requestManager.getRequests(_campaign);
    // }
}

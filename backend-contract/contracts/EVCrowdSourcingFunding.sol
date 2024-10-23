// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {EVCrowdfunding} from "./EVCrowdfunding.sol";
import {RequestManager} from "./RequestManager.sol";

contract CrowdfundingFactory {
    address public admin;
    address public owner;
    bool public paused;

    struct Campaign {
        address campaignAddress;
        address owner;
        string name;
        uint256 creationTime;
        bool finalized;
        uint256 donorNumber;
        uint256 goal;
        uint256 deadline;
        uint256 currentContributions;
    }

    Campaign[] public campaigns;
    mapping(address => Campaign[]) public userCampaigns;
    mapping(address => RequestManager[]) public campaignRequests; // Mapping from campaign address to its requests
    mapping(address => mapping(address => uint256))
        public campaignContributions;

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
    }

    // Create a new crowdfunding campaign
    function createCampaign(
        string memory _name,
        string memory _description,
        uint256 _goal,
        uint256 _durationInDays
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
            creationTime: block.timestamp,
            finalized: false,
            donorNumber: 0,
            goal: _goal,
            deadline: block.timestamp + (_durationInDays * 1 days),
            currentContributions: 0
        });

        // Push the campaign to the list of all campaigns
        campaigns.push(campaign);
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
            address campaignOwner,
            bool campaignPaused,
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

    function getCampaignStatus(
        address _campaignAddress
    ) external view returns (EVCrowdfunding.CampaignState) {
        EVCrowdfunding campaign = EVCrowdfunding(_campaignAddress);
        return campaign.getCampaignStatus();
    }

    // Write functions to trigger campaign actions
    function fundCampaign(address _campaignAddress) external payable {
        // Update the `currentContributions`and`donorNumber`field in the `Campaign` struct
        for (uint256 i = 0; i < campaigns.length; i++) {
            if (campaigns[i].campaignAddress == _campaignAddress) {
                campaigns[i].currentContributions += msg.value; // Update the `currentContributions` field
                campaigns[i].donorNumber++; // Update the `donorNumber` field
                break; // Break the loop once we find and update the campaign
            }
        }

        EVCrowdfunding campaign = EVCrowdfunding(_campaignAddress);
        campaign.fund{value: msg.value}(msg.sender); // Pass user address explicitly
    }

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

    function toggleFactoryPause() external {
        paused = !paused;
    }

    // Function to finalize a campaign
    function finalizeCampaign(address _campaignAddress) external {
        EVCrowdfunding campaign = EVCrowdfunding(_campaignAddress);
        campaign.finalizeCampaign();

        // Update the `finalized` field in the `Campaign` struct
        for (uint256 i = 0; i < campaigns.length; i++) {
            if (campaigns[i].campaignAddress == _campaignAddress) {
                campaigns[i].finalized = true; // Update the `finalized` field to true
                break; // Break the loop once we find and update the campaign
            }
        }
        (address[] memory donors, uint256[] memory contributions) = campaign
            .getDonators();
        for (uint256 i = 0; i < donors.length; i++) {
            campaignContributions[_campaignAddress][donors[i]] = contributions[
                i
            ];
        }
    }

    // Function to get final amount collected for a campaign
    function getFinalAmountCollected(
        address _campaignAddress
    ) external view returns (uint256) {
        EVCrowdfunding campaign = EVCrowdfunding(_campaignAddress);
        return campaign.getFinalAmountCollected();
    }

    function createRequestForCampaign(
        address _campaign,
        string memory _requestTitle,
        string memory _requestDescription,
        address _recipient,
        uint256 _amount,
        uint256 _requestDeadline,
        uint256 _processingDeadline,
        uint256 _requiredApprovalPercentage
    ) public {
        RequestManager requestManager = new RequestManager(
            msg.sender,
            _requestTitle,
            _requestDescription,
            _recipient,
            _amount,
            _requestDeadline,
            _processingDeadline,
            _requiredApprovalPercentage
        );

        // Push the request to the list of all requests
        campaignRequests[_campaign].push(requestManager);

        // Associate the request with the campaign
    }

    function getRequestDetails(
        address _campaign,
        uint256 _requestId
    )
        external
        view
        returns (
            string memory title,
            string memory description,
            address recipient,
            uint256 amount,
            bool completed,
            uint256 totalVotingPower,
            uint256 requiredApprovalPercentage,
            uint256 requestDeadline,
            uint256 processingDeadline,
            RequestManager.RequestState state,
            address requestOwner
        )
    {
        RequestManager requestManager = RequestManager(
            campaignRequests[_campaign][_requestId]
        );
        return (
            requestManager.requestTitle(),
            requestManager.requestDescription(),
            requestManager.recipient(),
            requestManager.amount(),
            requestManager.completed(),
            requestManager.totalVotingPower(),
            requestManager.requiredApprovalPercentage(),
            requestManager.requestDeadline(),
            requestManager.processingDeadline(),
            requestManager.state(),
            requestManager.owner()
        );
    }

    // Function to retrieve requests for a campaign
    function getAllRequestsForCampaign(
        address _campaignAddress
    ) public view returns (RequestManager[] memory) {
        return campaignRequests[_campaignAddress];
    }

    // Function to vote on a request for a campaign
    function voteOnRequest(
        address _campaignAddress,
        uint256 _requestIndex
    ) external {
        EVCrowdfunding evCampaign = EVCrowdfunding(_campaignAddress);
        require(evCampaign.isFinalized(), "Campaign not finalized.");

        // Ensure the caller has contributed to the campaign
        uint256 contribution = campaignContributions[_campaignAddress][
            msg.sender
        ];
        require(contribution > 0, "Not a contributor.");

        uint256 totalContributions = evCampaign.getFinalAmountCollected();
        uint256 votingPower = (contribution * 100) / totalContributions;

        // Get the request from the campaign's requests
        RequestManager request = campaignRequests[_campaignAddress][
            _requestIndex
        ];

        // Call recordVote on the RequestManager contract with the voter's address and their voting power
        request.recordVote(msg.sender, votingPower);
    }

    // Function to get voting progress for a request
    function getRequestVotingProgress(
        address _campaignAddress,
        uint256 _requestIndex
    ) external view returns (uint256) {
        EVCrowdfunding evCampaign = EVCrowdfunding(_campaignAddress);
        require(evCampaign.isFinalized(), "Campaign not finalized.");

        // Get the request from the campaign's requests
        RequestManager request = campaignRequests[_campaignAddress][
            _requestIndex
        ];

        return request.getCurrentVotingPowerProgress();
    }

    // Function to finalize a request for a campaign
    function finalizeRequest(
        address _campaignAddress,
        uint256 _requestIndex
    ) external {
        EVCrowdfunding evCampaign = EVCrowdfunding(_campaignAddress);
        require(evCampaign.isFinalized(), "Campaign not finalized.");

        // Get the request from the campaign's requests
        RequestManager request = campaignRequests[_campaignAddress][
            _requestIndex
        ];

        // Call finalizeRequest on the request
        request.finalizeRequest();
    }
}

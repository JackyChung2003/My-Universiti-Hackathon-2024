// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract CampaignManagement {
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        bool finalized;
        bool paused;
        bool canceled;
        address[] donators;
        uint256[] donations;
        mapping(address => bool) refunded;
    }

    struct Request {
        string description;
        address payable recipient;
        uint256 amount;
        bool completed;
        uint256 approvalCount;
        mapping(address => bool) approvals;
    }

    mapping(uint256 => Campaign) public campaigns;
    mapping(uint256 => Request[]) public campaignRequests;
    uint256 public numberOfCampaigns = 0;

    modifier onlyAdmin(uint256 _campaignId) {
        require(
            msg.sender == campaigns[_campaignId].owner,
            "Only the campaign owner can execute this."
        );
        _;
    }

    modifier onlyContributor(uint256 _campaignId) {
        require(
            contributionsExistForCampaign(_campaignId, msg.sender),
            "Only contributors can execute this."
        );
        _;
    }

    // Add reentrancy guard (simple version)
    bool internal locked;

    modifier noReentrant() {
        require(!locked, "No reentrancy allowed.");
        locked = true;
        _;
        locked = false;
    }

    event CampaignCreated(uint256 campaignId, address indexed owner);
    event DonationReceived(
        uint256 campaignId,
        address indexed donator,
        uint256 amount
    );
    event RequestCreated(
        uint256 campaignId,
        uint256 requestId,
        address recipient,
        uint256 amount
    );
    event RequestApproved(
        uint256 campaignId,
        uint256 requestId,
        uint256 approvalCount
    );
    event PaymentAuthorized(
        uint256 campaignId,
        uint256 requestId,
        address recipient,
        uint256 amount
    );
    event CampaignPaused(uint256 campaignId);
    event CampaignResumed(uint256 campaignId);
    event CampaignFinalized(uint256 campaignId);
    event CampaignCanceled(uint256 campaignId);

    constructor() {
        locked = false;
    }

    // Admin function to create a campaign
    function createCampaign(
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline
    ) public returns (uint256) {
        require(
            _deadline > block.timestamp,
            "The deadline should be in the future."
        );

        Campaign storage newCampaign = campaigns[numberOfCampaigns];
        newCampaign.owner = msg.sender;
        newCampaign.title = _title;
        newCampaign.description = _description;
        newCampaign.target = _target;
        newCampaign.deadline = _deadline;
        newCampaign.amountCollected = 0;
        newCampaign.finalized = false;
        newCampaign.paused = false;
        newCampaign.canceled = false;

        emit CampaignCreated(numberOfCampaigns, msg.sender);

        numberOfCampaigns++;
        return numberOfCampaigns - 1;
    }

    // Function for users to donate to the campaign
    function donateToCampaign(uint256 _campaignId) public payable {
        Campaign storage campaign = campaigns[_campaignId];
        require(!campaign.paused, "Campaign is paused.");
        require(!campaign.canceled, "Campaign is canceled.");
        require(
            block.timestamp < campaign.deadline,
            "Campaign deadline has passed."
        );
        require(!campaign.finalized, "Campaign is already finalized.");

        campaign.donators.push(msg.sender);
        campaign.donations.push(msg.value);
        campaign.amountCollected += msg.value;

        emit DonationReceived(_campaignId, msg.sender, msg.value);
    }

    // // Function to refund all donors if the campaign fails to meet its target or is canceled
    // // function refundDonors(uint256 _campaignId) public {
    // function refundDonors(uint256 _campaignId) public noReentrant {
    //     Campaign storage campaign = campaigns[_campaignId];
    //     require(
    //         msg.sender == campaign.owner,
    //         "Only the owner can refund donors."
    //     );
    //     require(
    //         campaign.amountCollected < campaign.target || campaign.canceled,
    //         "Refund not allowed: campaign met the target or not canceled."
    //     );
    //     require(
    //         block.timestamp > campaign.deadline || campaign.canceled,
    //         "Campaign hasn't ended or been canceled."
    //     );
    //     require(!campaign.finalized, "Campaign already finalized.");

    //     // for (uint256 i = 0; i < campaign.donators.length; i++) {
    //     //     address donator = campaign.donators[i];
    //     //     uint256 donation = campaign.donations[i];
    //     //     (bool sent, ) = donator.call{value: donation}("");
    //     //     require(sent, "Refund failed.");
    //     // }

    //     // Iterate through the donors and process refunds
    //     for (uint256 i = 0; i < campaign.donators.length; i++) {
    //         address donator = campaign.donators[i];

    //         // Ensure this donator hasn't been refunded already
    //         if (!campaign.refunded[donator]) {
    //             uint256 donation = campaign.donations[i];
    //             (bool sent, ) = donator.call{value: donation}("");
    //             require(sent, "Refund failed.");

    //             // Mark the donator as refunded
    //             campaign.refunded[donator] = true;
    //         }
    //     }
    //     campaign.finalized = true;
    // }

    // Function to refund all donors if the campaign fails to meet its target or is canceled
    function refundDonors(
        uint256 _campaignId
    ) public onlyAdmin(_campaignId) noReentrant {
        Campaign storage campaign = campaigns[_campaignId];
        require(
            campaign.canceled || block.timestamp > campaign.deadline,
            "Campaign hasn't ended or been canceled."
        );
        require(!campaign.finalized, "Campaign is already finalized.");
        require(
            campaign.amountCollected < campaign.target,
            "Target met, refunds not allowed."
        );

        // Iterate through the donors and process refunds
        for (uint256 i = 0; i < campaign.donators.length; i++) {
            address donator = campaign.donators[i];
            uint256 donation = campaign.donations[i];
            (bool sent, ) = donator.call{value: donation}("");
            require(sent, "Refund failed.");
        }

        campaign.finalized = true; // Mark campaign as finalized to prevent further actions
    }

    // // Admin function to finalize the campaign
    // function finalizeCampaign(uint256 _campaignId) public {
    //     Campaign storage campaign = campaigns[_campaignId];
    //     require(
    //         msg.sender == campaign.owner,
    //         "Only the owner can finalize the campaign."
    //     );
    //     require(
    //         block.timestamp >= campaign.deadline ||
    //             campaign.amountCollected >= campaign.target,
    //         "Campaign cannot be finalized yet."
    //     );
    //     require(!campaign.finalized, "Campaign is already finalized.");
    //     require(
    //         campaign.amountCollected >= campaign.target ||
    //             block.timestamp >= campaign.deadline,
    //         "Campaign cannot be finalized yet."
    //     );

    //     campaign.finalized = true;

    //     emit CampaignFinalized(_campaignId);

    //     // transfer the collected funds from the smart contract to the campaign owner once the campaign is finalized
    //     // (bool sent, ) = campaign.owner.call{value: campaign.amountCollected}(
    //     //     ""
    //     // );
    //     // require(sent, "Failed to transfer funds.");
    // }

    // Admin finalizes the campaign (finalize crowdfunding, NOT pay out events)
    function finalizeCampaign(
        uint256 _campaignId
    ) public onlyAdmin(_campaignId) {
        Campaign storage campaign = campaigns[_campaignId];
        require(!campaign.finalized, "Campaign is already finalized.");
        require(
            block.timestamp >= campaign.deadline ||
                campaign.amountCollected >= campaign.target,
            "Campaign cannot be finalized yet."
        );

        campaign.finalized = true;

        emit CampaignFinalized(_campaignId);

        // Note: No funds are transferred here, finalizing just "unlocks" the funds.
    }

    // Admin function to pause the campaign
    function pauseCampaign(uint256 _campaignId) public onlyAdmin(_campaignId) {
        Campaign storage campaign = campaigns[_campaignId];
        require(!campaign.paused, "Campaign is already paused.");
        campaign.paused = true;
        emit CampaignPaused(_campaignId);
        // campaign.paused = !campaign.paused;
    }

    // Admin function to resume the campaign
    function resumeCampaign(uint256 _campaignId) public onlyAdmin(_campaignId) {
        Campaign storage campaign = campaigns[_campaignId];
        require(campaign.paused, "Campaign is not paused.");
        campaign.paused = false;
        emit CampaignResumed(_campaignId);
    }

    // Admin function to cancel amd refund the campaign
    function cancelCampaign(
        uint256 _campaignId
    ) public onlyAdmin(_campaignId) noReentrant {
        Campaign storage campaign = campaigns[_campaignId];
        require(!campaign.canceled, "Campaign is already canceled.");
        require(!campaign.finalized, "Campaign is already finalized.");

        campaign.canceled = true;

        for (uint256 i = 0; i < campaign.donators.length; i++) {
            address donator = campaign.donators[i];
            uint256 donation = campaign.donations[i];
            (bool sent, ) = donator.call{value: donation}("");
            require(sent, "Refund failed.");
        }

        emit CampaignCanceled(_campaignId);
    }

    // Admin function to update the campaign details
    function updateCampaignDetails(
        uint256 _campaignId,
        string memory _title,
        string memory _description
    ) public onlyAdmin(_campaignId) {
        Campaign storage campaign = campaigns[_campaignId];
        campaign.title = _title;
        campaign.description = _description;
    }

    // Function to get details of all donators for a specific campaign
    function getDonators(
        uint256 _campaignId
    ) public view returns (address[] memory, uint256[] memory) {
        Campaign storage campaign = campaigns[_campaignId];
        return (campaign.donators, campaign.donations);
    }

    // Get the list of donators and their donations for a specific campaign
    function getCampaignDonations(
        uint256 _campaignId
    )
        public
        view
        returns (address[] memory donators, uint256[] memory donations)
    {
        Campaign storage campaign = campaigns[_campaignId];
        return (campaign.donators, campaign.donations);
    }

    // Function to get the current status of a campaign
    function getCampaignStatus(
        uint256 _campaignId
    ) public view returns (string memory) {
        Campaign storage campaign = campaigns[_campaignId];

        if (campaign.canceled) {
            return "Canceled";
        } else if (campaign.finalized) {
            return "Finalized";
        } else if (campaign.paused) {
            return "Paused";
        } else if (block.timestamp > campaign.deadline) {
            return "Expired";
        } else {
            return "Active";
        }
    }

    // Get basic campaign details
    function getCampaignDetails(
        uint256 _campaignId
    )
        public
        view
        returns (
            address owner,
            string memory title,
            string memory description,
            uint256 target,
            uint256 deadline,
            uint256 amountCollected,
            bool finalized,
            bool paused
        )
    {
        Campaign storage campaign = campaigns[_campaignId];
        return (
            campaign.owner,
            campaign.title,
            campaign.description,
            campaign.target,
            campaign.deadline,
            campaign.amountCollected,
            campaign.finalized,
            campaign.paused
        );
    }

    // Get total number of campaigns
    function getTotalCampaigns() public view returns (uint256) {
        return numberOfCampaigns;
    }

    function createRequest(
        uint256 _campaignId,
        string memory _description,
        address payable _recipient,
        uint256 _amount
    ) public onlyAdmin(_campaignId) {
        Campaign storage campaign = campaigns[_campaignId];
        require(
            campaign.finalized,
            "Campaign must be finalized to create requests."
        );
        require(
            _amount <= campaign.amountCollected,
            "Insufficient funds for request."
        );

        Request storage newRequest = campaignRequests[_campaignId].push();
        newRequest.description = _description;
        newRequest.recipient = _recipient;
        newRequest.amount = _amount;
        newRequest.completed = false;
        newRequest.approvalCount = 0;

        emit RequestCreated(
            _campaignId,
            campaignRequests[_campaignId].length - 1,
            _recipient,
            _amount
        );
    }

    function voteOnRequest(
        uint256 _campaignId,
        uint256 _requestId
    ) public onlyContributor(_campaignId) {
        Campaign storage campaign = campaigns[_campaignId];
        Request storage request = campaignRequests[_campaignId][_requestId];

        require(!request.approvals[msg.sender], "You have already voted.");

        request.approvals[msg.sender] = true;
        request.approvalCount++;

        emit RequestApproved(_campaignId, _requestId, request.approvalCount);
    }

    function finalizeRequest(
        uint256 _campaignId,
        uint256 _requestId
    ) public onlyAdmin(_campaignId) noReentrant {
        Campaign storage campaign = campaigns[_campaignId];
        Request storage request = campaignRequests[_campaignId][_requestId];

        require(!request.completed, "Request already completed.");
        require(
            request.approvalCount > (campaign.donators.length / 2),
            "Not enough approvals."
        );

        (bool sent, ) = request.recipient.call{value: request.amount}("");
        require(sent, "Failed to transfer funds.");

        request.completed = true;

        emit PaymentAuthorized(
            _campaignId,
            _requestId,
            request.recipient,
            request.amount
        );
    }

    function contributionsExistForCampaign(
        uint256 _campaignId,
        address _contributor
    ) internal view returns (bool) {
        Campaign storage campaign = campaigns[_campaignId];
        for (uint256 i = 0; i < campaign.donators.length; i++) {
            if (campaign.donators[i] == _contributor) {
                return true;
            }
        }
        return false;
    }

    function getEventDetails(
        uint256 _campaignId,
        uint256 _requestId
    )
        public
        view
        returns (
            string memory description,
            address recipient,
            uint256 amount,
            bool completed
        )
    {
        Request storage request = campaignRequests[_campaignId][_requestId];
        return (
            request.description,
            request.recipient,
            request.amount,
            request.completed
        );
    }

    // function getAllEvents(
    //     uint256 _campaignId
    // ) public view returns (Request[] memory) {
    //     return campaignRequests[_campaignId];
    // }

    function myRecords()
        public
        view
        returns (
            uint256[] memory campaignsContributed,
            uint256[] memory amountsDonated
        )
    {
        uint256 numberOfContributions = 0;
        for (uint256 i = 0; i < numberOfCampaigns; i++) {
            if (contributionsExistForCampaign(i, msg.sender)) {
                numberOfContributions++;
            }
        }

        uint256[] memory campaignsContributed = new uint256[](
            numberOfContributions
        );
        uint256[] memory amountsDonated = new uint256[](numberOfContributions);

        uint256 index = 0;
        for (uint256 i = 0; i < numberOfCampaigns; i++) {
            if (contributionsExistForCampaign(i, msg.sender)) {
                campaignsContributed[index] = i;
                amountsDonated[index] = getDonationAmount(i, msg.sender);
                index++;
            }
        }

        return (campaignsContributed, amountsDonated);
    }

    function getDonationAmount(
        uint256 _campaignId,
        address _contributor
    ) internal view returns (uint256) {
        Campaign storage campaign = campaigns[_campaignId];
        for (uint256 i = 0; i < campaign.donations.length; i++) {
            if (campaign.donators[i] == _contributor) {
                return campaign.donations[i];
            }
        }
        return 0;
    }
}

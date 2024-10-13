// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EVCampaignManagement {
    address public admin;

    enum CampaignState {
        Active,
        Paused,
        Canceled,
        Finalized,
        Expired
    }

    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        CampaignState state;
        address[] donators;
        mapping(address => uint256) donations;
    }

    struct Request {
        string description;
        address recipient;
        uint256 amount;
        bool completed;
        uint256 approvals;
        mapping(address => bool) voters;
    }

    Campaign[] public campaigns;
    mapping(uint256 => Request[]) public campaignRequests;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not the admin.");
        _;
    }

    modifier onlyContributor(uint256 _campaignId) {
        require(
            campaigns[_campaignId].donations[msg.sender] > 0,
            "Not a contributor."
        );
        _;
    }

    modifier campaignIsOpen(uint256 _campaignId) {
        require(
            campaigns[_campaignId].state == CampaignState.Active,
            "Campaign is not active."
        );
        _;
    }

    modifier notPaused(uint256 _campaignId) {
        require(
            campaigns[_campaignId].state != CampaignState.Paused,
            "Campaign is paused."
        );
        _;
    }

    modifier notCanceled(uint256 _campaignId) {
        require(
            campaigns[_campaignId].state != CampaignState.Canceled,
            "Campaign is canceled."
        );
        _;
    }

    modifier notExpired(uint256 _campaignId) {
        require(
            block.timestamp <= campaigns[_campaignId].deadline,
            "Campaign has expired."
        );
        _;
    }

    modifier notFinalized(uint256 _campaignId) {
        require(
            campaigns[_campaignId].state != CampaignState.Finalized,
            "Campaign is finalized."
        );
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function createCampaign(
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline
    ) public onlyAdmin {
        require(_deadline > block.timestamp, "Deadline must be in the future.");
        require(_target > 0, "Target must be greater than 0.");
        Campaign storage newCampaign = campaigns.push();
        newCampaign.title = _title;
        newCampaign.description = _description;
        newCampaign.target = _target;
        newCampaign.deadline = _deadline;
        newCampaign.state = CampaignState.Active;
    }

    function donateToCampaign(
        uint256 _campaignId
    ) public payable campaignIsOpen(_campaignId) notExpired(_campaignId) {
        Campaign storage campaign = campaigns[_campaignId];
        campaign.amountCollected += msg.value;
        campaign.donators.push(msg.sender);
        campaign.donations[msg.sender] += msg.value;
    }

    function pauseCampaign(
        uint256 _campaignId
    ) public onlyAdmin campaignIsOpen(_campaignId) {
        campaigns[_campaignId].state = CampaignState.Paused;
    }

    function resumeCampaign(
        uint256 _campaignId
    ) public onlyAdmin notPaused(_campaignId) {
        campaigns[_campaignId].state = CampaignState.Active;
    }

    function cancelCampaign(
        uint256 _campaignId
    ) public onlyAdmin notCanceled(_campaignId) {
        campaigns[_campaignId].state = CampaignState.Canceled;
    }

    function voteOnRequest(
        uint256 _campaignId,
        uint256 _requestId
    ) public onlyContributor(_campaignId) notCanceled(_campaignId) {
        Request storage request = campaignRequests[_campaignId][_requestId];
        require(!request.voters[msg.sender], "Already voted.");

        request.voters[msg.sender] = true;
        request.approvals++;
    }

    function createRequest(
        uint256 _campaignId,
        string memory _description,
        address _recipient,
        uint256 _amount
    ) public onlyAdmin campaignIsOpen(_campaignId) {
        Request storage newRequest = campaignRequests[_campaignId].push();
        newRequest.description = _description;
        newRequest.recipient = _recipient;
        newRequest.amount = _amount;
    }

    function finalizeRequest(
        uint256 _campaignId,
        uint256 _requestId
    ) public onlyAdmin {
        Request storage request = campaignRequests[_campaignId][_requestId];
        Campaign storage campaign = campaigns[_campaignId];

        require(!request.completed, "Request already completed.");
        require(
            request.approvals > campaign.donators.length / 2,
            "Not enough approvals."
        );

        request.completed = true;
        payable(request.recipient).transfer(request.amount);
    }

    function refundDonors(
        uint256 _campaignId
    ) public onlyAdmin notCanceled(_campaignId) {
        Campaign storage campaign = campaigns[_campaignId];
        require(
            campaign.state == CampaignState.Canceled ||
                campaign.state == CampaignState.Expired,
            "Refund not allowed."
        );

        for (uint256 i = 0; i < campaign.donators.length; i++) {
            address donator = campaign.donators[i];
            uint256 donation = campaign.donations[donator];
            campaign.donations[donator] = 0;
            payable(donator).transfer(donation);
        }
    }

    function getCampaignDetails(
        uint256 _campaignId
    )
        public
        view
        returns (
            string memory,
            string memory,
            uint256,
            uint256,
            uint256,
            CampaignState
        )
    {
        Campaign storage campaign = campaigns[_campaignId];
        return (
            campaign.title,
            campaign.description,
            campaign.target,
            campaign.deadline,
            campaign.amountCollected,
            campaign.state
        );
    }

    function myRecords()
        public
        view
        returns (uint256[] memory, uint256[] memory)
    {
        uint256 campaignCount = campaigns.length;
        uint256[] memory contributedCampaigns = new uint256[](campaignCount);
        uint256[] memory amounts = new uint256[](campaignCount);
        uint256 index = 0;

        for (uint256 i = 0; i < campaignCount; i++) {
            if (campaigns[i].donations[msg.sender] > 0) {
                contributedCampaigns[index] = i;
                amounts[index] = campaigns[i].donations[msg.sender];
                index++;
            }
        }
        return (contributedCampaigns, amounts);
    }
}

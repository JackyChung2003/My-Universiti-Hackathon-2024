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
        address[] donators;
        uint256[] donations;
    }

    mapping(uint256 => Campaign) public campaigns;
    uint256 public numberOfCampaigns = 0;

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

        numberOfCampaigns++;
        return numberOfCampaigns - 1;
    }

    // Function for users to donate to the campaign
    function donateToCampaign(uint256 _campaignId) public payable {
        Campaign storage campaign = campaigns[_campaignId];
        require(!campaign.paused, "Campaign is paused.");
        require(
            block.timestamp < campaign.deadline,
            "Campaign deadline has passed."
        );
        require(!campaign.finalized, "Campaign is already finalized.");

        campaign.donators.push(msg.sender);
        campaign.donations.push(msg.value);
        campaign.amountCollected += msg.value;
    }

    // Admin function to finalize the campaign
    function finalizeCampaign(uint256 _campaignId) public {
        Campaign storage campaign = campaigns[_campaignId];
        require(
            msg.sender == campaign.owner,
            "Only the owner can finalize the campaign."
        );
        require(
            block.timestamp >= campaign.deadline ||
                campaign.amountCollected >= campaign.target,
            "Campaign cannot be finalized yet."
        );
        require(!campaign.finalized, "Campaign is already finalized.");

        campaign.finalized = true;
        (bool sent, ) = campaign.owner.call{value: campaign.amountCollected}(
            ""
        );
        require(sent, "Failed to transfer funds.");
    }

    // Admin function to pause the campaign
    function pauseCampaign(uint256 _campaignId) public {
        Campaign storage campaign = campaigns[_campaignId];
        require(
            msg.sender == campaign.owner,
            "Only the owner can pause the campaign."
        );
        campaign.paused = !campaign.paused;
    }

    // Admin function to update the campaign details
    function updateCampaignDetails(
        uint256 _campaignId,
        string memory _title,
        string memory _description
    ) public {
        Campaign storage campaign = campaigns[_campaignId];
        require(
            msg.sender == campaign.owner,
            "Only the owner can update the campaign."
        );
        campaign.title = _title;
        campaign.description = _description;
    }
}

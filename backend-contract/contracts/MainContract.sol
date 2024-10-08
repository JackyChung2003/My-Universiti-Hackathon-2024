// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./CampaignManagement.sol";
import "./OwnershipAndRevenue.sol";
import "./FundAllocationTracking.sol";
import "./Feedback.sol";

contract MainContract is
    CampaignManagement,
    OwnershipAndRevenue,
    FundAllocationTracking,
    Feedback
{
    // This contract will combine all the functionalities from CampaignManagement,
    // OwnershipAndRevenue, FundAllocationTracking, and Feedback contracts.
}

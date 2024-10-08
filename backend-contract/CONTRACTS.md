# Smart Contract Summary

This document provides an overview of the smart contracts used in the **Crowdfunding EV Charging Infrastructure** project, including their purpose and key functions.

---

## 1. CampaignManagement.sol

**Purpose**:  
Handles campaign creation, user donations, and campaign finalization.  
Funds are held until the campaign reaches its target or deadline.

**Functions**:

- **createCampaign**: Allows an admin to create a new campaign.
- **donateToCampaign**: Allows users/investors to donate to a campaign.
- **finalizeCampaign**: Finalizes the campaign once it's completed and ready for fund distribution.
- **pauseCampaign**: Admin can pause the campaign temporarily.
- **updateCampaignDetails**: Admin can update campaign details.

---

## 2. OwnershipAndRevenue.sol

**Purpose**:  
Distributes ownership tokens to contributors and manages revenue distribution once the campaign is successful.

**Functions**:

- **distributeOwnershipTokens**: Distributes tokens representing ownership of the campaign or station.
- **distributeRevenue**: Automatically distributes revenue to the token holders.
- **allocateMaintenanceFund**: Allocates funds for maintenance and other operational costs.

---

## 3. FundAllocationTracking.sol

**Purpose**:  
Tracks fund allocation and logs how funds are being used.

**Functions**:

- **initializeFundAllocation**: Admin initializes the allocation of funds to different tasks.
- **logFundUsage**: Admin can log how much of the allocated funds have been spent.
- **viewFundUsage**: Users can view the details of fund allocation and usage for transparency.

---

## 4. Feedback.sol

**Purpose**:  
Allows users to submit feedback about campaigns or the platform in general.

**Functions**:

- **submitFeedback**: Allows users to submit feedback.
- **viewFeedback**: Allows anyone to view the feedback submitted.

---

## 5. MainContract.sol

**Purpose**:  
The main contract that interacts with all the individual components, providing a unified interface for creating campaigns, managing funds, and interacting with the platform.

---

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EVCrowdfunding {
    string public name;
    string public description;
    uint256 public goal;
    uint256 public deadline;
    address public owner;
    bool public paused;

    // Event to capture donations with campaign address
    event DonationReceived(
        address indexed campaign,
        address indexed donor,
        uint256 amount
    );

    enum CampaignState {
        Active,
        Successful,
        Failed,
        Paused,
        Canceled,
        Finalized,
        Expired
    }
    CampaignState public state;
    uint256 public finalAmountCollected; // global variable to store the final amount collected
    uint256 public currentContributions; // variable to track current contributions
    uint256 public donorNumber; // variable to track the number of unique donors

    struct Backer {
        uint256 totalContribution;
        bool exists; // Track if this address has already donated
    }

    mapping(address => Backer) public backers;
    address[] public donorAddresses; // Store unique donor addresses
    mapping(address => uint256) public backupContributions; // Backup contributions for all donors

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner.");
        _;
    }

    modifier campaignOpen() {
        require(state == CampaignState.Active, "Campaign is not active.");
        _;
    }

    modifier notPaused() {
        require(!paused, "Contract is paused.");
        _;
    }

    modifier notFinalized() {
        require(
            state != CampaignState.Finalized,
            "Campaign already finalized."
        );
        _;
    }

    constructor(
        address _owner,
        string memory _name,
        string memory _description,
        uint256 _goal,
        uint256 _durationInDays
    ) {
        name = _name;
        description = _description;
        goal = _goal;
        deadline = block.timestamp + (_durationInDays * 1 days);
        owner = _owner;
        state = CampaignState.Active;
    }

    function checkAndUpdateCampaignState() internal {
        if (state == CampaignState.Active && block.timestamp >= deadline) {
            state = address(this).balance >= goal
                ? CampaignState.Successful
                : CampaignState.Failed;
        }
    }

    function fund(address donor) public payable campaignOpen notPaused {
        require(msg.value > 0, "Donation amount must be greater than zero.");

        // Check if the donor has contributed before
        if (!backers[donor].exists) {
            backers[donor] = Backer({
                totalContribution: msg.value,
                exists: true
            });
            donorAddresses.push(donor); // Store the donor address if new
            donorNumber++; // Increment the donor number for a new contributor
        } else {
            // If already exists, just increase their contribution
            backers[donor].totalContribution += msg.value;
        }

        // Update currentContributions with the new donation amount
        currentContributions += msg.value;

        // Emit the event with campaign address, donor address, and amount
        emit DonationReceived(address(this), donor, msg.value);

        // backers[msg.sender].totalContribution += msg.value;
        checkAndUpdateCampaignState();
    }

    // Get all donors and their contributions
    function getDonators()
        public
        view
        returns (address[] memory, uint256[] memory)
    {
        uint256 numDonors = donorAddresses.length;
        address[] memory donors = new address[](numDonors);
        uint256[] memory contributions = new uint256[](numDonors);

        for (uint256 i = 0; i < numDonors; i++) {
            address donor = donorAddresses[i]; // Get the donor's address
            donors[i] = donor;
            contributions[i] = backers[donor].totalContribution; // Fetch the correct contribution
        }

        return (donors, contributions);
    }

    function withdraw() public {
        checkAndUpdateCampaignState();
        require(state == CampaignState.Successful, "Campaign not successful.");

        uint256 balance = address(this).balance;
        require(balance > 0, "No balance to withdraw.");

        payable(owner).transfer(balance);
    }

    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function refund() public {
        require(state == CampaignState.Failed, "Refunds not available.");
        uint256 amount = backers[msg.sender].totalContribution;
        require(amount > 0, "No contribution to refund.");

        backers[msg.sender].totalContribution = 0;
        payable(msg.sender).transfer(amount);
    }

    function getAllBackers() public view returns (address[] memory) {
        uint256 count = 0;

        // Count the number of unique backers
        for (uint256 i = 0; i < block.number; i++) {
            if (backers[address(uint160(i))].totalContribution > 0) {
                count++;
            }
        }

        // Create an array to store backers
        address[] memory backerAddresses = new address[](count);
        uint256 index = 0;

        // Populate the array with backers who have contributed
        for (uint256 i = 0; i < block.number; i++) {
            address potentialBacker = address(uint160(i));
            if (backers[potentialBacker].totalContribution > 0) {
                backerAddresses[index] = potentialBacker;
                index++;
            }
        }

        return backerAddresses;
    }

    function pauseCampaign() public campaignOpen {
        state = CampaignState.Paused;
    }

    function resumeCampaign() public {
        require(state == CampaignState.Paused, "Not paused.");
        state = CampaignState.Active;
    }

    function cancelCampaign() public campaignOpen {
        state = CampaignState.Canceled;
    }

    function extendDeadline(uint256 _daysToAdd) public campaignOpen {
        deadline += _daysToAdd * 1 days;
    }

    function togglePause() public {
        paused = !paused;
    }

    function getCampaignStatus() public view returns (CampaignState) {
        if (state == CampaignState.Active && block.timestamp > deadline) {
            return
                address(this).balance >= goal
                    ? CampaignState.Successful
                    : CampaignState.Failed;
        }
        return state;
    }

    function myRecords() public view returns (uint256) {
        return backers[msg.sender].totalContribution;
    }

    // Function to finalize the campaign
    function finalizeCampaign() external notFinalized {
        // Check if the campaign goal was met and update the state
        if (address(this).balance >= goal) {
            state = CampaignState.Successful;
        } else {
            state = CampaignState.Failed;
        }

        // Record the final amount collected in the campaign
        finalAmountCollected = address(this).balance;

        // Get all donors and their contributions
        (
            address[] memory donors,
            uint256[] memory contributions
        ) = getDonators();

        // Backup contributions for all donors
        for (uint256 i = 0; i < donors.length; i++) {
            backupContributions[donors[i]] = contributions[i]; // Store contributions for future use
        }
        // Update the campaign state to finalized
        state = CampaignState.Finalized;
    }

    function isFinalized() public view returns (bool) {
        return state == CampaignState.Finalized;
    }

    // Function to return final amount collected in the campaign
    function getFinalAmountCollected() public view returns (uint256) {
        return finalAmountCollected;
    }
}

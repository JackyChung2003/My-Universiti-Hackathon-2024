// pragma solidity ^0.8.0;

// contract Crowdfunding {
//     string public name;
//     string public description;
//     uint256 public goal;
//     uint256 public deadline;
//     address public owner;
//     bool public paused;

//     // enum CampaignState {
//     //     Active,
//     //     Successful,
//     //     Failed
//     // }

//     enum CampaignState {
//         Active,
//         Successful,
//         Failed,
//         Paused,
//         Canceled,
//         Finalized,
//         Expired
//     }
//     CampaignState public state;

//     // struct Tier {
//     //     string name;
//     //     uint256 amount;
//     //     uint256 backers;
//     // }

//     struct Backer {
//         uint256 totalContribution;
//         // mapping(uint256 => bool) fundedTiers;
//     }

//     // Tier[] public tiers;
//     mapping(address => Backer) public backers;

//     modifier onlyOwner() {
//         require(msg.sender == owner, "Not the owner");
//         _;
//     }

//     modifier campaignOpen() {
//         require(state == CampaignState.Active, "Campaign is not active.");
//         _;
//     }

//     modifier notPaused() {
//         require(!paused, "Contract is paused.");
//         _;
//     }

//     constructor(
//         address _owner,
//         string memory _name,
//         string memory _description,
//         uint256 _goal,
//         uint256 _duratyionInDays
//     ) {
//         name = _name;
//         description = _description;
//         goal = _goal;
//         deadline = block.timestamp + (_duratyionInDays * 1 days);
//         owner = _owner;
//         state = CampaignState.Active;
//     }

//     function checkAndUpdateCampaignState() internal {
//         if (state == CampaignState.Active) {
//             if (block.timestamp >= deadline) {
//                 state = address(this).balance >= goal
//                     ? CampaignState.Successful
//                     : CampaignState.Failed;
//             } else {
//                 state = address(this).balance >= goal
//                     ? CampaignState.Successful
//                     : CampaignState.Active;
//             }
//         }
//     }

//     // function fund(uint256 _tierIndex) public payable campaignOpen notPaused {
//     //     require(_tierIndex < tiers.length, "Invalid tier.");
//     //     require(msg.value == tiers[_tierIndex].amount, "Incorrect amount.");

//     //     tiers[_tierIndex].backers++;
//     //     backers[msg.sender].totalContribution += msg.value;
//     //     backers[msg.sender].fundedTiers[_tierIndex] = true;

//     //     checkAndUpdateCampaignState();
//     // }

//     // Allow users to donate any amount
//     function fund() public payable campaignOpen notPaused {
//         require(msg.value > 0, "Donation amount must be greater than zero.");

//         backers[msg.sender].totalContribution += msg.value;

//         checkAndUpdateCampaignState();
//     }

//     // function refundDonors() public onlyOwner {
//     //     require(
//     //         state == CampaignState.Canceled || state == CampaignState.Failed,
//     //         "Refund not allowed."
//     //     );
//     //     for (uint256 i = 0; i < tiers.length; i++) {
//     //         address donor = tiers[i].donators[i]; // Assume you modify tiers to store donators
//     //         uint256 donation = backers[donor].totalContribution;
//     //         backers[donor].totalContribution = 0;
//     //         payable(donor).transfer(donation);
//     //     }
//     // }

//     // Refund logic for failed or canceled campaigns
//     function refundDonors() public onlyOwner {
//         require(
//             state == CampaignState.Canceled || state == CampaignState.Failed,
//             "Refund not allowed."
//         );

//         for (uint256 i = 0; i < getAllBackers().length; i++) {
//             address donor = getAllBackers()[i];
//             uint256 donation = backers[donor].totalContribution;
//             backers[donor].totalContribution = 0;

//             payable(donor).transfer(donation);
//         }
//     }

//     // function addTier(string memory _name, uint256 _amount) public onlyOwner {
//     //     require(_amount > 0, "Amount must be greater than 0.");
//     //     tiers.push(Tier(_name, _amount, 0));
//     // }

//     // function removeTier(uint256 _index) public onlyOwner {
//     //     require(_index < tiers.length, "Tier does not exist.");
//     //     tiers[_index] = tiers[tiers.length - 1];
//     //     tiers.pop();
//     // }

//     function withdraw() public onlyOwner {
//         checkAndUpdateCampaignState();
//         require(state == CampaignState.Successful, "Campaign not successful.");

//         uint256 balance = address(this).balance;
//         require(balance > 0, "No balance to withdraw");

//         payable(owner).transfer(balance);
//     }

//     function getContractBalance() public view returns (uint256) {
//         return address(this).balance;
//     }

//     function refund() public {
//         checkAndUpdateCampaignState();
//         require(state == CampaignState.Failed, "Refunds not available.");
//         uint256 amount = backers[msg.sender].totalContribution;
//         require(amount > 0, "No contribution to refund");

//         backers[msg.sender].totalContribution = 0;
//         payable(msg.sender).transfer(amount);
//     }

//     // function hasFundedTier(
//     //     address _backer,
//     //     uint256 _tierIndex
//     // ) public view returns (bool) {
//     //     return backers[_backer].fundedTiers[_tierIndex];
//     }

//     // function getTiers() public view returns (Tier[] memory) {
//     //     return tiers;
//     // }

//     function togglePause() public onlyOwner {
//         paused = !paused;
//     }

//     function getCampaignStatus() public view returns (CampaignState) {
//         if (state == CampaignState.Active && block.timestamp > deadline) {
//             return
//                 address(this).balance >= goal
//                     ? CampaignState.Successful
//                     : CampaignState.Failed;
//         }
//         return state;
//     }

//     function getAllBackers() public view returns (address[] memory) {
//         uint256 count = 0;

//         // Count the number of unique backers
//         for (uint256 i = 0; i < block.number; i++) {
//             if (backers[address(uint160(i))].totalContribution > 0) {
//                 count++;
//             }
//         }

//         // Create an array to store backers
//         address[] memory backerAddresses = new address[](count);
//         uint256 index = 0;

//         // Populate the array with backers who have contributed
//         for (uint256 i = 0; i < block.number; i++) {
//             address potentialBacker = address(uint160(i));
//             if (backers[potentialBacker].totalContribution > 0) {
//                 backerAddresses[index] = potentialBacker;
//                 index++;
//             }
//         }

//         return backerAddresses;
//     }

//     function pauseCampaign() public onlyOwner campaignOpen {
//         state = CampaignState.Paused;
//     }

//     function resumeCampaign() public onlyOwner {
//         require(state == CampaignState.Paused, "Not paused.");
//         state = CampaignState.Active;
//     }

//     function cancelCampaign() public onlyOwner campaignOpen {
//         state = CampaignState.Canceled;
//     }

//     function extendDeadline(uint256 _daysToAdd) public onlyOwner campaignOpen {
//         deadline += _daysToAdd * 1 days;
//     }

//     // Get all campaigns the user has contributed to
//     function myRecords() public view returns (uint256) {
//         return backers[msg.sender].totalContribution;
//     }
// }

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

    // function checkAndUpdateCampaignState() internal {
    //     if (state == CampaignState.Active) {
    //         if (block.timestamp >= deadline) {
    //             state = address(this).balance >= goal
    //                 ? CampaignState.Successful
    //                 : CampaignState.Failed;
    //         } else {
    //             state = address(this).balance >= goal
    //                 ? CampaignState.Successful
    //                 : CampaignState.Active;
    //         }
    //     }
    // }

    function checkAndUpdateCampaignState() internal {
        if (state == CampaignState.Active && block.timestamp >= deadline) {
            state = address(this).balance >= goal
                ? CampaignState.Successful
                : CampaignState.Failed;
        }
    }

    function fund(address donor) public payable campaignOpen notPaused {
        require(msg.value > 0, "Donation amount must be greater than zero.");

        // // If this is the donor's first contribution, store their address
        // if (!backers[msg.sender].exists) {
        //     backers[msg.sender].exists = true;
        //     donorAddresses.push(msg.sender);
        // }
        // If this is the donor's first contribution, store their address
        // if (!backers[msg.sender].exists) {
        //     backers[msg.sender] = Backer(msg.value, true);
        //     donorAddresses.push(msg.sender);
        // } else {
        //     backers[msg.sender].totalContribution += msg.value;
        // }

        // Check if the donor has contributed before
        if (!backers[donor].exists) {
            backers[donor] = Backer({
                totalContribution: msg.value,
                exists: true
            });
            donorAddresses.push(donor); // Store the donor address if new
        } else {
            // If already exists, just increase their contribution
            backers[donor].totalContribution += msg.value;
        }

        // Emit the event with campaign address, donor address, and amount
        emit DonationReceived(address(this), donor, msg.value);

        // backers[msg.sender].totalContribution += msg.value;
        checkAndUpdateCampaignState();
    }

    // function refundDonors() public onlyOwner {
    //     require(
    //         state == CampaignState.Canceled || state == CampaignState.Failed,
    //         "Refund not allowed."
    //     );

    //     address[] memory donors = getAllBackers();
    //     for (uint256 i = 0; i < donors.length; i++) {
    //         address donor = donors[i];
    //         uint256 donation = backers[donor].totalContribution;
    //         backers[donor].totalContribution = 0;
    //         payable(donor).transfer(donation);
    //     }
    // }

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
            // donors[i] = donorAddresses[i];
            // contributions[i] = backers[donorAddresses[i]].totalContribution;

            address donor = donorAddresses[i]; // Get the donor's address
            donors[i] = donor;
            contributions[i] = backers[donor].totalContribution; // Fetch the correct contribution
        }

        return (donors, contributions);
    }

    // function refundDonors() public {
    //     require(
    //         state == CampaignState.Canceled || state == CampaignState.Failed,
    //         "Refund not allowed."
    //     );

    //     address[] memory donors = getAllBackers();
    //     for (uint256 i = 0; i < donors.length; i++) {
    //         address donor = donors[i];
    //         uint256 donation = backers[donor].totalContribution;
    //         backers[donor].totalContribution = 0;
    //         payable(donor).transfer(donation);
    //     }
    // }

    // function withdraw() public onlyOwner {
    //     checkAndUpdateCampaignState();
    //     require(state == CampaignState.Successful, "Campaign not successful.");

    //     uint256 balance = address(this).balance;
    //     require(balance > 0, "No balance to withdraw.");

    //     payable(owner).transfer(balance);
    // }

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

    // // Only refund if the campaign has failed, and the backer has contributed, and contract must hold enough balance to refund:
    // function refund() public {
    //     checkAndUpdateCampaignState();
    //     require(state == CampaignState.Failed, "Refunds not available.");

    //     uint256 amount = backers[msg.sender].totalContribution;
    //     require(amount > 0, "No contribution to refund.");

    //     backers[msg.sender].totalContribution = 0;
    //     payable(msg.sender).transfer(amount);
    // }

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

    // function pauseCampaign() public onlyOwner campaignOpen {
    //     state = CampaignState.Paused;
    // }

    function pauseCampaign() public campaignOpen {
        state = CampaignState.Paused;
    }

    // function resumeCampaign() public onlyOwner {
    //     require(state == CampaignState.Paused, "Not paused.");
    //     state = CampaignState.Active;
    // }

    function resumeCampaign() public {
        require(state == CampaignState.Paused, "Not paused.");
        state = CampaignState.Active;
    }

    // function cancelCampaign() public onlyOwner campaignOpen {
    //     state = CampaignState.Canceled;
    // }

    function cancelCampaign() public campaignOpen {
        state = CampaignState.Canceled;
    }

    // function extendDeadline(uint256 _daysToAdd) public onlyOwner campaignOpen {
    //     deadline += _daysToAdd * 1 days;
    // }

    function extendDeadline(uint256 _daysToAdd) public campaignOpen {
        deadline += _daysToAdd * 1 days;
    }

    // function togglePause() public onlyOwner {
    //     paused = !paused;
    // }

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

    // function finalizeCampaign() public onlyOwner {
    //     require(state == CampaignState.Successful, "Campaign not successful.");

    //     state = CampaignState.Finalized;
    // }

    // Function to finalize the campaign
    function finalizeCampaign() external notFinalized {
        // // Check if the campaign goal was met
        // if (address(this).balance >= goal) {
        //     state = CampaignState.Successful;
        //     // Send funds to the campaign owner
        //     payable(owner).transfer(address(this).balance);
        // } else {
        //     state = CampaignState.Failed;
        // }

        // // Update campaign state to finalized
        // state = CampaignState.Finalized;

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

    // Function to return final amount collected in the campaign
    function getFinalAmountCollected() public view returns (uint256) {
        return finalAmountCollected;
    }
}

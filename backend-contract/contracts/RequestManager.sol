// pragma solidity ^0.8.0;

// contract RequestManager {
//     struct Request {
//         string title;
//         string description;
//         address recipient; // Vendor address to receive funds
//         uint256 amount;
//         bool completed;
//         uint256 approvals;
//         mapping(address => bool) voters;
//     }

//     // Mapping to link each campaign to its requests
//     mapping(address => Request[]) public campaignRequests;

//     // Events for request creation and approval
//     event RequestCreated(
//         address indexed campaign,
//         uint256 requestId,
//         string title,
//         string description,
//         address recipient,
//         uint256 amount
//     );
//     event RequestApproved(
//         address indexed campaign,
//         uint256 requestId,
//         address voter
//     );
//     event RequestFinalized(address indexed campaign, uint256 requestId);

//     // Modifier to ensure only campaign contributors can vote
//     modifier onlyContributor(address _campaign, address _voter) {
//         require(
//             campaigns[_campaignId].donations[msg.sender] > 0,
//             "Not a contributor."
//         );
//         _;
//     }

//     // Create a new request for a campaign
//     function createRequest(
//         address _campaign,
//         string memory _title,
//         string memory _description,
//         address _recipient,
//         uint256 _amount
//     ) public {
//         Request storage newRequest = campaignRequests[_campaign].push();
//         newRequest.title = _title;
//         newRequest.description = _description;
//         newRequest.recipient = _recipient;
//         newRequest.amount = _amount;

//         emit RequestCreated(
//             _campaign,
//             campaignRequests[_campaign].length - 1,
//             _title,
//             _description,
//             _recipient,
//             _amount
//         );
//     }

//     // Vote for a request to approve it
//     function voteRequest(address _campaign, uint256 _requestId) public {
//         Request storage request = campaignRequests[_campaign][_requestId];
//         require(!request.voters[msg.sender], "Already voted.");

//         request.voters[msg.sender] = true;
//         request.approvals++;

//         emit RequestApproved(_campaign, _requestId, msg.sender);
//     }

//     // Finalize a request and transfer funds to the recipient
//     function finalizeRequest(address _campaign, uint256 _requestId) public {
//         Request storage request = campaignRequests[_campaign][_requestId];
//         require(!request.completed, "Request already completed.");
//         require(request.approvals > 1, "Not enough approvals."); // Simplified approval logic

//         request.completed = true;
//         payable(request.recipient).transfer(request.amount);

//         emit RequestFinalized(_campaign, _requestId);
//     }

//     // Get all requests for a campaign
//     function getRequests(
//         address _campaign
//     ) public view returns (Request[] memory) {
//         return campaignRequests[_campaign];
//     }
// }

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RequestManager {
    string public requestTitle;
    string public requestDescription;
    address public recipient;
    uint256 public amount;
    bool public completed;
    // uint256 public approvals;
    uint256 public totalVotingPower;
    uint256 public requiredApprovalPercentage;

    // deadline for the request to be approved by all funders
    uint256 public requestDeadline;
    // deadline for the request to be processed to the recipient (Days after the requestDeadline)
    uint256 public processingDeadline;
    // mapping(address => bool) public voters;
    mapping(address => bool) public hasVoted;

    address[] public voterAddresses; // Array to store all the voters

    enum RequestState {
        Pending,
        Approved,
        Rejected,
        Failed,
        Completed
    }
    RequestState public state;

    address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    // modifier onlyContributor(address _campaign, address _voter) {
    //     require(contributors[_voter] > 0, "Not a contributor.");
    //     _;
    // }

    modifier onlyContributor(address _voter) {
        require(hasVoted[_voter], "Not a contributor.");
        _;
    }

    modifier notFinalized() {
        require(
            state != RequestState.Completed,
            "Request has already been finalized."
        );
        _;
    }

    constructor(
        address _owner,
        string memory _requestTitle,
        string memory _requestDescription,
        address _recipient,
        uint256 _amount,
        uint256 _requestDeadline,
        uint256 _processingDeadline,
        uint256 _requiredApprovalPercentage
    ) {
        owner = _owner;
        requestTitle = _requestTitle;
        requestDescription = _requestDescription;
        recipient = _recipient;
        amount = _amount;
        requestDeadline = _requestDeadline;
        processingDeadline = _processingDeadline + requestDeadline;
        requiredApprovalPercentage = _requiredApprovalPercentage;
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

    // Function to approve a request from valid contributors for this particular campaign only
    // function voteRequest() public onlyContributor(msg.sender) {
    //     require(!voters[msg.sender], "Already voted.");
    //     voters[msg.sender] = true;
    //     approvals++;
    //     if (approvals > 1) {
    //         state = RequestState.Approved;
    //     }
    // }

    // Function to record a vote from the factory contract
    function recordVote(address voter, uint256 votingPower) external {
        require(!hasVoted[voter], "Already voted.");
        require(state == RequestState.Pending, "Request not pending.");

        hasVoted[voter] = true;
        totalVotingPower += votingPower;

        // Check if required approval percentage is met
        if (totalVotingPower >= requiredApprovalPercentage) {
            state = RequestState.Approved;
        }
    }

    // Function to finalize a request and transfer funds to the recipient
    function finalizeRequest() public {
        // comment this out for testing purposes only
        // require(
        //     block.timestamp >= requestDeadline,
        //     "Request deadline not reached."
        // );
        // require(
        //     block.timestamp <= processingDeadline,
        //     "Processing deadline reached."
        // );

        // Check if total voting power has met the required approval percentage
        if (totalVotingPower >= requiredApprovalPercentage) {
            state = RequestState.Approved;
        } else {
            state = RequestState.Failed;
        }

        // If the request is approved, transfer the funds
        if (state == RequestState.Approved) {
            completed = true;
            payable(recipient).transfer(amount);
        }

        // Mark request as completed, whether it is approved or failed
        state = RequestState.Completed;

        // state = RequestState.Completed;
        // completed = true;
        // payable(recipient).transfer(amount);
    }

    // Function to return voting percentage
    function getCurrentVotingPowerProgress() public view returns (uint256) {
        return totalVotingPower;
    }

    // Function to extend the deadline for the request
    function extendRequstDeadline(uint256 _daysToAdd) public onlyOwner {
        requestDeadline += _daysToAdd * 1 days;
    }

    // Function to extend the deadline for the request to be processed
    function extendProcessingDeadline(uint256 _daysToAdd) public onlyOwner {
        processingDeadline += _daysToAdd * 1 days;
    }

    // Function to get the current state of the request
    function getRequestState() public view returns (RequestState) {
        return state;
    }

    // // Function to get all the voters for the request
    // function getVoters()
    //     public
    //     view
    //     returns (address[] memory, uint256[] memory)
    // {
    //     uint256 numVoters = approvals;
    //     address[] memory _voters = new address[](approvals);
    //     uint256[] memory _votes = new uint256[](approvals);
    //     uint256 index = 0;
    //     for (uint256 i = 0; i < approvals; i++) {
    //         // if (voters[msg.sender]) {
    //         //     _voters[index] = msg.sender;
    //         //     _votes[index] = 1;
    //         //     index++;
    //         // }
    //         address voter = msg.sender;
    //     }
    //     return (_voters, _votes);
    // }
}

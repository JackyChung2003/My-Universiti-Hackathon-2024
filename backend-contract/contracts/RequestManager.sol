// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RequestManager {
    string public requestTitle;
    string public requestDescription;
    address public recipient;
    uint256 public amount;
    bool public completed;
    uint256 public totalVotingPower;
    uint256 public requiredApprovalPercentage;

    // deadline for the request to be approved by all funders
    uint256 public requestDeadline;
    // deadline for the request to be processed to the recipient (Days after the requestDeadline)
    uint256 public processingDeadline;
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
}

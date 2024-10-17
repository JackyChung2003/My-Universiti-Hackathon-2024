// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Feedback {
    struct FeedbackMessage {
        address user;
        string message;
        uint256 timestamp;
    }

    FeedbackMessage[] public feedbacks;

    // Function to submit feedback
    function submitFeedback(string memory _message) public {
        feedbacks.push(
            FeedbackMessage({
                user: msg.sender,
                message: _message,
                timestamp: block.timestamp
            })
        );
    }

    // View feedbacks
    function viewFeedback() public view returns (FeedbackMessage[] memory) {
        return feedbacks;
    }
}

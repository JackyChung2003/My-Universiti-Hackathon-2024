// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract MyContract {
    string public message;

    constructor(string memory initMessage) {
        message = initMessage;
    }

    function updateMessage(string memory newMessage) public {
        message = newMessage;
    }
}

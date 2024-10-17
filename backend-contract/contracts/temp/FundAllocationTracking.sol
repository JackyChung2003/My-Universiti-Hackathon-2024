// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract FundAllocationTracking {
    struct FundAllocation {
        string task;
        uint256 allocatedAmount;
        uint256 spentAmount;
    }

    mapping(uint256 => FundAllocation[]) public fundAllocations;

    // Admin function to initialize fund allocation
    function initializeFundAllocation(
        uint256 _campaignId,
        string[] memory _tasks,
        uint256[] memory _allocations
    ) public {
        require(
            _tasks.length == _allocations.length,
            "Tasks and allocations length must match."
        );

        for (uint256 i = 0; i < _tasks.length; i++) {
            fundAllocations[_campaignId].push(
                FundAllocation({
                    task: _tasks[i],
                    allocatedAmount: _allocations[i],
                    spentAmount: 0
                })
            );
        }
    }

    // Admin function to log fund usage
    function logFundUsage(
        uint256 _campaignId,
        uint256 _taskId,
        uint256 _amountSpent
    ) public {
        FundAllocation storage allocation = fundAllocations[_campaignId][
            _taskId
        ];
        require(
            _amountSpent <= allocation.allocatedAmount,
            "Spent amount exceeds allocation."
        );
        allocation.spentAmount += _amountSpent;
    }

    // View the fund usage for transparency
    function viewFundUsage(
        uint256 _campaignId
    ) public view returns (FundAllocation[] memory) {
        return fundAllocations[_campaignId];
    }
}

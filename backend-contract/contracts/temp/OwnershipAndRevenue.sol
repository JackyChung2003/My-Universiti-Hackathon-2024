// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract OwnershipAndRevenue {
    struct Ownership {
        address investor;
        uint256 shares;
    }

    struct Revenue {
        uint256 totalRevenue;
        uint256 allocatedRevenue;
    }

    mapping(uint256 => Ownership[]) public ownerships;
    mapping(uint256 => Revenue) public revenues;

    // Admin function to distribute ownership tokens
    function distributeOwnershipTokens(
        uint256 _campaignId,
        address[] memory _investors,
        uint256[] memory _shares
    ) public {
        require(
            _investors.length == _shares.length,
            "Investors and shares length must match."
        );
        Ownership[] storage campaignOwnership = ownerships[_campaignId];

        for (uint256 i = 0; i < _investors.length; i++) {
            campaignOwnership.push(
                Ownership({investor: _investors[i], shares: _shares[i]})
            );
        }
    }

    // Function to distribute revenue among owners
    function distributeRevenue(uint256 _campaignId) public payable {
        Ownership[] storage campaignOwnership = ownerships[_campaignId];
        uint256 totalRevenue = msg.value;

        for (uint256 i = 0; i < campaignOwnership.length; i++) {
            uint256 investorShare = (campaignOwnership[i].shares *
                totalRevenue) / 100;
            payable(campaignOwnership[i].investor).transfer(investorShare);
        }
    }

    // Admin function to allocate maintenance funds
    function allocateMaintenanceFund(
        uint256 _campaignId,
        uint256 _amount
    ) public {
        revenues[_campaignId].allocatedRevenue = _amount;
    }
}

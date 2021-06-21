// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

contract SimpleStorage {
  string storeHash;

  function sethash(string memory x) public {
    storeHash = x;
  }

  function gethash() public view returns (string memory hash) {
    return storeHash;
  }
}

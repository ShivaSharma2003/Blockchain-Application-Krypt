// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

contract Transaction{
    uint256 TransactionCount;

    event Transfer(address from , address to , uint amount , string message , string keyword , uint256 timestamp);

    struct TransferStruct
    {
        address senderAdress;
        address receiverAdress;
        uint amount;
        string Message;
        string keyword;
        uint256 timestamp;
    }
    TransferStruct[] transactions;

    function addToBlockchain(address payable receiver , uint amount , string memory message , string memory keyword ) public{
        TransactionCount += 1;
        transactions.push(TransferStruct(msg.sender , receiver , amount , message , keyword , block.timestamp));

        emit Transfer(msg.sender, receiver, amount, message, keyword, block.timestamp);
    }

    function GetTransactions() public view returns (TransferStruct[] memory) {
        return transactions;
    }

    function GetTransactionCount() public view returns(uint256)
    {
        return TransactionCount;
    }
}
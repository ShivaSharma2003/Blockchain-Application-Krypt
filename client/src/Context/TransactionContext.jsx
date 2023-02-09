import { createContext, useEffect, useState } from "react";
import { ContractAddress, abi } from "../Utils/Constants";
import { ethers } from "ethers";

// creating Transaction context to share states with components
export const TransactionContext = createContext();

// gettin ethereum from window
const { ethereum } = window;

// -----------------------------------------------------------------------------------------------------------

// creating Transaction Contract

// with the help of abi and ContractAddress of our Solidity contract

// this will help us to sue our transaction contract function and events which we created with solidity contract

const CreateEthereumContract = async () => {
  const provider = await new ethers.BrowserProvider(ethereum); // using BrowserProvider instead of providers.web3Provider

  const signer = await provider.getSigner(); //getting signer of provider

  const transactionContract = new ethers.Contract(ContractAddress, abi, signer); //creating transaction contract

  return transactionContract; //returning transaction contract object
};

// -----------------------------------------------------------------------------------------------------------

// -----------------------------------------------------------------------------------------------------------

// Transaction Provider which will use to share state between components and context transactions

export const TransactionProvider = ({ children }) => {
  const [TransactionsCount, setTransactionsCount] = useState(
    localStorage.getItem("transactionsCount")
  );
  const [isLoading, setisLoading] = useState(false);
  const [StructuredTransactions, setStructuredTransactions] = useState([]);
  const [CurrentAccount, setCurrentAccount] = useState();
  const [formData, setformData] = useState({
    addressto: "",
    message: "",
    amount: "",
    keyword: "",
  });

  const inputHandler = (e) => {
    setformData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // -----------------------------------------------------------------------------------------------------------

  //   function for getting all transactions from blockchain

  const getAllTransaction = async () => {
    try {
      if (ethereum) {
        const TrasactionContract = await CreateEthereumContract(); //creating transaction contract

        const avaialableContract = await TrasactionContract.GetTransactions(); //using solidity contract function GetTransaction

        const structuredTransaction = await avaialableContract.map(
          (transactions) => ({
            addressto: transactions.receiverAdress,
            addressFrom: transactions.senderAdress,
            Message: transactions.Message,
            amount: transactions.amount,
            Keyword: transactions.keyword,
            timestamp: new Date(
              Number(transactions.timestamp) * 1000
            ).toLocaleString(),
          })
        );

        setStructuredTransactions(structuredTransaction); //setting value in structured Transaction state
      } else {
        console.log("ethereum not present");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // -----------------------------------------------------------------------------------------------------------

  // -----------------------------------------------------------------------------------------------------------
  // function for checking if metamask wallet is present in window or not

  // if present the then execute getAllTransactions function

  const CheckIfWalletIsConnect = async () => {
    try {
      if (!ethereum) return alert("ethereum not present");
      const account = await ethereum.request({ method: "eth_accounts" });
      setCurrentAccount(account[0]);
      if (account) {
        getAllTransaction();
      } else {
        console.log("No Account Detected");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // -----------------------------------------------------------------------------------------------------------

  // -----------------------------------------------------------------------------------------------------------

  // function for checking if Transaction exist

  // if transaction exist then we are storing transaction count in localstorage and sending to setTransacionCount state

  const checkIfTransactionExist = async () => {
    try {
      if (!ethereum) return alert("ethereum is not available");

      const transactionsContract = await CreateEthereumContract();

      const transactionCount = await transactionsContract.GetTransactionCount();

      localStorage.setItem("transactionsCount", Number(transactionCount));
    } catch (error) {
      console.log(error);
    }
  };

  // -----------------------------------------------------------------------------------------------------------

  //   function for connecting metamask wallet with our application

  //   and setting Curent Account State

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Ethereum is not available");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };
  // -----------------------------------------------------------------------------------------------------------

  // -----------------------------------------------------------------------------------------------------------
  const SendTransaction = async () => {
    try {
      if (!ethereum) alert("ethereum is not available");

      const { addressto, amount, keyword, message } = formData;

      const TransactionContract = await CreateEthereumContract();

      const parsedAmount = ethers.parseEther(amount);

      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: CurrentAccount,
            to: addressto,
            gas: "0x4302",
            value: parsedAmount.toString(16),
          },
        ],
      });

      const transactionHash = await TransactionContract.addToBlockchain(
        addressto,
        parsedAmount,
        message,
        keyword
      );

      setisLoading(true);
      await transactionHash.wait();
      setisLoading(false)
    } catch (error) {
      console.log(error);
    }
  };
  // -----------------------------------------------------------------------------------------------------------

  // -----------------------------------------------------------------------------------------------------------

  useEffect(() => {
    checkIfTransactionExist();

    CheckIfWalletIsConnect();
  }, []);

  // -----------------------------------------------------------------------------------------------------------

  // -----------------------------------------------------------------------------------------------------------

  //   sending all states and values with the help of context
  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        inputHandler,
        setformData,
        SendTransaction,
        CurrentAccount,
        StructuredTransactions,
        TransactionsCount,
        formData,
        isLoading
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

// -----------------------------------------------------------------------------------------------------------

import React, { useContext } from "react";
import { SiEthereum } from "react-icons/si";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { TransactionContext } from "../Context/TransactionContext";
import { ShortenAddress } from "../Utils/shotenAddress";

const Welcome = () => {
  const {
    StructuredTransactions,
    TransactionsCount,
    inputHandler,
    formData,
    setformData,
    SendTransaction,
    CurrentAccount,
    isLoading,
  } = useContext(TransactionContext);

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      !formData.addressto ||
      !formData.message ||
      !formData.amount ||
      !formData.keyword
    )
      return;
    SendTransaction();
  };

  return (
    <div className="flex flex-col sm:flex-row w-full justify-center items-center p-4">
      <div className="flex flex-col items-center justify-center gap-2 w-full ">
        <h1 className="text-white/75 font-bold text-2xl ">
          Transfer Crypto In Seconds
        </h1>
        <h3 className="text-white/50 text-sm font-semibold justify-start ">
          Lorem ipsum dolor sit
        </h3>
        <h6 className="text-white/30 text-xs justify-start font-semibold">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
          exercitationem a, assumenda aliquid, et iure, amet quasi omnis ad hic
          molestias incidunt. Impedit facilis eos corporis totam molestiae
          blanditiis numquam?
        </h6>
      </div>
      <div className="flex flex-col w-full justify-center items-center p-4 rounded gap-10 ">
        <div className="h-[12rem] max-w-[25rem] w-full rounded-lg bg-[url('/public/Ethereum.png')] bg-contain bg-center">
          <div className="backdrop-blur-xl h-full w-full bg-white/200 flex flex-col rounded-xl">
            <div className="flex flex-row justify-between px-4 py-2 flex-1">
              <div className="bg-violet-800 h-9 w-9 rounded-full flex items-center justify-center">
                <SiEthereum
                  fontSize={20}
                  color="white"
                  className="cursor-pointer "
                />
              </div>
              <HiOutlineInformationCircle
                fontSize={20}
                color="white"
                className="cursor-pointer "
              />
            </div>
            <div className="flex flex-col w-full p-4 gap-2">
              <h1 className="text-white text-sm font-bold">Ethereum</h1>
              {CurrentAccount ? (
                <p className="text-white text-md">
                  {ShortenAddress(CurrentAccount)}
                </p>
              ) : (
                <p className="text-white text-md">Connect Wallet</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex w-full border-2 border-white/30 max-w-[25rem] rounded-lg flex-col justify-center items-center gap-2 p-4">
          <div className="bg-blue-600 h-12 w-12 rounded-full flex items-center justify-center">
            <SiEthereum
              fontSize={20}
              color="white"
              className="cursor-pointer "
            />
          </div>
          <form className="flex flex-col gap-4 px-6 py-4 w-full ">
            <input
              type="text"
              name="addressto"
              placeholder="address"
              onChange={inputHandler}
              value={formData.addressto}
              className="py-2 px-4 bg-transparent border-2 border-gray-700 placeholder:text-gray-600 focus:border-gray-300 rounded-full placeholder:capitalize text-white "
            />
            <input
              type="number"
              name="amount"
              placeholder="amount"
              step={0.0001}
              min={0}
              onChange={inputHandler}
              value={formData.amount}
              className="py-2 px-4 bg-transparent border-2 border-gray-700 placeholder:text-gray-600 focus:border-gray-300 rounded-full placeholder:capitalize text-white "
            />
            <input
              type="text"
              name="keyword"
              placeholder="keyword"
              onChange={inputHandler}
              value={formData.keyword}
              className="py-2 px-4 bg-transparent border-2 border-gray-700 placeholder:text-gray-600 focus:border-gray-300 rounded-full placeholder:capitalize text-white "
            />
            <input
              type="text"
              name="message"
              placeholder="message"
              onChange={inputHandler}
              value={formData.message}
              className="py-2 px-4 bg-transparent border-2 border-gray-700 placeholder:text-gray-600 focus:border-gray-300 rounded-full placeholder:capitalize text-white "
            />
            <button
              className="border-2 border-gray-800 rounded-full px-7 py-[8px] text-gray-500 hover:text-white hover:border-white transition-all duration-500 gap-2 flex items-center justify-center"
              onClick={submitHandler}
              disabled={isLoading}
            >
              <SiEthereum />
              <span>{isLoading ? "Processing..." : "Process Transfer"}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Welcome;

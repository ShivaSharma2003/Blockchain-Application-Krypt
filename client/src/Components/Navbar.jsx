import React, { useContext } from "react";
import { HiMenu } from "react-icons/hi";
import { SiEthereum } from "react-icons/si";
import { TransactionContext } from "../Context/TransactionContext";

const Navbar = () => {
  const { CurrentAccount, connectWallet } = useContext(TransactionContext);
  return (
    <div className="w-full border-b-2 border-gray-600 h-14 flex flex-row px-4">
      <div className="flex-[0.5] h-full flex items-center justify-start sm:justify-center">
        <h2 className="text-gray-200 cursor-pointer text-2xl font-semibold">
          Krypto
        </h2>
      </div>
      <div className="flex-[0.5] flex flex-row items-center justify-end md:justify-center h-full">
        <div className="flex md:hidden w-full items-center justify-end h-full ">
          <HiMenu color="white" fontSize={28} className="cursor-pointer" />
        </div>
        <div className="hidden md:flex w-full items-center justify-center ">
          <ul className="flex flex-row gap-6 w-full items-center justify-center">
            <li className="text-gray-500 font-semibold text-md hover:text-white transition-all duration-300 cursor-pointer ">
              Tokens
            </li>
            <li className="text-gray-500 font-semibold text-md hover:text-white transition-all duration-300 cursor-pointer ">
              Services
            </li>
            <li className="text-gray-500 font-semibold text-md hover:text-white transition-all duration-300 cursor-pointer ">
              Transactions
            </li>
            <li className="text-gray-500 font-semibold text-md hover:text-white transition-all duration-300 cursor-pointer ">
              About
            </li>
            {CurrentAccount ? (
              <button className="border-2 border-green-700 rounded-full px-7 py-[4px] text-gray-500 hover:text-white transition-all duration-500 gap-2 flex items-center justify-center">
                <SiEthereum color="green" />
                <span className="text-green-700">Connected</span>
              </button>
            ) : (
              <button
                className="border-2 border-gray-800 rounded-full px-7 py-[4px] text-gray-500 hover:text-white hover:border-white transition-all duration-500 gap-2 flex items-center justify-center"
                onClick={connectWallet}
              >
                <SiEthereum />
                <span>Connect</span>
              </button>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

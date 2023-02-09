
const demo = () => {


  const ConnectWalletHandle = (e) => {
    e.preventDefault();
    connectWallet();
  };



  useEffect(() => {
    console.log(StructuredTransactions);
    console.log(CurrentAccount);
    console.log(TransactionsCount);
  }, []);
  return (
    <>
      <div className="w-full h-[100vh] flex items-center justify-center gap-10">
        <div className="w-[30rem]">
          <h2>Connect to Your Wallet</h2>
          <button
            className="border py-2 block w-full "
            onClick={ConnectWalletHandle}
          >
            Connect Wallet
          </button>
        </div>

        
      </div>
    </>
  );
};

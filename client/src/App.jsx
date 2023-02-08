import { useContext } from "react";
import {
  Loader,
  Navbar,
  Transactions,
  Services,
  Welcome,
  Footer,
} from "./Components/index";
import { TransactionContext } from "./Context/TransactionContext";

function App() {
  const {} = useContext(TransactionContext);
  
  return (
    <>
      <div className="w-full h-[100vh] flex items-center justify-center gap-10">
        <div className="w-[30rem]">
          <h2>Connect to Your Wallet</h2>
          <button className="border py-2 block w-full ">Connect Wallet</button>
        </div>
        <form className="flex flex-col gap-4">
          <input type="text" name="address" placeholder="address" />
          <input
            type="number"
            name="amount"
            placeholder="amount"
            step={0.0001}
          />
          <input type="keyword" name="keyword" placeholder="keyword" />
          <button className="border py-2">Submit</button>
        </form>
      </div>
    </>
  );
}

export default App;

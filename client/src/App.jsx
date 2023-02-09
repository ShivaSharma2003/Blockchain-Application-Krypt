import { useContext, useEffect } from "react";
import {
  Navbar,
  Transactions,
  Services,
  Welcome,
  Footer,
} from "./Components/index";

const App = () => {
  return (
    <div className="min-h-screen w-screen flex flex-col bg-black relative z-10">
      <div className="absolute h-[15rem] w-[15rem] bg-violet-900 blur-[180px] -z-10 top-0 right-0"></div>
      <div className="absolute h-[15rem] w-[15rem] bg-violet-900 blur-[180px] -z-10 top-7 left-0"></div>
      <div className="absolute h-[15rem] w-[15rem] bg-violet-900 blur-[180px] -z-10 bottom-0 right-[50%]"></div>
      <Navbar />
      <Welcome />
      <Services />
      <Transactions />
      <Footer />
    </div>
  );
};

export default App;

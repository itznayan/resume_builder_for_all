import { Outlet } from "react-router-dom";
import Header from "./components/ui/custom/Header";
import { Toaster } from "./components/ui/sonner";

const App = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Toaster className="bg-black text-white" />
    </>
  );
};

export default App;

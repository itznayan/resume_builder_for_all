import { useUser } from "@clerk/clerk-react";
import { Button } from "./components/ui/button";
import { Navigate, Outlet } from "react-router-dom";
import Header from "./components/ui/custom/Header";
import Dashboard from "./dashboard";
import { Toaster } from "./components/ui/sonner";

const App = () => {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isSignedIn && isLoaded) {
    return <Navigate to={"auth/sign-in"} />;
  }
  return (
    <>
      <Header />
      <Outlet />
      <Toaster className="bg-black text-white" />
    </>
  );
};

export default App;

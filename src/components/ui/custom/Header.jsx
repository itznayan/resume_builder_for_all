import { Button } from "../button";
import { Link } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";
import logo from "../../../../public/logo.png";
const Header = () => {
  const { user, isSignedIn } = useUser();

  return (
    <div className="px-14 py-4 rounded-b-full flex justify-between shadow-lg">
      <Link to="/">
        <img
          src={logo}
          alt="logo"
          className=" px-2 scale-150"
          width={100}
          height={100}
        />
      </Link>
      {isSignedIn ? (
        <div className="flex gap-2 items-center">
          <Link to={"/dashboard"}>
            <Button>Dashboard</Button>
          </Link>
          <div className="bg-gray-200 flex justify-center items-center p-[3px] rounded-full">
            <UserButton />
          </div>
        </div>
      ) : (
        <Link to={"./auth/sign-in"}>
          <Button>Get Started</Button>
        </Link>
      )}
    </div>
  );
};

export default Header;

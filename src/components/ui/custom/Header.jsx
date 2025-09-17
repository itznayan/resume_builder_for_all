import { Button } from "../button";
import { Link } from "react-router-dom";
import logo from "../../../../public/logo.png";

const Header = () => {
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
      <div className="flex gap-2 items-center">
        <Link to={"/dashboard"}>
          <Button>Dashboard</Button>
        </Link>
        <Link to={"/"}>
          <Button variant="outline">Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default Header;

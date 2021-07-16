import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react";

const Navbar = () => {
  return (
    <nav className={"bg-primary-700 shadow-md fixed top-0 left-0 right-0"}>
      <div className="px-4 lg:px-8 flex justify-between py-2 items-center">
        <Link to="/">
          <h2 className="text-2xl flex items-center">
            <FeatherIcon icon="bell" />
            <span className="ml-2">CPNS</span>
          </h2>
        </Link>
        <Link to="/dashboard">
          <button className="btn-dark btn">Go to Dashboard</button>
        </Link>
      </div>
    </nav>
  );
};
export default Navbar;

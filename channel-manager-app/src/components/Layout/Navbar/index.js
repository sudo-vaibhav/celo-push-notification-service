import { Link, useRouteMatch } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import { useContractKit } from "@celo-tools/use-contractkit";
const Navbar = () => {
  const onDashboard = useRouteMatch("/dashboard");
  const { address, connect } = useContractKit();
  return (
    <nav className={"bg-primary-700 shadow-md fixed top-0 left-0 right-0"}>
      <div className="px-4 lg:px-8 flex justify-between py-2 items-center">
        <Link to="/">
          <h2 className="text-2xl flex items-center">
            <FeatherIcon icon="bell" />
            <span className="ml-2">CPNS</span>
          </h2>
        </Link>
        <button className="btn-dark btn">
          {onDashboard ? (
            address ? (
              address.slice(0, 10) + "..."
            ) : (
              <button onClick={connect}>
                Click here to connect your wallet
              </button>
            )
          ) : (
            <Link to="/dashboard">Go to Dashboard</Link>
          )}
        </button>
      </div>
    </nav>
  );
};
export default Navbar;

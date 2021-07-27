import { NavLink } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
const BottomNavItem = ({ data }) => {
  return (
    <NavLink
      to={data.link}
      exact
      className="opacity-70"
      activeClassName="text-primary-700 opacity-100"
    >
      <div className="flex flex-col items-center p-4">
        <FeatherIcon icon={data.icon} className="mb-2" />
        <div className="">{data.title}</div>
      </div>
    </NavLink>
  );
};
const BottomNavigator = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 text-sm text-center bg-dark-900 text-light-100">
      <div className="container grid grid-cols-3">
        {[
          {
            title: "Notifications",
            icon: "bell",
            link: "/notifications",
          },
          {
            title: "Channels",
            icon: "message-square",
            link: "/channels",
          },
          {
            title: "Permissions",
            icon: "alert-octagon",
            link: "/permissions",
          },
        ].map((e) => {
          return <BottomNavItem key={e.title} data={e} />;
        })}
      </div>
    </div>
  );
};

export default BottomNavigator;

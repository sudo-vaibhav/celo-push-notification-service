import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
// import { HEADER_MARGIN_TOP } from "../../../constants";

const SideIcon = ({ data }) => {
  return (
    <div className="text-center py-4 my-2 hover:bg-primary-700 hover:text-dark-900">
      <FeatherIcon icon={data.icon} className="mx-auto mb-2" />
      <span>{data.text}</span>
    </div>
  );
};

const SideItems = ({ items }) => {
  return items.map((e) => {
    return e.link[0] === "/" ? (
      <Link to={e.link} key={e.text}>
        <SideIcon data={e} />
      </Link>
    ) : (
      <a href={e.link} target="_blank" rel="noreferrer" key={e.text}>
        <SideIcon data={e} />
      </a>
    );
  });
};

const SideNav = () => {
  return (
    <div
      className="flex leading-4 text-sm bg-dark-900 text-light-100 flex-col justify-between "
      //   fixed
      //   bottom-0
      style={
        {
          // top: HEADER_MARGIN_TOP,
          // width: "calc(100vw / 18)",
        }
      }
    >
      <div>
        <SideItems
          items={[
            {
              text: "Channels",
              icon: "bell",
              link: "/dashboard",
            },
            {
              text: "Create Channel",
              icon: "plus-circle",
              link: "/dashboard/channels",
            },
          ]}
        />
      </div>
      <div>
        <SideItems
          items={[
            {
              text: "Docs",
              icon: "book",
              link: "https://google.com",
            },
            {
              text: "Help",
              icon: "help-circle",
              link: "mailto:mailvaibhavchopra@gmail.com",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default SideNav;

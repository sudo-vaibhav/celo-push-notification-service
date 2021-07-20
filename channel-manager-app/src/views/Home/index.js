import { Link } from "react-router-dom";
import { MIN_HEIGHT_STRING } from "../../constants";
import bg from "./bg.svg";
import dashboardImage from "./dashboard.svg";
import vaibhav from "./vaibhav.jpeg";

const Home = () => {
  return (
    <div
      className="bg-primary-700 flex items-center"
      style={{
        background: `url(${bg})`,
        minHeight: MIN_HEIGHT_STRING,
      }}
    >
      <div className="container grid lg:grid-cols-3 gap-4 my-8">
        <div className="flex flex-col justify-center lg:col-span-2 lg:w-3/4 pb-8">
          <h1 className="text-6xl">Bringing WEB3 Out of the Stone Ages</h1>
          <p className="my-6 text-xl">
            WEB3 is revolutionary in every manner, except for how it expects you
            to go and check again and again for simple things instead of
            delivering important notifications and alerts right to you like
            every app in WEB2 land does. This leads to bad UX and forces people
            to open these apps again and again just to check what's changed
            while they were away. CPNS is here to change that.
          </p>
          <div className="flex items-center">
            <div>
              <img
                src={vaibhav}
                className="filter grayscale rounded-full max-h-16"
                alt="vaibhav"
              />
            </div>
            <div className="ml-4">
              <p className="font-bold">Created by</p>
              <a
                href="https://github.com/sudo-vaibhav/"
                target="_blank"
                rel="noreferrer"
              >
                Vaibhav Chopra
              </a>
            </div>
          </div>
        </div>
        <div className="">
          <div className="w-4/5 mx-auto bg-light-100 p-4 text-center">
            <h3 className="text-3xl">Manage Your Channels</h3>
            <img
              src={dashboardImage}
              alt="dashboard"
              className="w-1/2 mx-auto"
            />
            <p className="my-2 w-3/4 mx-auto">
              Manage your notifications, branding, and everything in between
            </p>
            <Link to="/dashboard">
              <button className="btn-primary btn">Visit Dashboard</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

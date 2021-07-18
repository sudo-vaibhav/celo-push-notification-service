import StartChannelImage from "./start-channel.svg";
import StartBg from "./start-bg.png";
import { Link } from "react-router-dom";
import ChannelsList from "./ChannelsList";

const Channels = () => {
  return (
    <div>
      <div className="container">
        <ChannelsList />
        <div
          className="grid my-4 text-center md:text-left md:grid-cols-3 lg:grid-cols-4 gap-4 bg-primary-700 rounded-lg py-4  px-4 md:px-8"
          style={{
            backgroundImage: `url(${StartBg})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="flex items-center">
            <img src={StartChannelImage} alt="start channel" />
          </div>
          <div className="md:col-span-2 lg:col-span-3 flex items-center">
            <div>
              <h4 className="text-xl md:text-3xl lg:text-4xl font-bold">
                Keep Your Users Updated, Always
              </h4>
              <p className="my-4 lg:w-4/5 lg:text-lg">
                A channel is the key to enable your DAPP to send notifications.
                Using CPNS channels, you can send notifications through smart
                contracts, notify all users about some activity at once, or send
                private and targeted notifications through secrets. No matter
                what the usecase, CPNS has in something in store for everyone.
              </p>
              <Link to="/dashboard/channels">
                <button className="btn btn-dark">Create a Channel</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Channels;

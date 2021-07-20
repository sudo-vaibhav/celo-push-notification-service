import { Link } from "react-router-dom";
import noChannelsImage from "./no-channels.svg";
import ubeswap from "./ubeswap.svg";

const NoChannels = () => {
  return (
    <div className="text-center border rounded-lg border-dashed border-primary-700 p-4">
      <img
        src={noChannelsImage}
        className="md:w-1/3 lg:w-1/4 mx-auto"
        alt="no-channel"
      />
      <p>No channels found. Did you connect your wallet?</p>
    </div>
  );
};
const ChannelsList = () => {
  const channels = [0, 0, 0];
  return (
    <div className="mb-16">
      <h2 className="text-4xl font-bold my-8">Your Channels</h2>
      {channels.length === 0 ? (
        <NoChannels />
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {channels.map((_, idx) => {
            return (
              <div
                key={idx}
                className="border border-primary-700 rounded-lg p-4 grid grid-cols-3"
              >
                <div className="col-span-2 text-2xl  flex items-center">
                  Ubeswap
                </div>
                <div>
                  <img src={ubeswap} alt="channel" className="pb-4" />
                </div>
                <div className="col-span-3">
                  {[
                    { field: "Subscribers", value: "12879" },
                    { field: "Notifications Sent", value: "500k" },
                  ].map((e, idx) => {
                    return (
                      <div
                        key={idx}
                        className="flex justify-between border-b last:border-b-0 border-primary-700 mx-4 py-2"
                      >
                        <div className="font-bold">{e.field}</div>
                        <div>{e.value}</div>
                      </div>
                    );
                  })}
                </div>
                <div className="col-span-3 grid grid-cols-2 gap-8 mt-4">
                  {[
                    { text: "Edit", link: "/" },
                    {
                      text: "Notify",
                      link: `/dashboard/channels/${idx}/notify`,
                    },
                  ].map((e, idx) => {
                    return (
                      <Link to={e.link} key={idx}>
                        <button className="btn btn-primary w-full">
                          {e.text}
                        </button>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ChannelsList;

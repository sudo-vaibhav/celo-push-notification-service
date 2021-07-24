import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useContract from "../../../../components/hooks/useContract";
import getInfuraUrl from "../../../../utils/getInfuraUrl";
import noChannelsImage from "./no-channels.svg";

const NoChannels = () => {
  return (
    <div className="text-center border rounded-lg border-dashed border-primary-700 p-4">
      <img
        src={noChannelsImage}
        className="md:w-1/3 lg:w-1/4 mx-auto"
        alt="no-channel"
      />
      <p>
        No channels found. Did you connect with the correct network (Alfajores)?
      </p>
    </div>
  );
};
const ChannelsList = () => {
  const [myChannels, setMyChannels] = useState([]);
  const { contract, account } = useContract();
  useEffect(() => {
    (async () => {
      if (contract) {
        const channels = (await contract.methods.allChannels().call())
          .map((e, idx) => ({ id: idx, ...e }))
          .filter((e) => e.admin === account);
        console.log(channels);
        setMyChannels(channels);
      }
    })();
  }, [contract, account]);

  return (
    <div className="mb-16">
      <h2 className="text-4xl font-bold my-8">Your Channels</h2>
      {myChannels.length === 0 ? (
        <NoChannels />
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {myChannels.map((channel, idx) => {
            return (
              <div
                key={idx}
                className="border border-primary-700 rounded-lg p-4 grid grid-cols-3"
              >
                <div className="col-span-2 text-2xl  flex items-center">
                  {channel.name}
                </div>
                <div>
                  <img
                    src={getInfuraUrl(channel.iconHash)}
                    alt="channel"
                    className="pb-4"
                  />
                </div>
                <div className="col-span-3">
                  {[
                    { field: "Subscribers", value: channel.subscribers.length },
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
                    { text: "Edit", link: "/dashboard/channels/" + channel.id },
                    {
                      text: "Notify",
                      link: `/dashboard/channels/${channel.id}/notify`,
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

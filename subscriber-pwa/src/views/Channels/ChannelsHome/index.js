import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useContract from "../../../components/hooks/useContract";
import getInfuraUrl from "../../../utils/getInfuraUrl";
const ChannelsHome = () => {
  const { contract, account } = useContract();
  const [{ allChannels }, setState] = useState({
    allChannels: [],
  });

  useEffect(() => {
    (async () => {
      if (contract) {
        const channels = (await contract.methods.allChannels().call()).map(
          (e, idx) => ({ ...e, id: idx })
        );

        setState({ allChannels: channels });
      }
    })();
  }, [contract]);

  const otherChannels = [];
  let myChannels = allChannels.filter((c) => {
    if (c.subscribers.includes(account)) {
      return true;
    }
    otherChannels.push(c);
    return false;
  });

  return (
    <div>
      <div className="container mb-32">
        <h3 className="text-2xl mt-4 font-bold">Your Channels</h3>
        <div className="flex w-[110vw] my-4 text-center overflow-x-auto">
          {myChannels.map((channel, idx) => (
            <Link key={idx} className="mr-4" to={`/channels/${channel.id}`}>
              <div
                className="channel-image"
                style={{
                  width: "30vw",
                }}
              >
                <img
                  src={getInfuraUrl(channel.iconHash)}
                  alt={channel.name}
                  className="rounded-lg w-full"
                />
              </div>
              <div className="channel-description">
                <h3>{channel.name}</h3>
              </div>
            </Link>
          ))}
        </div>
        <h3 className="text-2xl my-4 font-bold">Other Channels</h3>
        <div className="my-4">
          {otherChannels.map((channel, idx) => {
            return (
              <Link
                to={`/channels/${channel.id}`}
                key={idx}
                className="card grid grid-cols-3 gap-4 my-4"
              >
                <div className="col-span-2">
                  <h4 className="font-bold text-lg">{channel.name}</h4>
                  <p className="text-sm">
                    {channel.description.slice(0, 100) + "..."}
                  </p>
                </div>
                <div className="grid place-items-center">
                  <img
                    src={getInfuraUrl(channel.iconHash)}
                    alt={channel.name}
                    className="rounded-lg"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ChannelsHome;

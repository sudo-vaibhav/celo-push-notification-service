import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useContract from "../../../components/hooks/useContract";

const ChannelView = () => {
  const { contract, account } = useContract();
  let { channel } = useParams();
  channel = parseInt(channel); // turning it into integer

  const [{ channelInfo, subscribed }, setState] = useState({
    channelInfo: {
      name: "",
      description: "",
      iconHash: "",
      badgeHash: "",
      admin: "",
    },
    subscribed: true, // by default we assume subscribed
  });

  useEffect(() => {
    (async () => {
      if (contract && account) {
        setState({
          channelInfo: await contract.methods.channels(channel).call(),
          subscribed: await contract.methods
            .subscriptions(account, channel)
            .call(),
        });
      }
    })();
  }, [contract, channel, account]);

  console.log(channelInfo);
  return (
    <div>
      <div className="container mb-32">
        <h3 className="text-2xl mt-4 font-bold">{channelInfo.name}</h3>
        <button>
          {subscribed ? (
            <button className="btn btn-dark">Unsubscibe</button>
          ) : (
            "not subscribed"
          )}
        </button>
      </div>
    </div>
  );
};

export default ChannelView;

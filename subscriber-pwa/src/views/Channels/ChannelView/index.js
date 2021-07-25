import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import useContract from "../../../components/hooks/useContract";
import getInfuraUrl from "../../../utils/getInfuraUrl";
import { toast } from "react-toastify";
import { BOTTOM_NAVIGATOR_MIN_HEIGHT_STRING } from "../../../constants";
const ChannelView = () => {
  const { contract, account } = useContract();
  const history = useHistory();
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

  const subscribe = () => {
    console.log("subscribing");

    contract.methods
      .subscribe(channel)
      .send({
        from: account,
      })
      .on("receipt", () => {
        toast.success(`Subbscribed to ${channelInfo.name}`);
        history.push("/channels");
      });
  };
  const unsubscribe = () => {
    console.log("unsubscribing");
    contract.methods
      .unsubscribe(channel)
      .send({
        from: account,
      })
      .on("receipt", () => {
        toast.success(`Unsubscribed from ${channelInfo.name}`);
        history.push("/channels");
      });
  };

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

  const buttonAction = subscribed ? unsubscribe : subscribe;

  return (
    <div>
      <div
        className="container flex flex-col justify-between mb-32"
        style={{ minHeight: BOTTOM_NAVIGATOR_MIN_HEIGHT_STRING }}
      >
        <div>
          <div className="grid grid-cols-2 mt-4">
            <div className="">
              <h3 className="text-2xl  font-bold">{channelInfo.name}</h3>
            </div>
            <div>
              {channelInfo.iconHash && (
                <img
                  src={getInfuraUrl(channelInfo.iconHash)}
                  className="w-full rounded-lg"
                  alt={channelInfo.name}
                />
              )}
            </div>
          </div>
          <p className="my-4">{channelInfo.description}</p>
        </div>
        <div className="grid" onClick={buttonAction}>
          {subscribed ? (
            <button className="btn btn-dark" disabled={channelInfo.name === ""}>
              Unsubscribe
            </button>
          ) : (
            <button
              className="btn btn-primary"
              disabled={channelInfo.name === ""}
            >
              Subscribe
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChannelView;

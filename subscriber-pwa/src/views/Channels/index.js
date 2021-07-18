import moola from "./moola.png";
import poof from "./poof.png";
import unifty from "./unifty.png";
import ubeswap from "./ubeswap.svg";

const Channels = () => {
  const allChannels = [
    {
      name: "Moola",
      image: moola,
      description:
        "Moola is a social media platform for the Internet of Things. It allows you to connect your devices to the Internet and share your data with the world.",
    },
    {
      name: "Poof",
      image: poof,
      description:
        "Poof is a social media platform for the Internet of Things. It allows you to connect your devices to the Internet and share your data with the world.",
    },
    {
      name: "Unifty",
      image: unifty,
      description:
        "Unifty is a social media platform for the Internet of Things. It allows you to connect your devices to the Internet and share your data with the world.",
    },
    {
      name: "UbeSwap",
      image: ubeswap,
      description:
        "UbeSwap is a social media platform for the Internet of Things. It allows you to connect your devices to the Internet and share your data with the world.",
    },
  ];
  return (
    <div>
      <div className="container mb-32">
        <h3 className="text-2xl mt-4 font-bold">Your Channels</h3>
        <div className="grid grid-cols-3 gap-4 my-4 text-center">
          {allChannels.slice(0, 2).map((channel) => (
            <div key={channel.name}>
              <div className="channel-image">
                <img
                  src={channel.image}
                  alt={channel.name}
                  className="rounded-lg"
                />
              </div>
              <div className="channel-description">
                <h3>{channel.name}</h3>
              </div>
            </div>
          ))}
        </div>
        <h3 className="text-2xl my-4 font-bold">Popular Channels</h3>
        <div className="grid gap-4 my-4">
          {allChannels.map((channel) => {
            return (
              <div
                key={channel.name}
                className="shadow-md p-4 grid grid-cols-3 gap-4 border rounded-lg border-primary-700"
              >
                <div className="col-span-2">
                  <h4 className="font-bold text-lg">{channel.name}</h4>
                  <p className="text-sm">
                    {channel.description.slice(0, 100) + "..."}
                  </p>
                </div>
                <div className="grid place-items-center">
                  <img
                    src={channel.image}
                    alt={channel.name}
                    className="rounded-lg"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Channels;

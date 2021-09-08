import top from "./top.svg";
import bottom from "./bottom.svg";
import FeatherIcon from "feather-icons-react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
const onboardingMap = {
  1: {
    icon: "bell",
    heading: "Bringing WEB3 Out of the Stone Ages!",
    text: "Always stay up to date by getting notifications right from your favourite DAPP",
  },
  2: {
    icon: "lock",
    heading: "End to End Encryption Support",
    text: "Decentralisation doesn't have to be all public. E2E security is ensured using RSA encryption",
  },
  3: {
    icon: "tv",
    heading: "So Many Channels to Choose From!",
    text: "From changing loan interest rates to lottery win announcements, there is a channel for everything.",
  },
};

const Onboarding = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const history = useHistory();
  const currentPage = onboardingMap[pageNumber];

  return (
    <div>
      <div>
        <img src={top} alt="top" className="w-full relative  opacity-25" />
      </div>
      <div className=" h-screen w-screen fixed grid place-items-center top-0 bottom-0  z-10">
        <div className="container ">
          <div className="flex flex-col w-full">
            <h3 className="flex items-center justify-center text-3xl text-primary-700 font-bold">
              <FeatherIcon icon={currentPage.icon} className="mr-4" size={70} />
              {currentPage.heading}
            </h3>
            <p className="my-4">{currentPage.text}</p>
            <button
              className="btn btn-primary my-4"
              onClick={() => {
                if (pageNumber < 3) {
                  setPageNumber(pageNumber + 1);
                } else {
                  history.push("/notifications");
                }
              }}
            >
              Continue
            </button>
            <Link className="btn btn-dark" to="/notifications">Go to app</Link>
          </div>
        </div>
      </div>
      <div
        className="fixed bottom-0 left-0 right-0 "
        style={
          {
            // height: "20vh",
            // backgroundImage: `url(${bottom})`,
          }
        }
      >
        <img src={bottom} alt="Onboarding" className="w-full z-0 opacity-25" />
      </div>
    </div>
  );
};

export default Onboarding;

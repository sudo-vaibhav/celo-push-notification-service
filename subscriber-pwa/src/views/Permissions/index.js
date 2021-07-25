import { useEffect, useState } from "react";
import useContract from "../../components/hooks/useContract";
import FeatherIcon from "feather-icons-react";
import { useContractKit } from "@celo-tools/use-contractkit";
import {
  urlBase64ToUint8Array,
  pushSupported,
  hasNotificationPermission,
  saveSubscriptionToServer,
} from "../../utils/pushNotification";
import {
  APPLICATION_SERVER_PUBLIC_KEY,
  subscriptionUrl,
} from "../../constants";

const Permissions = () => {
  const { connect } = useContractKit();
  const [state, setState] = useState({
    installed: true,
    connected: false,
    notifications: false,
  });

  const { kit, account } = useContract();
  const [refreshToggle, setRefreshToggle] = useState(false);
  const actions = {
    installed: () => {}, // no need to do anything, user will do the appropriate action
    connected: connect,
    notifications: async () => {
      const hasPermission = await hasNotificationPermission();
      alert(`i got permission status ${hasPermission}`);
      if (
        account &&
        pushSupported() &&
        "serviceWorker" in navigator &&
        hasPermission
      ) {
        navigator.serviceWorker.ready
          .then(async (swRegistration) => {
            const pushSubscription = await swRegistration.pushManager.subscribe(
              {
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(
                  APPLICATION_SERVER_PUBLIC_KEY
                ),
              }
            );
            alert("got subscription details");

            const signature = await kit.web3.eth.sign(
              JSON.stringify(pushSubscription.toJSON()),
              account
            ); // we can sign their own address and send it to backend

            const subSaved = await saveSubscriptionToServer(
              pushSubscription,
              signature
            );
            if (subSaved) {
              // localStorage.setItem("PUSH_NOTIFICATION_SUBSCRIBED", "1"); // we will add this back later
              setState({
                notifications: true,
              });
              alert("Push subscription confirmed");
            } else {
              alert("An eror occured");
            }
          })
          .catch((error) => {
            console.log(error);
            alert("An error occured setting up push notification");
          });
      } else {
        alert("Notifications not allowed.");
      }
    },
  };
  useEffect(() => {
    const newState = {};

    newState["installed"] = true; // we can't reliably detect app installation, so we just assume it's there

    newState["notifications"] =
      "Notification" in window &&
      localStorage.getItem("PUSH_NOTIFICATION_SUBSCRIBED") === "1";

    newState["connected"] = account != null;

    setState(newState);
  }, [account, refreshToggle]);

  return (
    <div>
      <div className="container">
        <div className="mt-4 flex justify-end">
          <button
            className="btn btn-dark"
            onClick={account ? () => {} : connect}
          >
            {account ? account.slice(0, 10) + "..." : "Not connected"}
          </button>
        </div>
        <h3 className="text-2xl my-4 font-bold">Permissions</h3>
        {pushSupported() ? (
          <>
            <p className="my-4">
              Click the options to get the correct permissions. Make sure you've
              followed the below steps in the correct order:
              <br />
              {subscriptionUrl}
            </p>
            <div className="flex justify-end">
              <button
                className="flex btn btn-dark"
                onClick={() => {
                  setRefreshToggle(!refreshToggle);
                }}
              >
                Refresh <FeatherIcon icon="refresh-cw" className="ml-2" />
              </button>
            </div>
            {[
              {
                name: "installed",
                text: "Install the App/ Add to Home Screen from browser settings. Proceed to use the app from there.",
              },
              {
                name: "connected",
                text: "Connect to your celo wallet",
              },
              {
                name: "notifications",
                text: "Allow permission for push notifications",
              },
            ].map((p, idx) => {
              const enabled = state[p.name];
              return (
                <div
                  className="bg-primary-700 my-2 flex justify-between"
                  onClick={!enabled ? actions[p.name] : () => {}}
                  key={idx}
                >
                  <div className="p-4">
                    {idx + 1}) {p.text}
                  </div>
                  <div className="p-4 bg-dark-900 grid place-items-center">
                    <FeatherIcon
                      icon={
                        enabled
                          ? p.name === "installed"
                            ? "smile"
                            : "check"
                          : "x"
                      }
                      size={36}
                      className={enabled ? "text-primary-700" : "text-red-600"}
                    />
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <>
            <h5 className="my-4">
              Push Notification are not supported by this browser :(
            </h5>
            <p>
              iOS is not supported yet. If you are not on iOS and seeing this,
              try opening this app again on your OS's default supported browser.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Permissions;

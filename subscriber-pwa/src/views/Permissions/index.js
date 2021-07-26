import { useEffect, useState } from "react";
import JSEncrypt from "jsencrypt";
import { ENCRYPT_OPTIONS, NOTIFICATION_PRIVATE_KEY } from "../../constants";
import useContract from "../../components/hooks/useContract";
import FeatherIcon from "feather-icons-react";
import { useContractKit } from "@celo-tools/use-contractkit";
import { pushSupported } from "../../utils/pushNotification";
import notifications from "./actions/notifications";
import publishedKeys from "./actions/publishedKeys";
import localforage from "localforage";
import { toast } from "react-toastify";
const Permissions = () => {
  const { connect } = useContractKit();
  const [state, setState] = useState({
    installed: true,
    connected: false,
    notifications: false,
    "published-keys": false,
  });

  const { kit, account, contract } = useContract();
  const [refreshToggle, setRefreshToggle] = useState(false);
  const actions = {
    connected: connect,
    notifications: () => {
      notifications({
        kit,
        account,
        setState,
      });
    },
    "published-keys": async () => {
      await publishedKeys({
        contract,
        account,
      });
      setRefreshToggle(!refreshToggle);
    },
  };
  useEffect(() => {
    (async () => {
      const newState = {};

      newState["notifications"] =
        "Notification" in window &&
        localStorage.getItem("PUSH_NOTIFICATION_SUBSCRIBED") === "1";

      newState["connected"] = account != null;

      const privateKey = await localforage.getItem(NOTIFICATION_PRIVATE_KEY);
      newState["published-keys"] = false;

      if (privateKey && contract) {
        // now check if blockchain is updated or not
        const encrypt = new JSEncrypt(ENCRYPT_OPTIONS);
        encrypt.setKey(privateKey);
        const publicKey = encrypt.getPublicKey();
        const publishedPublicKey = await contract.methods
          .publicKeys(account)
          .call();
        if (publicKey === publishedPublicKey) {
          newState["published-keys"] = true;
        }
      }
      setState((oldState) => ({ ...oldState, ...newState }));
    })();
  }, [account, refreshToggle, contract, contract?.methods]);

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
            </p>
            <div className="flex justify-between">
              {[
                {
                  text: "Refresh",
                  onClick: () => {
                    setRefreshToggle(!refreshToggle);
                  },
                  icon: "refresh-cw",
                },
                {
                  onClick: async () => {
                    if (state["published-keys"]) {
                      await navigator.clipboard.writeText(
                        await localforage.getItem(NOTIFICATION_PRIVATE_KEY)
                      );
                      toast.success("Copied private key to clipboard");
                    } else {
                      const privateKey = prompt("Paste your private key here");
                      if (privateKey) {
                        await publishedKeys({
                          contract,
                          account,
                          privateKey,
                        });
                        setRefreshToggle(!refreshToggle);
                      } else {
                        toast.error("Invalid private key");
                      }
                    }
                  },
                  text: state["published-keys"] ? "Export Key" : "Import Key",
                  icon: "clipboard",
                },
              ].map((b) => {
                return (
                  <button
                    className="flex btn btn-dark"
                    key={b.text}
                    onClick={b.onClick}
                  >
                    {b.text} <FeatherIcon icon={b.icon} className="ml-2" />
                  </button>
                );
              })}
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
                name: "published-keys",
                text: "Publish your public keys. Private notifications need this to reach you.",
              },

              {
                name: "notifications",
                text: "Allow permission for push notifications",
              },
            ].map((p, idx) => {
              const enabled = state[p.name];
              return (
                <div
                  className="bg-primary-700 my-2 flex justify-between cursor-pointer"
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

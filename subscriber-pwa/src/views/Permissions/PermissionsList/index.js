import { useContractKit } from "@celo-tools/use-contractkit";
import FeatherIcon from "feather-icons-react";
import localforage from "localforage";
import { NOTIFICATION_PRIVATE_KEY } from "../../../constants";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import useContract from "../../../components/hooks/useContract";
import notifications from "./actions/notifications";
import publishedKeys from "./actions/publishedKeys";
import managePermissionStatus from "./managePermissionsStatus";
import Loader from "react-loader-spinner";

const PermissionsList = () => {
  const { connect } = useContractKit();
  const { kit, contract, account } = useContract();

  const [state, setState] = useState({
    working: "",
    permissions: {
      installed: true,
      connected: false,
      notifications: false,
      "published-keys": false,
    },
  });

  // for action wrapper to work properly work, all theses functions must be async
  // also each of these functions should be idempotent, so they should be able to handle the
  // condition that the function is called multiple times even after it has already run once
  const actions = {
    // empty function so idempotent ofcourse
    installed: async () => {},
    // idempotent as clicking connect when already connected should not do anything
    connected: connect,
    // idemptotent because notifications subscription will be regenerated and restored on the backend everytime you click
    notifications: async () =>
      notifications({
        kit,
        account,
      }),
    // generates a new key pair and stores it on chain
    "published-keys": async () =>
      publishedKeys({
        contract,
        account,
      }),
  };

  const refresh = () => {
    managePermissionStatus({
      setState,
      account,
      contract,
    });
  };

  useEffect(() => {
    managePermissionStatus({
      setState,
      account,
      contract,
    });
  }, [account, contract]);

  const actionWrapper = async (actionKey) => {
    setState((oldState) => ({
      ...oldState,
      working: actionKey,
    }));
    let error;
    try {
      await actions[actionKey]();
    } catch (e) {
      error = e;
      console.log("error occured while carrying out permission action:", e);
    } finally {
      setState((oldState) => ({
        ...oldState,
        permissions: {
          ...oldState.permissions,
          [actionKey]: error ? false : true,
        },
        working: "",
      }));
    }
  };

  return (
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
            onClick: refresh,
            icon: "refresh-cw",
          },
          {
            onClick: async () => {
              if (state.permissions["published-keys"]) {
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
                } else {
                  toast.error("Invalid private key");
                }
              }
            },
            text: state.permissions["published-keys"]
              ? "Export Key"
              : "Import Key",
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
        const anyOperationsAllowed = !state.working; // dont allow other actions to run if already running an action
        const enabled = state.permissions[p.name];

        const onClick = anyOperationsAllowed
          ? () => actionWrapper(p.name)
          : () => {
              toast.warning("Already running an operation, please wait");
            };

        const isCurrentlyRunning = p.name === state.working;

        return (
          <div
            className="bg-primary-700 my-2 flex justify-between cursor-pointer"
            onClick={onClick}
            key={idx}
          >
            <div className="p-4">
              {idx + 1}) {p.text}
            </div>
            <div className="p-4 bg-dark-900 grid place-items-center">
              {isCurrentlyRunning ? (
                <Loader
                  type="TailSpin"
                  color="var(--color-primary-700)"
                  height={36}
                  width={36}
                />
              ) : (
                <FeatherIcon
                  icon={
                    enabled ? (p.name === "installed" ? "smile" : "check") : "x"
                  }
                  size={36}
                  className={enabled ? "text-primary-700" : "text-red-600"}
                />
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default PermissionsList;

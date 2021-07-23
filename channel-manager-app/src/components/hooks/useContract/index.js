import { useEffect } from "react";
import { useContractKit } from "@celo-tools/use-contractkit";
import PushNotificationContract from "../../../contract/PushNotifications.json";
import { ALLOWED_NETWORK } from "../../../constants";

const useContract = (callback) => {
  const { performActions, account } = useContractKit();
  useEffect(() => {
    (async () => {
      await performActions(async (kit) => {
        const contract = new kit.web3.eth.Contract(
          PushNotificationContract.abi,
          PushNotificationContract.networks[ALLOWED_NETWORK.chainId].address
        );

        callback({ contract, account });
      });
    })();
  }, [account, performActions]);
};

export default useContract;

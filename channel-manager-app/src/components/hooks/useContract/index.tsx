import { useEffect, useState } from "react";
import { useContractKit } from "@celo-tools/use-contractkit";
import PushNotificationContract from "../../../contract/PushNotifications.json";
import { ALLOWED_NETWORK } from "../../../constants";
import { AbiItem } from "web3-utils";
import { Contract } from "web3-eth-contract";
const useContract = () => {
  const { performActions, account } = useContractKit();
  const [contract, setContract] = useState<Contract | null>(null);
  useEffect(() => {
    (async () => {
      await performActions(async (kit) => {
        const notificationContract = new kit.web3.eth.Contract(
          PushNotificationContract.abi as AbiItem[],
          PushNotificationContract.networks[ALLOWED_NETWORK.chainId].address
        );

        setContract(notificationContract);
      });
    })();
  }, [account, performActions]);
  return { contract, account };
};

export default useContract;

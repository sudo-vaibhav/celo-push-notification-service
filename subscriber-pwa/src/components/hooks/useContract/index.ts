import { useEffect, useState } from "react";
import { ContractKit } from "@celo/contractkit";
import { useContractKit } from "@celo-tools/use-contractkit";
import PushNotificationContract from "../../../contract/PushNotifications.json";
import { ALLOWED_NETWORK } from "../../../constants";
import { AbiItem } from "web3-utils";
import { Contract } from "web3-eth-contract";
const useContract = () => {
  const { performActions, account } = useContractKit();
  const [{ contract, kit }, setState] = useState<{
    contract: Contract | null;
    kit: ContractKit | null;
  }>({
    contract: null,
    kit: null,
  });
  useEffect(() => {
    (async () => {
      await performActions(async (kit) => {
        const notificationContract = new kit.web3.eth.Contract(
          PushNotificationContract.abi as AbiItem[],
          PushNotificationContract.networks[ALLOWED_NETWORK.chainId].address
        );

        setState({
          contract: notificationContract,
          kit: kit,
        });
      });
    })();
  }, [account, performActions]);
  return { contract, account, kit };
};

export default useContract;

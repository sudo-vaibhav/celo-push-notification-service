import JSEncrypt from "jsencrypt";
import localforage from "localforage";
import { toast } from "react-toastify";
import { Contract } from "web3-eth-contract";
import {
  ENCRYPT_OPTIONS,
  NOTIFICATIONS,
  NOTIFICATION_PRIVATE_KEY,
} from "../../../../constants";
const publishedKeys = async ({
  contract,
  account,
  privateKey = "",
}: {
  contract: Contract;
  account: string;
  privateKey: string;
}) => {
  // first clear the old private key if any
  try {
    await localforage.removeItem(NOTIFICATION_PRIVATE_KEY);
  } catch (err) {
    console.log(err);
  } finally {
    const encrypt = new JSEncrypt(ENCRYPT_OPTIONS);

    if (!privateKey) {
      privateKey = encrypt.getPrivateKey();
    }
    encrypt.setKey(privateKey);

    // now publish the public key on chain

    return new Promise((resolve) => {
      try {
        const publicKey = encrypt.getPublicKey();
        contract.methods
          .setPublicKey(publicKey)
          .send({ from: account })
          .on("receipt", async () => {
            await localforage.setItem(NOTIFICATION_PRIVATE_KEY, privateKey);
            // also remove all private notifications that haven't been decrypted yet because they wont be recoverably anyways anymore
            const notifications = await localforage.getItem<string>(
              NOTIFICATIONS
            );
            if (notifications) {
              let foragedNotifications = JSON.parse(notifications);
              let finalNotifications = foragedNotifications.filter(
                (notification: {
                  privateNotification: boolean;
                  decrypted: boolean;
                }) => {
                  if (notification.privateNotification) {
                    return notification.decrypted;
                  } else {
                    return true; // public notification wont cause any problem
                  }
                }
              );

              await localforage.setItem(
                NOTIFICATIONS,
                JSON.stringify(finalNotifications)
              );
            }
            resolve(true);
          });
      } catch (err) {
        toast.error("could not publish public key!");
        throw new Error("could not publish public key!");
      }
    });
  }
};

export default publishedKeys;

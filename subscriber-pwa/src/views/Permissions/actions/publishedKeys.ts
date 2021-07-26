import JSEncrypt from "jsencrypt";
import localforage from "localforage";
import { toast } from "react-toastify";
import { Contract } from "web3-eth-contract";
import { ENCRYPT_OPTIONS, NOTIFICATION_PRIVATE_KEY } from "../../../constants";
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
            resolve(true);
          });
      } catch (err) {
        toast.error("could not publish public key!");
        resolve(true);
      }
    });
  }
};

export default publishedKeys;

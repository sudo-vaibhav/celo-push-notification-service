import {
  urlBase64ToUint8Array,
  hasNotificationPermission,
  saveSubscriptionToServer,
  pushSupported,
} from "../../../../utils/pushNotification";

import { getApplicationServerPublicKey } from "../../../../constants";
import { toast } from "react-toastify";
const notifications = async ({ kit, account }) => {
  const hasPermission = await hasNotificationPermission();
  console.log(`i got permission status ${hasPermission}`);
  if (
    account &&
    pushSupported() &&
    "serviceWorker" in navigator &&
    hasPermission
  ) {
    console.log("about to generate subscription credentials");
    navigator.serviceWorker.ready.then(async (swRegistration) => {
      console.log("swRegistration finally resolved");
      const pushSubscription = await swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          await getApplicationServerPublicKey()
        ),
      });
      console.log("got subscription details", pushSubscription);

      const signature = await kit.web3.eth.personal.sign("cpns", account); // we can sign their own address and send it to backend

      console.log("signed also");

      const subSaved = await saveSubscriptionToServer(
        pushSubscription,
        signature
      );
      if (subSaved) {
        localStorage.setItem("PUSH_NOTIFICATION_SUBSCRIBED", "1"); // we will add this back later
        console.log("Push subscription confirmed");
      } else {
        console.log("An eror occured");
      }
    });
  } else {
    toast.error("Notifications not allowed.");
    throw new Error("Notifications not allowed.");
  }
};

export default notifications;

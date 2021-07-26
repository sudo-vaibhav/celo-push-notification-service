import {
  urlBase64ToUint8Array,
  hasNotificationPermission,
  saveSubscriptionToServer,
  pushSupported,
} from "../../../utils/pushNotification";

import { APPLICATION_SERVER_PUBLIC_KEY } from "../../../constants";
import { toast } from "react-toastify";
const notifications = async ({ kit, account, setState }) => {
  const hasPermission = await hasNotificationPermission();
  console.log(`i got permission status ${hasPermission}`);
  if (
    account &&
    pushSupported() &&
    "serviceWorker" in navigator &&
    hasPermission
  ) {
    console.log("about to generate subscription credentials");
    navigator.serviceWorker.ready
      .then(async (swRegistration) => {
        alert("swRegistration finally resolved");
        const pushSubscription = await swRegistration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(
            APPLICATION_SERVER_PUBLIC_KEY
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
          setState((oldState) => ({
            ...oldState,
            notifications: true,
          }));
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
    toast.error("Notifications not allowed.");
  }
};

export default notifications;

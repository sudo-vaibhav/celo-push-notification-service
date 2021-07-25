import { subscriptionUrl } from "../../constants";
import axios from "axios";
export const urlBase64ToUint8Array = (base64String: string) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

export const hasNotificationPermission = async () => {
  alert(Notification.permission);
  if (Notification.permission === "granted") {
    return true;
  } else {
    const permission = await Notification.requestPermission();
    alert(`permission ${permission}`);
    if (permission === "granted") {
      return true;
    }
  }
  return false;
};

export const pushSupported = () => {
  if (typeof window !== `undefined`) {
    if ("PushManager" in window) {
      return true;
    }
  }
  return false;
};

export const saveSubscriptionToServer = async (
  subscription: string,
  signature: string
) => {
  try {
    await axios.post(subscriptionUrl, {
      subscription,
      signature,
    });

    return true; // only will run if error did not occur
  } catch (error) {
    return false;
  }
};

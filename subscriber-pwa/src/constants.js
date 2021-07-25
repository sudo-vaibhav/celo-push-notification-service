import { Alfajores } from "@celo-tools/use-contractkit";

export const HEADER_MARGIN_TOP = 70;
export const MIN_HEIGHT_STRING = `calc(100vh - ${HEADER_MARGIN_TOP}px)`;
export const APPLICATION_SERVER_PUBLIC_KEY =
  "BKKJxWcSwvkMsv6RBUMeCZecpJT6x1cRTrf-TjUUumY1pdj3-tTTwLXpexBkgUU1vfv8mHLOXakStA7-yYSVS0s";
export const subscriptionUrl = window.location.href.includes(":300")
  ? "http://192.168.29.8:8000/notification-subscription"
  : "https://b8298825305a.ngrok.io/notification-subscription";

export const ALLOWED_NETWORK = Alfajores;

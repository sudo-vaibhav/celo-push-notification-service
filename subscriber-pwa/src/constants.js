import { Alfajores } from "@celo-tools/use-contractkit";

export const HEADER_MARGIN_TOP = 70;
export const HEADER_MIN_HEIGHT_STRING = `calc(100vh - ${HEADER_MARGIN_TOP}px)`;
export const BOTTOM_NAVIGATOR_MARGIN_BOTTOM = 84;
export const BOTTOM_NAVIGATOR_MIN_HEIGHT_STRING = `calc(99vh - ${BOTTOM_NAVIGATOR_MARGIN_BOTTOM}px)`;

export const APPLICATION_SERVER_PUBLIC_KEY =
  "BKKJxWcSwvkMsv6RBUMeCZecpJT6x1cRTrf-TjUUumY1pdj3-tTTwLXpexBkgUU1vfv8mHLOXakStA7-yYSVS0s";
export const subscriptionUrl = window.location.href.includes(":300")
  ? "http://192.168.29.8:8000/notification-subscription"
  : "http://c85b31e0ade3.ngrok.io/notification-subscription";

export const ALLOWED_NETWORK = Alfajores;

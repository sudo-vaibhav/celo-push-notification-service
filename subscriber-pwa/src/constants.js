import { Alfajores } from "@celo-tools/use-contractkit";

export const HEADER_MARGIN_TOP = 70;
export const HEADER_MIN_HEIGHT_STRING = `calc(100vh - ${HEADER_MARGIN_TOP}px)`;
export const BOTTOM_NAVIGATOR_MARGIN_BOTTOM = 100;
export const BOTTOM_NAVIGATOR_MIN_HEIGHT_STRING = `calc(99vh - ${BOTTOM_NAVIGATOR_MARGIN_BOTTOM}px)`;

export const APPLICATION_SERVER_PUBLIC_KEY = "BEgj-ZNHlNFnK1qqu6QAEVeqUJbdLynQhfNKyQsgGHtDh-8lCfoAJH0PgCk-L4jG91ej2LmWxmWxlf6-T6u5k-I";
export const subscriptionUrl = window.location.href.includes("300") ? "http://localhost:8000/notification-subscription" :
  "https://cpns.azurewebsites.net/notification-subscription";
// "https://c85b31e0ade3.ngrok.io/notification-subscription";

export const ALLOWED_NETWORK = Alfajores;
export const RSA_MODULUS_LENGTH = Math.pow(2, 11); // used for rsa encryption
export const ENCRYPT_OPTIONS = {
  default_key_size: RSA_MODULUS_LENGTH.toString(),
};
export const NOTIFICATION_PRIVATE_KEY = "NOTIFICATION_PRIVATE_KEY";
export const APP_BASE_URL = "https://celopns.web.app/";
export const NOTIFICATIONS = "NOTIFICATIONS";

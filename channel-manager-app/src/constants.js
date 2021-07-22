import { Alfajores } from "@celo-tools/use-contractkit";

export const HEADER_MARGIN_TOP = 70;
export const MIN_HEIGHT_STRING = `calc(100vh - ${HEADER_MARGIN_TOP}px)`;
export const RSA_MODULUS_LENGTH = Math.pow(2, 12); // used for rsa encryption
export const MAX_ENCRYPTED_FIELD_SIZE = Math.pow(2, 8); // size of any field in encrypted notification should not exceed this otherwise there will be error
export const ALLOWED_NETWORK = Alfajores;

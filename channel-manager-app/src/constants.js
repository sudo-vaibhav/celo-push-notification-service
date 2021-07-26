import { Alfajores } from "@celo-tools/use-contractkit";

export const HEADER_MARGIN_TOP = 70;
export const MIN_HEIGHT_STRING = `calc(100vh - ${HEADER_MARGIN_TOP}px)`;
export const MAX_FIELD_SIZE = Math.pow(2, 7); // size of any field in encrypted notification should not exceed this otherwise there will be encryption error
export const RSA_MODULUS_LENGTH = Math.pow(2, 11); // used for rsa encryption
export const ENCRYPT_OPTIONS = {
  default_key_size: RSA_MODULUS_LENGTH.toString(),
};
export const ALLOWED_NETWORK = Alfajores;

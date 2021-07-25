const { newKit } = require("@celo/contractkit");
const { ALLOWED_NETWORK } = require("../../constants");
const PushNotifications = require("../../contract/PushNotifications.json");
const kit = newKit("wss://alfajores-forno.celo-testnet.org/ws");

const contract = new kit.web3.eth.Contract(
  PushNotifications.abi,
  PushNotifications.networks[ALLOWED_NETWORK].address
);

module.exports = {
  contract,
};

const { newKit } = require("@celo/contractkit");
const { ALLOWED_NETWORK, NODE_URL } = require("../../constants");
const PushNotifications = require("../../contract/PushNotifications.json");
const kit = newKit(NODE_URL); // use for non event listening purposes, we will have a separate connection for event listening exclusively

const contract = new kit.web3.eth.Contract(
  PushNotifications.abi,
  PushNotifications.networks[ALLOWED_NETWORK].address
);

module.exports = {
  contract,
  kit,
};

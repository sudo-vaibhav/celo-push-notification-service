const PushNotifications = artifacts.require("PushNotifications");
const Test = artifacts.require("Test");

module.exports = function (deployer) {
  deployer.deploy(PushNotifications);
};

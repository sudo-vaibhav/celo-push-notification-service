const PushNotifications = artifacts.require("PushNotifications");

module.exports = function (deployer) {
  deployer.deploy(PushNotifications);
};

const PushNotifications = artifacts.require("./PushNotifications.sol");

contract("PushNotifications", (accounts) => {
  it("should be initialized with correct values", () => {
    return PushNotifications.deployed().then((i) => {
      pushNotificationsInstance = i;

      // check if we are able to send private notifications

      // events for notifications sent should be emitted
    });
  });
});

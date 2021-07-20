const PushNotifications = artifacts.require("./PushNotifications.sol");

contract("PushNotifications", (accounts) => {
  it("should be initialized with correct values", () => {
    return PushNotifications.deployed().then((i) => {
      pushNotificationsInstance = i;
      /*
                check if it declares a channels mapping with records
                
                check if a person who's subscribed already isn't able to subscribe again
            */
    });
  });
});

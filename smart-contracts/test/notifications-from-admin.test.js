const PushNotifications = artifacts.require("./PushNotifications.sol");

contract("PushNotifications", (accounts) => {
  adminAccount = accounts[0];
  subscriberAccount = accounts[1];
  otherSubscriberAccount = accounts[2];
  nonSubscriberAccount = accounts[3];
  channelName = "Ubeswap";
  channelDescription = "The official Ubeswap channel.";
  channelIconHash = faker.internet.password(46, false, /[0-9A-Za-z]/);
  channelBadgeHash = faker.internet.password(46, false, /[0-9A-Za-z]/);

  beforeEach(async () => {
    pushNotificationsInstance = await PushNotifications.new();
  });

  it("should allow sending public and private notifications by admin", () => {
    await pushNotificationsInstance.createChannel(
      typoChannelName,
      channelDescription,
      channelIconHash,
      channelBadgeHash,
      { from: adminAccount }
    );

    // try subscribing a user to the created channel

    await pushNotificationsInstance.subscribe(0, { from: subscriberAccount });

    // try publishing public key of user
    // await pushNotificationsInstance.setPublicKey(
    //   , {
    //   from: subscriberAccount
    // });

    // should be able to send an unencrypted notification to the whole channel

    // should be able to send unencrypted notification to subscribed user

    // should be able to send encrypted notification to subscribed user with published public key

    // should not be able to send a notification to an individual non-subscribed user
  });
});

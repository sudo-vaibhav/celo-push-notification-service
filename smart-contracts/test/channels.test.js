const PushNotifications = artifacts.require("./PushNotifications.sol");
const faker = require("faker");
contract("PushNotifications", (accounts) => {
  adminAccount = accounts[0];
  subscriberAccount = accounts[1];
  otherSubscriberAccount = accounts[2];
  typoChannelName = "Uboswap";
  channelName = "Ubeswap";
  channelDescription = "The official Ubeswap channel.";
  channelIconHash = faker.internet.password(46, false, /[0-9A-Za-z]/);
  channelBadgeHash = faker.internet.password(46, false, /[0-9A-Za-z]/);

  beforeEach(async () => {
    pushNotificationsInstance = await PushNotifications.new();
  });
  it("should be able to allow creation and editing of a channel", async () => {
    await pushNotificationsInstance.createChannel(
      typoChannelName,
      channelDescription,
      channelIconHash,
      channelBadgeHash,
      { from: adminAccount }
    );

    // now check if the channel was created
    let channel = await pushNotificationsInstance.channels(0);
    assert.equal(channel.name, typoChannelName, "correct channel created");

    await pushNotificationsInstance.editChannel(
      0,
      channelName,
      channelDescription,
      channelIconHash,
      channelBadgeHash
    )

    channel = await pushNotificationsInstance.channels(0);
    assert.equal(channel.name, channelName, "name should be edited and corrected");

  });

  /*
                check if it declares a channels mapping with records
                
                check if a person who's subscribed already isn't able to subscribe again

                should not be able to send private notification for a person who does not have a published public key

                
            */
});

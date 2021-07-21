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
  it("should be able to allow creation and editing of a channel and subscribing", async () => {
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
    );

    channel = await pushNotificationsInstance.channels(0);
    assert.equal(
      channel.name,
      channelName,
      "name should be edited and corrected"
    );

    // testing subscribing to channel

    await pushNotificationsInstance.subscribe(0, {
      from: subscriberAccount,
    });
    const subscriptionStatus = await pushNotificationsInstance.subscriptions(
      subscriberAccount,
      0
    );
    assert.equal(subscriptionStatus, true, "subscription should be successful");
    // also check if subscribers array was updated
    const subscribers = await pushNotificationsInstance.subscribersInChannel(0);
    assert.equal(
      subscribers[0],
      subscriberAccount,
      "one subscriber should exist"
    );
    assert.equal(subscribers.length, 1, "one subscriber should exist");
    // resubscribing to same channel should fail
    return pushNotificationsInstance.subscribe
      .call(0, {
        from: subscriberAccount,
      })
      .then(assert.fail)
      .catch(async (error) => {
        assert(
          error.toString().indexOf("revert") >= 0,
          "resubscribing to the same subscription should not be allowed"
        );

        // you should be able to unsubscribe from a channel you have already subscribed to
        await pushNotificationsInstance.unsubscribe(0, {
          from: subscriberAccount,
        });

        const subscribersCount =
          await pushNotificationsInstance.subscribersCountInChannel(0);
        assert.equal(
          subscribersCount,
          0,
          "no subscribers should be present in list"
        );

        // however you shouldn't be able to unsubscibe if you aren't subscribed
        return pushNotificationsInstance.unsubscribe
          .call(0, {
            from: subscriberAccount,
          })
          .then(assert.fail)
          .catch((error) => {
            assert(
              error.toString().indexOf("revert") >= 0,
              "unsubscribing from a channel you are not subscribed to should not be allowed"
            );
            return pushNotificationsInstance.subscribe
              .call(999, { from: subscriberAccount })
              .then(assert.fail)
              .catch((error) => {
                assert(
                  error.toString().indexOf("revert") >= 0,
                  "subscription should not be allowed for channels that don't exist"
                );
              });
          });
      });
  });
});

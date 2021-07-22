const PushNotifications = artifacts.require("./PushNotifications.sol");
const Test = artifacts.require("./Test.sol");
const truffleAssert = require("truffle-assertions");
const faker = require("faker");
const web3 = require("web3");
contract("PushNotifications", (accounts) => {
  adminAccount = accounts[0];
  subscriberAccount = accounts[1];
  otherAccount = accounts[2];
  nonSubscriberAccount = accounts[3];

  const notifyAllInChannelSignature =
    "NotifyAllInChannel(uint256,string,string,string,string)";
  const notifyOneInChannelSignature =
    "NotifyOneInChannel(address,uint256,string,string,string,string,bool)";
  channelName = "Ubeswap";
  channelDescription = "The official Ubeswap channel.";
  channelIconHash = faker.internet.password(46, false, /[0-9A-Za-z]/);
  channelBadgeHash = faker.internet.password(46, false, /[0-9A-Za-z]/);

  notificationTitle = "This is a test notification";
  notificationAction = "http://example.com/";
  notificationBody =
    "If you are reading this, the contract is probably working";
  notificationImageHash =
    "bafybeibz5wohmannxrnebzeoxwyubsv5b3onjfkgeg65fjzz7dmgbz4mwi";

  beforeEach(async () => {
    pushNotificationsInstance = await PushNotifications.new();
    testInstance = await Test.new(pushNotificationsInstance.address, 0);
  });

  it("should allow sending public notifications by permitted addresses apart from admin", async () => {
    await pushNotificationsInstance.createChannel(
      typoChannelName,
      channelDescription,
      channelIconHash,
      channelBadgeHash,
      { from: adminAccount }
    );

    // try subscribing a user to the created channel

    await pushNotificationsInstance.subscribe(0, { from: subscriberAccount });

    // should not allow a non permitted contract to send a notification to everyone in the channel
    await truffleAssert.reverts(
      testInstance.testNotification(true),
      "sender is not admin of channel or one of the other addresses who have push access"
    );

    //should not allow a non permitted contract to send a notification to an individual
    await truffleAssert.reverts(
      testInstance.testNotification(false),
      "public notifications to one person in channel can only be sent by the admin or one of the allowed addresses/contracts"
    );
    // add a smart contract to the allowed list
    await pushNotificationsInstance.setPushAccess(
      0,
      testInstance.address,
      true,
      {
        from: adminAccount,
      }
    );

    // should be able to send notifications now
    // since the test contract calls another contract which is the one
    // that emits the event, we can only verify the signature of the emitted
    // event using truffle.
    // more on this here: https://ethereum.stackexchange.com/questions/61912/truffle-test-logs-do-not-include-an-emitted-event
    // https://ethereum.stackexchange.com/questions/7835/what-is-topics0-in-event-logs

    tx = await testInstance.testNotification(true, {
      from: adminAccount,
    });

    evt = tx.receipt.rawLogs.some((l) => {
      return l.topics[0] == web3.utils.keccak256(notifyAllInChannelSignature);
    });

    assert.ok(evt, "NotifyAllInChannel event not emitted");

    tx = await testInstance.testNotification(false, {
      from: subscriberAccount,
    });

    evt = tx.receipt.rawLogs.some((l) => {
      return l.topics[0] == web3.utils.keccak256(notifyOneInChannelSignature);
    });

    assert.ok(evt, "NotifyOneInChannel event not emitted");

    // should not allow a non-admin to set or revoke access
    await truffleAssert.reverts(
      pushNotificationsInstance.setPushAccess(0, testInstance.address, true, {
        from: otherAccount,
      }),
      "You must be the channel admin to set push access"
    );

    // should not be able to set push access for a channel that does not exist
    await truffleAssert.reverts(
      pushNotificationsInstance.setPushAccess(999, testInstance.address, true, {
        from: adminAccount,
      }),
      "channel does not exist"
    );

    // should not be able to send notification to a non-subscriber
    await truffleAssert.reverts(
      testInstance.testNotification(false, {
        from: nonSubscriberAccount,
      }),
      "recipient should be subscribed to the channel"
    );
  });
});

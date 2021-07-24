const PushNotifications = artifacts.require("./PushNotifications.sol");
const truffleAssert = require("truffle-assertions");
const faker = require("faker");
const crypto = require("crypto");

const encrypt = (data, publicKey) => {
  return crypto
    .publicEncrypt(
      {
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256",
      },
      Buffer.from(data)
    )
    .toString("base64");
};

contract("PushNotifications", (accounts) => {
  const { publicKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
  });

  adminAccount = accounts[0];
  subscriberAccount = accounts[1];
  otherAccount = accounts[2];
  nonSubscriberAccount = accounts[3];
  channelName = "Ubeswap";
  channelDescription = "The official Ubeswap channel.";
  channelIconHash = faker.internet.password(46, false, /[0-9A-Za-z]/);
  channelBadgeHash = faker.internet.password(46, false, /[0-9A-Za-z]/);

  notificationTitle = "The swap fees has increased by 5%";
  notificationAction = "https://app.ubeswap.org/";
  notificationBody = "The swap fees has increased by 5%.";
  notificationImageHash = faker.internet.password(46, false, /[0-9A-Za-z]/);

  encryptedNotificationTitle = encrypt(notificationTitle, publicKey);
  encryptedNotificationAction = encrypt(notificationAction, publicKey);
  encryptedNotificationBody = encrypt(notificationBody, publicKey);
  encryptedNotificationImageHash = encrypt(notificationImageHash, publicKey);

  beforeEach(async () => {
    pushNotificationsInstance = await PushNotifications.new();
  });

  it("should allow sending public and private notifications by admin", async () => {
    await pushNotificationsInstance.createChannel(
      typoChannelName,
      channelDescription,
      channelIconHash,
      channelBadgeHash,
      { from: adminAccount }
    );

    // try subscribing a user to the created channel

    await pushNotificationsInstance.subscribe(0, { from: subscriberAccount });

    const stringifiedPublicKey = publicKey.export({
      format: "pem",
      type: "pkcs1",
    });
    // try publishing public key of user
    await pushNotificationsInstance.setPublicKey(stringifiedPublicKey, {
      from: subscriberAccount,
    });

    assert.equal(
      await pushNotificationsInstance.publicKeys(subscriberAccount),
      stringifiedPublicKey,
      "public key should be published on chain"
    );
    // should be able to send an unencrypted notification to the whole channel
    receipt = await pushNotificationsInstance.notifyAllInChannel(
      0,
      notificationTitle,
      notificationAction,
      notificationBody,
      notificationImageHash,
      {
        from: adminAccount,
      }
    );

    assert.equal(receipt.logs.length, 1, "should emit one event only");
    assert.equal(
      receipt.logs[0].event,
      "NotifyAllInChannel",
      "should emit NotifyAllInChannel event"
    );
    assert.deepStrictEqual(
      {
        channel: 0,
        title: notificationTitle,
        action: notificationAction,
        body: notificationBody,
        imageHash: notificationImageHash,
      },
      {
        channel: receipt.logs[0].args.channel.toNumber(),
        title: receipt.logs[0].args.title,
        action: receipt.logs[0].args.action,
        body: receipt.logs[0].args.body,
        imageHash: receipt.logs[0].args.imageHash,
      },
      "NotifyAllInChannel should be correctly emitted"
    );

    // should be able to send unencrypted notification to subscribed user
    receipt = await pushNotificationsInstance.notifyOneInChannel(
      subscriberAccount,
      0,
      notificationTitle,
      notificationAction,
      notificationBody,
      notificationImageHash,
      false,
      {
        from: adminAccount,
      }
    );

    assert.equal(receipt.logs.length, 1, "should emit one event only");
    assert.equal(
      receipt.logs[0].event,
      "NotifyOneInChannel",
      "should emit NotifyOneInChannel event"
    );
    assert.deepStrictEqual(
      {
        recipient: subscriberAccount,
        channel: 0,
        title: notificationTitle,
        action: notificationAction,
        body: notificationBody,
        imageHash: notificationImageHash,
        privateNotification: false,
      },
      {
        recipient: receipt.logs[0].args.recipient,
        // .toString(),
        channel: receipt.logs[0].args.channel.toNumber(),
        title: receipt.logs[0].args.title,
        action: receipt.logs[0].args.action,
        body: receipt.logs[0].args.body,
        imageHash: receipt.logs[0].args.imageHash,
        privateNotification: receipt.logs[0].args.privateNotification,
      },
      "NotifyOneInChannel should be correctly emitted"
    );

    // should be able to send encrypted notification to subscribed user with published public key
    receipt = await pushNotificationsInstance.notifyOneInChannel(
      subscriberAccount,
      0,
      encryptedNotificationTitle,
      encryptedNotificationAction,
      encryptedNotificationBody,
      encryptedNotificationImageHash,
      true
    );

    assert.equal(receipt.logs.length, 1, "should emit one event only");
    assert.equal(
      receipt.logs[0].event,
      "NotifyOneInChannel",
      "should emit NotifyOneInChannel event"
    );
    assert.deepStrictEqual(
      {
        recipient: subscriberAccount,
        channel: 0,
        title: encryptedNotificationTitle,
        action: encryptedNotificationAction,
        body: encryptedNotificationBody,
        imageHash: encryptedNotificationImageHash,
        privateNotification: true,
      },
      {
        recipient: receipt.logs[0].args.recipient,
        // .toString(),
        channel: receipt.logs[0].args.channel.toNumber(),
        title: receipt.logs[0].args.title,
        action: receipt.logs[0].args.action,
        body: receipt.logs[0].args.body,
        imageHash: receipt.logs[0].args.imageHash,
        privateNotification: receipt.logs[0].args.privateNotification,
      },
      "NotifyOneInChannel should be correctly emitted"
    );

    await truffleAssert.reverts(
      pushNotificationsInstance.notifyAllInChannel(
        0,
        notificationTitle,
        notificationAction,
        notificationBody,
        notificationImageHash,
        {
          from: otherAccount,
        }
      ),
      "sender is not admin of channel or one of the other addresses who have push access"
    );

    await truffleAssert.reverts(
      pushNotificationsInstance.notifyOneInChannel(
        subscriberAccount,
        0,
        notificationTitle,
        notificationAction,
        notificationBody,
        notificationImageHash,
        false,
        {
          from: otherAccount,
        }
      ),
      "public notifications to one person in channel can only be sent by the admin or one of the allowed addresses/contracts"
    );

    await truffleAssert.reverts(
      pushNotificationsInstance.notifyOneInChannel(
        otherAccount,
        0,
        notificationTitle,
        notificationAction,
        notificationBody,
        notificationImageHash,
        false,
        {
          from: adminAccount,
        }
      ),
      "recipient should be subscribed to the channel"
    );

    await truffleAssert.reverts(
      pushNotificationsInstance.notifyAllInChannel(
        999,
        notificationTitle,
        notificationAction,
        notificationBody,
        notificationImageHash,
        {
          from: adminAccount,
        }
      ),
      "channel does not exist"
    );
  });
});

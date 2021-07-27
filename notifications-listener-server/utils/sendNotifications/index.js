const NotificationSubscription = require("../../models/NotificationSubscription");
const { contract } = require("../contractKit");
const sendOneNotificationToSubscription = require("../sendOneNotificationToSubscription");

const sendNotifications = async (event, nature) => {
  const values = event.returnValues;
  const channel = parseInt(values.channel);

  // values.channel

  // now fetch channel specific info and assets
  const channelInfo = await contract.methods.channels(channel).call();
  console.log("channelInfo:", channelInfo);
  let notificationInfo = {
    title: values.title,
    data: values.action, // this has to be done to make notification click and go to a webpage
    body: values.body,
    imageHash: values.imageHash,
    iconHash: channelInfo.iconHash,
    badgeHash: channelInfo.badgeHash,
  };

  console.log("this is the event:", event);
  console.log("this is the nested event:", nature);
  switch (nature) {
    case "NotifyAllInChannel":
      console.log("NotifyAllInChannel event detected");
      const subscribers = await contract.methods
        .subscribersInChannel(channel)
        .call();

      console.log(
        "following subscribers will be sent notification:",
        subscribers
      );
      subscriptions = await NotificationSubscription.find({
        address: subscribers,
      });

      console.log(
        "the respective subscriptions for these people are:",
        subscriptions
      );

      await Promise.allSettled(
        subscriptions.map((subscription) => {
          return sendOneNotificationToSubscription(subscription, {
            ...notificationInfo,
            privateNotification: false,
          });
        })
      );

      break;
    case "NotifyOneInChannel":
      console.log("NotifyOneInChannel event detected");

      const subscription = await NotificationSubscription.findOne({
        address: values.recipient,
      });

      console.log(
        "following single subscriber will be sent notification:",
        subscription
      );

      await sendOneNotificationToSubscription(subscription, {
        ...notificationInfo,
        privateNotification: values.privateNotification,
      });

      break;
  }
};

module.exports = sendNotifications;

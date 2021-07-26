const NotificationSubscription = require("../../models/NotificationSubscription");
const {
  APPLICATION_SERVER_PRIVATE_KEY,
  APPLICATION_SERVER_PUBLIC_KEY,
} = require("../../secrets");
const webpush = require("web-push");

webpush.setVapidDetails(
  "mailto:mailvaibhavchopra@gmail.com",
  APPLICATION_SERVER_PUBLIC_KEY,
  APPLICATION_SERVER_PRIVATE_KEY
);

const sendOneNotificationToSubscription = async (subscription, data) => {
  console.log("sending notification to a particular subscription: ",subscription.address)
  try {
    await webpush.sendNotification(subscription, JSON.stringify(data));
  } catch (err) {
    if (err.statusCode === 404 || err.statusCode === 410) {
      console.log("Subscription has expired or is no longer valid: ", err);
      await NotificationSubscription.findOneAndDelete({
        address: s.address,
      });
    }
  }
};

module.exports = sendOneNotificationToSubscription;

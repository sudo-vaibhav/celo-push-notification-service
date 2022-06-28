const NotificationSubscription = require("../../models/NotificationSubscription");
const webpush = require("web-push");
const { FALLBACK_VAPID_SUBJECT, FALLBACK_APPLICATION_PUBLIC_KEY, FALLBACK_APPLICATION_PRIVATE_KEY } = require("../../constants");

webpush.setVapidDetails(
  process.env.VAPID_SUBJECT || FALLBACK_VAPID_SUBJECT,
  process.env.APPLICATION_PUBLIC_KEY || FALLBACK_APPLICATION_PUBLIC_KEY,
  process.env.APPLICATION_PRIVATE_KEY || FALLBACK_APPLICATION_PRIVATE_KEY
);

const sendOneNotificationToSubscription = async (subscriptionDoc, data) => {
  console.log(
    "sending notification to a particular subscription: ",
    subscriptionDoc.address
  );
  console.log("outgoing notification data is:", data);
  try {
    const sent = await webpush.sendNotification(
      subscriptionDoc.subscription,
      JSON.stringify(data)
    );
    console.log("sent: ", sent);
  } catch (err) {
    console.log("error in sending notification: ", err);
    if (err.statusCode === 404 || err.statusCode === 410) {
      console.log("Subscription has expired or is no longer valid");
      NotificationSubscription.findOneAndDelete(
        {
          address: subscriptionDoc.address,
        },
        (err, docs) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Deleted Subscription : ", docs);
          }
        }
      );
    }
  }
};

module.exports = sendOneNotificationToSubscription;

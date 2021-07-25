const NotificationSubscription = require("../../models/NotificationSubscription");
const { contract } = require("../contractKit");
const listenForNotifications = () => {
  console.log("running notifications listener");
  contract.events.allEvents(
    {
      fromBlock: "latest", // continue listening from now, practically a subscription to all events
    },
    async (error, event) => {
      console.log("event detected: ", event);
      if (error) {
        console.log("some error occured", error);
      } else {
        const values = event.returnValues;
        switch (event.event) {
          case "NotifyAllInChannel":
            console.log("NotifyAllInChannel event detected");
            const subscribers = await contract.methods
              .subscribersInChannel(values.channel)
              .call();
            subscriptions = await NotificationSubscription.find({
              address: subscribers,
            });

            console.log(subscriptions);
            break;
          case "NotifyOneInChannel":
            console.log("NotifyOneInChannel event detected");
            break;
        }
      }
    }
  );
};

module.exports = listenForNotifications;

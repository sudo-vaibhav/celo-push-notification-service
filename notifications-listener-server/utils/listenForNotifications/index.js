const { contract } = require("../contractKit");
const sendNotifications = require("../sendNotifications");
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
        try {
          if (event.event) {
            console.log("I'm in and i was: ", event);
            await sendNotifications(event, event.event);
          }
        } catch (e) {
          console.log(
            "error in sending notifications after detecting event: ",
            e
          );
        }
      }
    }
  );
};

module.exports = listenForNotifications;

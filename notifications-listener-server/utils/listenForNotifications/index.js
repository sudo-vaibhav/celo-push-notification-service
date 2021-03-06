const sendNotifications = require("../sendNotifications");
const Web3 = require("web3");
const PushNotifications = require("../../contract/PushNotifications.json");
const { ALLOWED_NETWORK, WEBSOCKET_URL } = require("../../constants");

function setupProviderAndSubscriptions() {
  console.log("setting up websocket connection");
  let provider = new Web3.providers.WebsocketProvider(
    WEBSOCKET_URL
  );
  let web3 = new Web3(provider);
  let setupNewProvider = false;

  const contract = new web3.eth.Contract(
    PushNotifications.abi,
    PushNotifications.networks[ALLOWED_NETWORK].address
  );

  // Keeps track of the number of times we've retried to set up a new provider
  // and subs without a successful header
  let sequentialRetryCount = 0;

  const setupNewProviderAndSubs = async () => {
    // To prevent us from retrying too aggressively, wait a little if
    // we try setting up multiple times in a row
    const sleepTimeMs = sequentialRetryCount * 100;
    console.log("sleeping", sleepTimeMs);
    await sleep(sleepTimeMs);
    sequentialRetryCount++;
    // To avoid a situation where multiple error events are triggered
    if (!setupNewProvider) {
      setupNewProvider = true;
      setupProviderAndSubscriptions();
    }
  };

  provider.on("error", async (error) => {
    console.log("WebsocketProvider encountered an error", error);
    await setupNewProviderAndSubs();
  });

  provider.on("end", async () => {
    console.log("WebsocketProvider has ended, will restart");
    await setupNewProviderAndSubs();
  });

  contract.events.allEvents(
    {
      fromBlock: "latest", // continue listening from now, practically a subscription to all events
    },
    async (error, event) => {
      console.log("event detected: ", event);
      if (error) {
        console.log("some error occured", error);
        await setupNewProviderAndSubs();
      } else {
        if (sequentialRetryCount > 0) {
          sequentialRetryCount = 0;
        }
        try {
          if (event.event) {
            console.log("Event ", event);
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
}

function sleep(ms, onSleep) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
    if (onSleep) {
      onSleep();
    }
  });
}

module.exports = setupProviderAndSubscriptions;

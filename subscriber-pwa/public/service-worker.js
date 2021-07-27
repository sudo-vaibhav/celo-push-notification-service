/* eslint-disable no-restricted-globals */

import localforage from "https://cdn.skypack.dev/localforage";
console.log("localforage", localforage);
const APP_BASE_URL = "/"; //experimenting with relative URLs
// const APP_BASE_URL = "http://localhost:3000/";
const getInfuraUrl = (hash) => {
  return "https://ipfs.infura.io/ipfs/" + hash;
};
// Any other custom service worker logic can go here.
self.addEventListener("push", async (event) => {
  const receivedData = event.data.json();
  let notificationOptions = {
    timestamp: Date.now(),
  };
  Object.keys(receivedData).forEach((key) => {
    let value = receivedData[key];
    if (value) {
      notificationOptions[key] = value;
    }
  });

  const NOTIFICATIONS = "NOTIFICATIONS";
  let notificationsSoFar = await localforage.getItem(NOTIFICATIONS);
  console.log("notificationsSoFar", notificationsSoFar);
  if (notificationsSoFar) {
    try {
      notificationsSoFar = JSON.parse(notificationsSoFar);
    } catch (e) {
      console.log(
        "could not parse notifications from indexedDB inside service worker, resetting stored notifications"
      );
      notificationsSoFar = [];
    }
  } else {
    notificationsSoFar = [];
  }
  await localforage.setItem(
    NOTIFICATIONS,
    JSON.stringify([notificationOptions, ...notificationsSoFar])
  );

  if (receivedData.privateNotification) {
    notificationOptions = {
      title: "You have a private notification",
      body: "Click here to view it",
      data: APP_BASE_URL + "notifications",
    };
  } else {
    // show notification if its not private
    // converting all ipfs hashes to urls
    Object.keys(notificationOptions)
      .filter((e) => e.includes("Hash"))
      .forEach((key) => {
        notificationOptions[key.slice(0, key.indexOf("Hash"))] = getInfuraUrl(
          notificationOptions[key]
        );
      });
  }

  console.log("finally showing: ", notificationOptions);
  event.waitUntil(
    self.registration.showNotification(notificationOptions.title, {
      vibrate: [200, 100, 200, 100, 200, 100, 400],
      ...notificationOptions,
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  console.log("[Service Worker] Notification click Received.");
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data));
});

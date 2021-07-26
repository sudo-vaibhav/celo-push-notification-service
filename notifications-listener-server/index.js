const PORT = process.env.PORT || 8000;
const express = require("express");
require("express-async-errors");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const mongoose = require("mongoose");
const { MONGO_URL } = require("./secrets");
const morgan = require("morgan");
const listenForNotifications = require("./utils/listenForNotifications");
const notificationSubscription = require("./controllers/notificationSubscription");
const recoverAddressFromSignature = require("./utils/recoverAddressFromSignature");
const NotificationSubscription = require("./models/NotificationSubscription");

app.use(morgan("dev"));

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("connected to DB");

    app.use(
      "/notification-subscription",
      recoverAddressFromSignature,
      notificationSubscription
    );

    app.listen(PORT, () => {
      listenForNotifications();
      console.log(`Server listening on port ${PORT}`);
    });
  });

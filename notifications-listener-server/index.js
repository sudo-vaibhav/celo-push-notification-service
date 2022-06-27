const PORT = process.env.PORT || 8000;
const express = require("express");
require("express-async-errors");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const mongoose = require("mongoose");
const morgan = require("morgan");
const listenForNotifications = require("./utils/listenForNotifications");
const notificationSubscription = require("./controllers/notificationSubscription");
const recoverAddressFromSignature = require("./utils/recoverAddressFromSignature");
const NotificationSubscription = require("./models/NotificationSubscription");
app.use(morgan("dev"));
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("connected to DB");
    await NotificationSubscription.init()
    app.use(
      "/notification-subscription",
      recoverAddressFromSignature,
      notificationSubscription
    );

    app.use("/public-key", (req, res) => {
      return res.send({
        publicKey: process.env.APPLICATION_PUBLIC_KEY
      })
    })

    app.listen(PORT, () => {
      listenForNotifications();
      console.log(`Server listening on port ${PORT}`);
    });
  });

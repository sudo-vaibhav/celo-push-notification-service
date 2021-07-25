const PORT = process.env.PORT || 8000;
const express = require("express");
require("express-async-errors");
const cors = require("cors");
const app = express();
app.use(cors());
const mongoose = require("mongoose");
app.use(express.json());
const { MONGO_URL } = require("./secrets");
const morgan = require("morgan");
const listenForNotifications = require("./utils/listenForNotifications");
const notificationSubscription = require("./controllers/notificationSubscription");

// const webpush = require("web-push");
// console.log(webpush.generateVAPIDKeys());

app.use(morgan("dev"));
mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to DB");

    app.use("/notification-subscription", notificationSubscription);

    app.listen(PORT, () => {
      listenForNotifications();
      console.log(`Server listening on port ${PORT}`);
    });
  });

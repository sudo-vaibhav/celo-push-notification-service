const { FALLBACK_PORT, FALLBACK_DB_URL } = require("./constants");
const PORT = process.env.PORT || FALLBACK_PORT;
const express = require("express");
require("express-async-errors");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const mongoose = require("mongoose");
const morgan = require("morgan");
const listenForNotifications = require("./utils/listenForNotifications");
const NotificationSubscription = require("./models/NotificationSubscription");
const rootRouter = require("./controllers")
app.use(morgan("dev"));
mongoose
  .connect(process.env.DB_URL || FALLBACK_DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("connected to DB");
    await NotificationSubscription.init()

    app.use("/api", rootRouter);

    app.listen(PORT, () => {
      listenForNotifications();
      console.log(`Server listening on port ${PORT}`);
    });
  });

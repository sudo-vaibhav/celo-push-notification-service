const PORT = process.env.PORT || 8000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const { MONGO_URL } = require("./secrets");
const morgan = require("morgan");
const listenForNotifications = require("./utils/listenForNotifications");
app.use(morgan("dev"));
mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to DB");

    app.post("/notification-subscription", (req, res) => {
      res.status(201).send("ok");
    });

    app.listen(PORT, () => {
      listenForNotifications();
      console.log(`Server listening on port ${PORT}`);
    });
  });

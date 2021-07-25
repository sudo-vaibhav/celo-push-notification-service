const mongoose = require("mongoose");

const NotificationSubscriptionSchema = new mongoose.Schema(
  {
    endpoint: {
      type: String,
      required: true,
      unique: true,
      immutable: true,
    },

    address: {
      type: String,
      required: true,
      unique: true,
      immutable: true,
      validate: {
        validator: (v) => {
          return v.length === 42;
        },
        message: "invalid address",
      },
    },

    subscription: {
      type: String,
      required: true,
      unique: true,
      immutable: true,
      validate: {
        validator: (v) => {
          v = typeof v === "string" ? JSON.parse(v) : v;
          return v.endpoint != null && v.keys != null; // == null checks for both null and undefined
        },
        message: "endpoint and keys should be present in subscription object",
      },
      set: (val) => (typeof val === "string" ? val : JSON.stringify(val)),
      get: (val) => JSON.parse(val),
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "NotificationSubscription",
  NotificationSubscriptionSchema
);

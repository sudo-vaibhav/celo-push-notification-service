const express = require("express");
const NotificationSubscription = require("../../models/NotificationSubscription");
const router = express.Router();

router.put("/", async (req, res) => {
  const { subscription } = req.body;
  const address = req.address;
  // delete any stale notification subscription for this address
  await NotificationSubscription.findOneAndDelete({
    address,
  });

  res.send(
    await new NotificationSubscription({
      address,
      subscription,
    }).save()
  );
});

router.delete("/", async (req, res) => {
  const address = req.address;
  await NotificationSubscription.findOneAndDelete({
    address,
  });

  res.send({
    success: true,
  });
});

module.exports = router;

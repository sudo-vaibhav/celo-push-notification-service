const express = require("express")
const router = express.Router();
const notificationSubscription = require("./notificationSubscription");
const recoverAddressFromSignature = require("../utils/recoverAddressFromSignature");
const { FALLBACK_APPLICATION_PUBLIC_KEY } = require("../constants")
router.use(
    "/notification-subscription",
    recoverAddressFromSignature,
    notificationSubscription
);

router.use("/public-key", (req, res) => {
    return res.send({
        publicKey: process.env.APPLICATION_PUBLIC_KEY || FALLBACK_APPLICATION_PUBLIC_KEY
    })
})


module.exports = router
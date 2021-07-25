const express = require("express");
const router = express.Router();
const { kit } = require("../../utils/contractKit");
router.put("/", async (req, res) => {
  const { subscription, signature } = req.body;

  const signingAddress = kit.web3.eth.accounts.recover("cpns", signature);

  console.log(`Signing address: ${signingAddress}`);
  res.send("ok");
});

router.delete("/", (req, res) => {});

module.exports = router;

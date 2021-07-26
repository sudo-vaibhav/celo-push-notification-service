const { kit } = require("../contractKit");
const recoverAddressFromSignature = (req, res, next) => {
  const { signature } = req.body;
  const signingAddress = kit.web3.eth.accounts.recover("cpns", signature);
  console.log(`Signing address: ${signingAddress}`);
  req.address = signingAddress;
  next();
};

module.exports = recoverAddressFromSignature;

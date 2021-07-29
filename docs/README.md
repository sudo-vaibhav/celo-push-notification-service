# CELO PUSH NOTIFICATION SERVICE

WEB3 is revolutionary in every manner, except for how it expects you to go and check again and again for simple things instead of delivering important notifications and alerts right to you like every app in WEB2 land does. Here are a few use cases where it would have been nice to have a notification service that a smart contract could call right from WITHIN THE CONTRACT (although provisions for external notifications can also be made if needed):

- notification about liquidation of your collateral on moola
- sudden change in price of Celo or gas price changes
- domain expiry by a domain naming service on celo (currently in ethereum, Ethereum Naming Service has to tweet out the details of an expired domain in hopes that the domain owner reads this tweet and renews their domain)

This is a very bad UX and forces people to open these apps again and again just to check what's changed while they were away.

The basics of how I would go about doing it is that users will allow a DAPP maker to send them notifications and the nodes running the notifications would listen to special events emitted by contracts and then alert user as required. We can also do secret and encrypted notifications which contain sensitive data by maintaining a public private key pair on chain for encryption. Some of the inspiration and the key ideas behind this project come from EPNS (Ethereum push notification service, https://epns.io/) but my product is also different in quite a few ways also like :

1. Thanks to Valora, we probably won't need to also include a wallet in the app, whereas EPNS ships with its own wallet.
2. I think that notifications should be kept simple and easy, whereas EPNS forces every developer to stake 50 DAI just to be able to create notification channels while push notifications are free on web2.0. This in my opinion is bad and should be removed or minimised as much as possible. DEFI features like Yield farming and Pay to Subscribe in an alpha product notification service is something that irks me and doesn't make sense for widespread adoption. This is something I intend to do differently.

const concurrently = require("concurrently");
const path = require("path");
concurrently(
    [
        {
            command: "yarn dev",
            name: "listener server",
            cwd: path.resolve(__dirname, "notifications-listener-server"),
        },
        {
            command: "yarn start",
            name: "subscriber pwa",
            cwd: path.resolve(__dirname, "subscriber-pwa"),
        },
        {
            command: "yarn start",
            name: "channel manager app",
            cwd: path.resolve(__dirname, "channel-manager-app"),
        },
    ],
    {
        prefix: "name",
        restartTries: 3,
    }
);
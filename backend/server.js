const app = require("./src/app");
const connectDB = require("./src/config/db");
require("dotenv").config();

const basePort = Number(process.env.PORT) || 5000;
const maxPortAttempts = 5;
let currentPort = basePort;

connectDB();

const startServer = (port) => {
  const server = app.listen(port, () => {
    console.log(`EtharaFlow server running on port ${port}`);
  });

  server.on("error", (error) => {
    if (error.code === "EADDRINUSE") {
      console.warn(`Port ${port} is already in use.`);
      const nextPort = port + 1;

      if (nextPort <= basePort + maxPortAttempts) {
        console.log(`Trying port ${nextPort} instead...`);
        currentPort = nextPort;
        startServer(nextPort);
        return;
      }

      console.error(`No free port found between ${basePort} and ${basePort + maxPortAttempts}. Set PORT to a free port.`);
      process.exit(1);
    }

    throw error;
  });
};

startServer(currentPort);
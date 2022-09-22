const { required } = require("joi");
const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config/config");
const logger = require("./config/logger");
const port = config.port || 5000;
let server;
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info("Connected to MongoDB");
  server = app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
  });

  const io = require("socket.io")(server, {
    cors: {
      origins: "http://localhost:3000" ?? "http://localhost:3001",
    },
  });
  app.set("io", io);

  io.on("connection", function (socket) {
    console.log("A user connected");

    //support button state event handler
    socket.on("latestListen", function () {
      io.emit("adminListen");
    });

    //Whenever someone disconnects this piece of code executed
    socket.on("disconnect", function () {
      console.log("A user disconnected");
    });
  });
});
const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});

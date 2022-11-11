import url from "node:url";

import { PeerServer } from "peer";

if (import.meta.url === url.pathToFileURL(process.argv[1]).href) {
  const errorTypes = ["unhandledRejection", "uncaughtException"];
  const signalTraps = ["SIGTERM", "SIGINT"];

  errorTypes.forEach((type) => {
    process.on(type, async (e) => {
      try {
        console.log(`process.on ${type}`);
        console.error(e);
        process.exit(0);
      } catch (_) {
        process.exit(1);
      }
    });
  });

  signalTraps.forEach((type) => {
    process.once(type, async () => {
      try {
        console.log(`Received ${type} signal`);
      } finally {
        process.kill(process.pid, type);
      }
    });
  });

  try {
    const port = parseInt(process.env["PORT"] || "80", 10);

    const peerServer = PeerServer({ port, path: "/peers" });
    console.info(`peer server started at localhost:${port}/peers`);
  } catch (err) {
    console.error("ERROR: ", err);
    process.exit(1);
  }
}

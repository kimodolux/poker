import { createServer } from "http";
import { createApplication } from "./app";

const httpServer = createServer();

createApplication(
  httpServer,
  {
    cors: {
      origin: ["http://localhost:3001"],
    },
  }
);

httpServer.listen(3000, () => {
  console.log(`> Ready on http://localhost:${3000}`);
});
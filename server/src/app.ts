import { Server as HttpServer } from "http";
import { Server, ServerOptions } from "socket.io";
import { ClientEvents, ServerEvents } from "./events";

export function createApplication(
  httpServer: HttpServer,
  serverOptions: Partial<ServerOptions> = {}
): Server<ClientEvents, ServerEvents> {
  const io = new Server<ClientEvents, ServerEvents>(httpServer, serverOptions);


  io.on("connection", (socket) => {
    console.log("connected: ", socket.id)
    
    socket.on("message", (msg) => {
      console.log(msg)
    })
    
  });

  return io;
}
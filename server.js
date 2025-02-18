import express from "express";
import http from "http";
import { Server } from "socket.io";
import { AuthRouter } from "./src/routes/AuthRoutes/authroutes.js";
import { UserRouter } from "./src/routes/UserRoutes/UserRoutes.js";
import cors from "cors";
import { dbConnection } from "./src/config/dbconfig.js";

const app = express();

const server = http.createServer(app);
export const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());
app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/users", UserRouter);
const connection = await dbConnection()
  .then(
    server.listen(3000, () => {
      console.log("listening on *:3000");
    })
  )
  .catch((error) => error);

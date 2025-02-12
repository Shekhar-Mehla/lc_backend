import express from "express";
import cors from "cors";
import { dbConnection } from "./src/config/dbconfig.js";
import { AuthRouter } from "./src/routes/AuthRoutes/authroutes.js";
import errorMiddleaware from "./src/Middleware/errorMiddleaware.js";

const server = express();
const Port = process.env.PORT || 3000;
server.use(cors());
server.use(express.json());

// db connection setup
dbConnection()
  .then(() => {
    server.listen(Port, (error) => {
      error
        ? console.log(error)
        : console.log(`server is servig at http://localhost:${Port} `);
    });
  })
  .catch((error) => console.log(error));
server.use("/api/v1/auth", AuthRouter);

// page not found error handler
server.use((req, res, next) => {
  const error =  new Error("Page not found");
  error.statusCode = 404

  next(error);
});
server.use(errorMiddleaware);

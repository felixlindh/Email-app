import * as dotenv from "dotenv"
dotenv.config()
import express from "express";
import router from './src/router/router.js';
/* import cors from "cors"; */
import sessionHandler from "./src/middleware/sessionhandler.js";


const addr = "127.0.0.1";
const port = 3030;

const app = express();

/* app.use(cors()) */
app.use(express.json())

app.use(sessionHandler)


app.get("/health", (request, response) => {
    response.send({ state: "up", message: "Server is healthy" });
});


app.use(router)

app.listen(port, () => {
    console.log("Server listening on port: " + port);
});
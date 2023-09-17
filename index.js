import "dotenv/config";
import express from "express";
//import { uuid } from "uuidv4";
import morganMiddleware from "./middleware/morganMiddleware.js";

const app = express();
const PORT = process.env.PORT;
const verifyToken = process.env.TOKEN;

app.use(express.json());
app.use(morganMiddleware);

app.post("/webhook", (req, res) => {
  if (body.object === "page") {
    res.status(200).send("EVENT_RECEIVED");
  } else {
    res.sendStatus(404);
  }
});

app.get("/messaging-webhook", (req, res) => {
  // Parse the query params
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  // Check if a token and mode is in the query string of the request
  if (mode && token) {
    // Check the mode and token sent is correct
    if (mode === "subscribe" && token === verifyToken) {
      // Respond with the challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      // Respond with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
});

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`);
});

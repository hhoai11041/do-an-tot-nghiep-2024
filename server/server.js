import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import https from "https";
import fs from "fs";
import apiUser from "./API/User.js";
import connectDB from "./connectDB.js";
import apiLoginAccount from "./API/login.js";
import apiCuisine from "./API/cuisine.js";
import apiItinerary from "./API/travelItinerary.js";
import news from "./API/news.js";
import apiHotel from "./API/Hotel.js";
import chats from "./API/chatbotAI.js";
import apiDestination from "./API/destination.js";
import apiRestaurant from "./API/restaurant.js";
import apiMap from "./API/map.js";
import apiReview from "./API/review.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3333;
const httpsPort = process.env.HTTPS_PORT || 443;

const httpsOptions = {
  key: fs.readFileSync("/etc/letsencrypt/live/khamphavietnam.online/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/khamphavietnam.online/fullchain.pem"),
};

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://3.107.183.6",
    credentials: true,
  })
);
await connectDB();

app.use("/", apiUser);
app.use("/", apiLoginAccount);
app.use("/", apiCuisine);
app.use("/", apiItinerary);
app.use("/", news);
app.use("/", apiHotel);
app.use("/", apiDestination);
app.use("/", apiRestaurant);
app.use("/", apiMap);
app.use("/", chats);
app.use("/", apiReview);

// HTTP -> HTTPS Redirect Middleware
const httpApp = express();
httpApp.use((req, res, next) => {
  if (!req.secure) {
    return res.redirect(`https://${req.headers.host}${req.url}`);
  }
  next();
});

// Chạy HTTP server để chuyển hướng sang HTTPS
httpApp.listen(port, () => {
  console.log(`HTTP Server running on port ${port} and redirecting to HTTPS`);
});

// Chạy HTTPS server
https.createServer(httpsOptions, app).listen(httpsPort, () => {
  console.log(`HTTPS Server running on port ${httpsPort}`);
});


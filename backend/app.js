const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const errorMiddleware = require("./middlewares/error");
const cookieParser = require("cookie-parser");
const routes = require("./routes");
const corsOption = {
    credentials: true,
    origin: [process.env.FRONT_URL],
};


const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors(corsOption));
// app.use(cors());

app.use("/api/v1/user", routes.user);
app.use("/api/v1/quiz", routes.quiz);
app.use("/api/v1/team", routes.team);

// Middleware for Errors
app.use(errorMiddleware);


module.exports = app;
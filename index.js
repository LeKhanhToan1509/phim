require("dotenv").config();
const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(methodOverride("_method"));
app.use(cookieParser());
const Route = require("./routes/client/index.route");

const port = process.env.PORT;
const connect = require("./config/database.js");
connect.connection();

Route(app);

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");
app.use(express.static(`${__dirname}/public`));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

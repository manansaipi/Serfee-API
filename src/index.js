require("dotenv").config();

//  core modules
const express = require("express");
const dns = require("dns");
const usersRoutes = require("./routes/users");
const firebaseAuth = require("./routes/auth");

const requestRoutes = require("./routes/routeRequestTask");

const app = express();

// this middle ware allow JSON req.body
app.use(express.json()); 
/*
    this will allow access static file in public folder 
    inside images folder and to get access into the file 
    need to make a request to = http://localhost:4000/filename.extension 
*/
app.use(express.static("public/images"));

app.use("/users", usersRoutes); // Grouping path users in users. jsfile

app.use("/auth", firebaseAuth);

app.use("/task-requests", requestRoutes);

app.use((err, req, res, next) => {
    // err handling
    res.send(err);
    next();
});

app.use("/", (req, res) => {
    // else
    res.sendStatus(404);
});

const hostname = "localhost";
const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});

dns.lookup(require("os").hostname(), (err, address) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log("Server IP:", address);
});

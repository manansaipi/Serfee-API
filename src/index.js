require("dotenv").config();

//  core modules
const express = require("express");
const dns = require("dns");
const usersRoutes = require("./routes/users");
const firebaseAuth = require("./routes/auth");
const tasksRoutes = require("./routes/tasks");
const reviewsRoutes = require("./routes/reviews");
const chatsRoutes = require("./routes/chats");

const app = express();

// this middle ware allow JSON req.body
app.use(express.json()); 
/*
    this will allow access static file in public folder 
    inside images folder and to get access into the file 
    need to make a request to = http://localhost:4000/filename.extension 
*/
app.use(express.static("public/images"));

app.get("/", (req, res) => {
    res.send({ message: "Connection success " });
});

app.use("/users", usersRoutes); // Grouping path users in users.js file

app.use("/auth", firebaseAuth);

app.use("/tasks", tasksRoutes);

app.use("/reviews", reviewsRoutes);

app.use("/chats", chatsRoutes);

app.use((err, req, res, next) => {
    // err handling
    res.send(err);
    next();
});

app.use("/", (req, res) => {
    // else
    res.sendStatus(404);
});

const port = process.env.PORT || 8000;
dns.lookup(require("os").hostname(), async (err, address) => {
    if (err) {
        console.error(err);
        return;
    }
    app.listen(port, () => {
        console.log(`Server running at http://${address}:${port}`);
    });
});
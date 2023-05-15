require("dotenv").config();

//  core modules
const express = require("express");
const usersRoutes = require("./routes/users");
const firebaseAuth = require("./routes/auth");
// const Middleware = require("./middleware/firebase_auth");

const app = express();

app.use(express.json()); // this middle ware allow JSON req.body

app.use("/users", usersRoutes); // Grouping path users in users. jsfile

app.use("/auth", firebaseAuth);

// have to validate user before use the searchFeature using authMiddleware
// app.use("/search", middleware.authMiddleware, searchRoute); // search feature

app.use((err, req, res) => {
    // err handling
    res.json({
        message: err,
    });
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

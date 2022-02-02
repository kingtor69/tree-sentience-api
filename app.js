const express = require("express");
const app = express();

app.use(express.json());

const ExpressError = require("./expressError");
const mcRoutes = require("./routes/mc");

app.use("/api/mc", mcRoutes);

app.use((req, res, next) => {
    const err = new ExpressError("Four uh-oh Four (Not Found)", 404);
    return next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);

    return res.json({
        error: err,
        message: err.message
    });
});

module.exports = app;

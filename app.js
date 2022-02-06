/*
** this is being deployed manually with manual version management
** this code last updated 20220205-1437mst
*/

const express = require("express");
const app = express();

app.use(express.json());

const ExpressError = require("./expressError");
const mcRoutes = require("./routes/mc");

if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'development') app.listen(8888);

app.use("/api/mc", mcRoutes);

app.use((req, res, next) => {
    const err = new ExpressError("Four uh-oh Four (Not Found)", 404);
    return next(err);
});

app.use((err, req, res, next) => {
    const status = err.status || 500;

    return res.status(status).json({
        error: err,
        message: err.message
    });
});

module.exports = app;

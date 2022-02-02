const app = require('./app');

// TypeError: app.listen is not a function
// da foq?

app.listen(3000, () => {
    console.log('App running on port 3000');
});

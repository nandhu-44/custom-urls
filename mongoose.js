const mongoose = require('mongoose');

let connection;

// Connect on first use and reuse the connection. If an attempt fails, the next
// call tries again instead of leaving the server stuck without a database.
function connectDb() {
    if (!process.env.MONGODB_URI) {
        return Promise.reject(new Error('MONGODB_URI is not set.'));
    }
    connection ??= mongoose
        .connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 5000 })
        .then(() => {
            console.log('Connected to MongoDB 💚');
        })
        .catch((err) => {
            connection = undefined;
            console.error('Error ➡', err.message);
            throw err;
        });
    return connection;
}

module.exports = connectDb;

const mongoose = require('mongoose');

mongoose.connect(`${process.env.mongostring}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB 💚');
}).catch(err => {
    console.log('Error ➡', err.message);
});
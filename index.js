const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
process.env = global.env = require('./env.json')
const ejs = require('ejs')
const config = global.config = require('./config.json')
const Redirect = require('./models/redirect');
require('./mongoose.js');
const fs = require('fs');
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('index');
});


app.get("/save", (req, res) => {
    res.send('.');
});

app.post('/save', (req, res) => {
    if (Object.keys(config).includes(req.body.extension)) {
        res.render('exist', { extension: req.body.extension });
    } else {
        const newObj = JSON.parse(JSON.stringify(config));
        newObj[req.body?.extension] = req.body?.url;
        fs.writeFileSync('./config.json', JSON.stringify(newObj));
        res.render('save', { extension: req.body?.extension, url: req.body?.url });
    }
})

app.get('/:extension', (req, res) => {
    if (config[req.params.extension]) {
        const extension = req.params.extension;
        res.render('redirect', { extension: req.params.extension, url: config[extension] });
    } else {
        res.send("No such extension exists in the database.")
    }
});

app.listen(3000, () => {
    console.log('Server started on port 3000.');
});

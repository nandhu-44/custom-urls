const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

require('dotenv').config();

const connectDb = require('./mongoose.js');
const Redirect = require('./models/redirect');

const app = express();
// Hosts like Vercel sit behind a proxy; trust it so req.protocol is https.
app.set('trust proxy', true);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

const EXTENSION_PATTERN = /^[A-Za-z0-9_-]+$/;

function renderError(res, status, heading, message) {
    res.status(status).render('error', { status, heading, message });
}

function isValidUrl(value) {
    try {
        const { protocol } = new URL(value);
        return protocol === 'http:' || protocol === 'https:';
    } catch {
        return false;
    }
}

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/save', (req, res) => {
    res.redirect('/');
});

app.post('/save', async (req, res) => {
    const extension = (req.body.extension || '').trim();
    const url = (req.body.url || '').trim();

    if (!EXTENSION_PATTERN.test(extension)) {
        return renderError(res, 400, 'Invalid name', 'Names may only contain letters, numbers, "-" and "_".');
    }
    if (!isValidUrl(url)) {
        return renderError(res, 400, 'Invalid URL', 'Please provide a valid http:// or https:// URL.');
    }

    try {
        await connectDb();
        if (await Redirect.exists({ Extension: extension })) {
            return res.render('exist', { extension });
        }
        await Redirect.create({ Extension: extension, Url: url });
        res.render('save', { extension, url, shortUrl: `${req.protocol}://${req.get('host')}/r/${extension}` });
    } catch (err) {
        if (err.code === 11000) return res.render('exist', { extension });
        console.error(err);
        renderError(res, 500, 'Something went wrong', 'Please try again in a moment.');
    }
});

app.get('/r/:extension', async (req, res) => {
    try {
        await connectDb();
        const redirect = await Redirect.findOne({ Extension: req.params.extension });
        if (!redirect) {
            return renderError(res, 404, 'Link not found', `There is no link called "${req.params.extension}".`);
        }
        res.redirect(redirect.Url);
    } catch (err) {
        console.error(err);
        renderError(res, 500, 'Something went wrong', 'Please try again in a moment.');
    }
});

app.use((req, res) => {
    renderError(res, 404, 'Page not found', 'There is nothing at this address.');
});

// Start connecting right away so the first request doesn't have to wait.
connectDb().catch(() => {});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}.`);
});

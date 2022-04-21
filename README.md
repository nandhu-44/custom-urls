# Custom URLs

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18.11-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)](https://mongoosejs.com)

A small URL shortener built with Express, EJS and MongoDB (via Mongoose).
Pick a custom name, point it at any URL, and `/r/<name>` will redirect there.

**Live:** [custom-urls-nandhu.vercel.app](https://custom-urls-nandhu.vercel.app)

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and set your MongoDB connection string:

   ```env
   MONGODB_URI=mongodb://localhost:27017/custom-urls
   PORT=3000
   ```

3. Start the server:

   ```bash
   npm start
   ```

   The app runs on port `3000` unless `PORT` is set. During development, use
   `npm run dev` to restart automatically when you change the server code.

## Usage

- Open `/` and submit a name and a URL.
- Visit `/r/<name>` to be redirected to the saved URL.

## Deploying

The app runs anywhere Node.js does. It needs a MongoDB database
(for example a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster)
and the `MONGODB_URI` environment variable set on the host.

- **Vercel:** import the repository and add `MONGODB_URI` under
  *Settings → Environment Variables*. Vercel detects the Express app and serves
  `public/` from its CDN.
- **Render / Railway:** create a Node web service with `npm install` as the
  build command and `npm start` as the start command.

If you use Atlas, allow connections from your host under *Network Access*.

## License

[MIT](LICENSE)

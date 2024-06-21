const express = require('express');
const path = require('path');
const rateLimit = require("express-rate-limit");
const cors = require('cors');
const scrape = require("./scrape/index.js");


const limiter = rateLimit({
  windows: 1 * 60 * 1000, // 15 menit
  max: 25, // 5 req max
  message: "To Many Request From This Ip, What Are You Doing?",
});

const creator = "Fumi";
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static('public'));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(cors());
app.use(limiter)



app.get("/", (req, res) => {
   res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/image", (req, res) => {
   res.sendFile(path.join(__dirname, "tables.html"));
});

app.get('/api/danbooru', async (req, res) => {
  try {
    const query = req.query.query;
    if (!query) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
    const response = await scrape.image.danbooru(query);
    res.status(200).json({
      status: 200,
      creator: creator,
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.listen(3000, () => {
  console.log('Server started on port 3000');
});

module.exports = app;
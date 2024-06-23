const express = require('express');
const path = require('path');
const rateLimit = require("express-rate-limit");
const cors = require('cors');
const FormData = require('form-data');
const scrape = require("./scrape/index.js");


const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 menit
  max: 5, // maksimal 5 request per windowMs
  message: 'Opps! Too Many Request, What Re You Doing? Baka!'
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

app.get("/stream", (req, res) => {
   res.sendFile(path.join(__dirname, "stream.html"));
})

app.get("/ai", (req, res) => {
   res.sendFile(path.join(__dirname, "artificial.html"));
})

app.get('/endpoints', (req, res) => {
  const apiFilePath = path.join(__dirname, './index.js');

  // Membaca file index.js yang berisi definisi endpoint-endpoint
  fs.readFile(apiFilePath, 'utf8', (err, apiCode) => {
      if (err) {
          console.error('Gagal membaca file index.js:', err);
          return res.status(500).json({ error: 'Gagal Mengambil Data Endpoints' });
      }

      try {
          const endpoints = [];
          const routerRegex = /app\.get\(['"]\/api\/(\w+)['"],\s*async\s*\(req,\s*res\)\s*=>\s*{([\s\S]*?)\s*}/g;

          let match;
          while ((match = routerRegex.exec(apiCode)) !== null) {
              const endpoint = match[1];
              const endpointCode = match[2];

              const paramRegex = /req\.query\.(\w+)/g;
              const parameters = [];
              let paramMatch;

              while ((paramMatch = paramRegex.exec(endpointCode)) !== null) {
                  const paramName = paramMatch[1];
                  parameters.push(paramName);
              }

              parameters.push("apikey");
              const link = `http://localhost:3000/api/${endpoint}?${parameters.map(param => `${param}=`).join('&')}`;

              endpoints.push({
                  name_endpoint: endpoint,
                  link: link
              });
          }

          res.json({ endpoints });
      } catch (error) {
          console.error('Gagal mengekstrak endpoint:', error);
          res.status(500).json({ error: 'Gagal mengekstrak endpoint' });
      }
  });
});


// ------------------------------- Image ----------------------------- -//
// ------------------------------- Image ----------------------------- -//

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


app.get('/api/gelbooru', async (req, res) => {
  try {
    const query = req.query.query;
    if (!query) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
    const response = await scrape.image.gelbooru(query);
    res.status(200).json({
      status: 200,
      creator: creator,
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/api/rule34', async (req, res) => {
  try {
    const query = req.query.query;
    if (!query) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
    const response = await scrape.image.rule34(query);
    res.status(200).json({
      status: 200,
      creator: creator,
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/api/nhentai', async (req, res) => {
  try {
    const query = req.query.query;
    if (!query) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
    const response = await scrape.image.nhentai(query);
    res.status(200).json({
      status: 200,
      creator: creator,
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/api/yandere', async (req, res) => {
  try {
    const query = req.query.query;
    if (!query) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
    const response = await scrape.image.yandere(query);
    res.status(200).json({
      status: 200,
      creator: creator,
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ------------------------------- manga & stream ----------------------------- -//
// ------------------------------- manga & stream ----------------------------- -//


app.get('/api/zuzunimesearch', async (req, res) => {
  try {
    const query = req.query.query;
    if (!query) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
    const response = await scrape.stream.zuzunimesearch(query);
    res.status(200).json({
      status: 200,
      creator: creator,
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/api/zuzunimedetail', async (req, res) => {
  try {
    const query = req.query.query;
    if (!query) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
    const response = await scrape.stream.zuzunimedetail(query);
    res.status(200).json({
      status: 200,
      creator: creator,
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/api/zuzunimemp4', async (req, res) => {
  try {
    const query = req.query.query;
    if (!query) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
    const response = await scrape.stream.zuzunimemp4(query);
    res.status(200).json({
      status: 200,
      creator: creator,
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/api/myanimelist', async (req, res) => {
  try {
    const query = req.query.query;
    if (!query) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
    const response = await scrape.stream.myanimelist(query);
    res.status(200).json({
      status: 200,
      creator: creator,
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ------------------------------- AI ----------------------------- -//
// ------------------------------- AI ----------------------------- -//


app.get('/api/gemini', async (req, res) => {
  try {
    const query = req.query.query;
    if (!query) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
    const response = await scrape.ai.gemini(query);
    res.status(200).json({
      status: 200,
      creator: creator,
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/api/blackbox', async (req, res) => {
  try {
    const query = req.query.query;
    if (!query) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
    const response = await scrape.ai.blackbox(query);
    res.status(200).json({
      status: 200,
      creator: creator,
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/api/text2img', async (req, res) => {
      const query = req.query.query;
      if (!query) {
        return res.status(400).json({ error: 'Parameter "query" not found' });
      }
      scrape.ai.text2img(query).then(async image => {
        res.set({ 'Content-Type': 'image/png' })
        res.send(image)
    })
    });

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

module.exports = app;
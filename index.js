const express = require('express');
const path = require('path');
const rateLimit = require("express-rate-limit");
const cors = require('cors');
const FormData = require('form-data');
const scrape = require("./scrape/index.js");


const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 menit
  max: 20, // maksimal 5 request per windowMs
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

app.get("/tools", (req, res) => {
   res.sendFile(path.join(__dirname, "tools.html"));
})




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


app.get('/api/pinterest', async (req, res) => {
  try {
    const query = req.query.query;
    if (!query) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
    const response = await scrape.image.pinterest(query);
    res.status(200).json({
      status: 200,
      creator: creator,
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/api/pinterestdown', async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) {
      return res.status(400).json({ error: 'Parameter "url" tidak ditemukan' });
    }
    const response = await scrape.image.pinterestdown(url);
    res.status(200).json({
      status: 200,
      creator: creator,
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
/*

app.get('/api/doujindesulastest', (req, res) => {
  try {
    const response = await scrape.image.doujindesulastest(url);
    res.status(200).json({
      status: 200,
      creator: creator,
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/api/doujindesusearch', async (req, res) => {
  try {
    const query = req.query.query;
    if (!query) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
    const response = await scrape.image.doujindesusearch(query);
    res.status(200).json({
      status: 200,
      creator: creator,
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/api/doujindesudetail', async (req, res) => {
  try {
    const query = req.query.query;
    if (!query) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
    const response = await scrape.image.doujindesudetail(query);
    res.status(200).json({
      status: 200,
      creator: creator,
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

*/
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


app.get('/api/charasearch', async (req, res) => {
  try {
    const query = req.query.query;
    if (!query) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
    const response = await scrape.stream.charaSearch(query);
    res.status(200).json({
      status: 200,
      creator: creator,
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/api/charadetail', async (req, res) => {
  try {
    const query = req.query.query;
    if (!query) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
    const response = await scrape.stream.charaId(query);
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


app.get('/api/gpt4', async (req, res) => {
  try {
    const query = req.query.query;
    if (!query) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
    const response = await scrape.ai.gpt4(query);
    res.status(200).json({
      status: 200,
      creator: creator,
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get("/ai", (req, res) => {
   res.sendFile(path.join(__dirname, "maintenance.html"));
})


// -------------------------------- TOOLS ------------------------------------ //
// -------------------------------- TOOLS ------------------------------------ //

app.get('/api/facebook', async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) {
      return res.status(400).json({ error: 'Parameter "url" tidak ditemukan' });
    }
    const response = await scrape.tools.facebook(url);
    res.status(200).json({
      status: 200,
      creator: creator,
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/api/instagram', async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) {
      return res.status(400).json({ error: 'Parameter "url" tidak ditemukan' });
    }
    const response = await scrape.tools.instagram(url);
    res.status(200).json({
      status: 200,
      creator: creator,
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/api/tiktok', async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) {
      return res.status(400).json({ error: 'Parameter "url" tidak ditemukan' });
    }
    const response = await scrape.tools.tiktok(url);
    res.status(200).json({
      status: 200,
      creator: creator,
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/api/x', async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) {
      return res.status(400).json({ error: 'Parameter "url" tidak ditemukan' });
    }
    const response = await scrape.tools.x(url);
    res.status(200).json({
      status: 200,
      creator: creator,
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
/*

app.get('/api/9xbuddy', async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) {
      return res.status(400).json({ error: 'Parameter "url" tidak ditemukan' });
    }
    const response = await scrape.tools.9xbuddy(url);
    res.status(200).json({
      status: 200,
      creator: creator,
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

*/

// ------------------------------------- CAI --------------------------------- //
// ------------------------------------- CAI --------------------------------- //
/*
app.get('/api/caisearch', async (req, res) => {
  try {
    const query = req.query.query;
    if (!query) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
    const response = await scrape.cai.room1.search(query);
    res.status(200).json({
      status: 200,
      creator: creator,
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/api/caiconnect1', async (req, res) => {
  try {
    const query = req.query.query;
    if (!query) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
    const response = await scrape.cai.room1.connect(query);
    res.status(200).json({
      status: 200,
      creator: creator,
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/api/caichat', async (req, res) => {
  try {
    const query = req.query.query;
    if (!query) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
    const response = await scrape.cai.room1.chat(query);
    res.status(200).json({
      status: 200,
      creator: creator,
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/api/caidisconnect', async (req, res) => {
  try {
    const query = req.query.query;
    if (!query) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
    const response = await scrape.cai.room1.disconnect(query);
    res.status(200).json({
      status: 200,
      creator: creator,
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

*/

module.exports = app;
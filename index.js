const express = require('express');
const path = require('path');
const rateLimit = require("express-rate-limit");
const cors = require('cors');
const axios = require('axios');
const scrape = require("./scrape/index.js");
const moment = require('moment-timezone');
// *const mongoose = require('mongoose');
const cron = require('node-cron');

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 menit
  max: 20, // maksimal 20 request per windowMs
  message: 'Opps! Too Many Request, What Are You Doing? Baka!'
});

const creator = "Fumi";
const app = express();
const PORT = process.env.PORT || 3000;
const TELEGRAM_TOKEN = '7496093857:AAGtgIBt0Q8Zrc_abe8SO5b1Wc2huVNjqG4';
const TELEGRAM_CHAT_ID = '7409627999';

/*
  const MONGO_URI = 'mongodb+srv://lordexe4646:gjSV94cMc0Yfx7tT@fumidb.hxworgm.mongodb.net/?retryWrites=true&w=majority&appName=FumiDb';

// Menghubungkan ke MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

// Membuat schema dan model untuk mencatat request
const requestSchema = new mongoose.Schema({
  endpoint: String,
  time: Date,
  ip: String
});

const hitCountSchema = new mongoose.Schema({
  endpoint: { type: String, unique: true },
  count: { type: Number, default: 0 }
});

const Request = mongoose.model('Request', requestSchema);
const HitCount = mongoose.model('HitCount', hitCountSchema);
*/
app.use(express.static('public'));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(cors());
app.use(limiter);
app.set('trust proxy', true);


const notifyTelegram = async (message) => {
  const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
  try {
    await axios.get(url, {
      params: {
        chat_id: TELEGRAM_CHAT_ID,
        text: message
      }
    });
  } catch (error) {
    console.error('Error sending message to Telegram:', error.message);
  }
};

const apiEndpoints = [];

app.use('/api', async (req, res, next) => {
  const fullUrl = decodeURIComponent(req.url);
  const endpointWithQuery = fullUrl; // Termasuk query string untuk notifikasi
  const endpoint = fullUrl.split('?')[0];  // Mengabaikan query string untuk hit count
  const timeReceived = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
/*
  // Menyimpan request ke MongoDB
  const newRequest = new Request({
    endpoint: endpointWithQuery,
    time: new Date(),
    ip
  });
  await newRequest.save();
/*
  // Update hit count
  await HitCount.findOneAndUpdate(
    { endpoint },
    { $inc: { count: 1 } },
    { upsert: true, new: true }
  );
*/
  res.on('finish', () => {
    const status = res.statusCode;
    const message = `New Request!\n\nEndpoint: ${endpointWithQuery}\nTime: ${timeReceived}\nStatus: ${status}\nIP: ${ip}`;
    notifyTelegram(message);
  });
/*
if (!apiEndpoints.includes(endpoint)) {
    apiEndpoints.push(endpoint);
  }

*/

  next();
});


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/image", (req, res) => {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/stream", (req, res) => {
  res.sendFile(path.join(__dirname, "stream.html"));
});

app.get("/ai", (req, res) => {
  res.sendFile(path.join(__dirname, "artificial.html"));
});

app.get("/tools", (req, res) => {
  res.sendFile(path.join(__dirname, "tools.html"));
});
/*
app.get('/endpoint', (req, res) => {
  res.status(200).json(apiEndpoints);
});

*/
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


app.get('/api/carbon', async (req, res) => {
      const query = req.query.query;
      if (!query) {
        return res.status(400).json({ error: 'Parameter "query" not found' });
      }
      scrape.image.carbon(query).then(async image => {
        res.set({ 'Content-Type': 'image/png' })
        res.send(image)
    })
    });


app.get('/api/doujindesulastest', (req, res) => {
  try {
    const response = scrape.image.doujindesulastest
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


app.get('/api/opsearch', async (req, res) => {
  try {
    const query = req.query.query;
    if (!query) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
    const response = await scrape.stream.opsearch(query);
    res.status(200).json({
      status: 200,
      creator: creator,
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/api/opdetail', async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) {
      return res.status(400).json({ error: 'Parameter "url" tidak ditemukan' });
    }
    const response = await scrape.stream.opdetail(url);
    res.status(200).json({
      status: 200,
      creator: creator,
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/api/opsearch', async (req, res) => {
  try {
    const query = req.query.query;
    if (!query) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
    const response = await scrape.stream.opsearch(query);
    res.status(200).json({
      status: 200,
      creator: creator,
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/api/nekosearch', async (req, res) => {
  try {
    const query = req.query.query;
    if (!query) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
    const response = await axios.get(`http://152.42.252.147:3000/api/nekosearch?query=${query}`);
     const hasil = response.data.data.response
    res.status(200).json({
      status: 200,
      creator: creator,
      data: { hasil }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/api/nekodetail', async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) {
      return res.status(400).json({ error: 'Parameter "url" tidak ditemukan' });
    }
    const response = await axios.get(`http://152.42.252.147:3000/api/nekodetail?url=${url}`);
     const hasil = response.data.data.response
    res.status(200).json({
      status: 200,
      creator: creator,
      data: { hasil }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/api/nekolastest', async (req, res) => {
  try {
    const response = await axios.get('http://152.42.252.147:3000/api/nekolastest');
     const hasil = response.data.data.response
    res.status(200).json({
      status: 200,
      creator: creator,
      data: { hasil }
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


app.get('/api/eleo', async (req, res) => {
  try {
    const query = req.query.query;
    if (!query) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
    const response = await scrape.ai.eleo(query);
    res.status(200).json({
      status: 200,
      creator: creator,
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/api/hatbaby', async (req, res) => {
  try {
    const query = req.query.query;
    if (!query) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
    const response = await scrape.ai.hatbaby(query);
    res.status(200).json({
      status: 200,
      creator: creator,
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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


app.get('/api/dreamshaper', async (req, res) => {
      const query = req.query.query;
      if (!query) {
        return res.status(400).json({ error: 'Parameter "query" not found' });
      }
      scrape.ai.dreamshaper(query).then(async image => {
        res.set({ 'Content-Type': 'image/png' })
        res.send(image)
    })
    });



app.get('/api/sdlightning', async (req, res) => {
      const query = req.query.query;
      if (!query) {
        return res.status(400).json({ error: 'Parameter "query" not found' });
      }
      scrape.ai.sdlightning(query).then(async image => {
        res.set({ 'Content-Type': 'image/png' })
        res.send(image)
    })
    });


app.get('/api/fumichat', async (req, res) => {
  try {
    const query = req.query.query;
    if (!query) {
      return res.status(400).json({ error: 'Parameter "query" tidak ditemukan' });
    }
    const response = await scrape.ai.fumichat(query);
    res.status(200).json({
      status: 200,
      creator: creator,
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


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


app.get('/api/play', async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) {
      return res.status(400).json({ error: 'Parameter "url" tidak ditemukan' });
    }
    const response = await scrape.tools.play(url);
    res.status(200).json({
      status: 200,
      creator: creator,
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/api/subdomain', async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) {
      return res.status(400).json({ error: 'Parameter "url" tidak ditemukan' });
    }
    const response = await scrape.tools.subdomain(url);
    res.status(200).json({
      status: 200,
      creator: creator,
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/api/http', async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) {
      return res.status(400).json({ error: 'Parameter "url" tidak ditemukan' });
    }
    const response = await scrape.tools.http(url);
    res.status(200).json({
      status: 200,
      creator: creator,
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/api/ssweb', async (req, res) => {
      const url = req.query.url;
      if (!url) {
        return res.status(400).json({ error: 'Parameter "url" not found' });
      }
      scrape.tools.ssweb(url).then(async image => {
        res.set({ 'Content-Type': 'image/png' })
        res.send(image)
    })
    });

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

cron.schedule('0 0 * * *', async () => {
  const today = moment().tz('Asia/Jakarta').startOf('day').toDate();
  const tomorrow = moment().tz('Asia/Jakarta').add(1, 'days').startOf('day').toDate();

  const dailyRequests = await Request.countDocuments({ time: { $gte: today, $lt: tomorrow } });
  const totalRequests = await Request.countDocuments({});

  const message = `Daily Report\n\nTotal requests today: ${dailyRequests}\nTotal requests overall: ${totalRequests}`;
  notifyTelegram(message);
});
/*
// Endpoint untuk menampilkan top global hits
app.get('/api/stats', async (req, res) => {
  try {
    const stats = await HitCount.find().lean();
    const formattedStats = stats.map(stat => ({
      RequestId: stat._id,
      Endpoint: stat.endpoint,
      TotalHit: stat.count
    }));
    res.status(200).json(formattedStats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


const notifyGlobalHits = async () => {
  try {
    // Dapatkan data global hits dari endpoint /api/globalhits
    const response = await axios.get(`http://localhost:${PORT}/api/globalhits`);
    
    if (response.data && response.data.data) {
      const hits = response.data.data;

      // Buat pesan untuk Telegram
      let message = "Top Global Hits:\n\n";
      hits.forEach((hit, index) => {
        message += `${index + 1}. Endpoint: ${hit.endpoint} (Global Hits: ${hit.count})\n`;
      });
*/
/*
      // Kirim pesan ke Telegram
      await axios.get(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
        params: {
          chat_id: TELEGRAM_CHAT_ID,
          text: message
        }
      });

      console.log('Top global hits sent to Telegram');
     else {
      console.error('No data received from global hits endpoint');
    }
  } catch (error) {
    console.error('Error fetching or sending global hits:', error.message);
  }
*/

// Contoh panggilan fungsi (dapat dijalankan dalam interval waktu atau cron job)
// notifyGlobalHits();

// Mengirim laporan global hits harian
/*
cron.schedule('5 0 * * *', () => {
  notifyGlobalHits();
});
*/

module.exports = app;
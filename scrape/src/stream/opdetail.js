const axios = require('axios');
const cheerio = require('cheerio');

async function opdetail(url) {
  try {
    // Ambil HTML dari URL
    const response = await axios.get(`${url}`);
    const html = response.data;
    const $ = cheerio.load(html);
    
    const bigContent = $('div.bigcontent.nobigcv');

    const title = $('title').text().trim(); // Ambil judul halaman
    const imageUrl = bigContent.find('div.thumb img').attr('src');
    const rating = bigContent.find('div.rating strong').text().trim();

    const status = bigContent.find('span:contains("Status:")').text().replace('Status:', '').trim();
    const studio = bigContent.find('span:contains("Studio:") a').text().trim();
    const released = bigContent.find('span.split:contains("Released:")').text().replace('Released:', '').trim();
    const duration = bigContent.find('span:contains("Duration:")').text().replace('Duration:', '').trim();
    const season = bigContent.find('span:contains("Season:") a').text().trim();
    const type = bigContent.find('span:contains("Type:")').text().replace('Type:', '').trim();
    const director = bigContent.find('span.split:contains("Director:") a').text().trim();
    const casts = bigContent.find('span.split:contains("Casts:") a').map((i, el) => $(el).text().trim()).get();
    const postedBy = bigContent.find('span.author.vcard:contains("Posted by:") i').text().trim();

    const episodes = [];
    $('li[data-index]').each((index, element) => {
      const episodeNumber = $(element).find('div.epl-num').text().trim();
      const episodeTitle = $(element).find('div.epl-title').text().trim();
      const episodeDate = $(element).find('div.epl-date').text().trim();
      const episodeLink = $(element).find('a').attr('href');

      episodes.push({
        Episode: episodeNumber,
        Title: episodeTitle,
        DatePublish: episodeDate,
        Link: episodeLink,
      });
    });
    const scrapedData = {
      title,
      ThumbnailUrl: imageUrl,
      rating,
      status,
      studio,
      released,
      duration,
      season,
      type,
      director,
      casts,
      postedBy,
      episodes,
    };
    return scrapedData
  } catch (error) {
    console.error(`Terjadi kesalahan: ${error}`);
  }
};


module.exports = opdetail
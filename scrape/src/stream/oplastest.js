const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://oploverz.news';

const oplastest = async () => {
  try {
    // Ambil HTML dari URL
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    const scrapedData = [];

    $('div.bsx').each((index, element) => {
      const title = $(element).find('h2[itemprop="headline"]').text();
      const episodeNumber = $(element).find('span').text().trim();
      const imageUrl = $(element).find('img.ts-post-image').attr('src');
      const link = $(element).find('a').attr('href');
      
      scrapedData.push({
        title,
        episodeNumber,
        imageUrl,
        link
      });
    });
    return scrapedData
  } catch (error) {
    console.log(error)
  }
};

module.exports = oplastest
const axios = require('axios');
const cheerio = require('cheerio');

async function zuzunimesearch(q) {
  try {
    const response = await axios.get(`https://zuzunime.com/?s=${encodeURIComponent(q)}`);
    const html = response.data;
    const $ = cheerio.load(html);
    const results = [];

    $('div.limit').each((i, element) => {
      const aTag = $(element).parent('a');
      const href = aTag.attr('href');
      const title = aTag.attr('title');

      const spanTag = $(element).find('span.epx');
      const ongoing = spanTag.text().trim();

      const imgTag = $(element).find('img');
      const imgSrc = imgTag.attr('src');

      results.push({
        title: title,
        href: href,
        ongoing: ongoing,
        imgSrc: imgSrc
      });
    });

    return results;
  } catch (error) {
    console.error(error);
    return [];
  }
}

module.exports = zuzunimesearch
const axios = require('axios');
const cheerio = require('cheerio');

async function zuzuVideo(url) {
  try {
    const response = await axios.get(`https://zuzunime.com/${url}`);
    const html = response.data;
    const $ = cheerio.load(html);
    const results = [];

    // Cari elemen dengan class "player-embed"
    $('div.player-embed iframe').each((i, element) => {
      const iframe = $(element);
      let dataLitespeedSrc = iframe.attr('data-litespeed-src');

      if (dataLitespeedSrc) {
        // Hilangkan '/Player/p.php?url=' dari dataLitespeedSrc
        dataLitespeedSrc = dataLitespeedSrc.replace('/Player/p.php?url=', '');

        // Gantikan spasi dengan '%20'
        dataLitespeedSrc = dataLitespeedSrc.replace(/ /g, '%20');

        results.push({
          dataLitespeedSrc: dataLitespeedSrc
        });
      }
    });

    return results;
  } catch (error) {
    console.error(error);
    return [];
  }
}


module.exports = zuzunimemp4
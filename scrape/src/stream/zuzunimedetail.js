const axios = require('axios');
const cheerio = require('cheerio');

async function zuzunimedetail(query) {
  try {
    const response = await axios.get(`https://zuzunime.com/anime/${query}`);
    const $ = cheerio.load(response.data);
    const title = $('a[itemprop="item"] span[itemprop="name"]').text();
    const imageSrc = $('.ts-post-image').attr('src');
    let episodeAnchor = '';

    $('.inepcx').each((index, element) => {
      if ($(element).prev().find('.epcur.epcurfirst').length > 0) {
        episodeAnchor = $(element).find('a').attr('href');
      }
    });

    const episodeDate = $('.epl-date').text();

    const animeData = {
      title: title,
      thumbnail: imageSrc,
      episodeListr: episodeAnchor,
      episodeDate: episodeDate
    };

    const episodes = [];
    $('body').find('li[data-index]').each((i, el) => {
      const anchor = $(el).find('a');
      const href = anchor.attr('href');
      const episodeTitle = anchor.find('.epl-title').text();
      const date = anchor.find('.epl-date').text();

      episodes.push({
        href: href,
        title: episodeTitle,
        date: date
      });
    });

    animeData.episodeList = episodes;

    return animeData;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

module.exports = zuzunimedetail
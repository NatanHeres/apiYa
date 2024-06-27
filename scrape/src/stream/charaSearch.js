const axios = require('axios');
const cheerio = require('cheerio');

async function charaSearch(q) {
const response = await axios.get(`https://www.animecharactersdatabase.com/searchall.php?in=all&sq=${q}`)

    const html = response.data;
    const $ = cheerio.load(html);
    const results = [];

    $('a[href^="characters.php?id="]').each((index, element) => {
      const href = $(element).attr('href');
      const imgElement = $(element).find('img');
      const src = imgElement.attr('src');
      const alt = imgElement.attr('alt');

      if (href && src && alt) {
        const modifiedHref = href.replace('characters.php?id=', '');
        results.push({ 
        id: modifiedHref, 
        image: src, 
        title: alt
 });
      } else {
        console.error(`Element at index ${index} is missing attributes. HREF: ${href}, SRC: ${src}, ALT: ${alt}`);
      }
    });

    return results
  }
 
module.exports = charaSearch
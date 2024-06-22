const axios = require('axios');
const cheerio = require('cheerio');

async function yandere(q) {
        const { data } = await axios.get(`https://yande.re/post?tags=${q}`);
        const $ = cheerio.load(data);
        const results = [];

        $('li[id^="p"]').each((i, element) => {
            const id = $(element).attr('id');
            const imgSrc = $(element).find('img').attr('src');
            const tags = $(element).find('img').attr('title');
            const href = $(element).find('a.directlink.largeimg').attr('href');

            results.push({ 
            id: id, 
            thumbnail: imgSrc, 
            tags: tags, 
            imgUrl: href
            });
        });

        return results
}
module.exports = yandere
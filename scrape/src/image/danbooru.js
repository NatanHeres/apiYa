 const axios = require('axios');
const cheerio = require('cheerio');

async function danboorur(q) {
    const url = `https://danbooru.donmai.us/posts?tags=${encodeURIComponent(q)}`;
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const results = [];

    $('article.post-preview').each((index, element) => {
        const title = $(element).attr('data-id');
        const imgSrc = $(element).find('img').attr('src');
        const tags = $(element).attr('data-tags').split(' ');

        results.push({ title, imgSrc, tags });
    });

    return results 
}

module.exports = danbooru 

const axios = require('axios');
const cheerio = require('cheerio');

async function nhentai(q) {
    try {
        const response = await axios.get(`https://nhentai.net/g/${q}/`);
        const html = response.data;
        const $ = cheerio.load(html);
        const pages = $('.thumb-container img').length; // Mendapatkan jumlah halaman
        const imgSrcList = [];

        for (let i = 1; i <= pages; i++) {
            const pageResponse = await axios.get(`https://nhentai.net/g/${q}/${i}/`);
            const pageHtml = pageResponse.data;
            const page$ = cheerio.load(pageHtml);
            const imgSrc = page$('#image-container img').attr('src');
            if (imgSrc) {
                imgSrcList.push(imgSrc);
            }
        }

        return imgSrcList;
    } catch (error) {
        console.error(error);
    }
}

module.exports = nhentai
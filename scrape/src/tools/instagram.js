const axios = require("axios");
const cheerio = require("cheerio");
const qs = require("qs");
const fetch = require("node-fetch");

async function instagram(url) {
    const requestData = 'recaptchaToken=&q=' + url + '=media&lang=en';

    try {
        const { data } = await axios.post('https://v3.igdownloader.app/api/ajaxSearch', requestData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Accept': '*/*'
            }
        });

        const $ = cheerio.load(data.data);

        const thumb = $('.download-items__thumb img').attr('src');
        const link = $('.download-items__btn a').attr('href');

        const result = {
            thumb: thumb,
            link: link
        };

        return result;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}

module.exports = instagram
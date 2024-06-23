const axios = require('axios');
const cheerio = require('cheerio');

const pinterestdown = async (url) => {
    try {
        const response = await axios.get(`https://www.savepin.app/download.php?url=${encodeURIComponent(url)}&lang=en&type=redirect`);
        const html = response.data;
        const $ = cheerio.load(html);

        let results = [];

        // Scrape data
        $('td.video-quality').each((index, element) => {
            const videoQuality = $(element).text().trim();
            const downloadLinkElement = $(element).nextAll().find('#submiturl').attr('href');
            if (downloadLinkElement) {
                let downloadLink = downloadLinkElement;
                // Menghilangkan 'force-save.php?url=' dari downloadLink dan mengdecode URL
                if (downloadLink.startsWith('force-save.php?url=')) {
                    downloadLink = decodeURIComponent(downloadLink.replace('force-save.php?url=', ''));
                }
                results.push({ videoQuality, downloadLink });
            }
        });

        return results;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};


module.exports = pinterestdown
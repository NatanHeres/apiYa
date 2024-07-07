const axios = require('axios');
const cheerio = require('cheerio');

async function subdomain(q) {

    try {
        // Mengambil konten web
        const { data } = await axios.get(`https://crt.sh/?q=${q}`);

        // Load konten ke cheerio
        const $ = cheerio.load(data);

        // Mencari dan mengambil semua teks dari tag <TD>
        const results = [];
        $('td').each((index, element) => {
            const text = $(element).text().trim();
            // Memastikan tidak ada 'crt.sh ID'
            if (!text.includes('crt.sh ID')) {
                results.push(text);
            }
        });

        return results;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

module.exports = subdomain
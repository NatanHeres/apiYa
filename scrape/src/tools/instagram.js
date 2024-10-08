const axios = require('axios');
const qs = require('qs');

async function instagram(query) {
    const url = 'https://v3.saveig.app/api/ajaxSearch';
    const requestData = {
        q: query,
        t: 'media',
        lang: 'en'
    };

    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Accept': '*/*'
        }
    };

    try {
        const response = await axios.post(url, qs.stringify(requestData), config);
        const data = response.data;

        const selectMatches = data.data.match(/<select[^>]*>(.*?)<\/select>/gs);
        const parsedData = [];

        selectMatches.forEach(select => {
            const options = select.match(/<option value="([^"]+)">([^<]+)<\/option>/g).map(option => {
                const urlMatch = option.match(/value="([^"]+)"/)[1].replace(/amp;/g, '');
                const textMatch = option.match(/>([^<]+)<\/option>/)[1];
                return { url: urlMatch, text: textMatch };
            });

            // Filter options that contain "1080" in their text
            const filteredOptions = options.filter(option => option.text.includes("1080"));

            if (filteredOptions.length > 0) {
                parsedData.push(filteredOptions);
            }
        });

        // Flatten parsedData to remove extra arrays
        const flattenedData = parsedData.flat();

        return flattenedData;

    } catch (error) {
        console.error(error);
        return null;
    }
}

// Contoh penggunaan:
module.exports = instagram
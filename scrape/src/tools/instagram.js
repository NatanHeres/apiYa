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
        const parsedData = {};
        let counter = 1;
        
        selectMatches.forEach(select => {
            const idMatch = select.match(/getPhotoLink\('(\d+)'/);
            if (idMatch) {
                const id = `image/video ${counter}`;
                const options = select.match(/<option value="([^"]+)">([^<]+)<\/option>/g).map(option => {
                    const urlMatch = option.match(/value="([^"]+)"/)[1].replace(/amp;/g, '');
                    const textMatch = option.match(/>([^<]+)<\/option>/)[1];
                    return { url: urlMatch, text: textMatch };
                });
                parsedData[id] = options;
                counter++;
            }
        });

        return parsedData;
        
    } catch (error) {
        console.error(error);
        return null;
    }
}
module.exports = instagram
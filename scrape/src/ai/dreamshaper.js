const axios = require('axios');

async function dreamshaper(prompt) {
    const url = 'https://api.cloudflare.com/client/v4/accounts/57ca0e62ca0d45e934a65517f9814264/ai/run/@cf/lykon/dreamshaper-8-lcm';
    const token = 'MM6hgy9yrSyu8AddhaMMabHHlCWR8GOjfpln8Bnp';

    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

    const data = {
        prompt: prompt 
    };

    try {
        const response = await axios.post(url, data, {
            headers,
            responseType: 'arraybuffer' 
        });      
        return response.data
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

module.exports = dreamshaper
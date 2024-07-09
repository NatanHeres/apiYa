const axios = require('axios');
const FormData = require('form-data');
const { fromBuffer } = require('file-type');

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
        const { ext } = await fromBuffer(response.data);
        let form = new FormData();
        form.append('file', response.data, 'tmp.' + ext);
        const uploadResponse = await axios.post('https://telegra.ph/upload', form, {
            headers: form.getHeaders()
        });
        const gambar = uploadResponse.data;
        return 'https://telegra.ph' + gambar[0].src;

    } catch (error) {
        console.error('err:', error);
    }
}
module.exports = dreamshaper
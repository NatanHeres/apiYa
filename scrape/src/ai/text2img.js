const fetch = require('node-fetch');
const FormData = require('form-data');

async function text2img(prompt) {
    const nganuApi = "https://ai-api.magicstudio.com/api/ai-art-generator";

    const body = `prompt=${encodeURIComponent(prompt)}`;

    try {
        const nganu = await fetch(nganuApi, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: body
        });

        if (nganu.ok) {
            const imageBuffer = await nganu.buffer();
            return imageBuffer;
        } else {
            const nganuError = await nganu.text();
            throw new Error(`Gagal mengambil gambar. Kode status: ${nganu.status}, Error: ${nganuError}`);
        }
    } catch (error) {
        throw error;
    }
}


module.exports = text2img
const axios = require('axios');

async function sdlightning(q) {
  const url = 'https://api.cloudflare.com/client/v4/accounts/57ca0e62ca0d45e934a65517f9814264/ai/run/@cf/bytedance/stable-diffusion-xl-lightning';
  const token = 'MM6hgy9yrSyu8AddhaMMabHHlCWR8GOjfpln8Bnp';

  try {
    const response = await axios.post(
      url,
      { prompt: q },
      {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        responseType: 'arraybuffer' // Penting untuk menangani data biner
      }
    );

    
    
    return response.data
  } catch (error) {
    console.log(error)
  }
}

module.exports = sdlightning
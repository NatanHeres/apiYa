const axios = require('axios');
const cheerio = require('cheerio');

async function charaId(id) {
  try {
    const response = await axios.get(`https://www.animecharactersdatabase.com/characters.php?id=${id}`);
    const html = response.data;
    const $ = cheerio.load(html);

    // Mengambil data dari elemen gambar
    const imgElement = $('#fullimage img#profileimage');
    const src = imgElement.attr('src');

    // Mengambil data karakter dari elemen <title> dan <meta name="description">
    const characterName = $('title').text().split(' from ')[0];
    const description = $('meta[name="description"]').attr('content');

    // Mengambil konten script yang berisi JSON-LD
    const scriptContent = $('script[type="application/ld+json"]').html();
    let names = [];
    if (scriptContent) {
      try {
        const jsonData = JSON.parse(scriptContent);
        if (Array.isArray(jsonData) && jsonData[0].itemListElement) {
          // Mengambil semua nilai "name"
          names = jsonData[0].itemListElement.map(item => item.name);
        }
      } catch (e) {
        console.error('Error parsing JSON-LD:', e);
      }
    }

    // Mengambil data dari elemen A NAME dan audio
    const quotes = [];
    $('a[name^="line"]').each((index, element) => {
      const quoteText = $(element).text().trim();
      const originalLineId = $(element).attr('name').replace('line', '');
      const lineId = names[index] ? encodeURIComponent(names[index]) : originalLineId; // Gunakan nama dari JSON-LD jika tersedia dan encode untuk keamanan selector CSS
      const audioElement = $(`audio#audio${originalLineId}`); // Gunakan originalLineId untuk audio
      const audioSrc = audioElement.find('source').attr('src');

      // Mengambil data tambahan dari elemen <th> dan <td>
      quotes.push({ 
        quoteText, 
        audioSrc
      });
    });

    // Menampilkan hasil
    console.dir({ 
      characterImg: src, 
      name: characterName, 
      deskripsi: description, 
      From: names, 
      quotes 
    }, { depth: null, colors: true });

  } catch (error) {
    console.error('Error fetching the page: ', error);
  }
}

// Memanggil fungsi charId dengan ID karakter
module.exports = charaId

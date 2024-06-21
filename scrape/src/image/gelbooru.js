const axios = require('axios');
const cheerio = require('cheerio');

async function gelbooru(query) {
  const response = await axios.get(`https://gelbooru.com/index.php?page=post&s=list&tags=${encodeURIComponent(query)}`);
  const $ = cheerio.load(response.data);
  const gbr = {
    status: '200',
    imageUrls: []
  };

  $('.thumbnail-preview a img').each((index, element) => {
    const imgPict = $(element).attr('src');
    const title = $(element).attr('title');

    const hasil = imgPict.replace('thumbnails/', '/images/').replace('thumbnail_', '');
    const ext = hasil.split('.').pop().toLowerCase();

    let imageLink;
    if (ext === 'jpg' || ext === 'jpeg') {
      imageLink = hasil.replace('.jpg', '.png');
      note = 'Try .jpg if you don\'t get the result';
    } else if (ext === 'png') {
      imageLink = hasil;
      note = 'Try .jpg if you don\'t get the result';
    } else {
      imageLink = hasil;
      note = 'Unknown extension';
    }

    gbr.imageUrls.push({
      image: imageLink,
      note: note,
      title: title
    });
  });
  return gbr;
}

module.exports = gelbooru
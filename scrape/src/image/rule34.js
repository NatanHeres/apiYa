const axios = require("axios");
const cheerio = require("cheerio");


async function rule34(query) {
  try {
    const response = await axios.get(`https://rule34.xxx/index.php?page=post&s=list&tags=${query}`);
    const $ = cheerio.load(response.data);
    const images = {
      status: '200',
      imageUrls: []
    };

    $('.image-list img').each((index, element) => {
      const imgUrl = $(element).attr('src');
      const title = $(element).attr('alt');

      // Replace thumbnail URL with actual image URL
      const imageUrl = imgUrl.replace('thumbnails/', '/images/').replace('.jpg', '.png').replace('thumbnail_', '');

      images.imageUrls.push({
        image: imageUrl,
        title: title
      });
    });

    return images
  } catch (error) {
    m.reply(error);
    return {
      status: '500',
      message: 'An error occurred while retrieving the images.'
    };
  }
}

module.exports = rule34
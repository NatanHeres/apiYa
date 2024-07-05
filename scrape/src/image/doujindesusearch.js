const axios = require('axios')

async function doujindesusearch(q) {
const res = await axios.get(`http://back.xyro.fund:3000/api/v1/nsfw/doujindesusearch?query=${q}`)
const hasil = res.data

return hasil.data.response
}
module.exports = doujindesusearch
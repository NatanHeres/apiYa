const axios = require('axios')

async function doujindesudetail(q) {
const res = await axios.get(`http://back.xyro.fund:3000/api/v1/nsfw/doujindesudetail?url=${q}`)
const hasil = res.data

return hasil.data.response
}
module.exports = doujindesudetail
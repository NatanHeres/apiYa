const axios = require('axios')

async function doujindesulastest() {
const res = await axios.get('http://back.xyro.fund:3000/api/v1/nsfw/doujindesulastest?query=y')
const hasil = res.data

return hasil.data.response
}
module.exports = doujindesulastest
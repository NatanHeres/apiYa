const axios = require('axios')

async function xbuddy(q) {
const res = await axios.get(`http://back.xyro.fund:3000/api/xbuddy?url=${q}`)
const hasil = res.data

return hasil.data.response
}
module.exports = xbuddy
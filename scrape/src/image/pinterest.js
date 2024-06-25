const axios = require('axios')
const cheerio = require('cheerio')

function pinterest(querry){
    return new Promise(async(resolve, reject) => {
	    axios.get(`https://id.pinterest.com/search/pins/?autologin=true&q=${querry}`, {
		    headers: {
			    "cookie" : "_auth=1; _b=\"AX2wK8vDVrtCvr5EiH TQmUmf1T E4dbI6dKtzm01V1yvWpQgetMBA2gnv0xGTkRwl8=\"; _pinterest_sess=TWc9PSZSYjV3Qi9WRkhFeklwVWwvancxRDluemljSUtkczlDKzFaU1VnRTliU2tralhVTEdCMWRGbk90RFpQYnJZREF5d0lhZzFXS1I1YnVTdTFzZUNpc2FsOHZxZWZta3Q2T3NqVFJQcjR2TlMybitra3hwWDJ4M094a2x5RDR6dEpqKzk1bnUycDBjWEZhVUVLMTBaanRUUVgzWUlwMWNTbC9JQWozdFdsQk9GdyszbEN3NTdMc0owWjNrOENtSm83TmJrN0M4WlEzdDlnM1dFWEV4VXdJMWNFT2JJRC9EZVBRT3JVKzdIWmRqeE5mNEdDanc1dUw4QkF2cXpMeERIbHM4OEJFdmJ3NkVud1hkN2h1eW5vT2JLbTJnOXg5K1kyRGd3RysrQmNZQ1FLd3hxOEJkVzdTek1FWjZPc05xZ0pkd3JRMTZsOUltWlJDd2J0TGU1MEhybHZTSFNvRFlJaThqaHlVeDBzUjZ6ZDlzbk5rcmV6TGpIejVPMkczNGM0SmRtd1FRaDJkbHdUaWliMmhZSTM0ejR3bi9IaGFlcTdWdElUUWxvS0VzNjUxcUJ5alZIRUlqakFOdndsM0x1RlQ0T1RUcjlmMjhlb0plVjE5d2N1SXFxSmRTT3BSL3o4L1dLNjZLdE9CNWZ3L2ljb2JxQnpkN1U3ak05cnpQaDhMcGh3QmlrMS9STWJRVzdlelpnR1p2KzQ3Z1FQZTJNRVkxZjFuVnUyZ1o4U05FbVBwVVQ0bnQxbHZoYVJXUCswRGxKNkVsR2VYQ0luSUhRU0FJUlJuVXgxOFhwQnppNGFOcDZyV25WcWhJdjd4SFdBbWJobGFzMVMyY0JzRHVEcGFyK1h5T0d3VmhVOVllSUlOSElvbmFWandKTWRxcmRtL1pjaGtSOExQL0RIM0xoTzYrNzhlbWNWbThwL1ZPUDJkWGFMYXJrTUFKdmJnaW9WUWZNYzM4MFBjdGlrTytxOEI5am1Sbmo2NjlKSG5mRWtiNU5XSkdnQ0E0dDE1WUJxaHNUSnQzTEl1VnNvdkZ4SEx3TU83Yi9ScE9NUXI2bStpTXhrYmw1Q3hNamdHeUtoV3lzTzBRT1BhVXlUdS83bERyYmtKTE9JUHRRY1RqTEU5QXcrWGdEN2RzWDFtVVAwQzBTODl5WFZZUFc2SlpaemFUQktGbFk1eVBobEVGaHp1THovTGZKd0laVE9qbC85N1lwb2wyTEpZWWtSclFrcXdSamhZdkVkakJuTzAyY0U4WGkwYUJCSUNCdUYyOSt0eU92dVZqWTU0ZmM2bVRaSitQaWpyb3B1ZEFoNGFtbm5mc3N6RG51aHRtME00bU8zNEpLdG5LNE9qSmlMdXJwM3BaVzZLczlkbEZZa3JKbDlCVlYzcjU4eUppY3REaDlWMFlLeU1QdjZpd0REQTU1Z2hnY2IrN3NxNW13WW9NaVdKRkJJL2hlTGROcTMvNmc3Tk9DZktscG01WGxnekVaMlJ2Qm1FNnRzSm5ZTkFUQURyL2xDUWx4bGpJK0VFM1NxZlN5V3BPSkNRQzhkRE9lNzBBQ29DU0ZKYVhwWHE4akhhMDVIRXF4QlI4Y1lxRmdLbXJ1NVZSUnM2VWVZK0ZsWXhteUVuMkNWb3pXdVZjZmhkbmxyNWVLc1pIRFVxY2Vqd01lRnZJeDVleVZXalliQXNUZml3MDlZZm5DUkZYZ1pmeUZPR0ZUSXhVbDkxaTVpRjVUUXRDcFdkNFNpeWJWdThwY2VkVC9BMU91VGdVYUx4V3Fob0NSWFZpVEs0M05YbDgmRll4NVcvZVphWjRRcHRNQ3hVS25mNGpDU3o4PQ;== _ir=0"
		    }
        }).then(({ data })=> {
		    const $ = cheerio.load(data)
		    const result = [];
		    const images = [];
		
            $('div > a').get().map(b => {
                const link = $(b).find('img').attr('src')
                result.push(link)
		    });
		
            result.forEach(image => {
		        if(image !== undefined) images.push(image.replace(/236/g,'736'))
		    })
            images.shift();
		    resolve(images)
		})
	})
}
module.exports = pinterest
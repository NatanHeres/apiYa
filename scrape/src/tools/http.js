const axios = require('axios');

async function http(q) {
    const url = 'https://backend-v2.httpstatus.io/api';
    const requestData = {
        urls: [`${q}`],
        userAgent: "browser",
        userName: "",
        passWord: "",
        headerName: "",
        headerValue: "",
        strictSSL: true,
        canonicalDomain: false,
        additionalSubdomains: ["www"],
        followRedirect: true,
        throttleRequests: 100,
        escapeCharacters: false
    };

    try {
        const response = await axios.post(url, requestData, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json;charset=utf-8'
            }
        });

        return response.data;
    } catch (error) {
        console.log(error)
        
    }
}

module.exports = http
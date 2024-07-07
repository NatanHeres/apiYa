const axios = require('axios');

async function ratu_bokep(otakBokep) {
    try {
        const url = 'https://uam.getmerlin.in/thread/unified?customJWT=true&version=1.1';
        const headers = {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXRhaWxzIjp7Im5hbWUiOiJMT1JEIEVYRSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NJbjdLRkFHWDFWaWtrdXk4ZHdaSlp2dUlEVnc5WmtHZUUydGx4UFF0dFM5aTNFRGc9czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZm95ZXItd29yayIsImF1ZCI6ImZveWVyLXdvcmsiLCJhdXRoX3RpbWUiOjE3MjAyNDUzMjUsInVzZXJfaWQiOiJqZVNlZDVHR3ZLT3cyZ2lrQzlTd0pEZFp6cmoxIiwic3ViIjoiamVTZWQ1R0d2S093Mmdpa0M5U3dKRGRaenJqMSIsImlhdCI6MTcyMDI0NTMyNSwiZXhwIjoxNzIwMjQ4OTI1LCJlbWFpbCI6ImxvcmRleGU0NjQ2QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTA0NjgxMzk3NDU5MDY2ODA1ODc5Il0sImVtYWlsIjpbImxvcmRleGU0NjQ2QGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifSwidWlkIjoiamVTZWQ1R0d2S093Mmdpa0M5U3dKRGRaenJqMSJ9LCJpYXQiOjE3MjAyNDUzMzQsImV4cCI6MTcyNTQyOTMzNH0.rzjCceyBgH3CMBLWTbFMtMuwEsef75ZRb-uaiMcC0mk',
            'Content-Type': 'application/json',
            'x-merlin-version': 'extension-null',
            'accept': 'text/event-stream'
        };

        const requestData = {
            action: {
                message: {
                    attachments: [],
                    content: otakBokep,
                    metadata: { context: '' },
                    parentId: 'root',
                    role: 'user'
                },
                type: 'NEW'
            },
            activeThreadSnippet: [],
            chatId: '6bf02e49-45c4-44dc-8a16-c9fdb560617d',
            language: 'AUTO',
            metadata: null,
            mode: 'WEB_ACCESS',
            model: 'GPT 4',
            personaConfig: {}
        };

        const response = await axios.post(url, requestData, { headers, responseType: 'stream' });

        let hasilBeranak = '';

        response.data.on('data', chunk => {
            const chunkStr = chunk.toString();
            const lines = chunkStr.split('\n');
            lines.forEach(line => {
                if (line.startsWith('data: ')) {
                    const dataStr = line.replace('data: ', '');
                    try {
                        const data = JSON.parse(dataStr);
                        if (data.status === 'success' && data.data.eventType === 'CHUNK') {
                            hasilBeranak += data.data.content;
                        }
                    } catch (err) {
                        console.error(err);
                    }
                }
            });
        });

        return new Promise((resolve, reject) => {
            response.data.on('end', () => {
                resolve(hasilBeranak);
            });
        });

    } catch (error) {
        console.error(error);
        throw error;
    }
}
async function gpt4(otakBokep) {
    try {
        const hasilBeranak = await ratu_bokep(otakBokep);
        console.log(hasilBeranak);
        return hasilBeranak;
    } catch (error) {
        console.error(error);
    }
}

module.exports = gpt4
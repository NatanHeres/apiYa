const axios = require('axios');

async function sendRequest(prompt) {
  const url = 'https://api.eleo.ai/api/ai/text';
  const data = {
    prompt: prompt,
    messages: [{ role: "user", content: prompt }],
    chatId: null,
    type: "Information",
    language: "auto",
    isGuru: false,
    kwargs: { stream: true }
  };

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOiIwYjU1YjcxYS1lMDFiLTRmOWUtYTNiNi1jMWMxNmUzMDY1ZGQiLCJ1c2VySWQiOiJkMjk0Y2EwNS02ZjNiLTQ0ZTYtOTI0Yy1hYzc1ZmFiOGIzNzciLCJwZXJtaXNzaW9uIjoib3duZXIiLCJwcm92aWRlciI6Imdvb2dsZSIsImlhdCI6MTcxOTkyNTk5OCwiZXhwIjoxNzIwNTMwNzk4fQ.cFC7du1_gKvoWsESYow1066Pru1wEI_4VAv4n-MDRg8',
    'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36',
    'Referer': 'https://app.eleo.ai/chat'
  };

  try {
    const response = await axios.post(url, data, { headers });
    const responseData = response.data;
    const endStreamIndex = responseData.indexOf('ENDSTREAM-');
    if (endStreamIndex !== -1) {
      const result = responseData.substring(endStreamIndex + 'ENDSTREAM-'.length);
      return JSON.parse(result); // Mengubah string JSON menjadi objek
    } else {
      throw new Error('ENDSTREAM- not found in the response');
    }
  } catch (error) {
    throw error;
  }
}

async function eleo(prompt) {
  try {
    const result = await sendRequest(prompt);
    // Convert to string and back to JSON to ensure all properties are in double quotes
    const jsonString = JSON.stringify(result, null, 2);
    return JSON.parse(jsonString);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Contoh pemanggilan fungsi
module.exports = eleo
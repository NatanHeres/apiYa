const axios = require('axios');

async function hatAi(question) {
  const url = 'https://hat.baby/api/getSources';
  const requestData = {
    question: question
  };

  try {
    const response = await axios.post(url, requestData, {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const sources = response.data.map(source => `${source.name}: ${source.url}`).join('\n');
    return `${sources}`;
  } catch (error) {
    console.error(error.message);
    return 'Failed to fetch sources';
  }
}

async function hatAiImg(question) {
  const url = 'https://hat.baby/api/getAnswer';
  const requestData = {
    question: question,
    sources: []
  };

  try {
    const response = await axios.post(url, requestData, {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      responseType: 'stream'
    });

    return new Promise((resolve, reject) => {
      const chunks = [];

      response.data.on('data', chunk => {
        chunks.push(chunk);
      });

      response.data.on('end', () => {
        const responseData = Buffer.concat(chunks).toString('utf8').trim();
        const lines = responseData.split('\n');
        const texts = lines.map(line => {
          if (line.trim().startsWith('data:')) {
            try {
              const obj = JSON.parse(line.replace('data: ', ''));
              if (obj && obj.text) {
                return obj.text.trim();
              } else {
                return null;
              }
            } catch (error) {
              console.error(error.message);
              return null;
            }
          }
          return null;
        }).filter(text => text !== null);
        resolve(`${texts.join(' ')}`);
      });

      response.data.on('error', error => {
        console.error(error.message);
        reject(`Failed to fetch answer`);
      });
    });

  } catch (error) {
    console.error(error.message);
    return 'Failed to fetch answer';
  }
}

async function hatAidym(question) {
  const url = 'https://hat.baby/api/getSimilarQuestions';
  const requestData = {
    question: question
  };

  try {
    const response = await axios.post(url, requestData, {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const dym = response.data.join('\n');
    return `${dym}`;
  } catch (error) {
    console.error(error.message);
    return 'Error';
  }
}

async function hatbaby(question) {
  try {
    const result = {
      Source: [],
      Answer: [],
      DoYouMean: []
    };

    const sources = await hatAi(question);
    result.Source.push(sources);

    const answer = await hatAiImg(question);
    result.Answer.push(answer);

    const dym = await hatAidym(question);
    result.DoYouMean.push(dym);

    return result;
  } catch (error) {
    console.error(error.message);
    return 'error';
  }
}

module.exports = hatbaby
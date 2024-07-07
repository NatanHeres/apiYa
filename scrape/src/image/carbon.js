const fetch = require('node-fetch')


async function carbon(text) {
  let Blobs = await fetch("https://carbonara.solopov.dev/api/cook", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code: text,
    }),
  }).then((response) => response.blob());
  const arrayBuffer = await Blobs.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return buffer
}

module.exports = carbon
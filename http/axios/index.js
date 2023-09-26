const axios = require('axios');

async function demoGet() {
  const response = await axios.get("https://wwww.baidu.com");
  console.log(response.status);
}

demoGet();
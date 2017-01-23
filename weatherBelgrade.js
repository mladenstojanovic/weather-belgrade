const https = require('https');

function printMessage(time, tempC, appTempC) {
  let message = `U Beogradu je trenutno ${tempC} stepeni celzijusa, dok je stvarni osecaj ${appTempC} stepeni celzijusa. Trenutno vreme : ${time}`;
  console.log(message);
}

https.get('https://api.darksky.net/forecast/8a206d56afb7faf118d5c02c845292ad/44.818611,20.468056', (res) => {
  const statusCode = res.statusCode;
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    try {
      let parsedData = JSON.parse(body);
      const temp = parsedData.currently.temperature;
      const appTemp = parsedData.currently.apparentTemperature;
      const tempC = ((temp - 32) * (5/9)).toFixed(0);
      const appTempC = ((appTemp - 32) * (5/9)).toFixed(0);
      const date = new Date(parsedData.currently.time*1000);
      const hours = date.getHours();
      const minutes = '0' + date.getMinutes();
      const seconds = '0' + date.getSeconds();
      const time = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
      printMessage(time, tempC, appTempC);
    } catch (e) {
      console.log(e.message);
    }
  });

}).on('error', (e) => {
  console.error(e);
});

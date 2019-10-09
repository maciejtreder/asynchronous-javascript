const fetch = require('node-fetch');
 
const lat = 37;
const lon = 122;
 
const sevenTimerTemp = 
fetch(`http://www.7timer.info/bin/api.pl?lon=${lon}&lat=${lat}&product=astro&output=json`)
.then(response => response.json())
.then(response => response.dataseries[0].temp2m);
 
const fccWeatherTemp =
fetch(`https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lon}`)
.then(response => response.json())
.then(response => response.main.temp);
 
Promise.race([sevenTimerTemp, fccWeatherTemp])
.then(temperature => console.log(`Temperature reported by the fastest station is: ${temperature} C`));

function getWatchdog(timeout) {
    return new Promise((resolve, reject) => setTimeout(() => reject('Timeout !'), timeout * 1000));
}
 
Promise.race([
    sevenTimerTemp.catch(() => new Promise((resolve) => {/*noop*/})), 
    fccWeatherTemp.catch(() => new Promise((resolve) => {/*noop*/})),
 
    getWatchdog(5)
])
.then(temperature => console.log(`Temperature reported by the fastest station is: ${temperature} C`))
.catch(() => console.log('Unfortunately no API responded within the given time-out interval'));
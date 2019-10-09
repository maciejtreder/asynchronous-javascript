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
 
Promise.all([sevenTimerTemp, fccWeatherTemp])
.then(responses => {
    let sum = 0;
    let count = 0;
    responses.forEach(response => {
        sum += response;
        count++;
    });
    return sum / count;
})
.then(average => console.log(`Average of reported temperatures is: ${average}`))
.catch(() => console.log(`One of the APIs returned an error`));

Promise.all([
    sevenTimerTemp.catch(() => -100), 
    fccWeatherTemp.catch(() => -100)
])
.then(responses => {
    let sum = 0; 
    let count = 0;
    responses.filter(response => response !== -100).forEach(response => {
        sum += response;
        count++;
    });
    return sum / count;
})
.then(average => console.log(`Average of reported temperatures is: ${average} C`));
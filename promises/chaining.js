const fetch = require('node-fetch');

const lat = 37;
const lon = 122;
 

fetch(`http://www.7timer.info/bin/api.pl?lon=${lon}&lat=${lat}&product=astro&output=json`)
    .then(response =>  response.json())
    .then(response => response.dataseries[0].temp2m)
    .then(temperature => console.log(`The temperature reported by the 7timer is: ${temperature} C`));

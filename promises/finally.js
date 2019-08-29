const ora = require('ora');
const spinner = ora('Loading promise 2').start();
const promise2 = new Promise((resolve, reject) => {
   setTimeout(() => {
       if (Math.random() >= 0.5) {
           resolve('Promise resolved');
       } else {
           reject('Promise rejected');
       }
   }, 2000);
});
 
promise2
 .finally(() => spinner.stop())
 .then(console.log)
 .catch(console.error);
 
promise2.catch(() => {/* noop */}).finally(() => console.log(`This will be always executed.`));


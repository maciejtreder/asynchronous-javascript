function wait(ms) {
    var start = Date.now(),
        now = start;
    while (now - start < ms) {
      now = Date.now();
    }
 }
  const promise1 = new Promise(resolve => {
    console.log('Inside the promise1 executor code');
    wait(2000);
    resolve('Value from the promise1 resolve method');
   
 });
 console.log(promise1);
 console.log('After the promise1 constructor');
 promise1.then(resolveValue => console.log(resolveValue));
 console.log('After promise1.then is called and fulfilled');
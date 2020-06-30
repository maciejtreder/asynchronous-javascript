async function getOperandSlow() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(Math.floor(Math.random() * Math.floor(10)));
        }, 3 * 1000);
    });
 }
 
 export async function addTwoNumbersSlow() {
    console.clear();
    console.time('Time elapsed');
  
    const operand1 = await getOperandSlow();
    const operand2 = await getOperandSlow();
  
    const sum = operand1 + operand2;
  
    console.log('First operand: ' + operand1);
    console.log('Second operand: ' + operand2);
    console.log('Sum: ' + sum);
  
    console.timeEnd('Time elapsed');
 }
 
 export async function addTwoNumbersFaster() {
    console.clear();
    console.time('Time elapsed');
  
    const operandPromise1 = getOperandSlow();
    const operandPromise2 = getOperandSlow();
    const operand1 = await operandPromise1;
    const operand2 = await operandPromise2;
    const sum = operand1 + operand2;
    console.log('First operand: ' + operand1);
    console.log('Second operand: ' + operand2);
    console.log('Sum: ' + sum);
  
    console.timeEnd('Time elapsed');
 }
 
 
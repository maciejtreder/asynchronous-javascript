async function getOperand() {
   return Math.floor(Math.random() * Math.floor(10));
}

export async function addTwoNumbers() {
   console.clear();
   const operand1 = await getOperand(); 
   const operand2 = await getOperand();
   const sum = operand1 + operand2;
   console.log('First operand: ' + operand1);
   console.log('Second operand: ' + operand2);
   console.log('Sum: ' + sum);
}

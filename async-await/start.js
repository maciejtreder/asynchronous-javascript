import readline from 'readline-promise'; // You can ignore the ts(7016) warning.
 
const rl = readline.createInterface({
 input: process.stdin,
 output: process.stdout
});
const MenuOptions = {
  4: "Exit"
};
async function displayMenu() {
 console.clear();
  console.log('Choose an option and press Enter\n');
  for (const option in MenuOptions) {
     console.log('(' + option + ') ' + MenuOptions[option])
 }
 const chosenOption = parseInt(await rl.questionAsync('\nYour choice: '));
 switch(chosenOption) {
   case 4: {
     console.log('Bye');
     rl.close();
     break;
   }
   default: {
     await rl.questionAsync('This option is not available. Press any key to continue.');
     displayMenu();
   }
 }
}
displayMenu();
import readline from 'readline-promise'; // You can ignore the ts(7016) warning.
import { addTwoNumbers } from './sum';

 
const rl = readline.createInterface({
 input: process.stdin,
 output: process.stdout
});
const MenuOptions = {
    1: "Add two random numbers",
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
    case 1: {
        await addTwoNumbers();
        await rl.questionAsync('Press Enter to get back to the menu');
        displayMenu();
        break;
    }
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
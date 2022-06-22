const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

randomInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1));
}

let low;
let high;
let secretNumber;
let numAttempts;

checkGuess = number => {
   if (number > secretNumber) {
    console.log("Too high.");
    return false;
   } else if (number < secretNumber) {
    console.log("Too low.");
    return false;
   } else {
    console.log("Correct!");
    return true;
   }
}

askGuess = () => {

  rl.question("Enter a guess: ", (answer) => {

    numAttempts--;

    answer = Number(answer);

    if (checkGuess(answer)) {
      console.log("You win!");
      rl.close();
    } else {
      if (numAttempts > 0) {
        askGuess();
      } else {
        console.log("Too many attempts, you lose!");
        rl.close();
      }

    }
  });

}

askRange = () => {

  rl.question("Enter a max number: ", (max) => {
     high = Number(max);

     rl.question("Enter a min number: ", (min) => {
        low = Number(min);

        console.log(`I'm thinking of a number between ${low} and ${high}...`);
        secretNumber = randomInRange(low, high);

        askGuess();
     });
  });

}

askLimit = () => {
  rl.question("How many attempts would you like?", (tries) => {
      numAttempts = Number(tries);
      console.log(`You have ${numAttempts} tries.`);
      askRange();
  });
}

askLimit();

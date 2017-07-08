var inquirer = require('inquirer');

/*Create a random number between 1 and 100. Call it the hidden number
Start with 5 guesses
As long as there are guesses left:
Ask the user for a number between 1 and 100 until they give you one
If they find the hidden number, they win the game. END
Otherwise, tell them whether their guess is lower or higher than the hidden number
Loop back
The user has lost the game. END*/



// inquirer.prompt([/* Pass your questions in here */]).then(function (answers) {
//     // Use user feedback for... whatever!! 
// });
var hidden=39;
var chances=5;


function Questions(){
chances--;
    
inquirer.prompt({
message: 'Guess a number between 1 and 100',
name: 'guess'
})
.then(function(answers) {
  var guess = parseInt(answers.guess);
 
  if (answers.guess < hidden && chances > 0) {
    console.log("Guess is too low.  Try again. " + chances + " chances left." );
    Questions();
  }
  else if (answers.guess > hidden && chances > 0) {
    console.log("Guess is too high.  Try again. " + chances + " chances left." );
    Questions();
  }
   else if (answers.guess == hidden) {
    console.log("You guessed it!" );
    
  }
  else
  {
    console.log("Too bad - game over");
  }
})
.catch(function(error) {
  console.log(error);
});
    
    
}

Questions()

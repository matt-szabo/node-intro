'use strict';
var inquirer = require('inquirer');
var request = require('request-promise');


//var wordsurl = "http://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=false&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";
var chances=7;

var replace = [];

//var p = Promise.resolve();
var globalword = 'a';
var used =[];
var hits=0;

function getWord() {
  return request('https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=false&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5')
  .then(function(response) {
      // Parse as JSON
      //console.log(response);
      
      var wordObject = JSON.parse(response);
      var returnedWordObj = {};
      
      returnedWordObj.word = wordObject.word;
      //console.log(returnedWordObj.word);
      globalword = returnedWordObj.word.toLowerCase();
      
      console.log(globalword);
      
    // create an array of asterisks based on word length
    
        for (var i = 0;i<globalword.length;i++){
          replace.push("*");
        }


function Questions(){

inquirer.prompt({
type: 'input',
message: 'Welcome to HANGMAN. Please guess a letter!',
name: 'guess',
filter: function (guess){
return guess.toLowerCase();
},


validate: function (guess) {
    var mmm = /[A-z-]/g;
      var pass = guess.match(mmm);
      if (pass) {
        return true;
      }
      return 'Please enter a valid alpha character or hyphen. Those work too!';
    }
})
.then(function(answers) {
  

//  var guess = parseInt(answers.guess);
  var n = globalword.search(answers.guess); 

  
  for (var i = 0;i<hits;i++){
          if (used[i]==answers.guess){
        
          hits--;

          }
      }
  

      for (var i = 0;i<globalword.length;i++){
          if (globalword[i]==answers.guess){
          replace[i]=answers.guess;
          hits++;
          used.push(answers.guess);
          }
      }

  if (hits >= globalword.length)
        {
        console.log("******************You Win! The full word is " + globalword + " *******************");  
        throw new RangeError("Goodbye!");
        //getWord();
        }
   
  if (chances == 0 && n<0)
  {
    
    console.log("That letter was not found.");
    console.log("GAME OVER * GAME OVER * GAME OVER * GAME OVER * GAME OVER * GAME OVER");
    
    throw new RangeError("Goodbye!");
  }
  
  if (chances > 0 && n >= 0) {
    
    console.log("Good job! Your letter matches " + chances + " chances left.");
    console.log(replace.join(""));
    
      
    Questions();
        }
        else if(chances > 0 || n < 0 ){
          console.log("The letter was not found in our magic word. Please try again! " + chances + " chances left. & hits: " + hits);
          chances--;
          console.log(replace.join(""));
          Questions(); //recursively call questions
          
        }

  
  
  
})
// .catch(function(error) {
//   console.log(error);
// });
    
    
}

Questions();
      
      
      
      
    }
     
  );
  

}

getWord()




// for (var i = 0;i<word.length;i++){
//   replace.push("*");
// }


// function Questions(){

// inquirer.prompt({
// message: 'Welcome to HANGMAN. Pleaes guess a letter!',
// name: 'guess'
// })
// .then(function(answers) {
//   var hits=0;
//   var guess = parseInt(answers.guess);
//   var n = word.search(answers.guess); 
  
//       for (var i = 0;i<word.length;i++){
//           if (word[i]==answers.guess){
//           replace[i]=answers.guess;
//           }
//       }
  
   
//   if (chances <= 0)
//   {
//     console.log("Too bad - game over");
//   }
  
//   if (chances > 0 && n >= 0) {
//     console.log("Good job! Your letter matches " + chances + " chances left.");
//     console.log(replace.join(""));
//     hits++;
//     Questions();
//   }
//   else if(chances > 0 || n < 0 ){
//     console.log("The letter was not found in our magic word. Please try again! " + chances + " chances left.")
//     chances--;
//     Questions();
    
//   }

  
//   else if (hits >= word.length)
//   {
//     console.log("You Win!");  
//   }
  
// })
// .catch(function(error) {
//   console.log(error);
// });
    
    
// }

// Questions()


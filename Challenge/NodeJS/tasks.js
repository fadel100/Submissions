
/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name){
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
}


/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 * 
 * For example, if the user entered 
 * ```
 * node tasks.js batata
 * ```
 * 
 * The text received would be "batata"
 * This function  then directs to other functions
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */

 

function onDataReceived(text) {

  var arrayString = text.split(" ");

  var addFunctionInput = text.split(" ");

  if (text === 'quit\n' || text === 'exit\n') {
    quit();
  }
  else if(arrayString[0] === 'hello' || text === 'hello\n'){
    hello(arrayString);
  }
  else if(text === 'help\n'){
    help();
  }
  else if(text === 'list\n'){
    list(listArray);
  }
  else if(addFunctionInput[0] === 'add' || text === 'add\n'){
    add(addFunctionInput, listArray);
  }
  else
    unknownCommand(text);
  
}


var listArray=[
  "get this thing",
  "get the other thing",
  "get anything"
];

function list(theList){
 
  for(var i = 0; i<theList.length; i++){
    console.log(theList[i]);
  }
}


function add(addFunctionInput, listArray){
   if(addFunctionInput[1]){
  addFunctionInput.shift();
    
  listArray.push(addFunctionInput.join(" ").replace("\n", ""));
   }else console.log("error, empty input, please add something")
 
}



/*a new command, "help", that lists all the possible commands
*/
function help(){
  console.log('quit\n'+'hello\n');
}


/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c){
  console.log('unknown command: "'+c.trim()+'"')
}


/**
 * Says hello plus the whole sentence plus "!" 
 *
 * @returns {void}
 */
function hello(theText){
  
  console.log(theText.join(" ").replace("\n","")+"!")
}


/**
 * Exits the application
 *
 * @returns {void}
 */
function quit(){
  console.log('Quitting now, goodbye!')
  process.exit();
}

// The following line starts the application
startApp("Fadel Ibrahim")

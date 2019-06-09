
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

  var removeFunctionInput = text.split(" ");

  var editFunctionInput = text.split(" ");

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
  else if(removeFunctionInput[0] === 'remove' || text === 'remove\n'){
    remove(removeFunctionInput, text);
  }
  else if(editFunctionInput[0] === 'edit' || text === 'edit\n'){
    edit(editFunctionInput, text);
  }
  else
    unknownCommand(text);
  
}

// the list of tasks with default values
var listArray=[
  "get this thing",
  "get the other thing",
  "get anything"
];


// print out the list of tasks
function list(theList){
 
  for(var i = 0; i<theList.length; i++){
    console.log(theList[i]);
  }
}

// add a task to list of tasks
function add(addFunctionInput, listArray){
   if(addFunctionInput[1]){
  addFunctionInput.shift();
    
  listArray.push(addFunctionInput.join(" ").replace("\n", ""));
   }else console.log("error, empty input, please add something")
 
}

// remove a task from the list of tasks
function remove(removeFunctionInput, text){
  if(text === 'remove\n'){
    listArray.pop();
  }else{
    if(removeFunctionInput[1] <0 || removeFunctionInput[1] > listArray.length){
      console.log("error,this task doesn't exist");
      // so it exit the function and does not execute the next instruction
      return;
    }
     
    listArray.splice(removeFunctionInput[1]-1, 1);
  }
  
}

// edit tasks
function edit(editFunctionInput, text){
  if(text === 'edit\n'){
    console.log("error, edit command is empty")
  }
  // parse the string into an intenger then check if it is a number
  else if(isNaN(parseInt(editFunctionInput[1]))){
    editFunctionInput.shift();
    listArray.splice(listArray.length-1,1,editFunctionInput.join(" "));
  }
  else{
     
    var whichTaskToEdit = editFunctionInput[1];
   
    editFunctionInput.shift();
    editFunctionInput.shift();
    
    listArray.splice(whichTaskToEdit-1,1,editFunctionInput.join(" ").replace("\n", ""))
  }
}


/*a new command, "help", that lists all the possible commands
*/
function help(){
  console.log('\nquit\n'+'hello\n'+'list\n'+'add\n'+'remove\n');
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

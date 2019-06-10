
const fs = require('fs');
// save the path form the command line
var path;
if(process.argv[2]){
  path = process.argv[2];
}else{
  path = 'database.json';
}

//  save data when i type exit or quit.
const storeData = (data, path) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data))
  } catch (err) {
    console.error(err)
  }
}

//  load data from  database.json
const loadData = (path) => {
  try {
    return fs.readFileSync(path, 'utf8')
  } catch (err) {
    console.error(err)
    return false
  }
}




var listArrayOfObjects= [
  {
    task: "get this thing",
    done: false
  },
  {
    task: "get the other thing",
    done: true
  },
  {
    task: "get anything",
    done: false
  }
];

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
  //  if the file i want to load data from doens't exist , i create one and store the default values of listArrayOfObjects in it
  if(!fs.existsSync(path)){
    storeData(listArrayOfObjects, path);
    }

  // load data from the file when statrting the app
  listArrayOfObjects = JSON.parse(loadData(path));
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

// const fs = require('fs')

function onDataReceived(text) {


  var userInput = text.split(" ");


  if (text === 'quit\n' || text === 'exit\n') {
    quit();
  }
  else if(userInput[0] === 'hello' || text === 'hello\n'){
    hello(userInput);
  }
  else if(text === 'help\n'){
    help();
  }
  else if(text === 'list\n'){
    list(listArrayOfObjects);
  }
  else if(userInput[0] === 'add' || text === 'add\n'){
    add(userInput, listArrayOfObjects);
  }
  else if(userInput[0] === 'remove' || text === 'remove\n'){
    remove(userInput, text);
  }
  else if(userInput[0] === 'edit' || text === 'edit\n'){
    edit(userInput, text);
  }
  else if(userInput[0] === 'check' || text === 'check\n'){
    check(userInput, text);
  }
  else if(userInput[0] === 'uncheck' || text === 'uncheck\n'){
    uncheck(userInput, text);
  }
  else
    unknownCommand(text);
  
}







 

// print out the list of tasks
function list(theList){
  for(var i = 0; i<theList.length; i++){
    if(theList[i].done){
      console.log(i+1 +" [✓] "+theList[i].task);
    }else{
      console.log(i+1 +" [ ] "+theList[i].task);
    }
     
  }
}

// add a task to list of tasks
function add(userInput, listArray){
   if(userInput[1]){
    userInput.shift();
    
  listArray.push({
    task: userInput.join(" ").replace("\n", ""),
    done: false
    });
   }else console.log("error, empty input, please add something")
 
}

// remove a task from the list of tasks
function remove(userInput, text){
  if(text === 'remove\n'){
    listArrayOfObjects.pop();
  }else{
    if(userInput[1] <0 || userInput[1] > listArrayOfObjects.length){
      console.log("error,this task doesn't exist");
      // so it exit the function and does not execute the next instruction
      return;
    }
     
    listArrayOfObjects.splice(userInput[1]-1, 1);
  }
  
}

// edit tasks
function edit(userInput, text){
  if(text === 'edit\n'){
    console.log("error, edit command is empty")
  }
  // parse the string into an intenger then check if it is a number
  else if(isNaN(parseInt(userInput[1]))){
    userInput.shift();
    listArrayOfObjects.splice(listArrayOfObjects.length-1,1,{task: userInput.join(" ").replace("\n", ""), done: false});
  }
  else{
     
    var whichTaskToEdit = userInput[1];
   
    userInput.shift();
    userInput.shift();
    
    listArrayOfObjects.splice(whichTaskToEdit-1,1,{task: userInput.join(" ").replace("\n", ""), done: false})
  }
}

//  change task status from not done to done
function check(userInput, text){
  if(text === 'check\n'){
    console.log("error, add the # of the task u want to check")
  }else{
    if(!listArrayOfObjects[userInput[1]-1].done)
    listArrayOfObjects[userInput[1]-1].done = !listArrayOfObjects[userInput[1]-1].done
  }

}

// change task status from done to not done 
function uncheck(userInput, text){
  if(text === 'uncheck\n'){
    console.log("error, add the # of the task u want to uncheck")
  }else{
    if(listArrayOfObjects[userInput[1]-1].done)
    listArrayOfObjects[userInput[1]-1].done = !listArrayOfObjects[userInput[1]-1].done
  }
 
}







/*a new command, "help", that lists all the possible commands
*/
function help(){
  console.log('\nquit\n'+'hello\n'+'list\n'+'add\n'+'remove\n'+'edit\n'+'check\n'+'uncheck\n');
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
 * Exits the application and save data
 *
 * @returns {void}
 */
function quit(){
  storeData(listArrayOfObjects, path);
  console.log('Quitting now, goodbye!')
  process.exit();
}

// The following line starts the application
startApp("Fadel Ibrahim")



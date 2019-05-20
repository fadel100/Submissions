// create a div element with js
var div_created = document.createElement("div");


// target the body in order to use for adding the div to it
var target_body= document.body;


// add div element to the html
target_body.appendChild(div_created);


// targeting the input element
var target_input = document.querySelector("input");


// adding an event to the input
target_input.addEventListener("input", function(){
    // putting the input value in div
    div_created.innerHTML = target_input.value;
})
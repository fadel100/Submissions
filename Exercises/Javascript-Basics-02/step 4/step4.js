// targeting the button element
var target_button = document.querySelector("button");

 
// add an event to the button
target_button.addEventListener("click", function(){
    // dialogue yes or no
    var yes_or_no = confirm("do u want to reset yes or no?!");

    if(yes_or_no == true){
        // change value of inputs
        document.querySelector("#name").value = "";
        document.querySelector("#surname").value = "";
        document.querySelector("#city").value = "";
    }
},false);
var target_div_green = document.querySelector(".green");
var target_div_red = document.querySelector(".red");
var target_div_blue = document.querySelector(".blue");

var target_p = document.querySelector("p");

target_div_green.addEventListener("click", function(){
    target_p.setAttribute("style", "color: green")
}, false);

target_div_red.addEventListener("click", function(){
    target_p.setAttribute("style", "color: red")
}, false);

target_div_blue.addEventListener("click", function(){
    target_p.setAttribute("style", "color: blue")
}, false);
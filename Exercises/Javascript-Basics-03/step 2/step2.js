 

function click_anchor(x){
    if(x == 1){
        document.querySelector("div p").setAttribute("style", "display: block");
    }
    else document.querySelector("div p").setAttribute("style", "display: none");
}
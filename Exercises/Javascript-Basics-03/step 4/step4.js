 

function change_border(){
    var value1=document.getElementById("password").value;
    var value2=document.getElementById("confirmation").value;

    if(value1 != value2){
        document.querySelector("#password").style.border="solid 3px red";
        document.querySelector("#confirmation").style.border="solid 3px red";
    }
}
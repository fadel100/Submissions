// put image tags in an array
var the_image=document.querySelectorAll("img");

 
var x;


function change_image(x){
    the_image[x-1].src="images/image" + (x) + "_2.jpg";
}
 
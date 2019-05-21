var the_image=document.querySelectorAll("img");

 
var x;


function change_image_in(x){
    the_image[x-1].src="images/image" + (x) + "_2.jpg";
}
function change_image_out(x){
    the_image[x-1].src="images/image" + (x) + ".jpg";
}
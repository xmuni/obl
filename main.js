

var boxes = document.querySelectorAll(".flexbox a");
var panel = document.querySelectorAll(".previewpanel")[0];
console.log(panel); // fourth box
console.log(boxes[7]); // fourth box


var flexbox = document.querySelectorAll(".flexbox")[0];
flexbox.addEventListener("click", reveal, false);


function reveal()
{
	if(panel.style.display == "grid")
		panel.style.display = "none";
	else
		panel.style.display = "grid";
}





// Get the element you want to add your new element before or after
var target = boxes[7];

// Create the new element
// This can be any valid HTML element: p, article, span, etc...
var div = document.createElement('div');
div.classList.add("previewpanel");

// div.classList.add("box");


// Add content to the new element
div.innerHTML = 'New div just created';

// Insert the element before our target element
var newdiv = panel;
newdiv.style.display = "grid";
target.parentNode.insertBefore(newdiv, target);

console.log(div);



// Insert the element after our target element
// target.parentNode.insertBefore( div, target.nextSibling );




var infobox = document.createElement("div");
infobox.id = ("infobox");
infobox.classList.add("previewpanel");
infobox.style.display = "grid";

infobox.innerHTML = "asdf";




// getxhr("details.xml");
// getxhr("details.json");

var details_array = [];
get_details();

// console.log(fetchedjson);
// console.log(details_array[0]);
// infobox.innerHTML = details_array[0];






var boxes = document.querySelectorAll(".flexbox .box");
var flexbox = document.querySelectorAll(".flexbox")[0].querySelectorAll(".box");
// console.log("flexbox length:");
// console.log(flexbox.length);


// var index = 5;
// add_infobox_at(index);
// boxes[1].parentNode.insertBefore(infobox, boxes[index]);

// reveal(flexbox.length, 7);



var boxcount = flexbox.length;
for(var i=0; i<flexbox.length; i++)
{
	// console.log("boxes.length");
	// console.log("asdshdbf,jshdgfbksdjf");
	
	flexbox[i].addEventListener("click", function(){reveal(this, flexbox)}, false);
}

function reveal(box, flexbox)
{
	// update infobox content with the description of this plant from "details.json"
	var description = get_details_by_id(box.id);
	infobox.innerHTML = description;

	var index = get_box_index(flexbox, box.id);
	console.log("Found index");
	console.log(index);

	if(index<0)
		return;

	var boxcount = flexbox.length;
	var columns = count_columns();
	var last_box_in_row = Math.ceil( (index+1)/columns ) * columns;

	console.log("boxcount:");
	console.log(boxcount);
	console.log("last_box_in_row:");
	console.log(last_box_in_row);

	if(last_box_in_row > boxcount)
		last_box_in_row = boxcount-1;

	// console.log(last_box_in_row);

	// this.parentNode.insertBefore(infobox, this);
	add_infobox_at(last_box_in_row);

}

function get_box_index(flexbox, id)
{
	for(var i=0; i<flexbox.length; i++)
	{
		if(flexbox[i].id == id)
			return i;
	}

	return -1;
}

function count_columns()
{
	var gallery_width = document.querySelector("#gallery").offsetWidth; // or clientWidth
	var box_width = document.querySelectorAll(".box")[0].offsetWidth; // width of first box
	// console.log(gallery_width);
	// console.log(box_width);

	var columns = Math.floor(gallery_width/box_width);
	// console.log("columns: "+columns);

	return columns;
}

function add_infobox_at(index)
{
	boxes[0].parentNode.insertBefore(infobox, boxes[index]);
	console.log("infobox added");
	console.log(index);
}







function get_details()
{
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function()
	{
		if(this.readyState == 4 && this.status == 200)
		{
			// Typical action to be performed when the document is ready:
			var response = JSON.parse(xhttp.responseText);

			details_array = response.details;
			console.log(details_array);
			// var detail_array = response.details;
			// console.log(detail_array.length);
		}
	};
	xhttp.open("GET", "details.json", true);
	xhttp.send();
}




// returns a string (the HTML content)
function get_details_by_id(id)
{
	for(var i=0; i<details_array.length; i++)
	{
		if(details_array[i].id == id)
			return details_array[i].content;
	}

	return "";
}



/*

function getxhr(filename)
{
	var xhr = new XMLHttpRequest();
	XMLHttpRequest.responseType = "document";
	xhr.open("GET", filename, true);

	xhr.onload = function()
	{
		if(this.status==200)
		{
			var content = this.responseText;
			infobox.innerHTML = content;
		}
		else
		{
			console.log("could not get file:");
			console.log(filename);
		}
	}

	xhr.send();
}

function get_text()
{
	var xmlhttp = new XMLHttpRequest();
	var text = "";

	xmlhttp.open("HEAD", "details.xml", true);
	xmlhttp.onreadystatechange = function()
	{
		text = xmlhttp.readyState;
	}

	xmlhttp.send(null);
	return text;
}

function loadfile()
{
	var xhttp = new XMLHttpRequest();
	var text = "";

	xhttp.onreadystatechange = function()
	{
	  	if(this.readyState == 4 && this.status == 200)
	  		text = this.responseText;
	};

	// send data to server
	xhttp.open("GET", "details.xml", true);
	xhttp.send();

	return text;
}

*/

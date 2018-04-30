


var infobox = document.createElement("div");
infobox.id = ("infobox");
infobox.classList.add("previewpanel");
infobox.style.display = "grid";

infobox.innerHTML = "asdf";

var infobox_lastopened_id = "none";




// getxhr("details.xml");
// getxhr("details.json");

var details_array = [];
get_details();
var gallerycontent = "[default gallerycontent]";



// console.log(fetchedjson);
// console.log(details_array[0]);
// infobox.innerHTML = details_array[0];


// load_category("cat/cat_med.xml");
enable_all_flexboxes();

document.querySelector("#cat_med").addEventListener("click", function(){ sidebar_click(this,"cat/cat_med.xml"); }, false);
document.querySelector("#cat_alb").addEventListener("click", function(){ sidebar_click(this,"cat/cat_alb.xml"); }, false);
document.querySelector("#cat_fru").addEventListener("click", function(){ sidebar_click(this,"cat/cat_fru.xml"); }, false);
document.querySelector("#cat_pra").addEventListener("click", function(){ sidebar_click(this,"cat/cat_pra.xml"); }, false);
document.querySelector("#cat_bos").addEventListener("click", function(){ sidebar_click(this,"cat/cat_bos.xml"); }, false);
document.querySelector("#cat_orn").addEventListener("click", function(){ sidebar_click(this,"cat/cat_orn.xml"); }, false);


function sidebar_click(this_button, xml_filename)
{
	console.log("loading "+xml_filename);
	load_category(xml_filename);
	select_sidebar_button(this_button.id);
	// enable_all_flexboxes();

	setTimeout(function(){enable_all_flexboxes();}, 100);
}




// var index = 5;
// add_infobox_at(index);
// boxes[1].parentNode.insertBefore(infobox, boxes[index]);

// reveal(flexbox.length, 7);



/*
enable_infobox();

// adds click trigger to each box of all flexboxes on this page (inside #gallery)
function enable_infobox()
{
	all_flexboxes = document.querySelectorAll(".flexbox");
	
	for(var i=0; i<all_flexboxes.length; i++)
	{
		var boxes = all_flexboxes[i].querySelectorAll(".box");
		console.log(boxes);

		for(var j=0; j<boxes.length; j++)
		{	
			boxes[j].addEventListener("click", function(){reveal(this, boxes)}, false);
		}
	}
}
*/


function enable_all_flexboxes()
{
	console.log("enabling flexboxes");
	var all_flexboxes = document.querySelectorAll(".flexbox");
	for(var i=0; i<all_flexboxes.length; i++)
		enable_flexbox_infobox(all_flexboxes[i]);
}

function enable_flexbox_infobox(flexbox)
{
	var boxes = flexbox.querySelectorAll(".box");

	for(var i=0; i<boxes.length; i++)
	{
		boxes[i].addEventListener("click", function(){reveal(this, boxes)}, false);
	}
}


/*
var boxcount = flexbox.length;
for(var i=0; i<flexbox.length; i++)
{
	flexbox[i].addEventListener("click", function(){reveal(this, flexbox)}, false);
}
*/


function reveal(box, flexbox)
{
	console.log("revealing infobox for this box");
	// console.log(box);
	// console.log(flexbox);

	if(infobox.style.display=="grid" && infobox_lastopened_id==box.id)
	{
		infobox.style.display = "none"; // hide infobox
		return;
	}
	else
		infobox.style.display = "grid"; // show infobox

	// update infobox content with the description of this plant from "details.json"
	var description = get_details_by_id(box.id);
	infobox.innerHTML = description;

	var index = get_box_index(flexbox, box.id);
	// console.log("Found index");
	// console.log(index);

	if(index<0)
		return;

	var boxcount = flexbox.length;
	var columns = count_columns();
	var last_box_in_row = Math.ceil( (index+1)/columns ) * columns;

	// console.log("boxcount:");
	// console.log(boxcount);
	// console.log("last_box_in_row:");
	// console.log(last_box_in_row);

	if(last_box_in_row > boxcount)
		last_box_in_row = boxcount-1;

	// console.log(last_box_in_row);

	// this.parentNode.insertBefore(infobox, this);
	add_infobox_at(flexbox, last_box_in_row);

	//if(row_of_box(id) > row_of_box(infobox_lastopened_id))
		// scroll down by the infobox's pixel height

	infobox_lastopened_id = box.id;
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

function add_infobox_at(boxes, index)
{
	boxes[0].parentNode.insertBefore(infobox, boxes[index]);
	// console.log("infobox added");
	// console.log(index);
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

function load_category(xml_filename)
{
	get_xml_fixed(xml_filename);
	// set_gallerycontent(gallerycontent);
}



function get_xml(filename)
{
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function()
	{
		if(this.readyState == 4 && this.status == 200)
		{
			var response = xhttp.responseText;
			gallerycontent = response;
			console.log(response);
		}
		else
			console.log("ERROR: XmlHttpRequest could not get file: "+filename);

	};
	xhttp.open("GET", filename, true);
	xhttp.send();
}

function get_xml_fixed(filename)
{
	var xhr = new XMLHttpRequest();
	XMLHttpRequest.responseType = "document";
	xhr.open("GET", filename, true);

	xhr.onload = function()
	{
		if(this.status==200)
		{
			var content = this.responseText;
			// gallerycontent = content;
			var gallery = document.querySelector("#gallery");
			gallery.innerHTML = content;
			// console.log(content);
		}
		else
			console.log("ERROR: XmlHttpRequest could not get file: "+filename);
	}

	xhr.send();
}

function set_gallerycontent(text)
{
	var gallery = document.querySelector("#gallery");
	gallery.innerHTML = text;
}

function select_sidebar_button(id)
{
	var sidebar_buttons = document.querySelectorAll("#sidebar .button");
	console.log(sidebar_buttons);
	for(var i=0; i<sidebar_buttons.length; i++)
	{
		if(sidebar_buttons[i].id == id)
			sidebar_buttons[i].classList.add("selected");
		else
			sidebar_buttons[i].classList.remove("selected");
	}
}

// converts an object from details_array into HTML
function detail_object_to_innerhtml(detail_object)
{
	var imgurl	= detail_object.image;
	var name	= detail_object.name;
	var name2	= detail_object.name2;
	var par		= detail_object.par;
	var linkurl	= detail_object.link;

	var html_text = "<img src='"+imgurl+"'/>";
	html_text += "<div class='plantinfo'>";
	html_text += 	"<h2>"+name+"</h2>";
	html_text += 	"<h4>"+name2+"</h4>";
	html_text += 	"<p>"+par+"</p>";
	html_text += 	"<p><a href='"+linkurl+"'>Visualizza questa pianta su actaplantarum.org</a></p>";
	html_text += "</div>";

			// <img src="img/ligustro.jpg"/>
			// <h2>Acetosa</h2>
			// <h4>Rumex acetosa L.</h4>
			// <p>Foglie sagittate; decotto di pianta intera come depurativo</p>
			// <p><a href="#">http://www.floraitaliae.actaplantarum.org/viewtopic.php?t=3914</a></p>

			// "id": "au01",
			// "image": "img/ligustro.jpg",
			// "name": "acetosa",
			// "name2": "Rumex acetosa (L.)",
			// "par": "Foglie sagittate; decotto di pianta intera come depurativo",
			// "link": "http://www.floraitaliae.actaplantarum.org/viewtopic.php?t=3914"

	return html_text;
}

// returns a string (the HTML content)
function get_details_by_id(id)
{
	for(var i=0; i<details_array.length; i++)
	{
		if(details_array[i].id == id)
		{
			// return details_array[i].content;

			console.log("id found in details.json:");
			console.log(id);
			
			return detail_object_to_innerhtml(details_array[i]);
		}
	}

	console.log("ERROR: could not find id in details.json:");
	console.log(id);

	return "";
}



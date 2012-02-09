/*
VFW Project Web App Part 2
by: David Butler
date: 2/09/2012
term: 1202
*/



window.addEventListener("DOMContentLoaded", function(){
		
	function $(x){
		var theElement = document.getElementById(x);
		return theElement;
	}

function makeCats(){
	var formTag = document.getElementsByTagName("form"),
		selectLi = $('select'),
		makeSelect = document.createElement('select');
		makeSelect.setAttribute("id", "groups");
	for(var i=0, j=entryGroups.length; i<j; i++){
		var makeOption = document.createElement('option');
		var optText = entryGroups[i];
		makeOption.setAttribute("value", optText);
		makeOption.innerHTML = optText;
		makeSelect.appendChild(makeOption);
	}
	selectLi.appendChild(makeSelect);
}



function getSelectedRadio(){
	var radios = document.forms[0].sort;
	for(var i=0; i<radios.length; i++){
		if(radios[i].checked){
			sortValue = radios[i].value;
		}
	}
}



	function toggleControls(n){
		switch(n){
			case "on":
				$('entryForm').style.display = "none";
				$('clear').style.display = "inline";
				$('displayLink').style.display = "none";
				$('addNew').style.display = "inline";
				break;
			case "off":
				$('entryForm').style.display = "block";
				$('clear').style.display = "inline";
				$('displayLink').style.display = "inline";
				$('addNew').style.display = "none";
				$('items').style.display = "none";
				break;
			default:
				return false;
		}
	}
	
	getSelectedRadio();
	function storeData(){
		var id				= Math.floor(Math.random()*1000000001);
		var item			= {};
			item.group		= ["Category:", $('select').value];
			item.title		= ["Title:", $('title').value];
			item.login		= ["Login:", $('login').value];
			item.pword		= ["Password:", $('pword').value];
			item.cpword		= ["Confirm Password:", $('cpword').value];
			item.sort		= ["Sort By:", sortValue];	
			item.usage		= ["Usage:", $('usage2').value];
			item.date		= ["Date Modified:", $('dateModified').value];
			item.notes		= ["Notes:", $('notes').value];
		
		localStorage.setItem(id, JSON.stringify(item));
		alert("Contact Saved!");
}

function getData(){
	toggleControls("on");
	if(localStorage.length === 0){
		alert("There are no password entries to display.");
	}
	var makeDiv = document.createElement('div');
	makeDiv.setAttribute("id", "items");
	var makeList = document.createElement('ul');
	makeDiv.appendChild(makeList);
	document.body.appendChild(makeDiv);
	for(var i=0, len=localStorage.length; i<len;i++){
		var makeli = document.createElement('li');
		makeList.appendChild(makeli);
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		var obj = JSON.parse(value);
		var makeSubList = document.createElement('ul');
		makeli.appendChild(makeSubList);
		for(var n in obj){
			var makeSubli = document.createElement('li');
			makeSubList.appendChild(makeSubli);
			var optSubText = obj[n][0]+" "+obj[n][1];
			makeSubli.innerHTML = optSubText;
		}
	}
}

function clearLocal(){
	if(localStorage.length === 0){
		alert("There is no data to clear.")
	}else{
		localStorage.clear();
		alert("All password entries have been deleted!");
		window.location.reload();
		return false;
	}
}

var entryGroups = ["--Select Category--", "Computer Logins", "Email", "Financial", "Online Shopping", "Personal", "Other"], 
	sortValue
;	
	makeCats();

var displayLink = $('displayLink');
displayLink.addEventListener("click", getData);
var clearLink = $('clear');
clearLink.addEventListener("click", clearLocal);
var save = $('submit');
save.addEventListener("click", storeData);

});
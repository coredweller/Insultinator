/**************   GLOBAL VARIABLES  **************************         */

//These are the standard timeouts
var PINK_TIMEOUT = 1500;
var BLUE_TIMEOUT = 1500;
var YELLOW_TIMEOUT = 1000;
var ORANGE_TIMEOUT = 1000;
var DEFAULT_TIMEOUT = 850;

//Magic strings for each group name
var PINK_GROUP = "pinkGroup";
var BLUE_GROUP = "blueGroup";
var YELLOW_GROUP = "yellowGroup";
var ORANGE_GROUP = "orangeGroup";

//Get variables
var GET_PINK = "pink";
var GET_BLUE = "blue";
var GET_YELLOW = "yellow";
var GET_ORANGE = "orange";


/*************   Insultinator   **************************         */

//Random is called when the Random button is clicked.
//  It plays a random pink sound and kicks off the whole insult.
function Random()
{
	PlayRandom(PINK_GROUP); 
	setTimeout( function() {RandomBlue()} , BLUE_TIMEOUT);
}

//Plays a random sound from the blue group
function RandomBlue()
{
	PlayRandom(BLUE_GROUP);
	setTimeout( function() {RandomYellow()} , YELLOW_TIMEOUT);
}

//Plays a random sound from the yellow group
function RandomYellow()
{
	PlayRandom(YELLOW_GROUP);
	setTimeout( function() {RandomOrange()} , ORANGE_TIMEOUT);
}

//Plays a random sound from the orange group
function RandomOrange()
{
	PlayRandom(ORANGE_GROUP);
}

//Plays a random sound from the specified group
function PlayRandom(group)
{
	//Random number between 0 and 7, the number of sounds per section
	var randomNumber = Math.floor(Math.random()*8)
	
	var buttons = document.getElementsByName(group);
	var randomButton = buttons[randomNumber];
	var sound = document.getElementById(randomButton.value);
	sound.Play();
}




//Play All the chosen sounds
// Played when btnPlay is clicked
function PlayAll()
{
	//Gets each checked item from the respective radio button group
	var pinkItem = GetCheckedItem(PINK_GROUP);
	var blueItem = GetCheckedItem(BLUE_GROUP);
	var yellowItem = GetCheckedItem(YELLOW_GROUP);
	var orangeItem = GetCheckedItem(ORANGE_GROUP);
	
	//Adds each item to the array if it has a value other than "none"
	var items = AddGroup([], pinkItem, PINK_GROUP);
	items = AddGroup(items, blueItem, BLUE_GROUP);
	items = AddGroup(items, yellowItem, YELLOW_GROUP);
	items = AddGroup(items, orangeItem, ORANGE_GROUP);
	
	//Plays the array of items recursively
	Play(items);
}

//Adds an item to the array if it has a value other than "none"
function AddGroup(items, item, group)
{
	if(IsItemFull(item)) 
	{	
		items[items.length] = group;
	}
	
	return items;
}

//Plays an array of items recursively
function Play(items)
{
	if(items.length <= 0)
		return;

	var currentItem = items[0];
		
	PlaySound(currentItem);
		items.remove(0);
	
	if(items.length != 0)
	{
		var timeout = GetTimeout(currentItem);
		setTimeout( function() {Play(items)}, timeout);
	}
}

/**************   Create Insult   **************************         */

//Gets the checked item from each group and creates an insult url.
function CreateInsult()
{
	var pinkItem = GetCheckedItem(PINK_GROUP);
	var blueItem = GetCheckedItem(BLUE_GROUP);
	var yellowItem = GetCheckedItem(YELLOW_GROUP);
	var orangeItem = GetCheckedItem(ORANGE_GROUP);
	var url = "EmailInsultinator.html?" + GET_PINK + "=" + pinkItem + "&" + GET_BLUE + "=" + 
											   blueItem + "&" + GET_YELLOW + "=" + 
											   yellowItem + "&" + GET_ORANGE + "=" + 
											   orangeItem;
	$('#txtInsult').val(url);
}





/************   Email Insultinator   **************************         */

//This extends JQuery to let me use the getUrlVars function.
$.extend({
  getUrlVars: function(){
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    return vars;
  },
  getUrlVar: function(name){
    return $.getUrlVars()[name];
  }
});

//GetInsult is called when btnGetInsult is clicked.
//  It gets the insult for the pink group and kicks off the whole insult.
function GetInsult()
{
	Get(GET_PINK);  
	setTimeout( function() {GetBlue()}, BLUE_TIMEOUT);
}

//Gets the blue sound from the url and plays it
function GetBlue()
{
	Get(GET_BLUE); 
	setTimeout( function() {GetYellow()}, YELLOW_TIMEOUT);
}

//Gets the yellow sound from the url and plays it
function GetYellow()
{
	Get(GET_YELLOW); 
	setTimeout( function() {GetOrange()}, ORANGE_TIMEOUT);
}

//Gets the orange sound from the url and plays it
function GetOrange()
{
	Get(GET_ORANGE);
}

//Gets the value of the specified Url parameter and plays the associated sound.
function Get(parameter)
{
	var val = $.getUrlVar(parameter);
	var sound = document.getElementById(val);
	sound.Play();
}






/*****************  UTILITY FUNCTIONS  *********************/

function IsItemFull(item)
{
	if(item == "none")
	{
		return false;
	}
	
	return true;
}

function GetTimeout(item)
{
	if(item == PINK_GROUP)
	{
		return PINK_TIMEOUT;
	}
	
	return DEFAULT_TIMEOUT;
}

//Gets the checked item out of a radio button group
function GetCheckedItem(group)
{
	var buttons = document.getElementsByName(group);

	for(var i in buttons)
	{
		if(buttons[i].checked)
			return buttons[i].value;
	}
}

//Plays the sound from the chosen radio button group
function PlaySound(group)
{
	var checkedItem = GetCheckedItem(group)
	
	var sound = document.getElementById(checkedItem);
	sound.Play();
}

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};
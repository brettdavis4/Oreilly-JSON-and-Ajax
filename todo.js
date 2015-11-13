var latitude;
var longitude;

var monthNames = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];
	
function init() {


findLocation();
testlocalStorage();
}

//todo objects
function Todo(id, task, who, dueDate, latitude, longitude) {
    this.id = id;
    this.task = task;
    this.who = who;
    this.dueDate = dueDate;
    this.done = false;
    this.latitude = latitude;
	this.longitude = longitude;
}

var todos = new Array();

function addTodosToPage() {
    var ul = document.getElementById("todoList");
    var listFragment = document.createDocumentFragment();
    for (var i = 0; i < todos.length; i++) {
        var todoItem = todos[i];
        var li = createNewTodo(todoItem);
        listFragment.appendChild(li);
    }
    ul.appendChild(listFragment);
}

function addTodoToPage(todoItem) {
    var ul = document.getElementById("todoList");
    var li = createNewTodo(todoItem);
    ul.appendChild(li);
    document.forms[0].reset();
}

function createNewTodo(todoItem) {
    var li = document.createElement("li");
    li.setAttribute("id", todoItem.id);

    var spanTodo = document.createElement("span");
	var now = new Date();
	
	var date = new Date(todoItem.dueDate);	
	
    spanTodo.innerHTML =
        "(" + todoItem.latitude + ", " + todoItem.longitude + ") " + todoItem.who + " needs to " + todoItem.task + " by " + monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear() + " " + dateDiff(todoItem.dueDate, now) ;

    var spanDone = document.createElement("span");
    if (!todoItem.done) {
        spanDone.setAttribute("class", "notDone");
        spanDone.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    }
    else {
        spanDone.setAttribute("class", "done");
        spanDone.innerHTML = "&nbsp;&#10004;&nbsp;";
    }

    // add the click handler to update the done state
    spanDone.onclick = updateDone;

    // add the delete link
    var spanDelete = document.createElement("span");
    spanDelete.setAttribute("class", "delete");
    spanDelete.innerHTML = "&nbsp;&#10007;&nbsp;";

    // add the click handler to delete
    spanDelete.onclick = deleteItem;

    li.appendChild(spanDone);
    li.appendChild(spanTodo);
    li.appendChild(spanDelete);

    return li;
}


// Search
function searchTodos() {
    // new search, so clear previous results
    clearSearchResultsList();
    // get the text to search for
    var searchTerm = document.getElementById("searchTerm").value;
    var count = 0;
    // check all the todos in the list
    for (var i = 0; i < todos.length; i++) {
        var todoItem = todos[i];
        // make a regular expression to match the search term, regardless of case
        var re = new RegExp(searchTerm, "i");
        // try matching the expression with the task and the who from the to do item
        // in this case, we don't need the match results array; we just need to know
        // it exists for this to do item. If there is no match results, then the 
        // result of match is null, so the "if" test will fail.
        if (todoItem.task.match(re) || todoItem.who.match(re)) {
            // if we find a match, add the to do item to the search results
            addSearchResultToPage(todoItem);
            // keep a count of the number of items we match
            count++;
        }
    }
    // if we don't match any items, display "no results" in the search results list
    if (count == 0) {
        var ul = document.getElementById("searchResultsList");
        var li = document.createElement("li");
        li.innerHTML = "No results!";
        ul.appendChild(li);
    }
    // show the search results
    showSearchResults();
}

function CheckLatLong(latlongval){
	if (latlongval == 'Undefined'){
		return "N/A";
	} else {
		return latlongval;
	}
}

// add a search result to the search results list in the page
function addSearchResultToPage(todoItem) {
    var ul = document.getElementById("searchResultsList");
    var li = document.createElement("li");
	
	var date = new Date(todoItem.dueDate);	
	
    li.innerHTML =
        todoItem.who + " needs to " + todoItem.task + " by " + monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
    ul.appendChild(li);
}

// clear the previous search results by removing all the children of the "searchResultsList" ul element
function clearSearchResultsList() {
    var ul = document.getElementById("searchResultsList");
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
}

// This is just a nifty trick to show/hide the search results, so we don't show anything
// unless the user's just searched. Extra credit! :-)
function hideSearchResults() {
    var div = document.getElementById("searchResults");
    div.style.display = "none";
    clearSearchResultsList();
}

function showSearchResults() {
    var div = document.getElementById("searchResults");
    div.style.display = "block";
    document.forms[0].reset();
} 

//misc functions
function dateDiff(sdate1, sdate2) {
  var date1 = new Date(sdate1);
  var date2 = new Date(sdate2);
  var timeDiff = Math.abs(date2.getTime() - date1.getTime());
  var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

  if (date1 < date2){
     return("(OVERDUE by " + diffDays + " days)");
  } else {
	return("(" + diffDays + " days)");
  }
}

function checkInputText(value, msg) {
    if (value == null || value == "") {
        alert(msg);
        return true;
    }
    return false;
}
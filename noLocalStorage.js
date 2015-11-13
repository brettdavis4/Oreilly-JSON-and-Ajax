function testlocalStorage() {
	var alertdiv = document.getElementById("alert");
	alertdiv.innerHTML = 'Local Storage is not available on your browser.  Your items will not be saved when you close your browser.';
	
	var submitButton = document.getElementById("submit");
    submitButton.onclick = getFormData;

    // get the search term and call the click handler
    var searchButton = document.getElementById("searchButton");
    searchButton.onclick = searchTodos;
}


function getTodoItems() {
    var request = new XMLHttpRequest();
    request.open("GET", "todo.json");
    request.onreadystatechange = function() {
        if (this.readyState == this.DONE && this.status == 200) {
            if (this.responseText) { 
                parseTodoItems(this.responseText);
                addTodosToPage();
            }
            else {
                console.log("Error: Data is empty");
            }
        }
    };
    request.send();
}

function getFormData() {
    var task = document.getElementById("task").value;
    if (checkInputText(task, "Please enter a task")) return;

    var who = document.getElementById("who").value;
    if (checkInputText(who, "Please enter a person to do the task")) return;

    var date = document.getElementById("dueDate").value;
    if (checkInputText(date, "Please enter a due date")) return;
    
	var dateMillis = Date.parse(date);
    if (isNaN(dateMillis)) {
        throw new Error("Date format error. Please enter the date in the format MM/DD/YYYY, YYYY/MM/DD, or January 1, 2012");
    }
	
	try {
		var id = (new Date()).getTime();
		
		var todoItem = new Todo(id, task, who, date, CheckLatLong(latitude), CheckLatLong(longitude));
		todos.push(todoItem);
		addTodoToPage(todoItem);
		//saveTodoItem(todoItem);

		// hide search results
		hideSearchResults();
	}
	catch (ex){
		alert(ex.message);
		return;
	}
    
}

function saveTodoItem(todoItem) {
    sendArrayDataForSaving();
}

function updateDone(e) {
    var span = e.target;
    var id = span.parentElement.id;
    var item;
    for (var i = 0; i < todos.length; i++) {
        if (todos[i].id == id) {
            item = todos[i];
            break;
        }
    }
    if (item.done == false) {
        item.done = true;
        span.setAttribute("class", "done");
        span.innerHTML = "&nbsp;&#10004;&nbsp;";
    }
    else if (item.done == true) {
        item.done = false;
        span.setAttribute("class", "notDone");
        span.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    }
    //sendArrayDataForSaving();
}



function deleteItem(e) {
    sendArrayDataForSaving();

    // find and remove the item in the page
    var li = e.target.parentElement;
    var ul = document.getElementById("todoList");
    ul.removeChild(li);

    // hide search results
    hideSearchResults();
}

function sendArrayDataForSaving() {
    var todoJSON = JSON.stringify(todos);
    var request = new XMLHttpRequest();
    var URL = "save.php?data=" + encodeURI(todoJSON);
    request.open("GET", URL);
    request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    request.send();
}


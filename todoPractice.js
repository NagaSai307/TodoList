let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodobutton = document.getElementById("newTodoAdd");
const date = new Date();

//getting the stored items from local storage

function getLocal() {
    let getingLocal = localStorage.getItem("todoList");
    let parsingGettedList = JSON.parse(getingLocal);
    if (parsingGettedList === null) {
        return [];
    } else {
        return parsingGettedList;
    }
}
let todoList = getLocal();

let todoCount = todoList.length;



// adding the styles on clicking the checkbox

function onStrickeffLabel(checkboxId, labelId) {
    let checkStatus = document.getElementById(checkboxId);
    let strikeOff = document.getElementById(labelId);
    if (checkStatus.checked === true) {
        strikeOff.classList.add("checked");
    } else {
        strikeOff.classList.remove("checked");
    }
}



// removing the element onclicking the delete element and finding the index

function onRemoveElement(todoId) {
    let todoElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);
    let deleteIndex = todoList.findIndex(function(eachTodo){
        let DeleteId = "delete" + eachTodo.unique;
        if(DeleteId===todoId){
            return true;
        }else{
            return false
        }
    })
    todoList.splice(deleteIndex,1);
}




//creating and appending the todo elements


function CreateAppendMultiple(todo) {
    let checkboxId = "checkbox" + todo.unique;
    let labelId = "label" + todo.unique;
    let todoId = "delete" + todo.unique;

    let container = document.createElement("li");
    container.classList.add("todo-items-container", "d-flex", "flex-row");
    container.id = todoId;
    todoItemsContainer.appendChild(container);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.classList.add("checkbox-input");
    container.appendChild(inputElement);

    inputElement.onclick = function() {
        onStrickeffLabel(checkboxId, labelId);

    };

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    container.appendChild(labelContainer);

    let labelHeading = document.createElement("label");
    labelHeading.textContent = todo.text;
    labelHeading.htmlFor = checkboxId;
    labelHeading.id = labelId;
    labelHeading.classList.add("checkbox-label");
    labelContainer.appendChild(labelHeading);

    let labelDate = document.createElement("div")
    labelContainer.appendChild(labelDate);

    const presntDate = document.createElement("p") 
    presntDate.textContent = date;
    presntDate.classList.add("date");
    labelContainer.appendChild(presntDate);

    let deleteContainer = document.createElement("div");
    deleteContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-regular", "fa-trash-can", "fa-xl", "delete-icon");
    deleteContainer.appendChild(deleteIcon);
    deleteIcon.onclick = function() {
        onRemoveElement(todoId);
    };
}


// appending the save button

let saveButton = document.getElementById("saveButton");



// saving the elements to local storage
saveButton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
};


// looping on Each item

for (let eachItem of todoList) {
    CreateAppendMultiple(eachItem);
}


// onclick of add button


function onAddNewTodo() {
    let userElement = document.getElementById("todoUserInput");
    let userValue = userElement.value;
    if (userValue === "") {
        alert("Please Enter a value");
        return;
    }
    todoCount = todoCount + 1;
    let newTodo = {
        text: userValue,
        unique: todoCount,
    };
    todoList.push(newTodo);
    CreateAppendMultiple(newTodo);
    userElement.value = "";

}

// eventListner to the add button
addTodobutton.onclick = function() {
    onAddNewTodo();
};
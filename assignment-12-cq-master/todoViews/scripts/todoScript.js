const userInputNode = document.getElementById("userInput");
const submitTodoNode = document.getElementById("submitTodo");
const clearScreen = document.getElementById("clear");

const todoListNode = document.getElementById("todo-item");

// listen to click of submit button
submitTodoNode.addEventListener("click", function () {
  // const id = Math.random();
  const todoText = userInputNode.value;
  let completeTask = false;
  if (todoText === " " || todoText === null || todoText === undefined) {
    alert("Please Enter A task");
    return;
  }
}); 


function showTodoInUI(todo) {

    const todoSpan = document.createElement("span");
    todoSpan.innerText = todo.userInput;

    const todoTextNode = document.createElement("li");
    
    const img = document.createElement("img");
    img.src= todo.profilePic;
    img.width="50";
    img.height="50";
    img.style.marginLeft="250px";
    img.style.position="absolute"

    const checkTodo = document.createElement("input");
    checkTodo.type="checkbox";
    checkTodo.style.marginLeft="200px";

    checkTodo.addEventListener('change',()=>{
   
        todoSpan.style.textDecorationLine="line-through";
        checkTodo.disabled = true;
        changeCheck(todo.id,true);
      
    });

    const deleteTodo = document.createElement("button");
    deleteTodo.innerHTML='X';
    deleteTodo.addEventListener('click', ()=>{
      deleteToDoItem(todo.id); // server side removal
      todoTextNode.remove(); //client side removal
    });

    if(todo.completeTask)
    {
      todoSpan.style.textDecorationLine ="line-through";
      checkTodo.disabled = true;
    }
    todoTextNode.appendChild(todoSpan);
    todoTextNode.appendChild(img);
    todoTextNode.appendChild(checkTodo);
    todoTextNode.appendChild(deleteTodo);
    todoListNode.appendChild(todoTextNode);
    
}


fetch("/todo-data")
  .then(function (response) {
    if (response.status === 200) {
      return response.json();
    } else { 
      alert("something weird happened");
    }
  })
  .then(function (todos) {
    console.log(todos)
    todos.forEach(function (todo) {
      showTodoInUI(todo);
    });
  });


  function deleteToDoItem(id)
  {
    // console.log("Hello",id);
    fetch(`/todo/${id}`,
    {method: 'DELETE'})
    .then((req,res) =>{
      if(res.status === 200)
      {
        return res.json();
      }
      else
      {
        alert("Something went wrong");
      }
    })
    .catch((error) =>{
      console.error('Error:', error);
    })
  }

  function changeCheck(id, check)
  {
    fetch(`/check/${id}`,{
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({check}),
    })
    .then((req,res) =>{
      if(res.status === 200)
      {
        return res.json();
      }
      else
      {
        alert("Something went wrong");
      }
    })
    .catch((error) =>{
      console.error('Error:', error);
    })
  }
  window.addEventListener("beforeunload", function(event){
    document.getElementById("error").innerHTML = " ";
  })
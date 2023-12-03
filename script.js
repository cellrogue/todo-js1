const form = document.querySelector('.todoForm');
const todosContainer = document.querySelector('#todosContainer');

const todos = [];

// GET
const getTodos = async () => {
    try {
        const res = await fetch('https://js1-todo-api.vercel.app/api/todos?apikey=17c7b9cb-194d-4389-b970-bd276ac619dd')
        const data = await res.json()
        data.forEach(todo => todos.push(todo))
        todos.innerHTML += ''
        todos.forEach(todo => {
            todosContainer.insertAdjacentHTML('beforeend', `<li data-todoid="${todo._id}" id="todo${todo._id}">${todo.title}</li>`)
            document.querySelector(`#todo${todo._id}`).addEventListener('click', deleteTodo)
        })
    } catch(err) {
        console.error('ERROR -> ', err)
    }
    
}

// POST
const postTodo = async (todo) => {
    try {
        const res = await fetch('https://js1-todo-api.vercel.app/api/todos?apikey=17c7b9cb-194d-4389-b970-bd276ac619dd', {
            method: 'POST', 
            headers: {
                'Content-type': 'application/json'
            }, 
            body: JSON.stringify(todo)
        })
        const data = await res.json()
        todosContainer.insertAdjacentHTML('beforeend', `<li data-todoid="${data._id}" id="todo${data._id}">${data.title}</li>`)
    } catch (error) {
        console.error('ERROR => ', error)
    }
}

// DELETE
const deleteTodo = async (e) => {
    try {
        console.log("Delete todo")
        const res = await fetch(`https://js1-todo-api.vercel.app/api/todos/${e.target.dataset.todoid}?apikey=17c7b9cb-194d-4389-b970-bd276ac619dd`, {
            method: 'DELETE'
        })

        console.log(res)

        const data = await res.json()
        console.log(e)
        e.target.remove()
    } catch (error) {
        console.error('ERROR => ', error)
    }
}

// Validering av todo
document.addEventListener("submit", (e) => {
    e.preventDefault()
    const todoTitle = document.getElementById('todoTitle').value;
    if(todoTitle.trim() === "") {
        alert("Ingen todo skriven")
        return;
    }
    const todo = {
        title: document.getElementById('todoTitle').value
    }
    document.getElementById('todoTitle').value = ""
    postTodo(todo)
})

getTodos()

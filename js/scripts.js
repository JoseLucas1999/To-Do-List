//seleção de elementos
const todoForm = document.querySelector("#todo-form")
const todoInput = document.querySelector("#todo-input")
const todoList = document.querySelector("#todo-list")
const editForm = document.querySelector("#edit-form")
const editInput = document.querySelector("#edit-input")
const cancelEditBtn = document.querySelector("#cancel-edit-btn")

// 1) ao adicionar tarefa evendo para todoForm é acionado
// 2) chama função saveTodo (adiciona tarefa)
// 3) evendo que observa qual btn foi clickado
// 4) executar ação de acordo com o btn (done, remove, edit)
// 5) btn done adicione class done
// 6) btn remove remove todo criado dinamicamnete
// 7) edit chama função de troca de form (add to edit)

// funções

//salvar tarefa
const saveTodo = (text) => {
    // criamos os elementos de "todo" de forma dinamica
    //criar elemento div
    const todo = document.createElement("div")
    //adicionar uma class
    todo.classList.add("todo") //essa class já existe

    //criar elemento h3 title
    const todoTitle = document.createElement("h3")
    //insere o texto que recebemos como parametro
    todoTitle.innerText = text
    //adiconar title ao todo
    todo.appendChild(todoTitle)

    //criar btn done
    const donebtn = document.createElement("button")
    donebtn.classList.add("finish-todo")
    donebtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    todo.appendChild(donebtn)

    //criar btn edit
    const editbtn = document.createElement("button")
    editbtn.classList.add("edit-todo")
    editbtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
    todo.appendChild(editbtn)

    //criar btn delete
    const deletebtn = document.createElement("button")
    deletebtn.classList.add("delete-todo")
    deletebtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    todo.appendChild(deletebtn)

    //colocar todo na list geral todolist
    todoList.appendChild(todo)

    //limpar input após submit e focar
    todoInput.value = "";
    todoInput.focus();
}

// função de trocar de form (add to edit)
const toggleForm = () => {
    //troca a class hide para form edit e add
    //o form edit já vem com hide do html
    editForm.classList.toggle("hide")
    todoForm.classList.toggle("hide")
    todoList.classList.toggle("hide")
}


// eventos

//observa quando form de add tarefa for acionado
todoForm.addEventListener("submit", (e) => {
    //form não é enviado
    e.preventDefault();

    const inputValue = todoInput.value

    if(inputValue){
        //função que salva todos
        saveTodo(inputValue)
    }
})

//identificar quando btn(click) for adionado
document.addEventListener("click", (e) => {

    //elemento clickado
    const targetEl = e.target
    //elemento pai (mais perto = todo)
    const parentEl = targetEl.closest("div")

    //verificr a class do elemento clickado
    if(targetEl.classList.contains("finish-todo")){
        //adiciona class done (que deixar azule e riscado) em pai (todo)
        //toogle permite retirar a class quando clicado de novo
        parentEl.classList.toggle("done") 
    }else if(targetEl.classList.contains("delete-todo")){
        console.log("deletar")
        //remove o div pai (todo)
        parentEl.remove()
    }else if(targetEl.classList.contains("edit-todo")){
        // precisamos trocar de formulario
        // chamamos o evento de troca
        toggleForm()
    }
})

//evendo para cancelar edição da tarefa
cancelEditBtn.addEventListener("click", (e) => {
    //não deixa form ser enviado (submit)
    e.preventDefault()

    //apenas usamos o toggle para mudar de form
    toggleForm()

})

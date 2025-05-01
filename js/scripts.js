//seleção de elementos
const todoForm = document.querySelector("#todo-form")
const todoInput = document.querySelector("#todo-input")
const todoList = document.querySelector("#todo-list")
const editForm = document.querySelector("#edit-form")
const editInput = document.querySelector("#edit-input")
const cancelEditBtn = document.querySelector("#cancel-edit-btn")
let oldInputValue;

// 1) ao adicionar tarefa evendo para todoForm é acionado
// 2) chama função saveTodo (adiciona tarefa)
// 3) evendo que observa qual btn foi clickado
// 4) executar ação de acordo com o btn (done, remove, edit)
// 5) btn done adicione class done
// 6) btn remove remove todo criado dinamicamnete
// 7) edit chama função de troca de form (add to edit)
// 8) cancelEditBtn chama toggle e troca (edit to add)

//EDITAR


// 9) salvamos  o h3 do parentEl em todoTile
// 10) no if(classList.contains) salvamos todoTitle em editInput e oldinputVlue
// 11) criamos um evendo de click em editForm
// 12) salvamos valor de editInput em editInputValue
// 13) chamamos a função updateTodo


 
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

//update tarefa
//text recebera editInputValue 
const update = (text) => {
    //pegamos todo o todolist
    const todos = document.querySelectorAll(".todo")
    //percorre valores
    //verifica se valor de todoTile = oldInputValue
    
    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3");

        if(todoTitle.innerText === oldInputValue){
            //adiciona em todoTile o valor recebido por parametro
            todoTitle.innerText = text
        }
    })
}

// eventos

//observa quando form de add tarefa for acionado
todoForm.addEventListener("submit", (e) => {
    //form não é enviado
    e.preventDefault();
    const inputValue = todoInput.value;

    if(inputValue){
        //função que salva todos
        saveTodo(inputValue)
    }
})

//identificar quando btn(click) for acionado
document.addEventListener("click", (e) => {

    //elemento clickado
    const targetEl = e.target
    //elemento pai (mais perto = todo)
    const parentEl = targetEl.closest("div")
    //titulo da tarefa
    let todoTitle; //deixamos aqui pq let possui escopo de bloco

    //verificar se element pai existe e possui um h3
    if(parentEl && parentEl.querySelector("h3")){
        //adicionamos o valor do h3 no todoTitle
        todoTitle = parentEl.querySelector("h3").innerText;
    }



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
        //salvamos todoTitle em editInput
        editInput.value = todoTitle //apenas objeto possuem value
        oldInputValue = todoTitle
    }
})

//evendo para cancelar edição da tarefa
cancelEditBtn.addEventListener("click", (e) => {
    //não deixa form ser enviado (submit)
    e.preventDefault()

    //apenas usamos o toggle para mudar de form
    toggleForm()

})

//ao enviar editForm adicionamos um evendo de submit
editForm.addEventListener("submit", (e) => {
    e.preventDefault()

    //em editInput temos a tarefa clicada 
    const editInputValue = editInput.value

    //verifica se tem valor em editInputValue
    if(editInputValue){
        update(editInputValue)
    }

    toggleForm()
    
})

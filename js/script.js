class myTodo {
    constructor({
                    formSelector = '.todo-control',
                    todoListSelector = '.todo-list',
                    todoCompletedSelector = '.todo-completed',
                    formInputSelector = '.header-input',
                    todoContainerSelector = '.todo-container'
                }) {
        try {
            this.form = document.querySelector(formSelector);
            this.todoList = document.querySelector(todoListSelector);
            this.todoCompleted = document.querySelector(todoCompletedSelector);
            this.formInput = this.form.querySelector(formInputSelector);
            this.todoContainer = document.querySelector(todoContainerSelector);
            this.toDos = [];
            this.init()
        } catch (error){
            console.warn(new Error(error))
        }
    }
    init(){
        this.getFromStorage();
        this.render();
        this.addListeners();
    }
    addListeners(){
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            if(this.formInput.value.trim() !== ''){
                const newTodo = {
                    text: this.formInput.value,
                    completed: false
                }
                this.toDos.push(newTodo);
                this.setToStorage();
                this.render();
            }
            this.formInput.value = '';
        });
        this.todoContainer.addEventListener('click', (e) => {
            e.preventDefault();
            const todoItem = e.target.closest('.todo-item');
            const id = +todoItem.dataset.id;
            if(e.target.closest('.todo-remove')){
                this.toDos.splice(id, 1);
                this.setToStorage();
                this.render();
            } else if(e.target.closest('.todo-complete')){
                this.toDos[id].completed = !this.toDos[id].completed;
                this.setToStorage();
                this.render();
            }
        })
    }
    getElement(todo = {}, index){
        let li = document.createElement('li');
        li.classList.add('todo-item');
        li.dataset.id = index;
        li.insertAdjacentHTML('beforeend', `<span class="text-todo">${todo.text}</span>`);
        li.insertAdjacentHTML('beforeend', `<div class="todo-buttons">
                                                            <button class="todo-remove"></button>
                                                            <button class="todo-complete"></button>
                                                        </div>`);
        return li;
    }
    setToStorage(){
        localStorage.setItem('todo22', JSON.stringify(this.toDos))
    }
    getFromStorage(){
        const todos = JSON.parse(localStorage.getItem('todo22'));
        if(todos){
            this.toDos = todos;
        } else {
            this.toDos = [];
        }

    }
    render(){
        this.todoCompleted.innerHTML = '';
        this.todoList.innerHTML = '';
        this.toDos.forEach((item, index) => {
            let elem = this.getElement(item, index);
            if(item.completed){
                this.todoCompleted.append(elem);
            } else {
                this.todoList.append(elem);
            }
        })
    }
}
const todo = new myTodo({});
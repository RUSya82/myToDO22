

class myTodo {
    constructor({
                    formSelector = '.todo-control',
                    todoListSelector = '.todo-list',
                    todoCompletedSelector = '.todo-completed',
                    formInputSelector = '.header-input',
                }) {
        try {
            this.form = document.querySelector(formSelector);
            this.todoList = document.querySelector(todoListSelector);
            this.todoCompleted = document.querySelector(todoCompletedSelector);
            this.formInput = this.form.querySelector(formInputSelector);
            this.toDos = [];
            this.init()
        } catch (error){
            console.warn(new Error(error))
        }
    }
    init(){
        this.getFromStorage();
    }
    setToStorage(){
        localStorage.setItem('todo22', JSON.stringify(this.toDos))
    }
    getFromStorage(){
        const todos = JSON.parse(localStorage.getItem('todo22'));
        this.toDos = todos.length > 0 ? todos : [];
    }
    render(){

    }

}
const todo = new myTodo({});
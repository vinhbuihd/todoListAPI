function getTodosAPI() {
    return axios.get('/todos')
    // return axios({
    //     method: 'get',
    //     url: `/todos`
    // })
}


let todos = []

async function getTodos() {
    try {
        const res = await getTodosAPI()
        todos = res.data
        
        renderUI(todos);
    } catch (error) {
        console.log(error);
    }
}

const todo_list = document.querySelector(".todo-list");

// Render UI - Hiển thị danh sách todo ra ngoài giao diện
function renderUI(arr) {
    todo_list.innerHTML = "";

    // Kiểm tra mảng rỗng
    if (arr.length == 0) {
        todo_list.innerHTML = "Không có công việc nào trong danh sách";
        return;
    }

    // Trường hợp có công việc
    for (let i = 0; i < arr.length; i++) {
        const t = arr[i];
        todo_list.innerHTML += `
            <div class="todo-item ${t.status ? "active-todo" : ""}">
                <div class="todo-item-title">
                    <input type="checkbox" ${t.status ? "checked" : ""}/>
                    <p>${t.title}</p>
                </div>
                <div class="option">
                    <button class="btn btn-update">
                        <img src="./img/pencil.svg" alt="icon" />
                    </button>
                    <button class="btn btn-delete" onclick=deleteTodo(${t.id})>
                        <img src="./img/remove.svg" alt="icon" />
                    </button>
                </div>
            </div>
        `;
    }
}


window.onload = () => {
    getTodos();
};

// Random ID

function createId() {
    return Math.floor(Math.random() * 10000)
}

// API thêm công việc

function createTodoAPI(title) {
    return axios.post('/todos', {
        id: createId(),
        title: title,
        status: false
    })
}

// Hàm xử lý thêm công việc

async function createTodo(title) {
    try {
        const res = await createTodoAPI(title)
        todos.push(res.data)

        renderUI(todos);
    } catch (error) {
        console.log(error);
    }
}

const todo_input = document.getElementById("todo-input");
const btn_add = document.getElementById("btn-add");

// Thêm công việc
btn_add.addEventListener("click", function () {
    let todoTitle = todo_input.value; // Lấy ra nội dung trong ô input
    if(todoTitle == "") {
        alert("Tiêu đề không được để trống")
        return
    }

    createTodo(todoTitle)
    todo_input.value = ""
});

// Xóa cong việc

// API xóa

function deleteTodoAPI(id) {
    // return axios({
    //     method: 'delete',
    //     url: `/todos/${id}`
    // })

    return axios.delete(`/todos/${id}`)
    
}

// Hàm xử lý xóa công việc

async function deleteTodo(id) {
    try {
        await deleteTodoAPI(id)

        todos.forEach((todo, index) => {
            if (todo.id == id) {
                todos.splice(index, 1)
            }
        })

        renderUI(todos)         
    } catch (error) {
        console.log(error);
    }
}
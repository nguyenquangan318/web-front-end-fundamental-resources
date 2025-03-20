let todoList = [
  {
    id: 1,
    task: "Hit the gym",
    completed: false,
  },
  {
    id: 2,
    task: "Pay bills",
    completed: true,
  },
  {
    id: 3,
    task: "Meet george",
    completed: false,
  },
];
let editIndex = -1;
function renderTask() {
  let list = document.getElementById("myUL");
  list.innerHTML = "";
  todoList.forEach((item) => {
    if (item.completed === true) {
      list.innerHTML += `<li class="checked">${item.task}
        <span class="edit" onclick="startEditTask(${item.id})">Edit</span>
        <span class="close" onclick="deleteTask(${item.id})">X</span>
    </li>`;
    } else {
      list.innerHTML += `<li>${item.task}
        <span class="edit" onclick="startEditTask(${item.id})">Edit</span>
        <span class="close" onclick="deleteTask(${item.id})">X</span>
    </li>`;
    }
  });
}

function addOrEditTask() {
  //B1: Lựa chọn ô input
  let input = document.getElementById("myInput");
  let addButton = document.getElementsByClassName("addBtn")[0];
  //B2: Tạo ra một đối tượng mới có dạng
  //   {
  //     id: id của phần tử cuối cùng + 1,
  //     task: giá trị của ô input,
  //     completed: false
  //   }
  if (editIndex === -1) {
    let newTask = {
      id: todoList.length !== 0 ? todoList[todoList.length - 1].id + 1 : 1,
      task: input.value,
      completed: false,
    };
    //B3: thêm đối tượng vừa tạo vào mảng dữ liệu
    todoList.push(newTask);
  } else {
    todoList[editIndex].task = input.value;
    editIndex = -1;
    addButton.innerText = "Add";
  }
  //B4: Gọi hàm renderTask()
  renderTask();
  //B5: Xoá trắng ô input
  input.value = "";
}

function deleteTask(id) {
  //B1: Tìm đến task có id trùng với giá trị đối số
  //B2: Tiến hành xoá phần tử đó
  todoList = todoList.filter((item) => item.id !== id);
  //B3: Gọi hàm renderTask()
  renderTask();
}

function startEditTask(id) {
  console.log(`bắt đầu edit task có id là ${id}`);
  //B1: Tìm ra task có id trùng với giá trị đối số
  editIndex = todoList.findIndex((item) => item.id === id);
  //B2: hiển thị nội dung ban đầu trước khi sửa lên ô input
  let input = document.getElementById("myInput");
  input.value = todoList[editIndex].task;
  //B3: Thay đổi nội dung nút add thành nút edit
  let addButton = document.getElementsByClassName("addBtn")[0];
  addButton.innerText = "Edit";
}

renderTask();

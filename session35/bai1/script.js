// let tasks = [
//   {
//     id: 1,
//     task: "Công việc 1",
//   },
//   {
//     id: 2,
//     task: "Công việc 2",
//   },
//   {
//     id: 3,
//     task: "Công việc 3",
//   },
// ];
// //Lư dữ liệu vào local storage
// localStorage.setItem("tasks", JSON.stringify(tasks));

//Lấy dữ liệu từ local storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
//Chức năng đọc
//Hàm hiển thị toàn bộ dữ liệu ra giao diện
function renderTasks() {
  //B1: Truy cập phần tử cha chứa các task
  let container = document.getElementById("tasks-container");
  //B2: Lặp qua toàn bộ các task có trong mảng
  container.innerHTML = "";
  tasks.forEach((item) => {
    //B3: Với mỗi task thì thêm một phần tử vào phần tử cha
    container.innerHTML += `<div class="task-item">
                            <span>${item.task}</span>
                            <button onclick = "updateTask(${item.id})">Sửa</button>
                            <button onclick = "deleteTask(${item.id})">Xoá</button>
                            </div>`;
  });
}

//Chức năng thêm
//Hàm thêm task mới vào dữ liệu
//B1: Gắn sự kiện cho nút thêm mới
function addTask(e) {
  e.preventDefault();
  //B2: Lấy dữ liệu từ ô input
  let taskInput = document.getElementById("task-input");
  let taskValue = taskInput.value;
  //B3: Tạo ra một đối tượng mới
  let newTask = {
    id: tasks[tasks.length - 1].id + 1,
    task: taskValue,
  };
  //B4: Thêm đối tượng vừa tạo vào mảng dữ liệu
  tasks.push(newTask);
  //B5: Gọi hàm renderTasks()
  renderTasks();
  //B6: Lưu lại vào localstorage
  localStorage.setItem(`tasks`, JSON.stringify(tasks));
}

//Chức năng sửa
//B1: Gắn sự kiện cho nút sửa
//Hàm sửa dữ liệu
function updateTask(id) {
  //B2: Tìm ra phần tử muốn cập nhật theo id
  let taskIndex = tasks.findIndex((item) => item.id === id);
  //B3: Sử dụng prompt để lấy giá trị từ phía người dùng
  //B3.1: Phải có giá trị ban đầu trước khi sửa trong ô input
  let newTask = prompt("Chỉnh sửa công việc:", tasks[taskIndex].task);
  //B4: Cập nhật phần tử theo giá trị của prompt
  tasks[taskIndex] = {
    id,
    task: newTask,
  };
  //B5: Gọi hàm renderTasks()
  renderTasks();
  //B6: Lưu lại vào localstorage
  localStorage.setItem(`tasks`, JSON.stringify(tasks));
}

//Chức năng xoá
//B1: Gắn sự kiện cho nút xoá
//Hàm xoá dữ liệu
function deleteTask(id) {
  //B2: Tìm ra phần tử muốn xoá theo id
  let taskIndex = tasks.findIndex((item) => item.id === id);
  //B3: Sử dụng confirm để xác nhận xoá phần tử
  if (confirm("Xác nhận xoá phần tử")) {
    //B4: Xoá phần tử đã tìm thấy
    tasks.splice(taskIndex, 1);
  }
  //B5: Gọi hàm renderTasks()
  renderTasks();
  //B6: Lưu lại vào localstorage
  localStorage.setItem(`tasks`, JSON.stringify(tasks));
}
renderTasks();

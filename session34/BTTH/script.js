// let todoList = [
//   {
//     id: 1,
//     task: "Hit the gym",
//     completed: false,
//   },
//   {
//     id: 2,
//     task: "Pay bills",
//     completed: true,
//   },
//   {
//     id: 3,
//     task: "Meet george",
//     completed: false,
//   },
//   {
//     id: 4,
//     task: "Hit the gym",
//     completed: false,
//   },
//   {
//     id: 5,
//     task: "Pay bills",
//     completed: true,
//   },
//   {
//     id: 6,
//     task: "Meet george",
//     completed: false,
//   },
//   {
//     id: 7,
//     task: "Hit the gym",
//     completed: false,
//   },
//   {
//     id: 8,
//     task: "Pay bills",
//     completed: true,
//   },
//   {
//     id: 9,
//     task: "Meet george",
//     completed: false,
//   },
//   {
//     id: 10,
//     task: "Hit the gym",
//     completed: false,
//   },
//   {
//     id: 11,
//     task: "Pay bills",
//     completed: true,
//   },
//   {
//     id: 12,
//     task: "Meet george",
//     completed: false,
//   },
// ];
let todoList = JSON.parse(localStorage.getItem("todoList")) || [];
let editIndex = -1;
let currentPage = 1;
let taskPerPage = 5;
let totalPage = Math.ceil(todoList.length / taskPerPage);

function renderTask() {
  let list = document.getElementById("myUL");
  let startIndex = (currentPage - 1) * taskPerPage;
  let endIndex = currentPage * taskPerPage;
  if (endIndex > todoList.length) {
    endIndex = todoList.length;
  }
  list.innerHTML = "";
  for (let i = startIndex; i < endIndex; i++) {
    if (todoList[i].completed === true) {
      list.innerHTML += `<li class="checked">${todoList[i].task}
        <span class="edit" onclick="startEditTask(${todoList[i].id})">Edit</span>
        <span class="close" onclick="deleteTask(${todoList[i].id})">X</span>
    </li>`;
    } else {
      list.innerHTML += `<li>${todoList[i].task}
        <span class="edit" onclick="startEditTask(${todoList[i].id})">Edit</span>
        <span class="close" onclick="deleteTask(${todoList[i].id})">X</span>
    </li>`;
    }
  }
  // todoList.forEach((item) => {
  //   if (item.completed === true) {
  //     list.innerHTML += `<li class="checked">${item.task}
  //       <span class="edit" onclick="startEditTask(${item.id})">Edit</span>
  //       <span class="close" onclick="deleteTask(${item.id})">X</span>
  //   </li>`;
  //   } else {
  //     list.innerHTML += `<li>${item.task}
  //       <span class="edit" onclick="startEditTask(${item.id})">Edit</span>
  //       <span class="close" onclick="deleteTask(${item.id})">X</span>
  //   </li>`;
  //   }
  // });
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
  //B6: Lưu lại vào local storage
  localStorage.setItem("todoList", JSON.stringify(todoList));
}

function deleteTask(id) {
  //B1: Tìm đến task có id trùng với giá trị đối số
  //B2: Tiến hành xoá phần tử đó
  todoList = todoList.filter((item) => item.id !== id);
  //B3: Gọi hàm renderTask()
  renderTask();
  localStorage.setItem("todoList", JSON.stringify(todoList));
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

//render ra các số trang
function renderPagination() {
  //B1: Lấy phần tử cha chứa các số trang
  let paginateContainer = document.getElementById("paginate-container");
  //B2: Sử dụng vòng lặp từ 1 đến totalPage
  paginateContainer.innerHTML = "";
  for (let i = 1; i <= totalPage; i++) {
    //Thêm trang tương ứng vào phần tử cha
    if (i === currentPage) {
      paginateContainer.innerHTML += `<span class="paginate-button current-page" onclick="changePage(${i})">${i}</span>`;
    } else {
      paginateContainer.innerHTML += `<span class="paginate-button" onclick="changePage(${i})">${i}</span>`;
    }
  }
  console.log(paginateContainer);
}

//Thay đổi trang
function changePage(page) {
  //B1:đặt lại biến currentPage thành trang được click
  currentPage = page;
  //B2: Gọi hàm renderTask()
  renderTask();
  //B3:Gọi hàm renderPagination()
  renderPagination();
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
  } else {
    return;
  }
  //B2: Gọi hàm renderTask()
  renderTask();
  //B3:Gọi hàm renderPagination()
  renderPagination();
}

function nextPage() {
  if (currentPage < totalPage) {
    currentPage++;
  } else {
    return;
  }
  //B2: Gọi hàm renderTask()
  renderTask();
  //B3:Gọi hàm renderPagination()
  renderPagination();
}

renderTask();
renderPagination();

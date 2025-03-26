// let webs = [
//   {
//     id: 1,
//     webName: "GOOGLE",
//     webUrl: "https://www.google.com/",
//   },
//   {
//     id: 2,
//     webName: "YOUTUBE",
//     webUrl: "https://www.youtube.com/",
//   },
//   {
//     id: 3,
//     webName: "GITHUB",
//     webUrl: "https://github.com/",
//   },
// ];

// localStorage.setItem("webs", JSON.stringify(webs));

let webs = JSON.parse(localStorage.getItem("webs")) || [];
let deleteId;
//Chức năng hiển thị
//Hàm hiển thị toàn bộ dữ liệu
function renderWebs() {
  //B1: Truy cập phần tử cha chứa các trang web
  let container = document.getElementById("webs-container");
  container.innerHTML = "";
  //B2: Lặp qua mảng dữ liệu
  webs.forEach((item) => {
    //B2.1: Với mỗi phần tử thì thêm một phần tử con vào phần tử cha
    container.innerHTML += `<div class="col-5 border border-1 d-flex justify-content-between m-3">
                ${item.webName}
                <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal" onclick="startDelete(${item.id})">Xoá</button>
                        </div>
    `;
  });
}

//Chức năng thêm mới
//B1: Gắn sự kiện cho nút thêm mới
//Hàm thêm mới dữ liệu
function addWeb(e) {
  e.preventDefault();
  //B2: Lấy giá trị từ các ô input
  let newWebName = document.getElementById("web-name").value;
  let newWebUrl = document.getElementById("web-url").value;
  //B3: Tạo đối tượng mới từ các giá trị đó
  let newWeb = {
    id: webs[webs.length - 1].id + 1,
    webName: newWebName,
    webUrl: newWebUrl,
  };
  //B4: Thêm đối tượng mới vào mảng
  webs.push(newWeb);
  //B5: Xoá trắng các ô input sau khi thêm mới thành công
  document.getElementById("web-name").value = "";
  document.getElementById("web-url").value = "";
  //B5: Gọi lại hàm renderWebs
  renderWebs();
  //B6: Lưu lại vào localstorage
  localStorage.setItem("webs", JSON.stringify(webs));
}

//Gắn sự kiện bắt đầu xoá cho nút xoá của từng phần tửs
function startDelete(id) {
  deleteId = id;
}

//Chức năng xoá
//B1: Gắn sự kiện cho nút xoá trên modal
//Hàm xoá dữ liệu
function deleteWeb() {
  //B2: Tìm phần tử có id === deleteId
  let deleteIndex = webs.findIndex((item) => item.id === deleteId);
  //B3: Tiến hành xoá phần tử đó
  webs.splice(deleteIndex, 1);
  //B4: Gọi lại hàm renderWebs
  renderWebs();
  //B6: Lưu lại vào localstorage
  localStorage.setItem("webs", JSON.stringify(webs));
}
renderWebs();

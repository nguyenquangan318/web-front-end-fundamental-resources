// let staffs = [
//   {
//     staffName: "Nguyễn Văn A",
//     position: "Developer",
//   },
//   {
//     staffName: "Vũ Văn E",
//     position: "DevOps",
//   },
//   {
//     staffName: "Hoàng Thị F",
//     position: "HR Manager",
//   },
// ];

// localStorage.setItem("staffs", JSON.stringify(staffs));
let staffs = JSON.parse(localStorage.getItem("staffs")) || [];
let staffsPerPage = 3;
let totalPage = Math.ceil(staffs.length / staffsPerPage);
let currentPage = 1;
//Chức năng đọc
//Hàm hiển thị danh sách nhân viên
function renderStaffs() {
  let container = document.getElementById("staff-container");
  container.innerHTML = "";
  let startIndex = (currentPage - 1) * staffsPerPage;
  let endIndex = currentPage * staffsPerPage;
  if (endIndex > staffs.length) {
    endIndex = staffs.length;
  }
  staffs.forEach((staff, index) => {
    if (index >= startIndex && index < endIndex) {
      container.innerHTML += `<tr>
            <td class="border">${index + 1}</td>
            <td class="border">${staff.staffName}</td>
            <td class="border">${staff.position}</td>
        </tr>
    `;
    }
  });
  renderPages();
}

//Chức năng thêm
//Hàm thêm mới nhân viên
function addStaffs(e) {
  e.preventDefault();
  let newStaffName = document.getElementById("name-input").value;
  let newStaffPostion = document.getElementById("position-input").value;
  staffs.push({
    staffName: newStaffName,
    position: newStaffPostion,
  });
  localStorage.setItem("staffs", JSON.stringify(staffs));
  renderStaffs();
  document.getElementById("name-input").value = "";
  document.getElementById("position-input").value = "";
}

//Hiển thị phần phân trang
//Hàm hiển thị các trang
function renderPages() {
  let pageContainer = document.getElementById("page-container");
  pageContainer.innerHTML = "";
  for (let i = 1; i <= totalPage; i++) {
    if (i === currentPage) {
      pageContainer.innerHTML += `<span class="mx-1 active-page" onclick="changePage(${i})">${i}</span>`;
    } else {
      pageContainer.innerHTML += `<span class="mx-1" onclick="changePage(${i})">${i}</span>`;
    }
  }
  if (currentPage === 1) {
    document.getElementById("prev-btn").classList.add("disable");
  } else {
    document.getElementById("prev-btn").classList.remove("disable");
  }
  if (currentPage === totalPage) {
    document.getElementById("next-btn").classList.add("disable");
  } else {
    document.getElementById("next-btn").classList.remove("disable");
  }
}

//Hàm chuyển trang
function changePage(page) {
  currentPage = page;
  renderStaffs();
}

//Hàm chuyển sang trang trước
function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    renderStaffs();
  }
}

//Hàm chuyển sang trang sau
function nextPage() {
    if (currentPage < totalPage) {
        currentPage++;
        renderStaffs();
      }
}

renderStaffs();

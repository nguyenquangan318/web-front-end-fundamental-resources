const products = [
  {
    id: 1,
    name: "Laptop Dell XPS 15",
    price: 35990000,
    image:
      "https://th.bing.com/th/id/R.dd66a48254aca2d1e37b8887993a100c?rik=Ileg6QdLFs2iTA&pid=ImgRaw&r=0",
    description:
      "Laptop cao cấp với màn hình 15 inch, CPU Intel Core i7 và RAM 16GB.",
  },
  {
    id: 3,
    name: "Samsung Galaxy S24 Ultra",
    price: 2899000,
    image:
      "https://th.bing.com/th/id/OIP.n5ZE0e4C910Ed2cLhNKjPAHaEK?rs=1&pid=ImgDetMain",
    description:
      "Điện thoại Android mạnh mẽ với bút S-Pen và camera siêu zoom.",
  },
  {
    id: 5,
    name: "Apple Watch Series 9",
    price: 119900,
    image:
      "https://bgr.com/wp-content/uploads/2023/09/Apple-Watch-Series-9.jpg?quality=82&strip=all",
    description:
      "Đồng hồ thông minh cao cấp với tính năng đo nhịp tim và hỗ trợ thể thao.",
  },
  {
    id: 6,
    name: "Loa JBL Charge 5",
    price: 39900,
    image:
      "https://th.bing.com/th/id/OIP.kNp66Lw41hQJBWsxrddSZQHaHa?rs=1&pid=ImgDetMain",
    description: "Loa Bluetooth chống nước với âm bass mạnh mẽ và pin 20 giờ.",
  },
];

function renderProducts(renderProducts = products) {
  //B1: Truy cập phần tử cha chứa các sản phẩm
  let productsContainer = document.getElementById("products-container");
  //B2: Sử dụng vòng lặp để hiển thị toàn bộ sản phẩm trong dữ liệu
  productsContainer.innerHTML = "";
  renderProducts.forEach((item) => {
    productsContainer.innerHTML += `<div class="col">
                      <div class="card">
                          <img src="${item.image}"
                              class="card-img-top" alt="Laptop Dell XPS 15">
                          <div class="card-body">
                              <h5 class="card-title">${item.name}</h5>
                              <p class="card-text">${item.description}</p>
                              <p><strong>${item.price} VND</strong></p>
                              <button class="btn btn-primary">Buy</button>
                          </div>
                      </div>
                </div>`;
  });
}

function searchProducts() {
  //B1: Truy cập phần tử input và lấy giá trị
  let input = document.getElementById("input").value;
  //B2: Gắn sự kiện cho nút search ở html
  //B3: Tìm kiếm toàn bộ sản phẩm theo giá trị ô input
  let searchProducts = products.filter((item) => item.name.includes(input));
  //B4: Sử dụng hàm render để hiển thị lại các sản phẩm được tìm thấy
  renderProducts(searchProducts);
}
renderProducts();

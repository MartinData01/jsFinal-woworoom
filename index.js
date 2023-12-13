import axios from 'axios';
import { sweetalert2, formattedNumber } from './main.js';

const api_path = "macshop";
const baseUrl = "https://livejs-api.hexschool.io/api/livejs/v1/customer";


// NT$${formattedNumber(item.origin_price)}

// 取得商品列表資料
let productList;
function getProductList(){
  axios.get(`${baseUrl}/${api_path}/products`).then(function(res){
    productList = res.data.products;
    renderProductList();
  }).catch(function(err){
    sweetalert2("取得商品列表失敗");
    // console.log(err);
  })
}
// 渲染畫面 - 產品列表
const productWrap = document.querySelector(".productWrap");
function renderProductList(){
  let str = "";
  productList.forEach(function(item,index){
    str+=`<li class="productCard">
    <h4 class="productType">${item.category}</h4>
    <img
      src="${item.images}"
      alt="">
    <a href="#" class="addCardBtn" data-productId="${item.id}">加入購物車</a>
    <h3>${item.title}</h3>
    <del class="originPrice">NT$${item.origin_price}</del>
    <p class="nowPrice">NT$${item.price}</p>
  </li>`
  });
  productWrap.innerHTML = str;
}

// 取得購物車資料
let shoppingCartList;
function getShopCartList(){
  axios.get(`${baseUrl}/${api_path}/carts`).then(function(res){
    shoppingCartList = res.data.carts;
    totalCart.textContent = res.data.finalTotal;
    renderShoppingCart();
  }).catch(function(err){
    sweetalert2("取得購物車失敗");
    // console.log(err);
  });
};
// 渲染畫面 - 購物車列表
const shoppingCartTable = document.querySelector(".shoppingCart-tbody");
const totalCart = document.querySelector(".total");
function renderShoppingCart(){
  let str = "";
  if(shoppingCartList.length==0){
    str=`<tr><td>購物車沒有商品！</td></tr>`;
  }
  shoppingCartList.forEach(function(item){
    str+= `<tr>
    <td>
      <div class="cardItem-title">
        <img src="${item.product.images}" alt="">
        <p>${item.product.title}</p>
      </div>
    </td>
    <td>NT$${item.product.price}</td>
    <td>${item.quantity}</td>
    <td>NT$${item.product.price*item.quantity}</td>
    <td class="discardBtn">
      <a href="#" class="material-icons" data-cartId="${item.id}">
        clear
      </a>
    </td>
  </tr>`
  });
  shoppingCartTable.innerHTML = str;
};

// 加入購物車 post
productWrap.addEventListener("click",function(e){
  const addCartList = e.target.getAttribute("class")
  if(addCartList != "addCardBtn"){
    return;
  }
  e.preventDefault("click");
  sweetalert2("加入購物車成功！！")
  const productId = e.target.getAttribute("data-productId");
  addCartItem(productId);
});
function addCartItem(id){
  axios.post(`${baseUrl}/${api_path}/carts`,{
    "data": {
      "productId": id,
      "quantity": 1
    }
  }).then(function(res){
    shoppingCartList = res.data.carts;
    totalCart.textContent = res.data.finalTotal;
    renderShoppingCart();
  }).catch(function(err){
    sweetalert2("加入購物車失敗");
    // console.log(err);
  });
};

// 刪除全部購物車 delete
const deleteAllCartBtn = document.querySelector(".discardAllBtn");
deleteAllCartBtn.addEventListener("click",function(e){
  e.preventDefault("click");
  if(shoppingCartList.length==0){
    deleteAllCartBtn.setAttribute("disabled","disabled");
    sweetalert2("購物車沒有商品！");
    return;
  }
  deleteAllCart();
});

function deleteAllCart(){
  axios.delete(`${baseUrl}/${api_path}/carts`).then(function(res){
    shoppingCartList = res.data.carts;
    totalCart.textContent = res.data.finalTotal;
    renderShoppingCart();
    sweetalert2("購物車已清空！")
  }).catch(function(err){
    sweetalert2("刪除全部購物車失敗");
    // console.log(err);
  });
};

// 刪除購物車單項物品 delete
shoppingCartTable.addEventListener("click",function(e){
  const delBtn = e.target.getAttribute("href");
  const cartId = e.target.getAttribute("data-cartId");
  if(delBtn!= "#"){
    return;
  }
  e.preventDefault("click");
  // console.log(cartId);
  delCartItem(cartId);
});

function delCartItem(id){
  axios.delete(`${baseUrl}/${api_path}/carts/${id}`).then(function(res){
    shoppingCartList = res.data.carts;
    totalCart.textContent = res.data.finalTotal;
    renderShoppingCart();
    sweetalert2("商品刪除成功！");
  }).catch(function(err){
    sweetalert2("刪除單項商品失敗");
    // console.log(err);
  });
};

// 填寫預訂資料表單
const customerName = document.querySelector("#customerName");
const customerPhone = document.querySelector("#customerPhone");
const customerEmail = document.querySelector("#customerEmail");
const customerAddress = document.querySelector("#customerAddress");
const tradeWay = document.querySelector("#tradeWay");
const orderInfoBtn = document.querySelector(".orderInfo-btn");

orderInfoBtn.addEventListener("click",function(e){
  e.preventDefault("click");
  if(shoppingCartList.length==0){
    sweetalert2("購物車沒有商品！");
    return;
  }
  if(customerName.value==""||customerPhone.value==""||customerEmail.value==""||customerAddress.value==""){
    sweetalert2("請填入資料！");
    return;
  };
  let obj = {};
  obj.name = customerName.value;
  obj.tel = customerPhone.value;
  obj.email = customerEmail.value;
  obj.address = customerAddress.value;
  obj.payment = tradeWay.value;
  postCustomerOrder(obj);
});

function postCustomerOrder(obj){
  axios.post(`${baseUrl}/${api_path}/orders`,{
    "data": {
      "user": obj
    }
  }).then(function(res){
    sweetalert2("訂單送出成功！");
    // console.log(res.data);
    getShopCartList();
  }).catch(function(err){
    sweetalert2("訂單送出失敗");
    // console.log(err);
  });
};


// 初始化
function init(){
  getProductList();
  getShopCartList();
};

init();
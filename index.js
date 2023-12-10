import axios from 'axios';
import { sweetalert2, formattedNumber } from './main.js';

const api_path = "macshop";
const baseUrl = "https://livejs-api.hexschool.io/api/livejs/v1/customer";

// .catch(function () {
//   sweetalert2("取得購物車失敗");
// })
// NT$${formattedNumber(item.origin_price)}

// 取得商品列表資料
let productList;
function getProductList(){
  axios.get(`${baseUrl}/${api_path}/products`).then(function(res){
    productList = res.data.products;
    renderProductList();
  }).catch(function(err){
    sweetalert2("取得商品列表失敗",err);
    console.log(err);
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
    sweetalert2(err);
    console.log("取得購物車失敗",err);
  });
};
// 渲染畫面 - 購物車列表
const shoppingCartTable = document.querySelector(".shoppingCart-tbody");
const totalCart = document.querySelector(".total");
function renderShoppingCart(){
  let str = "";
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
      <a href="#" class="material-icons">
        clear
      </a>
    </td>
  </tr>`
  });
  shoppingCartTable.innerHTML = str;
}

// 加入購物車 post
productWrap.addEventListener("click",function(e){
  const addCartList = e.target.getAttribute("class")
  if(addCartList != "addCardBtn"){
    return;
  }
  e.preventDefault("click");
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
    sweetalert2(err);
    console.log("加入購物車失敗",err);
  });
}

// 刪除全部購物車 delete
const deleteAllCartBtn = document.querySelector(".discardAllBtn");
deleteAllCartBtn.addEventListener("click",function(e){
  // console.log(e.target);
  e.preventDefault("click");
  axios.delete(`${baseUrl}/${api_path}/carts`).then(function(res){
    shoppingCartList = res.data.carts;
    totalCart.textContent = res.data.finalTotal;
    renderShoppingCart();
  }).catch(function(err){
    sweetalert2(err);
    console.log("刪除全部購物車失敗",err);
  });
});


// 初始化
function init(){
  getProductList();
  getShopCartList();
}

init();
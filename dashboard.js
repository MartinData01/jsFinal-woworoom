import axios from 'axios';
import c3 from 'c3'

import { sweetalert2 } from './main.js';

const api_path = "macshop";
const baseUrl = "https://livejs-api.hexschool.io/api/livejs/v1/admin";
const config = {
  headers: {
    Authorization: 'vsNAE5TYeFVS8JSKfFuoVS3R0To1'
  }
};

// 請同學自行組出資料，不可直接寫死資料
c3.generate({
  bindto: '#chart',
  data: {
    columns: [
        ['床架', 45],
        ['收納', 35],
        ['窗簾', 20],
    ],
    type : 'pie',
  }
});



//GET 後台取得訂單
const orderList = document.querySelector(".order-list");
let orderData;
function getOrderList(){
  axios.get(`${baseUrl}/${api_path}/orders`,config).then(function(res){
    console.log(res.data);
    orderData = res.data.orders;
    renderOrderList();
  }).catch(function(err){
    console.log(err);
  });
}

function renderOrderList(){
  let str = "";
  let orderStatus = "";
  orderData.forEach(item => {
    str+=`<tr>
    <td>${item.id}</td>
    <td>
      <p>${item.user.name}</p>
      <p>${item.user.tel}</p>
    </td>
    <td>${item.user.address}</td>
    <td>${item.user.email}</td>
    <td>
      <p>${item.products[0].title}</p>
    </td>
    <td>2021/03/08</td>
    <td class="orderStatus">
      <a href="#" data-id="${item.id}">未處理</a>
    </td>
    <td>
      <input type="button" class="delSingleOrder-Btn" value="刪除" data-id="${item.id}">
    </td>
  </tr>`
  });
  orderList.innerHTML = str;
}

// PUT 修改訂單狀態
orderList.addEventListener("click",function(e){
  let orderId = e.target.dataset.id;
  if(orderId === undefined){
    return;
  }
  e.preventDefault("click");
  putOrderList(orderId);
});

function putOrderList(id){
  axios.put(`${baseUrl}/${api_path}/orders`,{
    "data": {
      "id": id,
      "paid": true
    }
  },config).then(function(res){
    console.log(res);
    orderData = res.data.orders;
    renderOrderList();
  }).catch(function(err){
    console.log(err);
  });
}

// DELETE 刪除單一訂單


//DELETE 清除全部訂單
const discardAllBtn = document.querySelector(".discardAllBtn");
discardAllBtn.addEventListener("click",function(e){
  e.preventDefault("click");
  // console.log(e.target);
  delAllOrder();
});

function delAllOrder(){
  axios.delete(`${baseUrl}/${api_path}/orders`,config).then(function(res){
    sweetalert2("訂單已全部清空！");
    console.log(res.data.message);
  }).catch(function(err){
    sweetalert2("訂單全部清空錯誤！ERRoR");
    console.log(err);
  });
}


// 初始化
function init(){
  getOrderList();
}
init();
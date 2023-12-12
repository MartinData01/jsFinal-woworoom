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



// GET 後台取得訂單
const orderList = document.querySelector(".order-list");
let orderData;
function getOrderList(){
  axios.get(`${baseUrl}/${api_path}/orders`,config).then(function(res){
    // console.log(res.data);
    // sweetalert2("取得訂單狀態成功！");
    orderData = res.data.orders;
    renderOrderList();
  }).catch(function(err){
    sweetalert2("取得訂單狀態失敗！");
    console.log(err);
  });
}

// 渲染畫面 - 訂單資料 將資料存入圖表用function
let c3orderData = [];
function renderOrderList(){
  let str = "";
  orderData.forEach(item => {
    let orderStatus;
    c3orderData.push(item.products);
    if(item.paid===true){
      orderStatus = "已處理";
    }else if(item.paid===false){
      orderStatus = "未處理";
    };
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
      <a href="#" data-id="${item.id}">${orderStatus}</a>
    </td>
    <td>
      <input type="button" class="delSingleOrder-Btn" value="刪除" data-id="${item.id}">
    </td>
  </tr>`
  });
  orderList.innerHTML = str;
  console.log("origin",c3orderData);
  c3DataTransform();
}

// PUT 修改訂單狀態
orderList.addEventListener("click",function(e){
  let orderId = e.target.dataset.id;
  let selected = e.target.getAttribute("href");
  let orderStatus;
  if(selected !== "#"){
    return;
  }
  e.preventDefault("click");
  sweetalert2("訂單狀態修改中...");
  // console.log(e.target.textContent);
  if(e.target.textContent==="已處理"){
    orderStatus = false;
  }else if(e.target.textContent==="未處理"){
    orderStatus = true;
  }
  putOrderList(orderId,orderStatus);
});

function putOrderList(id,status){
  axios.put(`${baseUrl}/${api_path}/orders`,{
    "data": {
      "id": id,
      "paid": status
    }
  },config).then(function(res){
    sweetalert2("訂單狀態修改成功！");
    orderData = res.data.orders;
    renderOrderList();
  }).catch(function(err){
    sweetalert2("訂單狀態修改失敗！");
    // console.log(err);
  });
}

// DELETE 刪除單一訂單
orderList.addEventListener("click",function(e){
  // console.log(e.target.value);
  let selectedItem = e.target.value;
  if(selectedItem!=="刪除"){
    return;
  };
  sweetalert2("訂單刪除中...");
  let orderId = e.target.dataset.id;
  delSelectItem(orderId);
});

function delSelectItem(id){
  axios.delete(`${baseUrl}/${api_path}/orders/${id}`,config).then(function(res){
    sweetalert2("訂單刪除成功！");
    orderData = res.data.orders;
    renderOrderList();
  }).catch(function(err){
    sweetalert2("訂單刪除失敗！");
    // console.log(err);
  });
}

//DELETE 清除全部訂單
const discardAllBtn = document.querySelector(".discardAllBtn");
discardAllBtn.addEventListener("click",function(e){
  e.preventDefault("click");
  sweetalert2("訂單全部清空中...");
  // console.log(e.target);
  delAllOrder();
});

function delAllOrder(){
  axios.delete(`${baseUrl}/${api_path}/orders`,config).then(function(res){
    sweetalert2("訂單已全部清空！");
    orderData = res.data.orders;
    renderOrderList();
  }).catch(function(err){
    sweetalert2("訂單全部清空錯誤！ERRoR");
    // console.log(err);
  });
}


// c3 圖表用
function c3DataTransform(){
  let second = [];
  let third;
  c3orderData.forEach(function(item){
    item.forEach(function(item2){
      second.push(item2);
    })
  });

  console.log("2",second);

}


// 初始化
function init(){
  getOrderList();
}
init();
import{s as c,a as n}from"./axios-556c270b.js";const o="macshop",a="https://livejs-api.hexschool.io/api/livejs/v1/customer";let i;function h(){n.get(`${a}/${o}/products`).then(function(e){i=e.data.products,g()}).catch(function(e){c("取得商品列表失敗"),console.log(e)})}const u=document.querySelector(".productWrap");function g(){let e="";i.forEach(function(t,d){e+=`<li class="productCard">
    <h4 class="productType">${t.category}</h4>
    <img
      src="${t.images}"
      alt="">
    <a href="#" class="addCardBtn" data-productId="${t.id}">加入購物車</a>
    <h3>${t.title}</h3>
    <del class="originPrice">NT$${t.origin_price}</del>
    <p class="nowPrice">NT$${t.price}</p>
  </li>`}),u.innerHTML=e}let r;function p(){n.get(`${a}/${o}/carts`).then(function(e){r=e.data.carts,s.textContent=e.data.finalTotal,l()}).catch(function(e){c("取得購物車失敗"),console.log(e)})}const f=document.querySelector(".shoppingCart-tbody"),s=document.querySelector(".total");function l(){let e="";r.forEach(function(t){e+=`<tr>
    <td>
      <div class="cardItem-title">
        <img src="${t.product.images}" alt="">
        <p>${t.product.title}</p>
      </div>
    </td>
    <td>NT$${t.product.price}</td>
    <td>${t.quantity}</td>
    <td>NT$${t.product.price*t.quantity}</td>
    <td class="discardBtn">
      <a href="#" class="material-icons" data-cartId="${t.id}">
        clear
      </a>
    </td>
  </tr>`}),f.innerHTML=e}u.addEventListener("click",function(e){if(e.target.getAttribute("class")!="addCardBtn")return;e.preventDefault("click"),c("加入購物車成功！！");const d=e.target.getAttribute("data-productId");$(d)});function $(e){n.post(`${a}/${o}/carts`,{data:{productId:e,quantity:1}}).then(function(t){r=t.data.carts,s.textContent=t.data.finalTotal,l()}).catch(function(t){c("加入購物車失敗"),console.log(t)})}const m=document.querySelector(".discardAllBtn");m.addEventListener("click",function(e){e.preventDefault("click"),C()});function C(){n.delete(`${a}/${o}/carts`).then(function(e){r=e.data.carts,s.textContent=e.data.finalTotal,l(),c("購物車已清空！")}).catch(function(e){c("刪除全部購物車失敗"),console.log(e)})}f.addEventListener("click",function(e){const t=e.target.getAttribute("href"),d=e.target.getAttribute("data-cartId");t=="#"&&(e.preventDefault("click"),y(d))});function y(e){n.delete(`${a}/${o}/carts/${e}`).then(function(t){r=t.data.carts,s.textContent=t.data.finalTotal,l(),c("商品刪除成功！")}).catch(function(t){c("刪除單項商品失敗"),console.log(t)})}const v=document.querySelector("#customerName"),q=document.querySelector("#customerPhone"),L=document.querySelector("#customerEmail"),I=document.querySelector("#customerAddress"),S=document.querySelector("#tradeWay"),T=document.querySelector(".orderInfo-btn");T.addEventListener("click",function(e){e.preventDefault("click");let t={};t.name=v.value,t.tel=q.value,t.email=L.value,t.address=I.value,t.payment=S.value,b(t)});function b(e){n.post(`${a}/${o}/orders`,{data:{user:e}}).then(function(t){c("訂單送出成功！"),console.log(t.data),p()}).catch(function(t){c("訂單送出失敗"),console.log(t)})}function A(){h(),p()}A();

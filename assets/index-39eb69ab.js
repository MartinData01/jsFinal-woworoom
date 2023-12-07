import{a,s,f as l}from"./axios-c9ab7890.js";const d="yinmin",u="https://livejs-api.hexschool.io/api/livejs/v1/customer";document.addEventListener("DOMContentLoaded",function(){const t=document.querySelector(".recommendation-wall");t.style.cursor="grab";let e={top:0,left:0,x:0,y:0};const n=function(c){t.style.cursor="grabbing",t.style.userSelect="none",e={left:t.scrollLeft,top:t.scrollTop,x:c.clientX,y:c.clientY},document.addEventListener("mousemove",o),document.addEventListener("mouseup",r)},o=function(c){const f=c.clientX-e.x,p=c.clientY-e.y;t.scrollTop=e.top-p,t.scrollLeft=e.left-f},r=function(){t.style.cursor="grab",t.style.removeProperty("user-select"),document.removeEventListener("mousemove",o),document.removeEventListener("mouseup",r)};t.addEventListener("mousedown",n)});let h=[];function y(){a.get(`${u}/${d}/products`).then(function(t){h=t.data.products,$()}).then(function(){document.querySelectorAll(".addCardBtn").forEach(e=>{e.addEventListener("click",q)})}).catch(function(){s("取得商品失敗")})}function $(){const t=document.querySelector(".productWrap");let e="";h.forEach(function(n){e+=`<li class="productCard">
    <h4 class="productType">新品</h4>
    <img
      src="${n.images}"
      alt="">
    <a href="#" class="addCardBtn" data-id="${n.id}">加入購物車</a>
    <h3>${n.title}</h3>
    <del class="originPrice">NT$${l(n.origin_price)}</del>
    <p class="nowPrice">NT$${l(n.price)}</p>
  </li>`}),t.innerHTML=e}let m=[];function i(){a.get(`${u}/${d}/carts`).then(function(t){m=t.data,g()}).then(function(){document.querySelectorAll(".discardBtn a").forEach(function(e){e.addEventListener("click",S)})}).catch(function(){s("取得購物車失敗")})}function g(){const t=document.querySelector(".shoppingCart-tbody"),e=document.querySelector(".total");let n="";m.carts.forEach(function(o){n+=`<tr><td>
    <div class="cardItem-title">
      <img src="${o.product.images}" alt="">
      <p>${o.product.title}</p>
    </div>
  </td>
  <td>NT$ ${l(o.product.price)}</td>
  <td> ${o.quantity} </td>
  <td>NT$ ${l(o.product.price*o.quantity)}</td>
  <td class="discardBtn">
    <a href="#" class="material-icons" data-id="${o.id}">
      clear
    </a>
  </td></tr> `}),t.innerHTML=n,e.textContent=`NT$ ${l(m.finalTotal)}`}function q(t){t.preventDefault();const e=`${u}/${d}/carts`,n=t.target.dataset.id;let o=1;m.carts.forEach(function(c){c.product.id===n&&(o=c.quantity+=1)});const r={data:{productId:n,quantity:o}};a.post(e,r).then(function(){i()}).catch(function(c){s(c.response.data.message)})}const E=document.querySelector(".discardAllBtn");function L(t){t.preventDefault(),a.delete(`${u}/${d}/carts`).then(function(){i()}).catch(function(e){s(e.response.data.message)})}E.addEventListener("click",L);function S(t){t.preventDefault();const e=t.target.dataset.id;a.delete(`${u}/${d}/carts/${e}`).then(function(){i()}).catch(function(n){s(n.response.data.message)})}const C=document.querySelector(".orderInfo-btn");function B(t){t.preventDefault();const e=document.querySelector("#customerName"),n=document.querySelector("#customerPhone"),o=document.querySelector("#customerEmail"),r=document.querySelector("#customerAddress"),c=document.querySelector(".orderInfo-input"),f=document.querySelector(".orderInfo-form"),p={data:{user:{name:e.value,tel:n.value,email:o.value,address:r.value,payment:c.value}}};a.post(`${u}/${d}/orders`,p).then(function(){i(),f.reset()}).catch(function(v){s(v.response.data.message)})}C.addEventListener("click",B);function T(){y(),i()}T();

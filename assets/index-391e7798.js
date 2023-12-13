import{s as r,a as c}from"./axios-556c270b.js";const n="macshop",o="https://livejs-api.hexschool.io/api/livejs/v1/customer";let $;function C(){c.get(`${o}/${n}/products`).then(function(t){$=t.data.products,y()}).catch(function(t){r("取得商品列表失敗")})}const m=document.querySelector(".productWrap");function y(){let t="";$.forEach(function(e,d){t+=`<li class="productCard">
    <h4 class="productType">${e.category}</h4>
    <img
      src="${e.images}"
      alt="">
    <a href="#" class="addCardBtn" data-productId="${e.id}">加入購物車</a>
    <h3>${e.title}</h3>
    <del class="originPrice">NT$${e.origin_price}</del>
    <p class="nowPrice">NT$${e.price}</p>
  </li>`}),m.innerHTML=t}let a;function g(){c.get(`${o}/${n}/carts`).then(function(t){a=t.data.carts,i.textContent=t.data.finalTotal,u()}).catch(function(t){r("取得購物車失敗")})}const v=document.querySelector(".shoppingCart-tbody"),i=document.querySelector(".total");function u(){let t="";a.length==0&&(t="<tr><td>購物車沒有商品！</td></tr>"),a.forEach(function(e){t+=`<tr>
    <td>
      <div class="cardItem-title">
        <img src="${e.product.images}" alt="">
        <p>${e.product.title}</p>
      </div>
    </td>
    <td>NT$${e.product.price}</td>
    <td>${e.quantity}</td>
    <td>NT$${e.product.price*e.quantity}</td>
    <td class="discardBtn">
      <a href="#" class="material-icons" data-cartId="${e.id}">
        clear
      </a>
    </td>
  </tr>`}),v.innerHTML=t}m.addEventListener("click",function(t){if(t.target.getAttribute("class")!="addCardBtn")return;t.preventDefault("click"),r("加入購物車成功！！");const d=t.target.getAttribute("data-productId");q(d)});function q(t){c.post(`${o}/${n}/carts`,{data:{productId:t,quantity:1}}).then(function(e){a=e.data.carts,i.textContent=e.data.finalTotal,u()}).catch(function(e){r("加入購物車失敗")})}const s=document.querySelector(".discardAllBtn");s.addEventListener("click",function(t){if(t.preventDefault("click"),a.length==0){s.setAttribute("disabled","disabled"),r("購物車沒有商品！");return}L()});function L(){c.delete(`${o}/${n}/carts`).then(function(t){a=t.data.carts,i.textContent=t.data.finalTotal,u(),r("購物車已清空！")}).catch(function(t){r("刪除全部購物車失敗")})}v.addEventListener("click",function(t){const e=t.target.getAttribute("href"),d=t.target.getAttribute("data-cartId");e=="#"&&(t.preventDefault("click"),b(d))});function b(t){c.delete(`${o}/${n}/carts/${t}`).then(function(e){a=e.data.carts,i.textContent=e.data.finalTotal,u(),r("商品刪除成功！")}).catch(function(e){r("刪除單項商品失敗")})}const l=document.querySelector("#customerName"),p=document.querySelector("#customerPhone"),f=document.querySelector("#customerEmail"),h=document.querySelector("#customerAddress"),I=document.querySelector("#tradeWay"),S=document.querySelector(".orderInfo-btn");S.addEventListener("click",function(t){if(t.preventDefault("click"),a.length==0){r("購物車沒有商品！");return}if(l.value==""||p.value==""||f.value==""||h.value==""){r("請填入資料！");return}let e={};e.name=l.value,e.tel=p.value,e.email=f.value,e.address=h.value,e.payment=I.value,T(e)});function T(t){c.post(`${o}/${n}/orders`,{data:{user:t}}).then(function(e){r("訂單送出成功！"),g()}).catch(function(e){r("訂單送出失敗")})}function A(){C(),g()}A();

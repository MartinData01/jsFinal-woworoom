import{s as r,a}from"./axios-556c270b.js";const n="macshop",o="https://livejs-api.hexschool.io/api/livejs/v1/customer";let h;function v(){a.get(`${o}/${n}/products`).then(function(t){h=t.data.products,C()}).catch(function(t){r("取得商品列表失敗")})}const $=document.querySelector(".productWrap");function C(){let t="";h.forEach(function(e,d){t+=`<li class="productCard">
    <h4 class="productType">${e.category}</h4>
    <img
      src="${e.images}"
      alt="">
    <a href="#" class="addCardBtn" data-productId="${e.id}">加入購物車</a>
    <h3>${e.title}</h3>
    <del class="originPrice">NT$${e.origin_price}</del>
    <p class="nowPrice">NT$${e.price}</p>
  </li>`}),$.innerHTML=t}let c;function m(){a.get(`${o}/${n}/carts`).then(function(t){c=t.data.carts,u.textContent=t.data.finalTotal,i()}).catch(function(t){r("取得購物車失敗")})}const g=document.querySelector(".shoppingCart-tbody"),u=document.querySelector(".total");function i(){let t="";c.length==0&&(t="<tr><td>購物車沒有商品！</td></tr>"),c.forEach(function(e){t+=`<tr>
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
  </tr>`}),g.innerHTML=t}$.addEventListener("click",function(t){if(t.target.getAttribute("class")!="addCardBtn")return;t.preventDefault("click"),r("加入購物車成功！！");const d=t.target.getAttribute("data-productId");y(d)});function y(t){a.post(`${o}/${n}/carts`,{data:{productId:t,quantity:1}}).then(function(e){c=e.data.carts,u.textContent=e.data.finalTotal,i()}).catch(function(e){r("加入購物車失敗")})}const q=document.querySelector(".discardAllBtn");q.addEventListener("click",function(t){t.preventDefault("click"),L()});function L(){a.delete(`${o}/${n}/carts`).then(function(t){c=t.data.carts,u.textContent=t.data.finalTotal,i(),r("購物車已清空！")}).catch(function(t){r("刪除全部購物車失敗")})}g.addEventListener("click",function(t){const e=t.target.getAttribute("href"),d=t.target.getAttribute("data-cartId");e=="#"&&(t.preventDefault("click"),I(d))});function I(t){a.delete(`${o}/${n}/carts/${t}`).then(function(e){c=e.data.carts,u.textContent=e.data.finalTotal,i(),r("商品刪除成功！")}).catch(function(e){r("刪除單項商品失敗")})}const s=document.querySelector("#customerName"),l=document.querySelector("#customerPhone"),p=document.querySelector("#customerEmail"),f=document.querySelector("#customerAddress"),S=document.querySelector("#tradeWay"),T=document.querySelector(".orderInfo-btn");T.addEventListener("click",function(t){if(t.preventDefault("click"),c.length==0){r("購物車沒有商品！");return}if(s.value==""||l.value==""||p.value==""||f.value==""){r("請填入資料！");return}let e={};e.name=s.value,e.tel=l.value,e.email=p.value,e.address=f.value,e.payment=S.value,b(e)});function b(t){a.post(`${o}/${n}/orders`,{data:{user:t}}).then(function(e){r("訂單送出成功！"),m()}).catch(function(e){r("訂單送出失敗")})}function A(){v(),m()}A();

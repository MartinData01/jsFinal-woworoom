import{s as r,a}from"./axios-7d113d8b.js";const n="macshop",o="https://livejs-api.hexschool.io/api/livejs/v1/customer";let $;function y(){a.get(`${o}/${n}/products`).then(function(t){$=t.data.products,C()}).catch(function(t){r("取得商品列表失敗")})}const m=document.querySelector(".productWrap");function C(){let t="";$.forEach(function(e,d){t+=`<li class="productCard">
    <h4 class="productType">${e.category}</h4>
    <img
      src="${e.images}"
      alt="">
    <a href="#" class="addCardBtn" data-productId="${e.id}">加入購物車</a>
    <h3>${e.title}</h3>
    <del class="originPrice">NT$${e.origin_price}</del>
    <p class="nowPrice">NT$${e.price}</p>
  </li>`}),m.innerHTML=t}let c;function g(){a.get(`${o}/${n}/carts`).then(function(t){c=t.data.carts,u.textContent=`${t.data.finalTotal} 元`,i()}).catch(function(t){r("取得購物車失敗")})}const v=document.querySelector(".shoppingCart-tbody"),u=document.querySelector(".total");function i(){let t="";c.length==0&&(t="<tr><td>購物車沒有商品！</td></tr>"),c.forEach(function(e){t+=`<tr>
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
  </tr>`}),v.innerHTML=t}m.addEventListener("click",function(t){if(t.target.getAttribute("class")!="addCardBtn")return;t.preventDefault("click"),r("加入購物車成功！！");const d=t.target.getAttribute("data-productId");q(d)});function q(t){a.post(`${o}/${n}/carts`,{data:{productId:t,quantity:1}}).then(function(e){c=e.data.carts,u.textContent=`${e.data.finalTotal} 元`,i()}).catch(function(e){r("加入購物車失敗")})}const s=document.querySelector(".discardAllBtn");s.addEventListener("click",function(t){if(t.preventDefault("click"),c.length==0){s.setAttribute("disabled","disabled"),r("購物車沒有商品！");return}r("購物車清空中..."),I()});function I(){a.delete(`${o}/${n}/carts`).then(function(t){c=t.data.carts,u.textContent=`${t.data.finalTotal} 元`,i(),r("購物車已清空！")}).catch(function(t){r("刪除全部購物車失敗")})}v.addEventListener("click",function(t){const e=t.target.getAttribute("href"),d=t.target.getAttribute("data-cartId");e=="#"&&(t.preventDefault("click"),L(d))});function L(t){a.delete(`${o}/${n}/carts/${t}`).then(function(e){c=e.data.carts,u.textContent=`${e.data.finalTotal} 元`,i(),r("商品刪除成功！")}).catch(function(e){r("刪除單項商品失敗")})}const l=document.querySelector("#customerName"),f=document.querySelector("#customerPhone"),p=document.querySelector("#customerEmail"),h=document.querySelector("#customerAddress"),S=document.querySelector("#tradeWay"),b=document.querySelector(".orderInfo-btn"),T=document.querySelector(".orderInfo-form");b.addEventListener("click",function(t){if(t.preventDefault("click"),c.length==0){r("購物車沒有商品！");return}if(l.value==""||f.value==""||p.value==""||h.value==""){r("請填入資料！");return}let e={};e.name=l.value,e.tel=f.value,e.email=p.value,e.address=h.value,e.payment=S.value,A(e)});function A(t){a.post(`${o}/${n}/orders`,{data:{user:t}}).then(function(e){r("訂單送出成功！"),T.reset(),g()}).catch(function(e){r("訂單送出失敗")})}function k(){y(),g()}k();

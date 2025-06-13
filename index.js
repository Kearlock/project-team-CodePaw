import{a as M,S as H,N as F,P as R,A as U}from"./assets/vendor-SkZP4jF-.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function i(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(n){if(n.ep)return;n.ep=!0;const o=i(n);fetch(n.href,o)}})();const v=document.querySelector(".mobile-menu"),_=document.querySelector(".js-mobile-menu"),Y=document.querySelector(".js-mobile-close-menu"),L=document.querySelector(".js-mobile-backdrop");function G(){v.classList.add("is-open"),L.classList.add("is-active"),document.body.classList.add("no-scroll")}function g(){v.classList.remove("is-open"),L.classList.remove("is-active"),document.body.classList.remove("no-scroll")}_.onclick=G;Y.onclick=g;L.onclick=g;document.addEventListener("keydown",e=>{e.key==="Escape"&&g()});v.querySelectorAll('a[href^="#"]').forEach(e=>{e.onclick=g});const w=M.create({baseURL:"https://sound-wave.b.goit.study/api",timeout:5e3,headers:{"Content-Type":"application/json"}});w.interceptors.response.use(e=>e,e=>(alert("Сталася помилка при запиті до сервера. Спробуйте ще раз."),Promise.reject(e)));async function K({page:e=1,limit:t=8}={}){try{return(await w.get("/artists",{params:{page:e,limit:t}})).data}catch(i){throw i}}async function z(e){try{return(await w.get(`/artists/${e}/albums`)).data}catch(t){throw t}}const E=document.querySelector("[data-modal]"),S=document.getElementById("modal-inner-content"),B=document.querySelector("[data-modal-backdrop]"),x=document.getElementById("loader");function J(){x.classList.remove("is-hidden")}function $(){x.classList.add("is-hidden")}function Q(){E.classList.remove("is-hidden"),document.body.style.overflow="hidden",document.addEventListener("keydown",T)}function A(){E.classList.add("is-hidden"),document.body.style.overflow="",document.removeEventListener("keydown",T),S.innerHTML=""}function T(e){e.key==="Escape"&&A()}function V(e){e.target===B&&A()}E.addEventListener("click",e=>{e.target.closest("[data-modal-close]")&&A()});B.addEventListener("click",V);function W(e){const t=Math.floor(e/1e3),i=Math.floor(t/60),s=t%60;return`${i}:${s.toString().padStart(2,"0")}`}async function X(e){try{J();const t=await z(e);$(),Z(t)}catch(t){$(),console.error("Error fetching artist:",t),alert("Не вдалося завантажити інформацію про виконавця.")}}function Z(e){const{strArtist:t,strArtistThumb:i,intFormedYear:s,intDiedYear:n,strGender:o,intMembers:a,strCountry:r,strBiographyEN:l,genres:c,albumsList:d}=e,y=a===1?`<li><strong>Sex:</strong> ${o||"—"}</li>`:`<li><strong>Members:</strong> ${a||"—"}</li>`,I=`
    <ul class="artist-meta-list">
      <li><strong>Years active:</strong> ${s&&n?`${s}–${n}`:s?`${s}–present`:"information missing"}</li>
      ${y}
      <li><strong>Country:</strong> ${r||"—"}</li>
    </ul>`,P=(c==null?void 0:c.map(b=>`<li>${b}</li>`).join(""))||"",N=(d==null?void 0:d.map(b=>{const{strAlbum:j,tracks:q}=b,O=q.map(p=>{const D=p.movie&&p.movie!=="null"?`<a href="${p.movie}" target="_blank" rel="noopener">
              <svg class="icon" width="24" height="24" fill="white">
                <use href="/project-team-CodePaw/img/icons.svg#icon-youtube"></use>
              </svg>
            </a>`:"";return`<li><span>${p.strTrack}</span><span>${W(p.intDuration)}</span>${D}</li>`}).join("");return`
      <div class="album-card">
        <h4>${j}</h4>
        <div class="track-header">
          <span>Track</span><span>Time</span><span>Link</span>
        </div>
        <ul class="track-list">${O}</ul>
      </div>`}).join(""))||"";S.innerHTML=`
    <button class="artist-modal-close" type="button" data-modal-close>
      <svg class="icon" width="14" height="14" fill="white">
        <use href="/project-team-CodePaw/img/icons.svg#icon-close"></use>
      </svg>
    </button>
    <h2 class="artist-modal-title">${t}</h2>
    <div class="artist-modal-info">
      <img src="${i||"https://placehold.co/300x300"}" alt="${t}" class="artist-modal-img" />
      <div class="artist-modal-bio">
        ${I}
        <div class="artist-bio">
          <h3 class="bio-title">Biography</h3>
          <p>${l||"—"}</p>
        </div>
        <ul class="artist-tags">${P}</ul>
      </div>
    </div>
    <div class="artist-albums">
      <h3>Albums</h3>
      <div class="album-grid">${N}</div>
    </div>
  `,Q()}let f,m;function ee(){const e=document.getElementById("loader");e&&e.classList.remove("hidden")}function te(){const e=document.getElementById("loader");e&&e.classList.add("hidden")}function se(e){return!e||typeof e!="object"?[]:Array.isArray(e.genres)&&e.genres.length>0?e.genres.filter(Boolean):[]}async function ne(e){const t=document.createElement("li");t.className="artist-card";const i=document.createElement("img");i.src=e.strArtistThumb||"https://placehold.co/150x150/cccccc/333333?text=No+Image",i.alt=e.strArtist||"No Image",i.addEventListener("error",function(){this.src="https://placehold.co/150x150/cccccc/333333?text=No+Image",this.alt="No Image Available"}),t.appendChild(i);const s=document.createElement("p"),n=se(e);if(n.length){const u=document.createElement("ul");u.classList.add("artist-genres-list"),n.forEach(y=>{const h=document.createElement("li");h.classList.add("genres-list-item"),h.textContent=y,u.appendChild(h)}),s.appendChild(u)}else s.appendChild(document.createTextNode("N/A"));t.appendChild(s);const o=document.createElement("h3");o.textContent=e.strArtist||"Unknown Artist",t.appendChild(o);const a=document.createElement("p");a.className="artist-description";const r=e.strBiographyEN||"No short info available.";a.textContent=r.length>200?r.slice(0,200)+"...":r,t.appendChild(a);const l=document.createElement("button");l.className="learn-more-btn",l.textContent="Learn More",l.dataset.artistId=e._id;const c=document.createElementNS("http://www.w3.org/2000/svg","svg");c.setAttribute("class","learn-more-icon"),c.setAttribute("width","24"),c.setAttribute("height","24");const d=document.createElementNS("http://www.w3.org/2000/svg","use");return d.setAttribute("href","/project-team-CodePaw/img/icons.svg#icon-filled-arrow"),c.appendChild(d),l.appendChild(c),t.appendChild(l),t}let k=1;async function C(){try{ee();const e=await K({page:k,limit:8}),t=Array.isArray(e==null?void 0:e.artists)?e.artists:[];if(!t.length){m.classList.add("hidden"),m.setAttribute("disabled",!0);return}for(const i of t){const s=await ne(i);f.appendChild(s)}k++,t.length<8&&(m.classList.add("hidden"),m.setAttribute("disabled",!0))}catch{alert("Failed to load artists. Please try again later."),m.classList.add("hidden"),m.setAttribute("disabled",!0)}finally{te()}}function oe(){f=document.getElementById("artists"),m=document.getElementById("loadMoreBtn"),!(!f||!m)&&(m.onclick=C,C(),f.addEventListener("click",e=>{const t=e.target.closest(".learn-more-btn");if(t){const i=t.dataset.artistId;i&&X(i)}}))}document.addEventListener("DOMContentLoaded",()=>{oe()});const re=document.querySelector(".swiper-wrapper");document.addEventListener("DOMContentLoaded",()=>{async function e(){try{const o="https://sound-wave.b.goit.study/api"+"/feedbacks",a={limit:12};return(await M.get(o,{params:a})).data}catch(s){return console.error("Error fetching feedback:",s),null}}function t(s){let o="";for(let a=1;a<=5;a++){const r=a<=s?"star-filled":"star-empty";o+=`
        <svg class="star ${r}" width="20" height="19">
          <use href="/project-team-CodePaw/img/icons.svg#${a<=s,"icon-star"}"></use>
        </svg>
      `}return o}function i(s){const n=s.map(({_id:r,name:l,rating:c,descr:d})=>{const u=Math.round(c);return`
          <div class="swiper-slide" data-id="${r||""}">
            <div class="rating">
              <div class="star-rating">${t(u)}</div>
            </div>
            <p class='feed-back-descr'>"${d||""}"</p>
            <p class='feed-back-name'>${l||""}</p>
          </div>
        `}).join("");re.innerHTML=n,new H(".modal-product__slider",{modules:[F,R,U],pagination:{el:".swiper-pagination",clickable:!1,type:"custom",renderBullet:function(r,l){return r===0?'<span class="'+l+' bullet left" data-slide="0"></span>':r===1?'<span class="'+l+' bullet center" data-slide="middle"></span>':r===2?'<span class="'+l+' bullet right" data-slide="last"></span>':""},bulletClass:"bullet",bulletActiveClass:"swiper-pagination-bullet-active"},navigation:{nextEl:".custom-next",prevEl:".custom-prev"},autoplay:{delay:5e3},on:{init(){o(this.realIndex,this.slides.length),a(this)},slideChange(){o(this.realIndex,this.slides.length)}}});function o(r,l){const c=document.querySelectorAll(".swiper-pagination .bullet");c.forEach(d=>d.classList.remove("swiper-pagination-bullet-active")),r===0?c[0].classList.add("swiper-pagination-bullet-active"):r===l-1?c[2].classList.add("swiper-pagination-bullet-active"):c[1].classList.add("swiper-pagination-bullet-active")}function a(r){var l,c,d;(l=document.querySelector(".bullet.left"))==null||l.addEventListener("click",()=>{r.slideTo(0),console.log("Sliding to first slide:",0)}),(c=document.querySelector(".bullet.center"))==null||c.addEventListener("click",()=>{const u=Math.floor(r.slides.length/2);r.slideTo(u),console.log("Sliding to middle slide:",u)}),(d=document.querySelector(".bullet.right"))==null||d.addEventListener("click",()=>{const u=r.slides.length-1;r.slideTo(u)})}}e().then(s=>{if(s){const n=Array.isArray(s)?s:s.results||s.data||[];i(n)}})});
//# sourceMappingURL=index.js.map

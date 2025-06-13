import{a as x,S as R,N as U,P as _,A as Y}from"./assets/vendor-SkZP4jF-.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function a(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(n){if(n.ep)return;n.ep=!0;const o=a(n);fetch(n.href,o)}})();const E=document.querySelector(".mobile-menu"),G=document.querySelector(".js-mobile-menu"),K=document.querySelector(".js-mobile-close-menu"),A=document.querySelector(".js-mobile-backdrop");function z(){E.classList.add("is-open"),A.classList.add("is-active"),document.body.classList.add("no-scroll")}function y(){E.classList.remove("is-open"),A.classList.remove("is-active"),document.body.classList.remove("no-scroll")}G.onclick=z;K.onclick=y;A.onclick=y;document.addEventListener("keydown",e=>{e.key==="Escape"&&y()});E.querySelectorAll('a[href^="#"]').forEach(e=>{e.onclick=y});const $=x.create({baseURL:"https://sound-wave.b.goit.study/api",timeout:5e3,headers:{"Content-Type":"application/json"}});$.interceptors.response.use(e=>e,e=>(alert("Сталася помилка при запиті до сервера. Спробуйте ще раз."),Promise.reject(e)));async function J(){try{return(await $.get("/artists")).data}catch(e){throw e}}async function Q(e){try{return(await $.get(`/artists/${e}/albums`)).data}catch(t){throw t}}const w=document.querySelector("[data-modal]"),I=document.getElementById("modal-inner-content"),P=document.querySelector("[data-modal-backdrop]"),N=document.getElementById("loader");function V(){N.classList.remove("is-hidden")}function k(){N.classList.add("is-hidden")}function W(){w.classList.remove("is-hidden"),document.body.style.overflow="hidden",document.addEventListener("keydown",j)}function C(){w.classList.add("is-hidden"),document.body.style.overflow="",document.removeEventListener("keydown",j),I.innerHTML=""}function j(e){e.key==="Escape"&&C()}function X(e){e.target===P&&C()}w.addEventListener("click",e=>{e.target.closest("[data-modal-close]")&&C()});P.addEventListener("click",X);function Z(e){const t=Math.floor(e/1e3),a=Math.floor(t/60),s=t%60;return`${a}:${s.toString().padStart(2,"0")}`}async function ee(e){try{V();const t=await Q(e);k(),te(t)}catch(t){k(),console.error("Error fetching artist:",t),alert("Не вдалося завантажити інформацію про виконавця.")}}function te(e){const{strArtist:t,strArtistThumb:a,intFormedYear:s,intDiedYear:n,strGender:o,intMembers:c,strCountry:r,strBiographyEN:l,genres:d,albumsList:u}=e,v=c===1?`<li><strong>Sex:</strong> ${o||"—"}</li>`:`<li><strong>Members:</strong> ${c||"—"}</li>`,q=`
    <ul class="artist-meta-list">
      <li><strong>Years active:</strong> ${s&&n?`${s}–${n}`:s?`${s}–present`:"information missing"}</li>
      ${v}
      <li><strong>Country:</strong> ${r||"—"}</li>
    </ul>`,M=(d==null?void 0:d.map(b=>`<li>${b}</li>`).join(""))||"",D=(u==null?void 0:u.map(b=>{const{strAlbum:H,tracks:O}=b,B=O.map(p=>{const F=p.movie&&p.movie!=="null"?`<a href="${p.movie}" target="_blank" rel="noopener">
              <svg class="icon" width="24" height="24" fill="white">
                <use href="/project-team-CodePaw/img/icons.svg#icon-youtube"></use>
              </svg>
            </a>`:"";return`<li><span>${p.strTrack}</span><span>${Z(p.intDuration)}</span>${F}</li>`}).join("");return`
      <div class="album-card">
        <h4>${H}</h4>
        <div class="track-header">
          <span>Track</span><span>Time</span><span>Link</span>
        </div>
        <ul class="track-list">${B}</ul>
      </div>`}).join(""))||"";I.innerHTML=`
    <button class="artist-modal-close" type="button" data-modal-close>
      <svg class="icon" width="14" height="14" fill="white">
        <use href="/project-team-CodePaw/img/icons.svg#icon-close"></use>
      </svg>
    </button>
    <h2 class="artist-modal-title">${t}</h2>
    <div class="artist-modal-info">
      <img src="${a||"https://placehold.co/300x300"}" alt="${t}" class="artist-modal-img" />
      <div class="artist-modal-bio">
        ${q}
        <div class="artist-bio">
          <h3 class="bio-title">Biography</h3>
          <p>${l||"—"}</p>
        </div>
        <ul class="artist-tags">${M}</ul>
      </div>
    </div>
    <div class="artist-albums">
      <h3>Albums</h3>
      <div class="album-grid">${D}</div>
    </div>
  `,W()}let f=0;const S=8;let L=[],h,i;function se(){const e=document.getElementById("loader");e&&e.classList.remove("hidden")}function ne(){const e=document.getElementById("loader");e&&e.classList.add("hidden")}function ie(e){if(!e||typeof e!="object")return[];if(Array.isArray(e.genres)&&e.genres.length>0)return e.genres.filter(Boolean)}async function oe(e){const t=document.createElement("div");t.className="artist-card";const a=document.createElement("img");a.src=e.strArtistThumb||"https://placehold.co/150x150/cccccc/333333?text=No+Image",a.alt=e.strArtist||"No Image",a.addEventListener("error",function(){this.src="https://placehold.co/150x150/cccccc/333333?text=No+Image",this.alt="No Image Available"}),t.appendChild(a);const s=document.createElement("p"),n=ie(e);if(n.length){const m=document.createElement("ul");m.classList.add("artist-genres-list"),n.forEach(v=>{const g=document.createElement("li");g.classList.add("genres-list-item"),g.textContent=v,m.appendChild(g)}),s.appendChild(m)}else s.appendChild(document.createTextNode("N/A"));t.appendChild(s);const o=document.createElement("h3");o.textContent=e.strArtist||"Unknown Artist",t.appendChild(o);const c=document.createElement("p");c.className="artist-description";const r=e.strBiographyEN||"No short info available.";c.textContent=r.length>200?r.slice(0,200)+"...":r,t.appendChild(c);const l=document.createElement("button");l.className="learn-more-btn",l.textContent="Learn More",l.dataset.artistId=e._id,t.appendChild(l);const d=document.createElement("p");d.setAttribute("class","learn-more-icon"),d.textContent="▶",l.appendChild(d);const u=document.createElement("use");return u.setAttribute("href","/project-team-CodePaw/img/icons.svg#icon-filled-arrow"),d.appendChild(u),t}async function T(){try{if(se(),f===0){const t=await J(),a=Array.isArray(t==null?void 0:t.artists)?t.artists:null;if(!a){alert("Error: Received invalid data from server."),i==null||i.classList.add("hidden"),i==null||i.setAttribute("disabled",!0);return}L=a,h.innerHTML=""}const e=L.slice(f,f+S);for(const t of e){const a=await oe(t);h.appendChild(a)}f+=S,f>=L.length?(i==null||i.classList.add("hidden"),i==null||i.setAttribute("disabled",!0)):(i==null||i.classList.remove("hidden"),i==null||i.removeAttribute("disabled"))}catch{alert("Failed to load artists. Please try again later."),i==null||i.classList.add("hidden"),i==null||i.setAttribute("disabled",!0)}finally{ne()}}function re(){h=document.getElementById("artists"),i=document.getElementById("loadMoreBtn"),!(!h||!i)&&(i.onclick=T,T(),h.addEventListener("click",e=>{const t=e.target.closest(".learn-more-btn");if(t){const a=t.dataset.artistId;a&&ee(a)}}))}document.addEventListener("DOMContentLoaded",()=>{re()});const ae=document.querySelector(".swiper-wrapper");document.addEventListener("DOMContentLoaded",()=>{async function e(){try{const o="https://sound-wave.b.goit.study/api"+"/feedbacks",c={limit:12};return(await x.get(o,{params:c})).data}catch(s){return console.error("Error fetching feedback:",s),null}}function t(s){let o="";for(let c=1;c<=5;c++){const r=c<=s?"star-filled":"star-empty";o+=`
        <svg class="star ${r}" width="20" height="19">
          <use href="/project-team-CodePaw/img/icons.svg#${c<=s,"icon-star"}"></use>
        </svg>
      `}return o}function a(s){const n=s.map(({_id:r,name:l,rating:d,descr:u})=>{const m=Math.round(d);return`
          <div class="swiper-slide" data-id="${r||""}">
            <div class="rating">
              <div class="star-rating">${t(m)}</div>
            </div>
            <p class='feed-back-descr'>"${u||""}"</p>
            <p class='feed-back-name'>${l||""}</p>
          </div>
        `}).join("");ae.innerHTML=n,new R(".modal-product__slider",{modules:[U,_,Y],pagination:{el:".swiper-pagination",clickable:!1,type:"custom",renderBullet:function(r,l){return r===0?'<span class="'+l+' bullet left" data-slide="0"></span>':r===1?'<span class="'+l+' bullet center" data-slide="middle"></span>':r===2?'<span class="'+l+' bullet right" data-slide="last"></span>':""},bulletClass:"bullet",bulletActiveClass:"swiper-pagination-bullet-active"},navigation:{nextEl:".custom-next",prevEl:".custom-prev"},autoplay:{delay:5e3},on:{init(){o(this.realIndex,this.slides.length),c(this)},slideChange(){o(this.realIndex,this.slides.length)}}});function o(r,l){const d=document.querySelectorAll(".swiper-pagination .bullet");d.forEach(u=>u.classList.remove("swiper-pagination-bullet-active")),r===0?d[0].classList.add("swiper-pagination-bullet-active"):r===l-1?d[2].classList.add("swiper-pagination-bullet-active"):d[1].classList.add("swiper-pagination-bullet-active")}function c(r){var l,d,u;(l=document.querySelector(".bullet.left"))==null||l.addEventListener("click",()=>{r.slideTo(0),console.log("Sliding to first slide:",0)}),(d=document.querySelector(".bullet.center"))==null||d.addEventListener("click",()=>{const m=Math.floor(r.slides.length/2);r.slideTo(m),console.log("Sliding to middle slide:",m)}),(u=document.querySelector(".bullet.right"))==null||u.addEventListener("click",()=>{const m=r.slides.length-1;r.slideTo(m)})}}e().then(s=>{if(s){const n=Array.isArray(s)?s:s.results||s.data||[];a(n)}})});
//# sourceMappingURL=index.js.map

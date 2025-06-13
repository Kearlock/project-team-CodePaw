import{a as x,S as R,N as U,P as _,A as Y}from"./assets/vendor-SkZP4jF-.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))d(i);new MutationObserver(i=>{for(const l of i)if(l.type==="childList")for(const s of l.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&d(s)}).observe(document,{childList:!0,subtree:!0});function a(i){const l={};return i.integrity&&(l.integrity=i.integrity),i.referrerPolicy&&(l.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?l.credentials="include":i.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function d(i){if(i.ep)return;i.ep=!0;const l=a(i);fetch(i.href,l)}})();const E=document.querySelector(".mobile-menu"),G=document.querySelector(".js-mobile-menu"),K=document.querySelector(".js-mobile-close-menu"),A=document.querySelector(".js-mobile-backdrop");function z(){E.classList.add("is-open"),A.classList.add("is-active"),document.body.classList.add("no-scroll")}function v(){E.classList.remove("is-open"),A.classList.remove("is-active"),document.body.classList.remove("no-scroll")}G.onclick=z;K.onclick=v;A.onclick=v;document.addEventListener("keydown",e=>{e.key==="Escape"&&v()});E.querySelectorAll('a[href^="#"]').forEach(e=>{e.onclick=v});const w=x.create({baseURL:"https://sound-wave.b.goit.study/api",timeout:5e3,headers:{"Content-Type":"application/json"}});w.interceptors.response.use(e=>e,e=>(alert("Сталася помилка при запиті до сервера. Спробуйте ще раз."),Promise.reject(e)));async function J(){try{return(await w.get("/artists")).data}catch(e){throw e}}async function Q(e){try{return(await w.get(`/artists/${e}/albums`)).data}catch(t){throw t}}const $=document.querySelector("[data-modal]"),I=document.getElementById("modal-inner-content"),P=document.querySelector("[data-modal-backdrop]"),q=document.getElementById("loader");function V(){q.classList.remove("is-hidden")}function k(){q.classList.add("is-hidden")}function W(){$.classList.remove("is-hidden"),document.body.style.overflow="hidden",document.addEventListener("keydown",N)}function C(){$.classList.add("is-hidden"),document.body.style.overflow="",document.removeEventListener("keydown",N),I.innerHTML=""}function N(e){e.key==="Escape"&&C()}function X(e){e.target===P&&C()}$.addEventListener("click",e=>{e.target.closest("[data-modal-close]")&&C()});P.addEventListener("click",X);function Z(e){const t=Math.floor(e/1e3),a=Math.floor(t/60),d=t%60;return`${a}:${d.toString().padStart(2,"0")}`}async function ee(e){try{V();const t=await Q(e);k(),te(t)}catch(t){k(),console.error("Error fetching artist:",t),alert("Не вдалося завантажити інформацію про виконавця.")}}function te(e){const{strArtist:t,strArtistThumb:a,intFormedYear:d,intDiedYear:i,strGender:l,intMembers:s,strCountry:c,strBiographyEN:r,genres:o,albumsList:u}=e,p=s===1?`<li><strong>Sex:</strong> ${l||"—"}</li>`:`<li><strong>Members:</strong> ${s||"—"}</li>`,j=`
    <ul class="artist-meta-list">
      <li><strong>Years active:</strong> ${d&&i?`${d}–${i}`:d?`${d}–present`:"information missing"}</li>
      ${p}
      <li><strong>Country:</strong> ${c||"—"}</li>
    </ul>`,M=(o==null?void 0:o.map(b=>`<li>${b}</li>`).join(""))||"",D=(u==null?void 0:u.map(b=>{const{strAlbum:H,tracks:O}=b,B=O.map(f=>{const F=f.movie&&f.movie!=="null"?`<a href="${f.movie}" target="_blank" rel="noopener">
              <svg class="icon" width="24" height="24" fill="white">
                <use href="/project-team-CodePaw/img/icons.svg#icon-youtube"></use>
              </svg>
            </a>`:"";return`<li><span>${f.strTrack}</span><span>${Z(f.intDuration)}</span>${F}</li>`}).join("");return`
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
        ${j}
        <div class="artist-bio">
          <h3 class="bio-title">Biography</h3>
          <p>${r||"—"}</p>
        </div>
        <ul class="artist-tags">${M}</ul>
      </div>
    </div>
    <div class="artist-albums">
      <h3>Albums</h3>
      <div class="album-grid">${D}</div>
    </div>
  `,W()}let h=0;const S=8;let L=[],g,n;function se(){const e=document.getElementById("loader");e&&e.classList.remove("hidden")}function ne(){const e=document.getElementById("loader");e&&e.classList.add("hidden")}function ie(e){if(!e||typeof e!="object")return[];if(Array.isArray(e.genres)&&e.genres.length>0)return e.genres.filter(Boolean)}async function re(e){const t=document.createElement("div");t.className="artist-card";const a=document.createElement("img");a.src=e.strArtistThumb||"https://placehold.co/150x150/cccccc/333333?text=No+Image",a.alt=e.strArtist||"No Image",a.addEventListener("error",function(){this.src="https://placehold.co/150x150/cccccc/333333?text=No+Image",this.alt="No Image Available"}),t.appendChild(a);const d=document.createElement("p"),i=ie(e);if(i.length){const m=document.createElement("ul");m.classList.add("artist-genres-list"),i.forEach(p=>{const y=document.createElement("li");y.classList.add("genres-list-item"),y.textContent=p,m.appendChild(y)}),d.appendChild(m)}else d.appendChild(document.createTextNode("N/A"));t.appendChild(d);const l=document.createElement("h3");l.textContent=e.strArtist||"Unknown Artist",t.appendChild(l);const s=document.createElement("p");s.className="artist-description";const c=e.strBiographyEN||"No short info available.";s.textContent=c.length>200?c.slice(0,200)+"...":c,t.appendChild(s);const r=document.createElement("button");r.className="learn-more-btn",r.textContent="Learn More",r.dataset.artistId=e._id,t.appendChild(r);const o=document.createElement("p");o.setAttribute("class","learn-more-icon"),o.textContent="▶",r.appendChild(o);const u=document.createElement("use");return u.setAttribute("href","/project-team-CodePaw/img/icons.svg#icon-filled-arrow"),o.appendChild(u),t}async function T(){try{if(se(),h===0){const t=await J(),a=Array.isArray(t==null?void 0:t.artists)?t.artists:null;if(!a){alert("Error: Received invalid data from server."),n==null||n.classList.add("hidden"),n==null||n.setAttribute("disabled",!0);return}L=a,g.innerHTML=""}const e=L.slice(h,h+S);for(const t of e){const a=await re(t);g.appendChild(a)}h+=S,h>=L.length?(n==null||n.classList.add("hidden"),n==null||n.setAttribute("disabled",!0)):(n==null||n.classList.remove("hidden"),n==null||n.removeAttribute("disabled"))}catch{alert("Failed to load artists. Please try again later."),n==null||n.classList.add("hidden"),n==null||n.setAttribute("disabled",!0)}finally{ne()}}function oe(){g=document.getElementById("artists"),n=document.getElementById("loadMoreBtn"),!(!g||!n)&&(n.onclick=T,T(),g.addEventListener("click",e=>{const t=e.target.closest(".learn-more-btn");if(t){const a=t.dataset.artistId;a&&ee(a)}}))}document.addEventListener("DOMContentLoaded",()=>{oe()});const ae=document.querySelector(".swiper-wrapper");document.addEventListener("DOMContentLoaded",()=>{const e=new R(".modal-product__slider",{loop:!1,modules:[U,_,Y],pagination:{el:".swiper-pagination",clickable:!0,renderBullet:function(s,c){return s===0?'<span class="'+c+' bullet left" data-slide="0"></span>':s===1?'<span class="'+c+' bullet center" data-slide="middle"></span>':s===2?'<span class="'+c+' bullet right" data-slide="last"></span>':""},bulletClass:"bullet",bulletActiveClass:"swiper-pagination-bullet-active"},navigation:{nextEl:".custom-next",prevEl:".custom-prev"},autoplay:{delay:5e3},on:{init(){i(this.realIndex,this.slides.length),l(this)},slideChange(){i(this.realIndex,this.slides.length)}}});async function t(){try{const r="https://sound-wave.b.goit.study/api"+"/feedbacks",o={limit:12};return(await x.get(r,{params:o})).data}catch(s){return console.error("Error fetching feedback:",s),null}}function a(s){let r="";for(let o=1;o<=5;o++){const u=o<=s?"star-filled":"star-empty";r+=`
       <svg class="star ${u}" width="20" height="19">
          <use href="/project-team-CodePaw/img/icons.svg#${o<=s,"icon-star"}"></use>
        </svg>
      `}return r}function d(s){const c=s.map(({_id:r,name:o,rating:u,descr:m})=>{const p=Math.round(u);return`
          <div class="swiper-slide" data-id="${r||""}">
            <div class="rating">
              <div class="star-rating">${a(p)}</div>
            </div>
            <p class='feed-back-descr'>"${m||""}"</p>
            <p class='feed-back-name'>${o||""}</p>
          </div>
        `}).join("");ae.innerHTML=c,e.update(),requestAnimationFrame(()=>{document.querySelector(".star-rating")})}function i(s,c){const r=document.querySelectorAll(".swiper-pagination .bullet");r.forEach(o=>o.classList.remove("swiper-pagination-bullet-active")),s===0?r[0].classList.add("swiper-pagination-bullet-active"):s===c-1?r[2].classList.add("swiper-pagination-bullet-active"):r[1].classList.add("swiper-pagination-bullet-active")}function l(s){var c,r,o;(c=document.querySelector(".bullet.left"))==null||c.addEventListener("click",()=>{s.slideTo(0)}),(r=document.querySelector(".bullet.center"))==null||r.addEventListener("click",()=>{const u=Math.floor((total-1)/2);s.slideTo(u)}),(o=document.querySelector(".bullet.right"))==null||o.addEventListener("click",()=>{s.slideTo(s.slides.length-1)})}t().then(s=>{if(s){const c=Array.isArray(s)?s:s.results||s.data||[];d(c)}})});
//# sourceMappingURL=index.js.map

import{a as T,S as B,N as G,P as R,A as U}from"./assets/vendor-SkZP4jF-.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const c of n)if(c.type==="childList")for(const s of c.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function i(n){const c={};return n.integrity&&(c.integrity=n.integrity),n.referrerPolicy&&(c.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?c.credentials="include":n.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function o(n){if(n.ep)return;n.ep=!0;const c=i(n);fetch(n.href,c)}})();const L=document.querySelector(".mobile-menu"),_=document.querySelector(".js-mobile-menu"),Y=document.querySelector(".js-mobile-close-menu"),E=document.querySelector(".js-mobile-backdrop");function K(){L.classList.add("is-open"),E.classList.add("is-active"),document.body.classList.add("no-scroll")}function y(){L.classList.remove("is-open"),E.classList.remove("is-active"),document.body.classList.remove("no-scroll")}_.onclick=K;Y.onclick=y;E.onclick=y;document.addEventListener("keydown",e=>{e.key==="Escape"&&y()});L.querySelectorAll('a[href^="#"]').forEach(e=>{e.onclick=y});const A=T.create({baseURL:"https://sound-wave.b.goit.study/api",timeout:5e3,headers:{"Content-Type":"application/json"}});A.interceptors.response.use(e=>e,e=>(alert("Сталася помилка при запиті до сервера. Спробуйте ще раз."),Promise.reject(e)));async function z(){try{return(await A.get("/artists")).data}catch(e){throw e}}async function J(e){try{return(await A.get(`/artists/${e}/albums`)).data}catch(t){throw t}}const w=document.querySelector("[data-modal]"),x=document.getElementById("modal-inner-content"),I=document.querySelector("[data-modal-backdrop]"),N=document.getElementById("loader");function Q(){N.classList.remove("is-hidden")}function k(){N.classList.add("is-hidden")}function V(){w.classList.remove("is-hidden"),document.body.style.overflow="hidden",document.addEventListener("keydown",P)}function $(){w.classList.add("is-hidden"),document.body.style.overflow="",document.removeEventListener("keydown",P),x.innerHTML=""}function P(e){e.key==="Escape"&&$()}function W(e){e.target===I&&$()}w.addEventListener("click",e=>{e.target.closest("[data-modal-close]")&&$()});I.addEventListener("click",W);function X(e){const t=Math.floor(e/1e3),i=Math.floor(t/60),o=t%60;return`${i}:${o.toString().padStart(2,"0")}`}async function Z(e){try{Q();const t=await J(e);k(),ee(t)}catch(t){k(),console.error("Error fetching artist:",t),alert("Не вдалося завантажити інформацію про виконавця.")}}function ee(e){const{strArtist:t,strArtistThumb:i,intFormedYear:o,intDiedYear:n,strGender:c,intMembers:s,strCountry:l,strBiographyEN:d,genres:a,albumsList:u}=e,m=s===1?`<li><strong>Sex:</strong> ${c||"—"}</li>`:`<li><strong>Members:</strong> ${s||"—"}</li>`,q=`
    <ul class="artist-meta-list">
      <li><strong>Years active:</strong> ${o&&n?`${o}–${n}`:o?`${o}–present`:"information missing"}</li>
      ${m}
      <li><strong>Country:</strong> ${l||"—"}</li>
    </ul>`,j=(a==null?void 0:a.map(v=>`<li>${v}</li>`).join(""))||"",M=(u==null?void 0:u.map(v=>{const{strAlbum:O,tracks:D}=v,F=D.map(p=>{const H=p.movie&&p.movie!=="null"?`<a href="${p.movie}" target="_blank" rel="noopener">
              <svg class="icon" width="24" height="24" fill="white">
                <use href="/project-team-CodePaw/img/icons.svg#icon-youtube"></use>
              </svg>
            </a>`:"";return`<li><span>${p.strTrack}</span><span>${X(p.intDuration)}</span>${H}</li>`}).join("");return`
      <div class="album-card">
        <h4>${O}</h4>
        <div class="track-header">
          <span>Track</span><span>Time</span><span>Link</span>
        </div>
        <ul class="track-list">${F}</ul>
      </div>`}).join(""))||"";x.innerHTML=`
    <button class="artist-modal-close" type="button" data-modal-close>
      <svg class="icon" width="14" height="14" fill="white">
        <use href="/project-team-CodePaw/img/icons.svg#icon-close"></use>
      </svg>
    </button>
    <h2 class="artist-modal-title">${t}</h2>
    <div class="artist-modal-info">
      <img src="${i||"https://placehold.co/300x300"}" alt="${t}" class="artist-modal-img" />
      <div class="artist-modal-bio">
        ${q}
        <div class="artist-bio">
          <h3 class="bio-title">Biography</h3>
          <p>${d||"—"}</p>
        </div>
        <ul class="artist-tags">${j}</ul>
      </div>
    </div>
    <div class="artist-albums">
      <h3>Albums</h3>
      <div class="album-grid">${M}</div>
    </div>
  `,V()}let f=0;const C=8;let b=[],h,r;function te(){const e=document.getElementById("loader");e&&e.classList.remove("hidden")}function se(){const e=document.getElementById("loader");e&&e.classList.add("hidden")}function ne(e){if(!e||typeof e!="object")return[];if(Array.isArray(e.genres)&&e.genres.length>0)return e.genres.filter(Boolean);const i=["strGenre","strGenre2","strGenre3","strStyle","strMood","strMood2","strMood3"].map(o=>e[o]).filter(o=>typeof o=="string"&&o.trim()).map(o=>o.trim()).filter((o,n,c)=>c.indexOf(o)===n);return i.length?i.join(", "):"N/A"}async function re(e){const t=document.createElement("div");t.className="artist-card";const i=document.createElement("img");i.src=e.strArtistThumb||"https://placehold.co/150x150/cccccc/333333?text=No+Image",i.alt=e.strArtist||"No Image",i.addEventListener("error",function(){this.src="https://placehold.co/150x150/cccccc/333333?text=No+Image",this.alt="No Image Available"}),t.appendChild(i);const o=document.createElement("h3");o.textContent=e.strArtist||"Unknown Artist",t.appendChild(o);const n=document.createElement("p"),c=document.createElement("strong");c.textContent="Genres: ",n.appendChild(c);const s=ne(e);if(s.length){const u=document.createElement("ul");u.classList.add("artist-genres-list"),s.forEach(g=>{const m=document.createElement("li");m.textContent=g,u.appendChild(m)}),n.appendChild(u)}else n.appendChild(document.createTextNode("N/A"));t.appendChild(n);const l=document.createElement("p");l.className="artist-description";const d=e.strBiographyEN||"No short info available.";l.textContent=d.length>200?d.slice(0,200)+"...":d,t.appendChild(l);const a=document.createElement("button");return a.className="learn-more-btn",a.textContent="Learn More",a.dataset.artistId=e._id,t.appendChild(a),t}async function S(){try{if(te(),f===0){const t=await z(),i=Array.isArray(t==null?void 0:t.artists)?t.artists:null;if(!i){alert("Error: Received invalid data from server."),r==null||r.classList.add("hidden"),r==null||r.setAttribute("disabled",!0);return}b=i,h.innerHTML=""}const e=b.slice(f,f+C);for(const t of e){const i=await re(t);h.appendChild(i)}f+=C,f>=b.length?(r==null||r.classList.add("hidden"),r==null||r.setAttribute("disabled",!0)):(r==null||r.classList.remove("hidden"),r==null||r.removeAttribute("disabled"))}catch{alert("Failed to load artists. Please try again later."),r==null||r.classList.add("hidden"),r==null||r.setAttribute("disabled",!0)}finally{se()}}function ie(){h=document.getElementById("artistsContainer"),r=document.getElementById("loadMoreBtn"),!(!h||!r)&&(r.onclick=S,S(),h.addEventListener("click",e=>{const t=e.target.closest(".learn-more-btn");if(t){const i=t.dataset.artistId;i&&Z(i)}}))}document.addEventListener("DOMContentLoaded",()=>{ie()});const oe=document.querySelector(".swiper-wrapper");document.addEventListener("DOMContentLoaded",()=>{const e=new B(".modal-product__slider",{loop:!1,modules:[G,R,U],pagination:{el:".swiper-pagination",clickable:!0,renderBullet:function(s,l){return s===0?'<span class="'+l+' bullet left" data-slide="0"></span>':s===1?'<span class="'+l+' bullet center" data-slide="middle"></span>':s===2?'<span class="'+l+' bullet right" data-slide="last"></span>':""},bulletClass:"bullet",bulletActiveClass:"swiper-pagination-bullet-active"},navigation:{nextEl:".custom-next",prevEl:".custom-prev"},autoplay:{delay:5e3},on:{init(){n(this.realIndex,this.slides.length),c(this)},slideChange(){n(this.realIndex,this.slides.length)}}});async function t(){try{const d="https://sound-wave.b.goit.study/api"+"/feedbacks",a={limit:12};return(await T.get(d,{params:a})).data}catch(s){return console.error("Error fetching feedback:",s),null}}function i(s){let d="";for(let a=1;a<=5;a++){const u=a<=s?"star-filled":"star-empty";d+=`
       <svg class="star ${u}" width="20" height="19">
          <use href="/project-team-CodePaw/img/icons.svg#${a<=s,"icon-star"}"></use>
        </svg>
      `}return d}function o(s){const l=s.map(({_id:d,name:a,rating:u,descr:g})=>{const m=Math.round(u);return`
          <div class="swiper-slide" data-id="${d||""}">
            <div class="rating">
              <div class="star-rating">${i(m)}</div>
            </div>
            <p class='feed-back-descr'>"${g||""}"</p>
            <p class='feed-back-name'>${a||""}</p>
          </div>
        `}).join("");oe.innerHTML=l,e.update(),requestAnimationFrame(()=>{document.querySelector(".star-rating")})}function n(s,l){const d=document.querySelectorAll(".swiper-pagination .bullet");d.forEach(a=>a.classList.remove("swiper-pagination-bullet-active")),s===0?d[0].classList.add("swiper-pagination-bullet-active"):s===l-1?d[2].classList.add("swiper-pagination-bullet-active"):d[1].classList.add("swiper-pagination-bullet-active")}function c(s){var l,d,a;(l=document.querySelector(".bullet.left"))==null||l.addEventListener("click",()=>{s.slideTo(0)}),(d=document.querySelector(".bullet.center"))==null||d.addEventListener("click",()=>{const u=Math.floor((total-1)/2);s.slideTo(u)}),(a=document.querySelector(".bullet.right"))==null||a.addEventListener("click",()=>{s.slideTo(s.slides.length-1)})}t().then(s=>{if(s){const l=Array.isArray(s)?s:s.results||s.data||[];o(l)}})});
//# sourceMappingURL=index.js.map

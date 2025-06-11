import{a as T,S as R,N as B,P as G,A as _}from"./assets/vendor-SkZP4jF-.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const c of n)if(c.type==="childList")for(const s of c.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function i(n){const c={};return n.integrity&&(c.integrity=n.integrity),n.referrerPolicy&&(c.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?c.credentials="include":n.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function o(n){if(n.ep)return;n.ep=!0;const c=i(n);fetch(n.href,c)}})();const v=document.querySelector(".mobile-menu"),U=document.querySelector(".js-mobile-menu"),Y=document.querySelector(".js-mobile-close-menu"),L=document.querySelector(".js-mobile-backdrop");function K(){v.classList.add("is-open"),L.classList.add("is-active"),document.body.classList.add("no-scroll")}function h(){v.classList.remove("is-open"),L.classList.remove("is-active"),document.body.classList.remove("no-scroll")}U.onclick=K;Y.onclick=h;L.onclick=h;document.addEventListener("keydown",e=>{e.key==="Escape"&&h()});v.querySelectorAll('a[href^="#"]').forEach(e=>{e.onclick=h});const A=T.create({baseURL:"https://sound-wave.b.goit.study/api",timeout:5e3,headers:{"Content-Type":"application/json"}});A.interceptors.response.use(e=>e,e=>(alert("Сталася помилка при запиті до сервера. Спробуйте ще раз."),Promise.reject(e)));async function z(){try{return(await A.get("/artists")).data}catch(e){throw e}}async function J(e){try{return(await A.get(`/artists/${e}/albums`)).data}catch(t){throw t}}const E=document.querySelector("[data-modal]"),I=document.getElementById("modal-inner-content"),x=document.querySelector("[data-modal-backdrop]"),N=document.getElementById("loader");function Q(){N.classList.remove("is-hidden")}function k(){N.classList.add("is-hidden")}function V(){E.classList.remove("is-hidden"),document.body.style.overflow="hidden",document.addEventListener("keydown",P)}function $(){E.classList.add("is-hidden"),document.body.style.overflow="",document.removeEventListener("keydown",P),I.innerHTML=""}function P(e){e.key==="Escape"&&$()}function W(e){e.target===x&&$()}E.addEventListener("click",e=>{e.target.closest("[data-modal-close]")&&$()});x.addEventListener("click",W);function X(e){const t=Math.floor(e/1e3),i=Math.floor(t/60),o=t%60;return`${i}:${o.toString().padStart(2,"0")}`}async function Z(e){try{Q();const t=await J(e);k(),ee(t)}catch(t){k(),console.error("Error fetching artist:",t),alert("Не вдалося завантажити інформацію про виконавця.")}}function ee(e){const{strArtist:t,strArtistThumb:i,intFormedYear:o,intDiedYear:n,strGender:c,intMembers:s,strCountry:a,strBiographyEN:d,genres:l,albumsList:u}=e,g=s===1?`<li><strong>Sex:</strong> ${c||"—"}</li>`:`<li><strong>Members:</strong> ${s||"—"}</li>`,j=`
    <ul class="artist-meta-list">
      <li><strong>Years active:</strong> ${o&&n?`${o}–${n}`:o?`${o}–present`:"information missing"}</li>
      ${g}
      <li><strong>Country:</strong> ${a||"—"}</li>
    </ul>`,q=(l==null?void 0:l.map(y=>`<li>${y}</li>`).join(""))||"",M=(u==null?void 0:u.map(y=>{const{strAlbum:D,tracks:O}=y,H=O.map(m=>{const F=m.movie&&m.movie!=="null"?`<a href="${m.movie}" target="_blank" rel="noopener">
              <svg class="icon" width="24" height="24" fill="white">
                <use href="/project-team-CodePaw/img/icons.svg#icon-youtube"></use>
              </svg>
            </a>`:"";return`<li><span>${m.strTrack}</span><span>${X(m.intDuration)}</span>${F}</li>`}).join("");return`
      <div class="album-card">
        <h4>${D}</h4>
        <div class="track-header">
          <span>Track</span><span>Time</span><span>Link</span>
        </div>
        <ul class="track-list">${H}</ul>
      </div>`}).join(""))||"";I.innerHTML=`
    <button class="artist-modal-close" type="button" data-modal-close>
      <svg class="icon" width="14" height="14" fill="white">
        <use href="/project-team-CodePaw/img/icons.svg#icon-close"></use>
      </svg>
    </button>
    <h2 class="artist-modal-title">${t}</h2>
    <div class="artist-modal-info">
      <img src="${i||"https://placehold.co/300x300"}" alt="${t}" class="artist-modal-img" />
      <div class="artist-modal-bio">
        ${j}
        <div class="artist-bio">
          <h3 class="bio-title">Biography</h3>
          <p>${d||"—"}</p>
        </div>
        <ul class="artist-tags">${q}</ul>
      </div>
    </div>
    <div class="artist-albums">
      <h3>Albums</h3>
      <div class="album-grid">${M}</div>
    </div>
  `,V()}let p=0;const C=8;let b=[],f,r;function te(){const e=document.getElementById("loader");e&&e.classList.remove("hidden")}function se(){const e=document.getElementById("loader");e&&e.classList.add("hidden")}function ne(e){if(!e||typeof e!="object")return"N/A";if(Array.isArray(e.genres)&&e.genres.length>0)return e.genres.filter(Boolean).join(", ");const i=["strGenre","strGenre2","strGenre3","strStyle","strMood","strMood2","strMood3"].map(o=>e[o]).filter(o=>typeof o=="string"&&o.trim()).map(o=>o.trim()).filter((o,n,c)=>c.indexOf(o)===n);return i.length?i.join(", "):"N/A"}async function re(e){const t=document.createElement("div");t.className="artist-card";const i=document.createElement("img");i.src=e.strArtistThumb||"https://placehold.co/150x150/cccccc/333333?text=No+Image",i.alt=e.strArtist||"No Image",i.addEventListener("error",function(){this.src="https://placehold.co/150x150/cccccc/333333?text=No+Image",this.alt="No Image Available"}),t.appendChild(i);const o=document.createElement("h3");o.textContent=e.strArtist||"Unknown Artist",t.appendChild(o);const n=document.createElement("p"),c=document.createElement("strong");c.textContent="Genres: ",n.appendChild(c);const s=document.createTextNode(ne(e));n.appendChild(s),t.appendChild(n);const a=document.createElement("p");a.className="artist-description";const d=e.strBiographyEN||"No short info available.";a.textContent=d.length>200?d.slice(0,200)+"...":d,t.appendChild(a);const l=document.createElement("button");return l.className="learn-more-btn",l.textContent="Learn More",l.dataset.artistId=e._id,t.appendChild(l),t}async function S(){try{if(te(),p===0){const t=await z(),i=Array.isArray(t==null?void 0:t.artists)?t.artists:null;if(!i){alert("Error: Received invalid data from server."),r==null||r.classList.add("hidden"),r==null||r.setAttribute("disabled",!0);return}b=i,f.innerHTML=""}const e=b.slice(p,p+C);for(const t of e){const i=await re(t);f.appendChild(i)}p+=C,p>=b.length?(r==null||r.classList.add("hidden"),r==null||r.setAttribute("disabled",!0)):(r==null||r.classList.remove("hidden"),r==null||r.removeAttribute("disabled"))}catch{alert("Failed to load artists. Please try again later."),r==null||r.classList.add("hidden"),r==null||r.setAttribute("disabled",!0)}finally{se()}}function ie(){f=document.getElementById("artistsContainer"),r=document.getElementById("loadMoreBtn"),!(!f||!r)&&(r.onclick=S,S(),f.addEventListener("click",e=>{const t=e.target.closest(".learn-more-btn");if(t){const i=t.dataset.artistId;i&&Z(i)}}))}document.addEventListener("DOMContentLoaded",()=>{ie()});const oe=document.querySelector(".swiper-wrapper");document.addEventListener("DOMContentLoaded",()=>{const e=new R(".modal-product__slider",{loop:!1,modules:[B,G,_],pagination:{el:".swiper-pagination",clickable:!0,renderBullet:function(s,a){return s===0?'<span class="'+a+' bullet left" data-slide="0"></span>':s===1?'<span class="'+a+' bullet center" data-slide="middle"></span>':s===2?'<span class="'+a+' bullet right" data-slide="last"></span>':""},bulletClass:"bullet",bulletActiveClass:"swiper-pagination-bullet-active"},navigation:{nextEl:".custom-next",prevEl:".custom-prev"},autoplay:{delay:5e3},on:{init(){n(this.realIndex,this.slides.length),c(this)},slideChange(){n(this.realIndex,this.slides.length)}}});async function t(){try{const d="https://sound-wave.b.goit.study/api"+"/feedbacks",l={limit:12},u=await T.get(d,{params:l});return console.log("API Data:",u.data),u.data}catch(s){return console.error("Error fetching feedback:",s),null}}function i(s){const a=s.map(({_id:d,name:l,rating:u,descr:w})=>{const g=Math.round(u);return console.log("Rating for",l,":",g),`
          <div class="swiper-slide" data-id="${d||""}">
            <div class="rating" data-rating="${g}"></div>
            <p class='feed-back-descr'>${w||""}</p>
            <p class='feed-back-name'>${l||""}</p>
          </div>
        `}).join("");oe.innerHTML=a,o(),e.update()}function o(){document.querySelectorAll(".rating").forEach(s=>{const a=parseInt(s.dataset.rating);if(isNaN(a)){console.error("Invalid rating value:",s.dataset.rating);return}s.innerHTML=`
        <span class="star-rating">
          ${[...Array(5)].map((d,l)=>`<span class="star ${l<a?"filled":""}">★</span>`).join("")}
        </span>
      `})}function n(s,a){const d=document.querySelectorAll(".swiper-pagination .bullet");d.forEach(l=>l.classList.remove("swiper-pagination-bullet-active")),s===0?d[0].classList.add("swiper-pagination-bullet-active"):s===a-1?d[2].classList.add("swiper-pagination-bullet-active"):d[1].classList.add("swiper-pagination-bullet-active")}function c(s){var a,d,l;(a=document.querySelector(".bullet.left"))==null||a.addEventListener("click",()=>{s.slideTo(0)}),(d=document.querySelector(".bullet.center"))==null||d.addEventListener("click",()=>{const u=Math.floor((total-1)/2);s.slideTo(u)}),(l=document.querySelector(".bullet.right"))==null||l.addEventListener("click",()=>{s.slideTo(s.slides.length-1)})}t().then(s=>{if(s){const a=Array.isArray(s)?s:s.results||s.data||[];i(a)}})});
//# sourceMappingURL=index.js.map

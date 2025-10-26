/* script.js — interactive logic for Editkaro portfolio */

/**
 * Sample DATA: Replace 'videoId' values with your own YouTube IDs or provide direct video URLs.
 * categories: short, long, gaming, football, ecommerce, documentary, colorgrade, anime, ads
 */
const VIDEOS = [
  { id: 'v1', title: 'Explosive Reels — Fast Cuts', category: 'short', tags: ['reel','short','ads'], src:'https://drive.google.com/file/d/1J7-y1pb5rrLQlphXVhK03wWtwH0aveBH/view?usp=sharing', isGDrive:true, thumbnail: 'thumbnails/t1.png' },
  { id: 'v2', title: 'Product Ad — eCommerce Showcase', category: 'ecommerce', tags: ['ad','product'], src:'https://drive.google.com/file/d/1ulQpGEhvI-ATS5sBwQJ_erGoe_tkSGf7/view?usp=sharing', isGDrive:true,thumbnail: 'thumbnails/t2.png'},
  { id: 'v3', title: 'Gaming Montage — Highlights', category: 'gaming', tags: ['gaming','montage'], src:'https://drive.google.com/file/d/1ZmtXXfOCE7o7jHJyoWLHuyN3BCtgxtUY/view?usp=sharing', isGDrive:true,thumbnail: 'thumbnails/t3.png'},
  { id: 'v4', title: 'Football Edit — Match Highlights', category: 'football', tags: ['football','sports'], src:'https://drive.google.com/file/d/1ASvDKUmCYZbz8kf-TxthAEw0o4ZM9bBa/view?usp=sharing', isGDrive:true,thumbnail: 'thumbnails/t4.png'},
  { id: 'v5', title: 'Documentary — Short Story', category: 'documentary', tags: ['doc','story'], src:'https://drive.google.com/file/d/1Mui0nTHMgDKrMCXuHxyANNO0dgPfN3ur/view?usp=sharing', isGDrive:true,thumbnail: 'thumbnails/t5.png'},
  { id: 'v6', title: 'Color Grade Reel — Cinematic', category: 'colorgrade', tags: ['color','grading'], src:'https://drive.google.com/file/d/1sPihGq0DrBEYQNahvWgANjWjVRAfzoa-/view?usp=sharing', isGDrive:true,thumbnail: 'thumbnails/t6.png'},
  { id: 'v7', title: 'Anime Cut — Motion Edit', category: 'anime', tags: ['anime','motion'], src:'https://drive.google.com/file/d/1DYZVcmwf9ItUkBMOndKINziOnGJlfXAm/view?usp=sharing', isGDrive:true,thumbnail: 'thumbnails/t7.png'},
  { id: 'v8', title: 'Long Form — Mini Documentary', category: 'long', tags: ['longform','doc'], videoId: '60ItHLz5WEA'},
  { id: 'v9', title: 'Mid-form Ad — Emotional Story', category: 'ads', tags: ['ad','story'], src:'https://drive.google.com/file/d/1ilG7Ap7gfeQuQ-rw3-jNfy2w_2Pwed-e/view?usp=sharing', isGDrive:true,thumbnail: 'thumbnails/t9.png'},
];

/* categories to show in filter bar (ordered) */
const CATEGORIES = [
  { key:'all', label:'All' },
  { key:'short', label:'Short-form' },
  { key:'long', label:'Long-form' },
  { key:'gaming', label:'Gaming' },
  { key:'football', label:'Football Edits' },
  { key:'ecommerce', label:'eCommerce Ads' },
  { key:'documentary', label:'Documentary' },
  { key:'colorgrade', label:'Color Grading' },
  { key:'anime', label:'Anime' },
  { key:'ads', label:'Ads' }
];

const grid = document.getElementById('grid');
const catBar = document.getElementById('category-bar');
const searchInput = document.getElementById('search');
const clearSearchBtn = document.getElementById('clear-search');
const emptyState = document.getElementById('empty-state');
const resetFiltersBtn = document.getElementById('reset-filters');

let activeCategory = 'all';
let searchQuery = '';

/* --- helper to get youtube thumbnail url --- */
function getThumbnail(video) {
  // ✅ If a local thumbnail is provided, use that.
  if (video.thumbnail) return video.thumbnail;

  // ✅ If using YouTube videoId, generate thumbnail link.
  if (video.videoId) return `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`;

  // ✅ Fallback thumbnail if nothing else.
  return 'default-thumb.jpg';
}


/* --- render category buttons --- */
function renderCategoryBar(){
  catBar.innerHTML = '';
  CATEGORIES.forEach(cat=>{
    const btn = document.createElement('button');
    btn.className = 'filter-btn';
    btn.type = 'button';
    btn.setAttribute('aria-pressed', cat.key === activeCategory ? 'true' : 'false');
    btn.dataset.key = cat.key;
    btn.textContent = cat.label;
    btn.addEventListener('click', ()=> {
      activeCategory = cat.key;
      // Toggle visibility of home content sections
      const homeContentSections = document.querySelectorAll('#home-content');
      homeContentSections.forEach(section => {
        if (cat.key === 'all') {
          section.style.display = 'block';
        } else {
          section.style.display = 'none';
        }
      });
      renderCategoryBar();
      renderGrid();
    });
    catBar.appendChild(btn);
  });
}

/* --- render grid based on filters --- */
function filterVideos(){
  const q = searchQuery.trim().toLowerCase();
  return VIDEOS.filter(v=>{
    if(activeCategory !== 'all' && v.category !== activeCategory) return false;
    if(!q) return true;
    return v.title.toLowerCase().includes(q) || v.tags.some(t=> t.includes(q));
  });
}

function renderGrid(){
  const list = filterVideos();
  grid.innerHTML = '';
  if(list.length === 0){
    emptyState.hidden = false;
    return;
  } else {
    emptyState.hidden = true;
  }

  list.forEach(v=>{
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <div class="poster" role="button" tabindex="0" aria-label="Open ${escapeHtml(v.title)}">
        <img loading="lazy" alt="${escapeHtml(v.title)} poster" src="${getThumbnail(v)}" onerror="this.style.opacity=0.9;"/>
        <div class="play-overlay"><div class="play-badge">▶</div></div>
      </div>
      <div class="card-body">
        <h3 class="title-sm">${escapeHtml(v.title)}</h3>
        <div class="meta-row-card">
          <div class="tag-chip">${v.category}</div>
          <div style="flex:1"></div>
          <div class="meta-mini">${v.tags.join(', ')}</div>
        </div>
        <div class="card-actions">
          <button class="btn" data-id="${v.id}" aria-label="Open ${escapeHtml(v.title)}">Preview</button>
          <button class="btn primary" data-id="${v.id}">Watch</button>
        </div>
      </div>
    `;
    // click poster -> open lightbox
    card.querySelector('.poster').addEventListener('click', ()=> openLightbox(v));
    card.querySelector('.poster').addEventListener('keydown', (e)=>{
      if(e.key === 'Enter' || e.key === ' ') openLightbox(v);
    });

    // actions
    card.querySelectorAll('.card-actions .btn').forEach(b=>{
      b.addEventListener('click', (e)=>{
        const id = e.currentTarget.dataset.id;
        const vid = VIDEOS.find(x=>x.id===id);
        openLightbox(vid);
      });
    });

    grid.appendChild(card);
  });
}

/* escape helper to avoid injection in inserted text */
function escapeHtml(s){ return String(s).replace(/[&<>"']/g, (c)=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' })[c]); }

/* --- Lightbox --- */
const lightbox = document.getElementById('lightbox');
const lbClose = document.getElementById('lightbox-close');
const playerWrap = document.getElementById('player-wrap');
const videoTitleEl = document.getElementById('video-title');
const videoDescEl = document.getElementById('video-desc');

function getGoogleDriveEmbedUrl(url) {
  // Extract file ID from Google Drive sharing URL
  const fileIdMatch = url.match(/\/d\/([^/]+)/);
  if (!fileIdMatch) return null;
  const fileId = fileIdMatch[1];
  return `https://drive.google.com/file/d/${fileId}/preview`;
}

function openLightbox(video){
  // clear previous
  playerWrap.innerHTML = '';
  // show title/desc
  videoTitleEl.textContent = video.title;
  videoDescEl.textContent = `Category: ${video.category} • Tags: ${video.tags.join(', ')}`;

  // if videoId looks like a youtube id string -> embed iframe
  if(video.isGDrive) {
    const embedUrl = getGoogleDriveEmbedUrl(video.src);
    if (embedUrl) {
      const iframe = document.createElement('iframe');
      iframe.width = '100%';
      iframe.height = '480';
      iframe.src = embedUrl;
      iframe.frameBorder = '0';
      iframe.allow = 'autoplay; encrypted-media';
      iframe.allowFullscreen = true;
      playerWrap.appendChild(iframe);
    } else {
      playerWrap.innerHTML = '<div style="padding:40px;color:#fff;">Invalid Google Drive URL</div>';
    }
  }
  else if(video.videoId && !video.src){
    const iframe = document.createElement('iframe');
    iframe.width = '100%';
    iframe.height = '480';
    iframe.src = `https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0&modestbranding=1`;
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    playerWrap.appendChild(iframe);
  } else if(video.src){
    const vid = document.createElement('video');
    vid.src = video.src;
    vid.controls = true;
    vid.autoplay = true;
    playerWrap.appendChild(vid);
  } else {
    playerWrap.innerHTML = '<div style="padding:40px;color:#fff;">No playable source available.</div>';
  }

  lightbox.setAttribute('aria-hidden', 'false');
  history.pushState({lightbox: true}, '', '#play'); // optional: URL change
  // trap focus? minimal: move focus to close button
  lbClose.focus();
}

/* close */
function closeLightbox(){
  // remove player for cleanup
  playerWrap.innerHTML = '';
  lightbox.setAttribute('aria-hidden', 'true');
  try{ history.back(); } catch(e){}
}

/* keyboard & click outs */
lbClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e)=>{ if(e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape' && lightbox.getAttribute('aria-hidden')==='false') closeLightbox(); });

/* --- search & clear --- */
searchInput.addEventListener('input', (e)=>{
  searchQuery = e.target.value;
  renderGrid();
});
clearSearchBtn.addEventListener('click', ()=>{
  searchInput.value = '';
  searchQuery = '';
  renderGrid();
});

/* reset filters */
if(resetFiltersBtn) resetFiltersBtn.addEventListener('click', ()=>{
  activeCategory = 'all';
  searchQuery = '';
  searchInput.value = '';
  renderCategoryBar();
  renderGrid();
});

/* initial render */
renderCategoryBar();
renderGrid();

/* accessibility: close on historyback if lightbox open */
window.addEventListener('popstate', (e)=>{
  if(lightbox.getAttribute('aria-hidden') === 'false') closeLightbox();
});

/* optional: lazy preloads or intersection observer for performance can be added here */

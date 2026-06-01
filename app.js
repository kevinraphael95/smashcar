/* ═══════════════════════════════════════
   SMASH OR PASS — Cars Edition
   app.js
═══════════════════════════════════════ */

'use strict';

/* ── Car Database ────────────────────────────────────────────────────────────
   Images sourced from reliable CDNs (Unsplash, Wikimedia direct, etc.)
   to avoid hotlink bans & CORS issues.
   ──────────────────────────────────────────────────────────────────────── */
const CARS = [
  {
    id: 1,
    make: 'Ferrari', model: 'LaFerrari', year: '2015',
    cat: 'Hypercar', flag: '🇮🇹',
    hp: '963', top: '350', accel: '2.4', price: '1.4 M€',
    desc: 'Le sommet technologique de Maranello : V12 + moteur électrique KERS. Seulement 499 exemplaires.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Ferrari_LaFerrari.jpg/960px-Ferrari_LaFerrari.jpg'
  },
  {
    id: 2,
    make: 'Lamborghini', model: 'Aventador SVJ', year: '2019',
    cat: 'Supercar', flag: '🇮🇹',
    hp: '770', top: '351', accel: '2.8', price: '460 k€',
    desc: 'V12 naturellement aspiré, ALA 2.0 aérodynamique active. Record Nürburgring en production.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Lamborghini_Aventador_SVJ_-_2019_%28cropped%29.jpg/960px-Lamborghini_Aventador_SVJ_-_2019_%28cropped%29.jpg'
  },
  {
    id: 3,
    make: 'Bugatti', model: 'Veyron SS', year: '2012',
    cat: 'Hypercar', flag: '🇫🇷',
    hp: '1200', top: '431', accel: '2.5', price: '1.9 M€',
    desc: '16 cylindres, 4 turbos. Ex-voiture de série la plus rapide du monde à 431 km/h.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Bugatti_Veyron_16.4_Super_Sport_-_Flickr_-_Alexandre_Pr%C3%A9vot_%281_of_3%29.jpg/960px-Bugatti_Veyron_16.4_Super_Sport_-_Flickr_-_Alexandre_Pr%C3%A9vot_%281_of_3%29.jpg'
  },
  {
    id: 4,
    make: 'McLaren', model: 'P1', year: '2013',
    cat: 'Hypercar', flag: '🇬🇧',
    hp: '916', top: '350', accel: '2.8', price: '1.1 M€',
    desc: 'Hybride révolutionnaire combinant V8 twin-turbo et moteur électrique. Successeur de la F1.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/McLaren_P1_-_Goodwood_Festival_of_Speed_2013_%288985601519%29.jpg/960px-McLaren_P1_-_Goodwood_Festival_of_Speed_2013_%288985601519%29.jpg'
  },
  {
    id: 5,
    make: 'Porsche', model: '918 Spyder', year: '2014',
    cat: 'Hypercar', flag: '🇩🇪',
    hp: '887', top: '345', accel: '2.5', price: '780 k€',
    desc: 'Triple motorisation, record au Nürburgring. La Sainte Trinité des hypercars hybrides.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Porsche_918_Spyder_-_Mondial_de_l%27Automobile_de_Paris_2014_-_002.jpg/960px-Porsche_918_Spyder_-_Mondial_de_l%27Automobile_de_Paris_2014_-_002.jpg'
  },
  {
    id: 6,
    make: 'Koenigsegg', model: 'Agera RS', year: '2017',
    cat: 'Hypercar', flag: '🇸🇪',
    hp: '1360', top: '458', accel: '2.8', price: '2.1 M€',
    desc: 'Détenteur de 5 records mondiaux. 458 km/h sur route fermée en Nevada. Suédois pur.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Koenigsegg_Agera_%28Goodwood_2012%29.jpg/960px-Koenigsegg_Agera_%28Goodwood_2012%29.jpg'
  },
  {
    id: 7,
    make: 'Pagani', model: 'Huayra', year: '2012',
    cat: 'Hypercar', flag: '🇮🇹',
    hp: '730', top: '370', accel: '3.3', price: '1.4 M€',
    desc: 'Chef-d\'œuvre artisanal argentin-italien. Carbone titane, Mercedes AMG V12 biturbo.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Pagani_Huayra_-_Goodwood_Festival_of_Speed_2012_%287539562906%29.jpg/960px-Pagani_Huayra_-_Goodwood_Festival_of_Speed_2012_%287539562906%29.jpg'
  },
  {
    id: 8,
    make: 'Ferrari', model: 'Enzo', year: '2003',
    cat: 'Supercar', flag: '🇮🇹',
    hp: '660', top: '355', accel: '3.6', price: '3 M€',
    desc: 'Technologie F1 pour la route. 400 unités produites. Icône absolue de Maranello.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Ferrari_Enzo_Ferrari.JPG/960px-Ferrari_Enzo_Ferrari.JPG'
  },
  {
    id: 9,
    make: 'Lamborghini', model: 'Murciélago LP670', year: '2009',
    cat: 'Supercar', flag: '🇮🇹',
    hp: '670', top: '342', accel: '3.2', price: '450 k€',
    desc: 'V12 6.5L à couper le souffle. Le SuperVeloce ultime avant l\'Aventador. Légende.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Lamborghini_Murchielago_LP_670-4_SuperVeloce_%28Ank_Kumar%29.jpg/960px-Lamborghini_Murchielago_LP_670-4_SuperVeloce_%28Ank_Kumar%29.jpg'
  },
  {
    id: 10,
    make: 'Aston Martin', model: 'One-77', year: '2011',
    cat: 'Hypercar', flag: '🇬🇧',
    hp: '750', top: '354', accel: '3.5', price: '1.4 M€',
    desc: '77 exemplaires, carrosserie en fibre de carbone. V12 atmosphérique le plus puissant de série.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Aston_Martin_One-77_%28Ank_Kumar%29_06.jpg/960px-Aston_Martin_One-77_%28Ank_Kumar%29_06.jpg'
  },
  {
    id: 11,
    make: 'McLaren', model: 'F1', year: '1994',
    cat: 'Légendaire', flag: '🇬🇧',
    hp: '627', top: '386', accel: '3.2', price: '20 M€',
    desc: 'Gordon Murray. V12 BMW. Siège conducteur central. Longtemps la voiture la plus rapide du monde.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/McLaren_F1_LM_%2B_McLaren_F1%2C_Donington_2012_%287629596148%29.jpg/960px-McLaren_F1_LM_%2B_McLaren_F1%2C_Donington_2012_%287629596148%29.jpg'
  },
  {
    id: 12,
    make: 'Bugatti', model: 'Chiron', year: '2017',
    cat: 'Hypercar', flag: '🇫🇷',
    hp: '1500', top: '420', accel: '2.4', price: '3 M€',
    desc: 'Successeur de la Veyron. W16 quad-turbo. 1500 chevaux et un luxe insondable.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Bugatti_Chiron_2019_trimmed.jpg/960px-Bugatti_Chiron_2019_trimmed.jpg'
  },
  {
    id: 13,
    make: 'Ferrari', model: '488 Pista', year: '2018',
    cat: 'Supercar', flag: '🇮🇹',
    hp: '720', top: '340', accel: '2.85', price: '280 k€',
    desc: 'Version piste de la 488 : 50 kg de moins, 50 ch de plus. Polyvalence et brutalité.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/2019_Ferrari_488_Pista_%28facelift%2C_red%29%2C_front_8.15.19.jpg/960px-2019_Ferrari_488_Pista_%28facelift%2C_red%29%2C_front_8.15.19.jpg'
  },
  {
    id: 14,
    make: 'Lamborghini', model: 'Huracán EVO', year: '2020',
    cat: 'Supercar', flag: '🇮🇹',
    hp: '640', top: '325', accel: '2.9', price: '215 k€',
    desc: 'V10 5.2L, 4WD, ALA actif. Le quotidien de rêve des supercars italiennes.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/2019_Lamborghini_Huracan_Evo_%28facelift%2C_yellow%29%2C_front_8.15.19.jpg/960px-2019_Lamborghini_Huracan_Evo_%28facelift%2C_yellow%29%2C_front_8.15.19.jpg'
  },
  {
    id: 15,
    make: 'Rimac', model: 'Nevera', year: '2022',
    cat: 'Électrique', flag: '🇭🇷',
    hp: '1914', top: '412', accel: '1.97', price: '2.2 M€',
    desc: '1914 ch électriques. 0–100 en 1.97 s. La voiture de production la plus rapide jamais construite.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Rimac_Nevera_Spa-Francorchamps_2022.jpg/960px-Rimac_Nevera_Spa-Francorchamps_2022.jpg'
  },
  {
    id: 16,
    make: 'Ford', model: 'GT', year: '2017',
    cat: 'Supercar', flag: '🇺🇸',
    hp: '647', top: '347', accel: '3.1', price: '500 k€',
    desc: 'Rend hommage au légendaire GT40 vainqueur du Mans en 1966. Aéro inspirée F1.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/2017_Ford_GT_-_front_%28Reg%29.jpg/960px-2017_Ford_GT_-_front_%28Reg%29.jpg'
  },
  {
    id: 17,
    make: 'Chevrolet', model: 'Corvette Z06', year: '2023',
    cat: 'Supercar', flag: '🇺🇸',
    hp: '670', top: '312', accel: '2.6', price: '110 k€',
    desc: 'Flat-plane V8 à moteur central. Agressivité américaine au prix d\'une compacte européenne.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/2023_Chevrolet_Corvette_Z06_in_Rapid_Blue%2C_front_11.19.22.jpg/960px-2023_Chevrolet_Corvette_Z06_in_Rapid_Blue%2C_front_11.19.22.jpg'
  },
  {
    id: 18,
    make: 'Porsche', model: '911 GT3 RS', year: '2022',
    cat: 'Supercar', flag: '🇩🇪',
    hp: '525', top: '296', accel: '3.2', price: '230 k€',
    desc: 'Flat-6 atmosphérique, boîte PDK, aileron immense. La perfection selon Stuttgart.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Porsche_911_GT3_RS_%28992%29_-_front%2C_Autoshow_Brussels_2023.jpg/960px-Porsche_911_GT3_RS_%28992%29_-_front%2C_Autoshow_Brussels_2023.jpg'
  },
  {
    id: 19,
    make: 'Mercedes-AMG', model: 'ONE', year: '2023',
    cat: 'Hypercar', flag: '🇩🇪',
    hp: '1063', top: '352', accel: '2.9', price: '2.7 M€',
    desc: 'Moteur F1 hybride homologué route. 4 moteurs électriques + V6 1.6L turbo.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Mercedes-AMG_ONE_-_IAA_2021_2_%28cropped%29.jpg/960px-Mercedes-AMG_ONE_-_IAA_2021_2_%28cropped%29.jpg'
  },
  {
    id: 20,
    make: 'Maserati', model: 'MC20', year: '2021',
    cat: 'Supercar', flag: '🇮🇹',
    hp: '630', top: '325', accel: '2.9', price: '230 k€',
    desc: 'Retour aux sources pour Maserati. Moteur Nettuno V6 biturbo. Carbone et passion italienne.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Maserati_MC20_front.jpg/960px-Maserati_MC20_front.jpg'
  },
  {
    id: 21,
    make: 'Aston Martin', model: 'Valkyrie', year: '2021',
    cat: 'Hypercar', flag: '🇬🇧',
    hp: '1160', top: '402', accel: '2.5', price: '3.2 M€',
    desc: 'Conçu par Adrian Newey. V12 Cosworth + KERS. Formule 1 légale sur route.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Aston_Martin_Valkyrie_Goodwood_2021.jpg/960px-Aston_Martin_Valkyrie_Goodwood_2021.jpg'
  },
  {
    id: 22,
    make: 'Ferrari', model: 'F40', year: '1992',
    cat: 'Légendaire', flag: '🇮🇹',
    hp: '478', top: '324', accel: '3.9', price: '1.8 M€',
    desc: 'Dernière Ferrari signée par Enzo. Aucun luxe, aucune concession. Pure et absolue.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Ferrari_F40_1987_red_lr.jpg/960px-Ferrari_F40_1987_red_lr.jpg'
  }
];

/* ── State ───────────────────────────── */
let queue        = [];
let smashed      = [];
let passedCount  = 0;
let smashedCount = 0;
let currentCar   = null;
let isAnimating  = false;
let cardCounter  = 0;

/* Drag state */
let dragging = false;
let dragStartX = 0;
let dragStartY = 0;
let curDeltaX  = 0;
let curDeltaY  = 0;

/* ── DOM refs ────────────────────────── */
const frontCard  = document.getElementById('cFront');
const imgFront   = document.getElementById('imgFront');
const sFront     = document.getElementById('sFront');
const vindSmash  = document.getElementById('vindSmash');
const vindPass   = document.getElementById('vindPass');
const btnPass    = document.getElementById('btnPass');
const btnSmash   = document.getElementById('btnSmash');
const toastEl    = document.getElementById('toast');

/* ── Utilities ───────────────────────── */

/** Fisher-Yates shuffle (in-place, returns array) */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function catIcon(cat) {
  const MAP = { Légendaire: '🏆', Hypercar: '⚡', Électrique: '🔋' };
  return MAP[cat] ?? '🔥';
}

/** Preload an image URL without attaching it to the DOM */
function preload(url) {
  if (!url) return;
  const img = new Image();
  img.src = url;
}

let toastTimer = null;
function showToast(msg, color) {
  clearTimeout(toastTimer);
  toastEl.textContent = msg;
  toastEl.style.borderColor = color ?? '#fff';
  toastEl.classList.add('show');
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 1900);
}

function setButtons(disabled) {
  btnPass.disabled  = disabled;
  btnSmash.disabled = disabled;
}

/* ── Queue Management ────────────────── */

function refill() {
  const copy = [...CARS];
  shuffle(copy);
  queue.push(...copy);
}

function ensureQueue(min = 4) {
  if (queue.length < min) refill();
}

/* ── Card Rendering ──────────────────── */

function renderCard(car) {
  if (!car) return;

  cardCounter++;
  document.getElementById('cardNum').textContent  = `#${cardCounter}`;
  document.getElementById('cardFlag').textContent  = car.flag;
  document.getElementById('cardMake').textContent  = car.make;
  document.getElementById('cardModel').textContent = car.model;
  document.getElementById('cardYear').textContent  = car.year;
  document.getElementById('cardCat').innerHTML     = `${catIcon(car.cat)} ${car.cat}`;
  document.getElementById('cardDesc').textContent  = car.desc;

  document.getElementById('cardStats').innerHTML = `
    <div class="stat">
      <div class="stat-val">${car.hp}</div>
      <div class="stat-label">Ch</div>
    </div>
    <div class="stat">
      <div class="stat-val">${car.accel}s</div>
      <div class="stat-label">0–100</div>
    </div>
    <div class="stat">
      <div class="stat-val">${car.top}</div>
      <div class="stat-label">km/h max</div>
    </div>`;

  /* Reset image */
  sFront.style.display = 'block';
  imgFront.classList.remove('visible');
  imgFront.src = '';

  imgFront.onload  = () => { imgFront.classList.add('visible'); sFront.style.display = 'none'; };
  imgFront.onerror = () => { sFront.style.display = 'none'; };
  imgFront.src = car.img;
}

/* ── Game Init ───────────────────────── */

function init() {
  ensureQueue(5);
  currentCar = queue.shift();
  renderCard(currentCar);

  ensureQueue(2);
  preload(queue[0]?.img);

  setButtons(false);
}

/* ── Vote / Swipe Logic ──────────────── */

function vote(type) {
  if (isAnimating) return;
  isAnimating = true;
  setButtons(true);

  if (type === 'smash') {
    smashedCount++;
    smashed.push(currentCar);
    document.getElementById('smashScore').textContent  = smashedCount;
    document.getElementById('garageBadge').textContent = smashedCount;
    showToast(`😍 Smash ! ${currentCar.model}`, '#2a9d5c');
    frontCard.classList.add('fly-right');
  } else {
    passedCount++;
    document.getElementById('passScore').textContent = passedCount;
    showToast(`😬 Pass — ${currentCar.model}`, '#e63946');
    frontCard.classList.add('fly-left');
  }

  setTimeout(() => {
    /* Reset card */
    frontCard.classList.remove('fly-right', 'fly-left');
    frontCard.style.transform = '';
    vindSmash.style.opacity   = '0';
    vindPass.style.opacity    = '0';

    /* Advance queue */
    ensureQueue(2);
    currentCar = queue.shift();
    preload(queue[0]?.img);

    renderCard(currentCar);
    frontCard.classList.add('card-enter');
    setTimeout(() => frontCard.classList.remove('card-enter'), 450);

    isAnimating = false;
    setButtons(false);
    syncGarage();
  }, 400);
}

/* ── Drag / Swipe ────────────────────── */

frontCard.addEventListener('pointerdown', (e) => {
  if (isAnimating) return;
  dragging   = true;
  dragStartX = e.clientX;
  dragStartY = e.clientY;
  curDeltaX  = 0;
  curDeltaY  = 0;
  frontCard.setPointerCapture(e.pointerId);
  frontCard.style.transition = 'none';
});

frontCard.addEventListener('pointermove', (e) => {
  if (!dragging) return;
  curDeltaX = e.clientX - dragStartX;
  curDeltaY = e.clientY - dragStartY;

  const rot = curDeltaX * 0.09;
  frontCard.style.transform = `translateX(${curDeltaX}px) translateY(${curDeltaY * 0.25}px) rotate(${rot}deg)`;

  const ratio = Math.min(Math.abs(curDeltaX) / 90, 1);
  if (curDeltaX > 25) {
    vindSmash.style.opacity = ratio;
    vindPass.style.opacity  = '0';
  } else if (curDeltaX < -25) {
    vindPass.style.opacity  = ratio;
    vindSmash.style.opacity = '0';
  } else {
    vindSmash.style.opacity = '0';
    vindPass.style.opacity  = '0';
  }
});

frontCard.addEventListener('pointerup', () => {
  if (!dragging) return;
  dragging = false;
  frontCard.style.transition = '';

  if      (curDeltaX >  90) vote('smash');
  else if (curDeltaX < -90) vote('pass');
  else {
    frontCard.style.transform = '';
    vindSmash.style.opacity   = '0';
    vindPass.style.opacity    = '0';
  }
});

/* Cancel drag on pointer leave (edge-case UX fix) */
frontCard.addEventListener('pointercancel', () => {
  if (!dragging) return;
  dragging = false;
  frontCard.style.transition = '';
  frontCard.style.transform  = '';
  vindSmash.style.opacity    = '0';
  vindPass.style.opacity     = '0';
});

/* ── Keyboard Support ────────────────── */

document.addEventListener('keydown', (e) => {
  if (isAnimating) return;
  if (document.getElementById('view-game').classList.contains('active')) {
    if (e.key === 'ArrowLeft'  || e.key === 'a' || e.key === 'A') vote('pass');
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') vote('smash');
    if (e.key === 'i'          || e.key === 'I')                   openDetail();
  }
  if (e.key === 'Escape') closeModal();
});

/* ── Garage ──────────────────────────── */

function syncGarage() {
  const el    = document.getElementById('garageContent');
  const count = document.getElementById('garageCount');
  count.textContent = `${smashed.length} voiture(s) smashée(s)`;

  if (!smashed.length) {
    el.innerHTML = `
      <div class="garage-empty">
        <div class="icon">🏁</div>
        <p>Ton garage est vide.<br>Commence à voter pour remplir<br>ta collection de rêve !</p>
      </div>`;
    return;
  }

  el.innerHTML = `
    <div class="garage-grid">
      ${smashed.map(c => `
        <div class="garage-card" role="button" tabindex="0"
             onclick='showDetail(${JSON.stringify(c).replace(/'/g, "&#39;")})'
             onkeydown='if(event.key==="Enter")showDetail(${JSON.stringify(c).replace(/'/g, "&#39;")})'>
          <img src="${c.img}" alt="${c.make} ${c.model}" loading="lazy" onerror="this.style.display='none'"/>
          <div class="garage-card-overlay">
            <div class="g-make">${c.make}</div>
            <div class="g-model">${c.model}</div>
            <div class="g-year">${c.year}</div>
          </div>
          <div class="smash-badge">♥ SMASH</div>
        </div>`).join('')}
    </div>`;
}

/* ── Detail Modal ────────────────────── */

/** Open detail for the current front card */
function openDetail() {
  if (currentCar) showDetail(currentCar);
}

/** Open detail for any car (called from garage cards with serialised JSON string) */
function showDetail(carOrString) {
  const c = (typeof carOrString === 'string') ? JSON.parse(carOrString) : carOrString;

  document.getElementById('modalImg').src         = c.img;
  document.getElementById('modalMake').textContent = `${c.make} · ${c.year}`;
  document.getElementById('modalName').textContent = c.model;
  document.getElementById('modalDesc').textContent = c.desc;
  document.getElementById('modalPrice').textContent = `Prix estimé : ${c.price}`;
  document.getElementById('modalBadge').textContent = `${catIcon(c.cat)} ${c.cat}`;

  document.getElementById('modalStats').innerHTML = `
    <div class="modal-stat">
      <div class="modal-stat-val">${c.hp} ch</div>
      <div class="modal-stat-label">Puissance</div>
    </div>
    <div class="modal-stat">
      <div class="modal-stat-val">${c.accel} s</div>
      <div class="modal-stat-label">0–100 km/h</div>
    </div>
    <div class="modal-stat">
      <div class="modal-stat-val">${c.top} km/h</div>
      <div class="modal-stat-label">Vmax</div>
    </div>`;

  document.getElementById('modal').classList.remove('hidden');
  document.getElementById('modal').focus();
}

function closeModal() {
  document.getElementById('modal').classList.add('hidden');
}

/* Close on backdrop click */
document.getElementById('modal').addEventListener('click', (e) => {
  if (e.target === document.getElementById('modal')) closeModal();
});

/* ── Tab Switching ───────────────────── */

function switchTab(tabId) {
  document.querySelectorAll('.tab').forEach(btn => {
    btn.classList.toggle('active', btn.id === `tab-${tabId}`);
    btn.setAttribute('aria-selected', btn.id === `tab-${tabId}` ? 'true' : 'false');
  });

  document.querySelectorAll('.view').forEach(view => {
    view.classList.toggle('active', view.id === `view-${tabId}`);
  });

  if (tabId === 'garage') syncGarage();
}

/* ── Bootstrap ───────────────────────── */
init();

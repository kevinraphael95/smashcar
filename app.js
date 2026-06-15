/* SmashCar — app.js */
'use strict';

/* Images fixes : Wikimedia bloque le hotlinking direct.
   On utilise le endpoint /wiki/Special:FilePath/ qui redirige
   correctement, ou des proxies d'image fiables. */

const IMG = {
  LaFerrari:       'https://upload.wikimedia.org/wikipedia/commons/8/82/Ferrari_LaFerrari.jpg',
  AventadorSVJ:    'https://upload.wikimedia.org/wikipedia/commons/a/a0/Lamborghini_Aventador_SVJ_-_2019_%28cropped%29.jpg',
  VeyronSS:        'https://upload.wikimedia.org/wikipedia/commons/8/89/Bugatti_Veyron_16.4_Super_Sport_-_Flickr_-_Alexandre_Pr%C3%A9vot_%281_of_3%29.jpg',
  McLarenP1:       'https://upload.wikimedia.org/wikipedia/commons/0/0c/McLaren_P1_-_Goodwood_Festival_of_Speed_2013_%288985601519%29.jpg',
  Porsche918:      'https://upload.wikimedia.org/wikipedia/commons/7/75/Porsche_918_Spyder_-_Mondial_de_l%27Automobile_de_Paris_2014_-_002.jpg',
  AgeraRS:         'https://upload.wikimedia.org/wikipedia/commons/8/8b/Koenigsegg_Agera_%28Goodwood_2012%29.jpg',
  Huayra:          'https://upload.wikimedia.org/wikipedia/commons/3/32/Pagani_Huayra_-_Goodwood_Festival_of_Speed_2012_%287539562906%29.jpg',
  FerEnzo:         'https://upload.wikimedia.org/wikipedia/commons/3/39/Ferrari_Enzo_Ferrari.JPG',
  MurcielagoLp:    'https://upload.wikimedia.org/wikipedia/commons/e/ed/Lamborghini_Murchielago_LP_670-4_SuperVeloce_%28Ank_Kumar%29.jpg',
  AstonOne77:      'https://upload.wikimedia.org/wikipedia/commons/f/fc/Aston_Martin_One-77_%28Ank_Kumar%29_06.jpg',
  McLarenF1:       'https://upload.wikimedia.org/wikipedia/commons/d/d6/McLaren_F1_LM_%2B_McLaren_F1%2C_Donington_2012_%287629596148%29.jpg',
  Chiron:          'https://upload.wikimedia.org/wikipedia/commons/9/99/Bugatti_Chiron_2019_trimmed.jpg',
  F488Pista:       'https://upload.wikimedia.org/wikipedia/commons/6/60/2019_Ferrari_488_Pista_%28facelift%2C_red%29%2C_front_8.15.19.jpg',
  HuracanEVO:      'https://upload.wikimedia.org/wikipedia/commons/1/10/2019_Lamborghini_Huracan_Evo_%28facelift%2C_yellow%29%2C_front_8.15.19.jpg',
  Nevera:          'https://upload.wikimedia.org/wikipedia/commons/6/6a/Rimac_Nevera_Spa-Francorchamps_2022.jpg',
  FordGT:          'https://upload.wikimedia.org/wikipedia/commons/4/4e/2017_Ford_GT_-_front_%28Reg%29.jpg',
  CorvetteZ06:     'https://upload.wikimedia.org/wikipedia/commons/1/12/2023_Chevrolet_Corvette_Z06_in_Rapid_Blue%2C_front_11.19.22.jpg',
  GT3RS:           'https://upload.wikimedia.org/wikipedia/commons/c/ca/Porsche_911_GT3_RS_%28992%29_-_front%2C_Autoshow_Brussels_2023.jpg',
  AmgOne:          'https://upload.wikimedia.org/wikipedia/commons/c/c1/Mercedes-AMG_ONE_-_IAA_2021_2_%28cropped%29.jpg',
  MC20:            'https://upload.wikimedia.org/wikipedia/commons/7/7c/Maserati_MC20_front.jpg',
  Valkyrie:        'https://upload.wikimedia.org/wikipedia/commons/1/11/Aston_Martin_Valkyrie_Goodwood_2021.jpg',
  F40:             'https://upload.wikimedia.org/wikipedia/commons/e/e6/Ferrari_F40_1987_red_lr.jpg',
};

/* Proxy Wikimedia : contourne le hotlink ban */
function wikiProxy(url) {
  /* On passe par wsrv.nl qui respecte les headers Referer */
  return `https://wsrv.nl/?url=${encodeURIComponent(url)}&w=800&output=webp&q=80`;
}

const CARS = [
  { id:1,  make:'Ferrari',        model:'LaFerrari',       year:'2015', cat:'Hypercar',   flag:'🇮🇹', hp:'963',  top:'350', accel:'2.4', price:'1,4 M€', desc:'V12 + moteur électrique KERS. 499 exemplaires, le summum de Maranello.', img: wikiProxy(IMG.LaFerrari) },
  { id:2,  make:'Lamborghini',    model:'Aventador SVJ',   year:'2019', cat:'Supercar',   flag:'🇮🇹', hp:'770',  top:'351', accel:'2.8', price:'460 k€', desc:'V12 atmosphérique, ALA 2.0 actif. Record Nürburgring en production.', img: wikiProxy(IMG.AventadorSVJ) },
  { id:3,  make:'Bugatti',        model:'Veyron SS',       year:'2012', cat:'Hypercar',   flag:'🇫🇷', hp:'1200', top:'431', accel:'2.5', price:'1,9 M€', desc:'W16, 4 turbos. Ex-voiture de série la plus rapide du monde à 431 km/h.', img: wikiProxy(IMG.VeyronSS) },
  { id:4,  make:'McLaren',        model:'P1',              year:'2013', cat:'Hypercar',   flag:'🇬🇧', hp:'916',  top:'350', accel:'2.8', price:'1,1 M€', desc:'Hybride V8 twin-turbo + électrique. Successeur spirituel de la F1.', img: wikiProxy(IMG.McLarenP1) },
  { id:5,  make:'Porsche',        model:'918 Spyder',      year:'2014', cat:'Hypercar',   flag:'🇩🇪', hp:'887',  top:'345', accel:'2.5', price:'780 k€', desc:'Triple motorisation. La Sainte Trinité des hypercars hybrides.', img: wikiProxy(IMG.Porsche918) },
  { id:6,  make:'Koenigsegg',     model:'Agera RS',        year:'2017', cat:'Hypercar',   flag:'🇸🇪', hp:'1360', top:'458', accel:'2.8', price:'2,1 M€', desc:'5 records mondiaux. 458 km/h sur route fermée au Nevada.', img: wikiProxy(IMG.AgeraRS) },
  { id:7,  make:'Pagani',         model:'Huayra',          year:'2012', cat:'Hypercar',   flag:'🇮🇹', hp:'730',  top:'370', accel:'3.3', price:'1,4 M€', desc:'Chef-d\'œuvre artisanal. Carbo-titane, V12 biturbo AMG.', img: wikiProxy(IMG.Huayra) },
  { id:8,  make:'Ferrari',        model:'Enzo',            year:'2003', cat:'Supercar',   flag:'🇮🇹', hp:'660',  top:'355', accel:'3.6', price:'3 M€',   desc:'Technologie F1 pour la route. 400 unités. Icône de Maranello.', img: wikiProxy(IMG.FerEnzo) },
  { id:9,  make:'Lamborghini',    model:'Murciélago LP670',year:'2009', cat:'Supercar',   flag:'🇮🇹', hp:'670',  top:'342', accel:'3.2', price:'450 k€', desc:'V12 6.5L. Le SuperVeloce ultime avant l\'Aventador.', img: wikiProxy(IMG.MurcielagoLp) },
  { id:10, make:'Aston Martin',   model:'One-77',          year:'2011', cat:'Hypercar',   flag:'🇬🇧', hp:'750',  top:'354', accel:'3.5', price:'1,4 M€', desc:'77 exemplaires, carbone. V12 atmo le plus puissant de série.', img: wikiProxy(IMG.AstonOne77) },
  { id:11, make:'McLaren',        model:'F1',              year:'1994', cat:'Légendaire', flag:'🇬🇧', hp:'627',  top:'386', accel:'3.2', price:'20 M€',  desc:'Gordon Murray. V12 BMW. Siège central. Longtemps la plus rapide du monde.', img: wikiProxy(IMG.McLarenF1) },
  { id:12, make:'Bugatti',        model:'Chiron',          year:'2017', cat:'Hypercar',   flag:'🇫🇷', hp:'1500', top:'420', accel:'2.4', price:'3 M€',   desc:'Successeur de la Veyron. W16 quad-turbo. 1500 ch et luxe absolu.', img: wikiProxy(IMG.Chiron) },
  { id:13, make:'Ferrari',        model:'488 Pista',       year:'2018', cat:'Supercar',   flag:'🇮🇹', hp:'720',  top:'340', accel:'2.85',price:'280 k€', desc:'Version piste : -50 kg, +50 ch. Polyvalence et brutalité.', img: wikiProxy(IMG.F488Pista) },
  { id:14, make:'Lamborghini',    model:'Huracán EVO',     year:'2020', cat:'Supercar',   flag:'🇮🇹', hp:'640',  top:'325', accel:'2.9', price:'215 k€', desc:'V10 5.2L, 4WD, ALA actif. Le quotidien de rêve.', img: wikiProxy(IMG.HuracanEVO) },
  { id:15, make:'Rimac',          model:'Nevera',          year:'2022', cat:'Électrique', flag:'🇭🇷', hp:'1914', top:'412', accel:'1.97',price:'2,2 M€', desc:'1914 ch électriques. 0-100 en 1.97 s. La plus rapide jamais produite.', img: wikiProxy(IMG.Nevera) },
  { id:16, make:'Ford',           model:'GT',              year:'2017', cat:'Supercar',   flag:'🇺🇸', hp:'647',  top:'347', accel:'3.1', price:'500 k€', desc:'Hommage au GT40 vainqueur du Mans 1966. Aéro F1.', img: wikiProxy(IMG.FordGT) },
  { id:17, make:'Chevrolet',      model:'Corvette Z06',    year:'2023', cat:'Supercar',   flag:'🇺🇸', hp:'670',  top:'312', accel:'2.6', price:'110 k€', desc:'Flat-plane V8 central. Agressivité américaine à prix européen.', img: wikiProxy(IMG.CorvetteZ06) },
  { id:18, make:'Porsche',        model:'911 GT3 RS',      year:'2022', cat:'Supercar',   flag:'🇩🇪', hp:'525',  top:'296', accel:'3.2', price:'230 k€', desc:'Flat-6 atmo, PDK, aileron immense. La perfection selon Stuttgart.', img: wikiProxy(IMG.GT3RS) },
  { id:19, make:'Mercedes-AMG',   model:'ONE',             year:'2023', cat:'Hypercar',   flag:'🇩🇪', hp:'1063', top:'352', accel:'2.9', price:'2,7 M€', desc:'Moteur F1 homologué route. V6 1.6L turbo + 4 moteurs élec.', img: wikiProxy(IMG.AmgOne) },
  { id:20, make:'Maserati',       model:'MC20',            year:'2021', cat:'Supercar',   flag:'🇮🇹', hp:'630',  top:'325', accel:'2.9', price:'230 k€', desc:'Retour aux sources. V6 Nettuno biturbo. Passion italienne.', img: wikiProxy(IMG.MC20) },
  { id:21, make:'Aston Martin',   model:'Valkyrie',        year:'2021', cat:'Hypercar',   flag:'🇬🇧', hp:'1160', top:'402', accel:'2.5', price:'3,2 M€', desc:'Conçu par Adrian Newey. V12 Cosworth + KERS. F1 légale.', img: wikiProxy(IMG.Valkyrie) },
  { id:22, make:'Ferrari',        model:'F40',             year:'1992', cat:'Légendaire', flag:'🇮🇹', hp:'478',  top:'324', accel:'3.9', price:'1,8 M€', desc:'Dernière Ferrari signée par Enzo. Zéro luxe. Pure et absolue.', img: wikiProxy(IMG.F40) },
];

/* ── State ── */
let queue = [], smashed = [];
let passedCount = 0, smashedCount = 0;
let currentCar = null, isAnimating = false, cardCounter = 0;
let dragging = false, dragStartX = 0, dragStartY = 0, curDeltaX = 0, curDeltaY = 0;

/* ── DOM refs ── */
const frontCard = document.getElementById('cFront');
const imgFront  = document.getElementById('imgFront');
const sFront    = document.getElementById('sFront');
const vindSmash = document.getElementById('vindSmash');
const vindPass  = document.getElementById('vindPass');
const btnPass   = document.getElementById('btnPass');
const btnSmash  = document.getElementById('btnSmash');
const toastEl   = document.getElementById('toast');

/* ── Utils ── */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function catIcon(cat) {
  return { Légendaire: '🏆', Hypercar: '⚡', Électrique: '🔋' }[cat] ?? '🔥';
}

function preload(url) {
  if (!url) return;
  new Image().src = url;
}

let toastTimer;
function showToast(msg, color) {
  clearTimeout(toastTimer);
  toastEl.textContent = msg;
  toastEl.style.borderColor = color ?? '#fff';
  toastEl.classList.add('show');
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 1900);
}

function setButtons(disabled) {
  btnPass.disabled = btnSmash.disabled = disabled;
}

/* ── Queue ── */
function refill() {
  queue.push(...shuffle([...CARS]));
}

function ensureQueue(min = 4) {
  if (queue.length < min) refill();
}

/* ── Render ── */
function renderCard(car) {
  if (!car) return;
  cardCounter++;
  document.getElementById('cardNum').textContent  = `#${cardCounter}`;
  document.getElementById('cardFlag').textContent  = car.flag;
  document.getElementById('cardMake').textContent  = car.make;
  document.getElementById('cardModel').textContent = car.model;
  document.getElementById('cardYear').textContent  = car.year;
  document.getElementById('cardCat').textContent   = `${catIcon(car.cat)} ${car.cat}`;
  document.getElementById('cardDesc').textContent  = car.desc;

  document.getElementById('cardStats').innerHTML = `
    <div class="stat"><div class="stat-val">${car.hp}</div><div class="stat-label">Ch</div></div>
    <div class="stat"><div class="stat-val">${car.accel}s</div><div class="stat-label">0–100</div></div>
    <div class="stat"><div class="stat-val">${car.top}</div><div class="stat-label">km/h max</div></div>`;

  sFront.style.display = 'block';
  imgFront.classList.remove('visible');
  imgFront.src = '';
  imgFront.onload  = () => { imgFront.classList.add('visible'); sFront.style.display = 'none'; };
  imgFront.onerror = () => { sFront.style.display = 'none'; };
  imgFront.src = car.img;
}

/* ── Init ── */
function init() {
  ensureQueue(5);
  currentCar = queue.shift();
  renderCard(currentCar);
  ensureQueue(2);
  preload(queue[0]?.img);
  setButtons(false);
}

/* ── Vote ── */
function vote(type) {
  if (isAnimating) return;
  isAnimating = true;
  setButtons(true);

  if (type === 'smash') {
    smashedCount++;
    smashed.push(currentCar);
    document.getElementById('smashScore').textContent  = smashedCount;
    document.getElementById('garageBadge').textContent = smashedCount;
    showToast(`😍 Smash — ${currentCar.model}`, '#2a9d5c');
    frontCard.classList.add('fly-right');
  } else {
    passedCount++;
    document.getElementById('passScore').textContent = passedCount;
    showToast(`😬 Pass — ${currentCar.model}`, '#e63946');
    frontCard.classList.add('fly-left');
  }

  setTimeout(() => {
    frontCard.classList.remove('fly-right', 'fly-left');
    frontCard.style.transform = '';
    vindSmash.style.opacity   = '0';
    vindPass.style.opacity    = '0';

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

/* ── Drag ── */
frontCard.addEventListener('pointerdown', (e) => {
  if (isAnimating) return;
  dragging = true;
  dragStartX = e.clientX;
  dragStartY = e.clientY;
  curDeltaX = curDeltaY = 0;
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
    vindSmash.style.opacity = vindPass.style.opacity = '0';
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
    vindSmash.style.opacity = vindPass.style.opacity = '0';
  }
});

frontCard.addEventListener('pointercancel', () => {
  dragging = false;
  frontCard.style.transition = frontCard.style.transform = '';
  vindSmash.style.opacity = vindPass.style.opacity = '0';
});

/* ── Keyboard ── */
document.addEventListener('keydown', (e) => {
  if (isAnimating) return;
  if (document.getElementById('view-game').classList.contains('active')) {
    if (e.key === 'ArrowLeft'  || e.key === 'a' || e.key === 'A') vote('pass');
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') vote('smash');
    if (e.key === 'i'          || e.key === 'I')                   openDetail();
  }
  if (e.key === 'Escape') closeModal();
});

/* ── Garage ── */
function syncGarage() {
  const el    = document.getElementById('garageContent');
  const count = document.getElementById('garageCount');
  count.textContent = `${smashed.length} voiture(s)`;

  if (!smashed.length) {
    el.innerHTML = `
      <div class="garage-empty">
        <div class="empty-icon">🏁</div>
        <p>Ton garage est vide.<br>Commence à voter pour remplir ta collection !</p>
      </div>`;
    return;
  }

  el.innerHTML = `<div class="garage-grid">${smashed.map(c => garageCardHTML(c)).join('')}</div>`;
}

function garageCardHTML(c) {
  const data = encodeURIComponent(JSON.stringify(c));
  return `
    <div class="garage-card" role="button" tabindex="0"
         onclick="showDetailEncoded('${data}')"
         onkeydown="if(event.key==='Enter')showDetailEncoded('${data}')">
      <img class="garage-card-img"
           src="${c.img}"
           alt="${c.make} ${c.model}"
           loading="lazy"
           onerror="this.outerHTML='<div class=\\'garage-card-img-fallback\\'>🚗</div>'"/>
      <div class="garage-card-overlay">
        <div class="g-make">${c.make}</div>
        <div class="g-model">${c.model}</div>
        <div class="g-year">${c.year}</div>
      </div>
      <div class="smash-badge">♥ SMASH</div>
    </div>`;
}

/* ── Modal ── */
function openDetail() {
  if (currentCar) showDetail(currentCar);
}

function showDetailEncoded(encoded) {
  showDetail(JSON.parse(decodeURIComponent(encoded)));
}

function showDetail(c) {
  document.getElementById('modalImg').src          = c.img;
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
}

function closeModal() {
  document.getElementById('modal').classList.add('hidden');
}

document.getElementById('modal').addEventListener('click', (e) => {
  if (e.target === document.getElementById('modal')) closeModal();
});

/* ── Tabs ── */
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

/* ── Boot ── */
init();

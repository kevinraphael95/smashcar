let currentQueue = [];
let garage = [];
let judgedCars = [];
let isAnimating = false;
let isFetchingAPI = false;
let processingIds = new Set();

function checkMonthlyStoragePurge() {
  const lastPurge = localStorage.getItem('smashcar_last_purge');
  const now = Date.now();
  const THIRTY_DAYS = 2592000000;

  if (!lastPurge || (now - parseInt(lastPurge, 10)) > THIRTY_DAYS) {
    localStorage.removeItem('smashcar_judged');
    localStorage.removeItem('smashcar_garage');
    localStorage.setItem('smashcar_last_purge', now.toString());
  }
}

function loadSavedData() {
  checkMonthlyStoragePurge();
  const savedJudged = localStorage.getItem('smashcar_judged');
  const savedGarage = localStorage.getItem('smashcar_garage');
  
  if (savedJudged) judgedCars = JSON.parse(savedJudged);
  if (savedGarage) garage = JSON.parse(savedGarage);

  document.getElementById('gBadge').textContent = garage.length;
}

function saveState() {
  localStorage.setItem('smashcar_judged', JSON.stringify(judgedCars));
  localStorage.setItem('smashcar_garage', JSON.stringify(garage));
}

function preloadImage(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
  });
}

async function fetchCarsFromAPI() {
  if (isFetchingAPI) return;
  isFetchingAPI = true;

  const sparqlQuery = `
    SELECT DISTINCT ?car ?carLabel ?image ?manufacturerLabel ?countryLabel ?year ?engineLabel ?bodyTypeLabel WHERE {
      ?car wdt:P31/wdt:P279* wd:Q1420;
           wdt:P18 ?image;
           wdt:P571 ?inception.
      BIND(YEAR(?inception) AS ?year)
      FILTER(?year >= 1970)
      OPTIONAL { ?car wdt:P4100 ?bodyType. }
      OPTIONAL { ?car wdt:P176 ?manufacturer. }
      OPTIONAL { ?car wdt:P495 ?country. }
      OPTIONAL { ?car wdt:P516 ?engine. }
      SERVICE wikibase:label { bd:serviceParam wikibase:language "fr,en". }
    }
    ORDER BY UUID()
    LIMIT 50
  `;

  const url = "https://query.wikidata.org/sparql?query=" + encodeURIComponent(sparqlQuery) + "&format=json";

  try {
    const res = await fetch(url);
    const data = await res.json();
    const results = data.results.bindings;

    const fetched = results.map(r => ({
      id: r.car.value.split('/').pop(),
      name: r.carLabel ? r.carLabel.value : "Voiture",
      category: r.bodyTypeLabel ? r.bodyTypeLabel.value : "Automobile",
      manufacturer: r.manufacturerLabel ? r.manufacturerLabel.value : "Marque inconnue",
      country: r.countryLabel ? r.countryLabel.value : "Monde",
      year: r.year ? r.year.value : "N/C",
      engine: r.engineLabel ? r.engineLabel.value : "Standard",
      img: r.image.value.replace("http://", "https://")
    }));

    const filtered = fetched.filter(item => 
      !judgedCars.includes(item.id) && 
      !currentQueue.some(q => q.id === item.id) &&
      !processingIds.has(item.id)
    );
    
    filtered.forEach(async (car) => {
      processingIds.add(car.id);
      const isValid = await preloadImage(car.img);
      
      if (isValid && !judgedCars.includes(car.id)) {
        currentQueue.push(car);
        if (currentQueue.length === 1 && document.getElementById('cardImg').style.display === 'none') {
          renderCurrentCard();
        }
      } else {
        processingIds.delete(car.id);
      }
    });

  } catch (err) {
    console.error("Erreur API Wikidata:", err);
  } finally {
    isFetchingAPI = false;
  }
}

async function renderCurrentCard() {
  if (currentQueue.length < 10 && !isFetchingAPI) {
    fetchCarsFromAPI();
  }

  const loader = document.getElementById('loader');
  const imgEl = document.getElementById('cardImg');
  const content = document.getElementById('cardContent');

  if (currentQueue.length === 0) {
    loader.style.display = 'flex';
    loader.textContent = 'Recherche de nouvelles voitures récentes sur le Web...';
    content.style.display = 'none';
    imgEl.style.display = 'none';

    if (!isFetchingAPI) {
      await fetchCarsFromAPI();
    }
    return;
  }

  const car = currentQueue[0];

  document.getElementById('carCat').textContent = car.category;
  document.getElementById('carName').textContent = car.name;
  document.getElementById('carSub').textContent = `${car.manufacturer} · ${car.year}`;
  
  document.getElementById('specHp').textContent = car.country;
  document.getElementById('specEngine').textContent = car.engine;
  document.getElementById('specYear').textContent = car.year;

  imgEl.src = car.img;
  imgEl.style.display = 'block';
  loader.style.display = 'none';
  content.style.display = 'flex';
}

async function handleVote(isSmash) {
  if (isAnimating || currentQueue.length === 0) return;
  isAnimating = true;

  const card = document.getElementById('cFront');
  const currentCar = currentQueue.shift();

  if (currentCar && !judgedCars.includes(currentCar.id)) {
    judgedCars.push(currentCar.id);
    processingIds.delete(currentCar.id);
  }

  card.style.transition = 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)';
  
  if (isSmash && currentCar) {
    if (!garage.some(g => g.id === currentCar.id)) {
      garage.push(currentCar);
    }
    document.getElementById('gBadge').textContent = garage.length;
    card.style.transform = 'translateX(150%) rotate(20deg)';
  } else {
    card.style.transform = 'translateX(-150%) rotate(-20deg)';
  }

  saveState();

  setTimeout(async () => {
    card.style.transition = 'none';
    card.style.transform = 'none';
    document.getElementById('stampSmash').style.opacity = '0';
    document.getElementById('stampPass').style.opacity = '0';

    document.getElementById('cardImg').style.display = 'none';
    
    await renderCurrentCard();
    
    setTimeout(() => {
      card.style.transition = '';
      isAnimating = false;
    }, 50);
  }, 300);
}

window.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') handleVote(false);
  if (e.key === 'ArrowRight') handleVote(true);
});

function toggleGarage() {
  const modal = document.getElementById('garageModal');
  modal.classList.toggle('active');
  if (modal.classList.contains('active')) {
    const grid = document.getElementById('garageGrid');
    grid.innerHTML = garage.map((c, i) => `
      <div class="garage-card" onclick="openDetail(${i})">
        <img src="${c.img}" alt="${c.name}"/>
        <div class="garage-card-info">
          <div class="garage-card-name">${c.name}</div>
        </div>
      </div>
    `).join('');
  }
}

function openDetail(index) {
  const c = garage[index];
  const modal = document.getElementById('detailModal');
  const container = document.getElementById('detailContent');
  
  container.innerHTML = `
    <img class="detail-img" src="${c.img}" alt="${c.name}"/>
    <div class="detail-body">
      <span class="car-category">${c.category}</span>
      <h2 class="car-title">${c.name}</h2>
      <p class="car-subtitle" style="margin-bottom:16px;">${c.manufacturer} · ${c.year}</p>
      <div class="car-specs">
        <div class="spec-item">
          <div class="spec-val">${c.country}</div>
          <div class="spec-lbl">Origine</div>
        </div>
        <div class="spec-item">
          <div class="spec-val">${c.engine}</div>
          <div class="spec-lbl">Moteur</div>
        </div>
        <div class="spec-item">
          <div class="spec-val">${c.year}</div>
          <div class="spec-lbl">Année</div>
        </div>
      </div>
    </div>
  `;
  modal.classList.add('active');
}

function closeDetail() {
  document.getElementById('detailModal').classList.remove('active');
}

const front = document.getElementById('cFront');
let startX = 0, currentX = 0;

front.addEventListener('pointerdown', e => {
  if (isAnimating || currentQueue.length === 0) return;
  startX = e.clientX;
  front.style.transition = 'none';
  front.setPointerCapture(e.pointerId);
});

front.addEventListener('pointermove', e => {
  if (!startX) return;
  currentX = e.clientX - startX;
  const rot = currentX * 0.05;
  front.style.transform = `translateX(${currentX}px) rotate(${rot}deg)`;
  
  const ratio = Math.min(Math.abs(currentX) / 100, 1);
  if (currentX > 0) {
    document.getElementById('stampSmash').style.opacity = ratio;
    document.getElementById('stampPass').style.opacity = 0;
  } else {
    document.getElementById('stampPass').style.opacity = ratio;
    document.getElementById('stampSmash').style.opacity = 0;
  }
});

front.addEventListener('pointerup', e => {
  if (!startX) return;
  front.releasePointerCapture(e.pointerId);
  
  if (currentX > 100) handleVote(true);
  else if (currentX < -100) handleVote(false);
  else {
    front.style.transition = 'transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)';
    front.style.transform = 'none';
    document.getElementById('stampSmash').style.opacity = '0';
    document.getElementById('stampPass').style.opacity = '0';
  }
  startX = 0;
  currentX = 0;
});

loadSavedData();
renderCurrentCard();

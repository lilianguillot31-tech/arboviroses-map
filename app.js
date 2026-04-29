const DISEASES = [
  "Arboviroses", "Encéphalite japonaise", "Zika", "Chikungunya", "Dengue", "Rage", "Fièvre typhoïde", "Choléra"
];

const countryRisk = {
  BRA: { "Arboviroses": 3, "Zika": 2, "Chikungunya": 2, "Dengue": 3, "Rage": 2, "Fièvre typhoïde": 1, "Choléra": 1 },
  IND: { "Arboviroses": 3, "Encéphalite japonaise": 2, "Chikungunya": 2, "Dengue": 3, "Rage": 3, "Fièvre typhoïde": 3, "Choléra": 2 },
  THA: { "Arboviroses": 3, "Encéphalite japonaise": 2, "Zika": 1, "Chikungunya": 2, "Dengue": 3, "Rage": 2, "Fièvre typhoïde": 2, "Choléra": 1 },
  IDN: { "Arboviroses": 3, "Encéphalite japonaise": 2, "Zika": 1, "Chikungunya": 2, "Dengue": 3, "Rage": 2, "Fièvre typhoïde": 2, "Choléra": 1 },
  VNM: { "Arboviroses": 3, "Encéphalite japonaise": 2, "Dengue": 3, "Rage": 2, "Fièvre typhoïde": 2, "Choléra": 1 },
  MEX: { "Arboviroses": 2, "Zika": 1, "Chikungunya": 1, "Dengue": 2, "Rage": 1, "Fièvre typhoïde": 1 },
  NGA: { "Arboviroses": 2, "Dengue": 1, "Rage": 2, "Fièvre typhoïde": 3, "Choléra": 3 },
  COD: { "Arboviroses": 2, "Rage": 2, "Fièvre typhoïde": 2, "Choléra": 3 },
  PER: { "Arboviroses": 2, "Dengue": 2, "Rage": 2, "Fièvre typhoïde": 1 },
  PHL: { "Arboviroses": 3, "Encéphalite japonaise": 2, "Dengue": 3, "Rage": 2, "Fièvre typhoïde": 2, "Choléra": 1 }
};

const colorByLevel = ["#f4f6f8", "#ffe08a", "#ff9f43", "#e63946"];
let selected = new Set(["Dengue"]);
let geoLayer;

const map = L.map("map", { minZoom: 2 }).setView([20, 5], 2);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 7,
  attribution: "© OpenStreetMap"
}).addTo(map);

function scoreCountry(iso3) {
  const risks = countryRisk[iso3] || {};
  let max = 0;
  selected.forEach((d) => { max = Math.max(max, risks[d] || 0); });
  return max;
}

function styleCountry(feature) {
  const iso3 = feature.id;
  const level = scoreCountry(iso3);
  return { fillColor: colorByLevel[level], weight: 0.6, color: "#475569", fillOpacity: 0.78 };
}

function renderFilters() {
  const root = document.getElementById("disease-filters");
  DISEASES.forEach((d) => {
    const btn = document.createElement("button");
    btn.textContent = d;
    if (selected.has(d)) btn.classList.add("active");
    btn.onclick = () => {
      selected.has(d) ? selected.delete(d) : selected.add(d);
      if (selected.size === 0) selected.add(d);
      renderFilters();
      geoLayer.setStyle(styleCountry);
      updateMeta();
    };
    root.appendChild(btn);
  });
}

function updateMeta() {
  document.getElementById("meta").innerHTML = `Pathologies sélectionnées: <strong>${[...selected].join(", ")}</strong><br>\nDonnées: prototype initial à enrichir avec import automatique HCSP/CDC/ECDC.`;
}

fetch("https://unpkg.com/world-atlas@2/countries-110m.json")
  .then((r) => r.json())
  .then((topology) => {
    const countries = topojson.feature(topology, topology.objects.countries);
    geoLayer = L.geoJSON(countries, {
      style: styleCountry,
      onEachFeature: (feature, layer) => {
        layer.on("mouseover", () => {
          const level = scoreCountry(feature.id);
          layer.bindTooltip(`ISO3: ${feature.id}<br>Niveau: ${level}`).openTooltip();
        });
      }
    }).addTo(map);
  });

renderFilters();
updateMeta();

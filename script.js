// Theme management
const themeToggle = document.getElementById('themeToggle');
let isDarkTheme = false;

function toggleTheme() {
  isDarkTheme = !isDarkTheme;
  document.body.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');
  themeToggle.textContent = isDarkTheme ? '☀️ Light Mode' : '🌑 Dark Mode';
}

themeToggle.addEventListener('click', toggleTheme);

// Space weather data management
const updateInterval = 5 * 60 * 1000; // 5 minutes

const elements = {
  windSpeed: document.getElementById('windSpeed'),
  windDensity: document.getElementById('windDensity'),
  kpIndex: document.getElementById('kpIndex'),
  geoStatus: document.getElementById('geoStatus'),
  flareClass: document.getElementById('flareClass'),
  flareCount: document.getElementById('flareCount'),
  auroraVisibility: document.getElementById('auroraVisibility'),
  auroraPower: document.getElementById('auroraPower'),
  lastUpdated: document.getElementById('lastUpdated')
};

// Simulated space weather data
function generateRandomSpaceWeatherData() {
  const solarWindSpeeds = [350, 400, 450, 500, 550];
  const solarWindDensities = [2.5, 3.0, 3.5, 4.0, 4.5];
  const kpIndices = [1, 2, 3, 4, 5];
  const flareClasses = ['A', 'B', 'C', 'M', 'X'];
  const auroraPowers = ['Low', 'Moderate', 'High', 'Extreme'];

  return {
    solarWind: {
      speed: solarWindSpeeds[Math.floor(Math.random() * solarWindSpeeds.length)],
      density: solarWindDensities[Math.floor(Math.random() * solarWindDensities.length)]
    },
    geomagneticField: {
      kpIndex: kpIndices[Math.floor(Math.random() * kpIndices.length)],
      status: function() {
        if (this.kpIndex <= 2) return 'Quiet';
        if (this.kpIndex <= 4) return 'Active';
        return 'Storm';
      }
    },
    solarFlares: {
      currentClass: flareClasses[Math.floor(Math.random() * flareClasses.length)],
      last24h: Math.floor(Math.random() * 10)
    },
    aurora: {
      visibility: Math.random() > 0.5 ? 'Visible' : 'Not Visible',
      power: auroraPowers[Math.floor(Math.random() * auroraPowers.length)]
    }
  };
}

function updateDashboard() {
  const data = generateRandomSpaceWeatherData();

  // Update solar wind data
  elements.windSpeed.textContent = `${data.solarWind.speed} km/s`;
  elements.windDensity.textContent = `${data.solarWind.density} p/cm³`;

  // Update geomagnetic field data
  elements.kpIndex.textContent = data.geomagneticField.kpIndex;
  elements.geoStatus.textContent = data.geomagneticField.status();

  // Update solar flares data
  elements.flareClass.textContent = data.solarFlares.currentClass;
  elements.flareCount.textContent = `${data.solarFlares.last24h} events`;

  // Update aurora data
  elements.auroraVisibility.textContent = data.aurora.visibility;
  elements.auroraPower.textContent = data.aurora.power;

  // Update last updated timestamp
  elements.lastUpdated.textContent = new Date().toLocaleString();
}

// Initial update
updateDashboard();

// Set up periodic updates
setInterval(updateDashboard, updateInterval);
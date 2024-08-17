// Shto event listener për butonin e kërkimit
document.querySelector('.search-btn').addEventListener('click', function() {
    const city = document.querySelector('.city-input').value; // Merr emrin e qytetit nga inputi
    getWeather(city); // Thir funksionin për të marrë motin për qytetin e dhënë
});

// Shto event listener për butonin e përdorimit të lokacionit aktual
document.querySelector('.location-btn').addEventListener('click', function() {
    if (navigator.geolocation) { // Kontrollon nëse geolokacioni mbështetet
        navigator.geolocation.getCurrentPosition(position => { // Merr pozitat e përdoruesit
            const lat = position.coords.latitude; // Marr gjerësinë
            const lon = position.coords.longitude; // Marr gjatësinë
            getWeatherByCoords(lat, lon); // Thir funksionin për të marrë motin për koordinatat e dhëna
        });
    } else {
        alert('Geolokacioni nuk mbështetet nga ky shfletues.'); // Shfaq mesazh nëse geolokacioni nuk mbështetet
    }
});

// Funksioni për të marrë motin për një qytet të dhënë
async function getWeather(city) {
    const apiKey = 'bd5e378503939ddaee76f12ad7a97608'; // API Key i saktë për akses në të dhënat e motit
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`; // URL e API-së për të marrë të dhënat e motit
    
    try {
        const response = await fetch(apiUrl); // Bëjë kërkesën në API dhe prisni përgjigjen
        const data = await response.json(); // Konverto përgjigjen në format JSON për përdorim
        console.log(data); // Tregon të dhënat në console për debug
        if (response.ok) {
            displayWeather(data); // Thir funksionin për të shfaqur motin në faqe
        } else {
            alert('Qyteti nuk u gjet. Ju lutem provoni përsëri.'); // Shfaq mesazh nëse qyteti nuk u gjet
        }
    } catch (error) {
        console.error('Gabim gjatë marrjes së të dhënave për motin:', error); // Shfaq gabimin në console nëse ndodhi një problem
    }
}

// Funksioni për të marrë motin për koordinatat e dhëna
async function getWeatherByCoords(lat, lon) {
    const apiKey = 'bd5e378503939ddaee76f12ad7a97608'; // API Key i saktë për akses në të dhënat e motit
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`; // URL e API-së për të marrë të dhënat e motit për koordinatat
    
    try {
        const response = await fetch(apiUrl); // Bëjë kërkesën në API dhe prisni përgjigjen
        const data = await response.json(); // Konverto përgjigjen në format JSON për përdorim
        console.log(data); // Tregon të dhënat në console për debug
        if (response.ok) {
            displayWeather(data); // Thir funksionin për të shfaqur motin në faqe
        } else {
            alert('Nuk arriti të merrte të dhënat për motin nga lokacioni juaj.'); // Shfaq mesazh nëse nuk mund të merrte të dhënat
        }
    } catch (error) {
        console.error('Gabim gjatë marrjes së të dhënave për motin:', error); // Shfaq gabimin në console nëse ndodhi një problem
    }
}

// Funksioni për të shfaqur të dhënat e motit në faqe
function displayWeather(data) {
    const { name, main, weather, wind } = data; // Shkëput të dhënat e nevojshme nga përgjigja e API-së
    const temp = main.temp.toFixed(2); // Format temperaturën me dy shifra pas presjes
    const windSpeed = wind.speed.toFixed(1); // Format shpejtësinë e erës me një shifër pas presjes
    const humidity = main.humidity; // Marr nivelin e lagështisë

    // Shfaq të dhënat e motit në elementin me klasën 'weather-data'
    document.querySelector('.weather-data').innerHTML = `
        <div class="current-weather">
            <div class="details">
                <h2>${name}</h2> <!-- Emri i qytetit -->
                <h4>Temperatura: ${temp}°C</h4> <!-- Temperatura në gradë Celsius -->
                <h4>Era: ${windSpeed} m/s</h4> <!-- Shpejtësia e erës në metra për sekondë -->
                <h4>Lagështia: ${humidity}%</h4> <!-- Nivel i lagështisë në përqindje -->
            </div>
            <div class="icon">
                <img src="https://openweathermap.org/img/wn/${weather[0].icon}@4x.png" alt="${weather[0].description}"> <!-- Ikona e motit -->
                <h4>${weather[0].description}</h4> <!-- Përshkrimi i motit -->
            </div>
        </div>
    `;
}

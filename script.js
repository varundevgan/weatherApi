const searchInput = document.querySelector('.search-input')
const cityName = document.querySelector('.city-name')
let input = '';
const image = document.querySelector('.weather-png')
const apiKey = 'dc7c391cfb3968a4096d3b7ac6b0c283'
let data;
let degreeTemp = document.querySelector('.heading')
let speed = document.querySelector('.speed-wind')
let humidity = document.querySelector('.humidity-percentage-text')
const mainContent = document.querySelector('.main-content')
const popup = document.querySelector('.popup')

    if('geolocation' in navigator){
        navigator.geolocation.getCurrentPosition(async(position)=>{
            const lat = position.coords.latitude
            const lon = position.coords.longitude
            const city = await getCityName(lat, lon)
        })
    }

async function getCityName(lat,lon){

    const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`;

    const response = await fetch(url)
    const data = await response.json()
    input = data[0].name
    search()
}

searchInput.addEventListener('keydown',(e)=>{
    if(e.key === 'Enter'){
        input = searchInput.value.trim()
        search();
    }
})

async function search(){   
    if(!input){
        showPopup();
        return;
    }
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}`
    try{
        const response = await fetch(api);
        if(!response.ok) throw new Error(`Response Status: ${response.status}`);
        changeDomElements(response)
    }catch(error){
        console.log(error)
    }    
}

async function changeDomElements(response){
    searchInput.value = ''
    mainContent.classList.add('show')
    data = await response.json();
    console.log(data)
    cityName.innerHTML = data.name
    image.src = 'images/' + data.weather[0].main + '.png';
    degreeTemp.innerHTML = Math.floor(data.main.temp - 273.15) + '°c';
    speed.innerHTML = data.wind.speed + 'km/h';
    humidity.innerHTML = data.main.humidity + '%';
}

function showPopup(){
    popup.classList.add('show')
}

function closePopup(){
    popup.classList.remove('show')
}



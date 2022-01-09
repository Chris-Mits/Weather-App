const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast();


const updateUI = (data) => {
	// Destructure properties
	const { cityDetails, cityWeather } = data;
	
	// Update details template
	details.innerHTML = `
		<h5 class="my-3">${cityDetails.LocalizedName}</h5>
		<div class="my-3">${cityWeather.WeatherText}</div>
		<div class="display-4 my-4">
			<span>${cityWeather.Temperature.Metric.Value}</span>
			<span>&deg;C</span>
		</div>
	`;
	
	// Update the night/day & icon images
	const iconSrc = `images/icons/${cityWeather.WeatherIcon}.svg`;
	icon.setAttribute('src', iconSrc);
	
	let timeSrc = cityWeather.IsDayTime ? 'images/day.svg' : 'images/night.svg';
	time.setAttribute('src', timeSrc);
	
	// Remove d-none class if present
	if(card.classList.contains('d-none')) {
		card.classList.remove('d-none');
	}
};

cityForm.addEventListener('submit', e => {
	// Prevent default action (=refresh)
	e.preventDefault();
	
	// Get city name value
	const cityname = cityForm.city.value.trim();
	cityForm.reset();
	
	// Update the UI with the new city
	forecast.updateCity(cityname)
		.then(data => updateUI(data))
		.catch(error => console.log(error));
		
	// Set local storage
	localStorage.setItem('location', cityname);
});

if(localStorage.getItem('location')) {
	forecast.updateCity(localStorage.getItem('location'))
		.then(data => updateUI(data))
		.catch(error => console.log(error));
}
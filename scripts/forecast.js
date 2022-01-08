const key = 'wml7hN5GrOT9Ec09rMuG7AXAVJgeReCA';
const lang = 'el-gr';

// GET WEATHER INFORMATION
const getWeather = async (citykey) => {
	
	const baseUrl = 'http://dataservice.accuweather.com/currentconditions/v1/';
	const queryParams = `${citykey}?apikey=${key}&language=${lang}`;
	
	const response = await fetch(baseUrl + queryParams);
	const data = await response.json();
	
	return data[0];
}

// GET CITY INFORMATION
const getCity = async (cityname) => {
	
	const baseUrl = 'http://dataservice.accuweather.com/locations/v1/cities/search';
	const queryParams = `?apikey=${key}&q=${cityname}&language=${lang}`;
	
	const response = await fetch(baseUrl + queryParams);
	const data = await response.json();
	
	return data[0];
	
};
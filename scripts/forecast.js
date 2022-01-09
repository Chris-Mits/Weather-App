class Forecast {
	constructor() {
		this.key = 'UCkSolDXvUDUi5RAj1Hb4uSG703HYD91';
		this.lang = 'el-gr';
		this.weatherURI = 'http://dataservice.accuweather.com/currentconditions/v1/';
		this.cityURI = 'http://dataservice.accuweather.com/locations/v1/cities/search';
	}
	async updateCity(cityname) {
		const cityDetails = await this.getCity(cityname);
		const cityWeather = await this.getWeather(cityDetails.Key);
		
		return { cityDetails, cityWeather };
	}
	async getCity(cityname) {
		const queryParams = `?apikey=${this.key}&q=${cityname}&language=${this.lang}`;
		const response = await fetch(this.cityURI + queryParams);
		const data = await response.json();
		
		return data[0];
	}
	async getWeather(citykey) {
		const queryParams = `${citykey}?apikey=${this.key}&language=${this.lang}`;
		const response = await fetch(this.weatherURI + queryParams);
		const data = await response.json();
		
		return data[0];
	}
}
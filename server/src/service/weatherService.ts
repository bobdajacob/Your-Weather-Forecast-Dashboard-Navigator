import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lon: number;
  lat: number;
}
// ✅TODO: Define a class for the Weather object
class Weather {
  city: string;
  date: number;
  icon: string;
  iconDescription: string;
  tempF: number;
  windSpeed: number;
  humidity: number;

  constructor(city: string, date: number, icon: string, iconDescription: string, tempF: number, windSpeed: number, humidity: number) {
    this.city = city;
    this.date = date;
    this.icon = icon;
    this.iconDescription = iconDescription;
    this.tempF = tempF;
    this.windSpeed = windSpeed;
    this.humidity = humidity;
  }
}

// TODO: Complete the WeatherService class
class WeatherService {
  // ✅TODO: Define the baseURL, API key, and city name properties
  baseURL: string;
  APIkey: string;
  cityName: string;

  constructor(cityName: string) {
    this.baseURL = process.env.API_BASE_URL || '';
    this.APIkey = process.env.API_KEY || '';
    this.cityName = cityName;
  }

  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) {
    const geoUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=${this.APIkey}`;
    const response = await fetch(geoUrl);
    if (!response.ok) {
      throw new Error(`Error fetching weather data: ${response.statusText}`)
    }
    const data = await response.json();
    return data;
  }

  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
    const { lat, lon } = locationData;
    return { lat, lon };
  }

  // TODO: Create buildGeocodeQuery method
  // private buildGeocodeQuery(city: string): string {}

  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    const { lat, lon } = coordinates;
    return `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${this.APIkey}`;
  }

  // // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {
    const locationData = await this.fetchLocationData(this.cityName);
    const coordinates = this.destructureLocationData(locationData);
    return coordinates;
  }

  // // TODO: Create fetchWeatherData method
  async fetchWeatherData(coordinates: Coordinates) {
  const weatherUrl = this.buildWeatherQuery(coordinates);
  const response = await fetch(weatherUrl);
  if (!response.ok) {
    throw new Error(`Error fetching weather data:`);
  }
  const data = await response.json();
  return data;
  }

  // // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any): Weather {
  //   const city = response.city.name;
  //   const date = response.list[0].dt;
  //   const icon = response.list[0].weather[0].icon;
  //   const iconDescription = response.list[0].weather[0].description;
  //   const tempF = 

  //   return new Weather(city, date, icon, iconDescription, tempF, windSpeed, humidity)
  // }


  // // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {

  // }

  // // // TODO: Complete getWeatherForCity method
  // // async getWeatherForCity(city: string) {

  // }
}

export default new WeatherService();

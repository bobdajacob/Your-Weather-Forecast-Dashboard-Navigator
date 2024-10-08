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
  date: string;
  icon: string;
  iconDescription: string;
  tempF: number;
  windSpeed: number;
  humidity: number;

  constructor(city: string, date: string, icon: string, iconDescription: string, tempF: number, windSpeed: number, humidity: number) {
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

  constructor() {
    this.baseURL = process.env.API_BASE_URL || '';
    this.APIkey = process.env.API_KEY || '';
    this.cityName = '';
  }

  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) {
    const geoUrl = this.buildGeocodeQuery(query)
    const response = await fetch(geoUrl);
    if (!response.ok) {
      throw new Error(`Error fetching weather data: ${response.statusText}`)
    }
    const data = await response.json();
    return { lat: data.city.coord.lat, lon: data.city.coord.lon };
  }

  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
    const { lat, lon } = locationData;
    return { lat, lon };
  }

  // TODO: Create buildGeocodeQuery method // url
  private buildGeocodeQuery(city: string): string {
    return `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${this.APIkey}`
  }

  // TODO: Create buildWeatherQuery method // url
  private buildWeatherQuery(coordinates: Coordinates): string {
    const { lat, lon } = coordinates;
    return `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${this.APIkey}&units=imperial`;
  }

  // private buildForecastQuery(coordinates: Coordinates): string {
  //   const { lat, lon } = coordinates;
  //   return `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${this.APIkey}&units=imperial`;
  // }

  // // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData(): Promise<Coordinates> {
    const locationData = await this.fetchLocationData(this.cityName);
    const coordinates = this.destructureLocationData(locationData);
    return coordinates;
  }

  // // TODO: Create fetchWeatherData method //NEED FIX
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
  private parseCurrentWeather(response: any) {
    const weatherData = response.list[0]
    return new Weather(
      response.city.name, // Use the city name from the response
      weatherData.dt_txt, // Convert dt to a readable date string
      weatherData.weather[0].icon, // Use the weather icon from the response
      weatherData.weather[0].description, // Use the weather description from the response
      weatherData.main.temp, // Use the temperature from the main object
      weatherData.wind.speed, // Use wind speed from the wind object
      weatherData.main.humidity // Use humidity from the main object
    );
  }


  // // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
    const forecastArray: Weather[] = [];
    const range = weatherData.slice(0, 6);
      for (const weather of range) {
        const newForecastWeather = new Weather(
          currentWeather.city,
          weather.dt_txt,
          weather.weather[0].icon,
          weather.weather[0].iconDescription,
          weather.main.temp,
          weather.wind.speed,
          weather.main.humidity,
        );
        forecastArray.push(newForecastWeather);
      }
      return forecastArray;
    }

  // // // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    this.cityName = city;
    const coordinates = await this.fetchAndDestructureLocationData();
    const response = await this.fetchWeatherData(coordinates);
    console.log(response);
    const weatherData = this.parseCurrentWeather(response);
    const forecastWeather = this.buildForecastArray(weatherData, response.list);
    return forecastWeather;
  }
}

export default new WeatherService();

import { Router, type Request, type Response } from 'express';
import weatherService from '../../service/weatherService';
const router = Router();

// import HistoryService from '../../service/historyService.js';
// import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', (req: Request, res: Response) => {
  // TODO: GET weather data from city name
  const cityName = req.body.cityName;
  if (!cityName) {
    return res.status(400).json({error: 'the city name is required'});
  }
  try {
    const weatherData = await weatherService.fetchWeatherData(cityName);
    return res.status(200).json(weatherData);
  } catch error(error);
  return res.status(500).json({error: 'it failed to fetch the weather data'});
  // TODO: save city to search history

});

// TODO: GET search history
router.get('/history', async (req: Request, res: Response) => {});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {});

export default router;

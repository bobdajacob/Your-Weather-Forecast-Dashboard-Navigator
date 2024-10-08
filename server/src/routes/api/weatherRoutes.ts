import { Router, type Request, type Response } from "express";
const router = Router();

import HistoryService from "../../service/historyService.js";
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post("/", async (req: Request, res: Response) => {
  // TODO: GET weather data from city name
  const cityName = req.body.cityName;
  if (!cityName) {
    return res.status(400).json({ error: "the city name is required" });
  }
  try {
    const weatherData = await WeatherService.getWeatherForCity(cityName);
    // TODO: save city to search history
    HistoryService.addCity(cityName);

    return res.status(200).json(weatherData);

  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "it failed to fetch the weather data" });
  }
});

// TODO: GET search history
router.get("/history", async (_req: Request, res: Response) => {
  try {
    const savedCities = await HistoryService.addCity(cityName);
    res.json(savedCities);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// * BONUS TODO: DELETE city from search history
router.delete("/history/:id", async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      res.status(400).json({ msg: 'City id is required' });
    }
    await HistoryService.removeCity(req.params.id);
    res.json({ success: 'State successfully removed from search history' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

export default router;

import { useState } from "react";
import axios from "axios";
import type { IForecastDay, IRawPeriod } from "../interfaces/weather";

export function useWeather() {
  const [forecast, setForecast] = useState<IForecastDay[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchForecast = async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);

    try {
      const pointRes = await axios.get(
        `https://api.weather.gov/points/${lat},${lon}`
      );
      const forecastUrl = pointRes.data?.properties?.forecast;

      if (!forecastUrl) {
        setError("Could not determine forecast URL for this location.");
        return;
      }

      const forecastRes = await axios.get(forecastUrl);
      const periods = forecastRes.data?.properties?.periods;

      if (!periods || !Array.isArray(periods)) {
        setError("Forecast data is not available.");
        return;
      }

      const parsedForecast: IForecastDay[] = (periods as IRawPeriod[]).map(
        (period) => ({
          name: period.name,
          temperature: period.temperature,
          temperatureUnit: period.temperatureUnit,
          shortForecast: period.shortForecast,
          icon: period.icon,
          isDaytime: period.isDaytime,
          startTime: period.startTime,
          detailedForecast: period.detailedForecast,
          probabilityOfPrecipitation: period.probabilityOfPrecipitation.value,
        })
      );

      setForecast(parsedForecast);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch forecast.");
    } finally {
      setLoading(false);
    }
  };

  const clearForecast = () => {
    setForecast([]);
  };

  return {
    forecast,
    loading,
    error,
    fetchForecast,
    clearForecast,
  };
}

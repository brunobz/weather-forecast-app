import InputForm from "@/components/WeatherForecast/WeatherView/InputForm/InputForm";
import { useGeocode } from "@/hooks/useGeocode";
import { useWeather } from "@/hooks/useWeather";
import { useState } from "react";
import type { ICoordinates } from "@/interfaces/coordinates";
import { LocationIcon } from "@/components/ui/icons/LocationIcon";
import { ForecastSection } from "./ForecastSection/ForecastSection";

export default function WeatherView() {
  const [coords, setCoords] = useState<ICoordinates | null>(null);

  const {
    fetchCoordinates,
    loading: loadingGeocode,
    error: geocodeError,
  } = useGeocode();

  const {
    forecast,
    loading: loadingForecast,
    error: forecastError,
    fetchForecast,
    clearForecast,
  } = useWeather();

  const handleSubmit = async (address: string) => {
    clearForecast();
    setCoords(null);

    const result = await fetchCoordinates(address);

    if (result) {
      await fetchForecast(result.lat, result.lng);
      setCoords({ lat: result.lat, lng: result.lng, address: result.address });
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Header */}
      <header className="flex flex-col items-center justify-between mb-8 gap-6">
        <h1 className="text-4xl font-extrabold text-gray-800">
          7-Day Weather Forecast
        </h1>
        <InputForm
          onSubmit={handleSubmit}
          isLoading={loadingGeocode || loadingForecast}
        />
      </header>

      {/* Location display */}
      {coords && (
        <div className="flex flex-col items-start">
          <p className="text-gray-600 mb-2 flex md:items-center gap-2">
            <LocationIcon className="w-5 h-5 text-blue-500" />
            <span className="font-medium">{coords.address}</span>
          </p>
          {coords?.address && (
            <p className="text-sm text-gray-700 italic mb-4 ml-7">
              Latitude: {coords.lat.toFixed(4)}, Longitude:{" "}
              {coords.lng.toFixed(4)}
            </p>
          )}
        </div>
      )}

      {/* Loading and errors */}
      {(loadingGeocode || loadingForecast) && (
        <p className="text-blue-600 text-center mb-4">Loading forecast...</p>
      )}

      {(geocodeError || forecastError) && (
        <p className="text-red-600 text-center mb-4">
          {geocodeError || forecastError}
        </p>
      )}

      {/* Forecast cards */}
      {forecast && forecast.length > 0 && (
        <ForecastSection forecast={forecast} />
      )}
    </div>
  );
}

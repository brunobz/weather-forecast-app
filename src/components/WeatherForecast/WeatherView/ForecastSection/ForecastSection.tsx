import type { IForecastDay } from "@/interfaces/weather";
import CurrentDayForecastCard from "./CurrentDayForecastCard/CurrentDayForecastCard";
import ForecastCard from "./ForecastCard/ForecastCard";

interface ForecastSectionProps {
  forecast: IForecastDay[];
}

export const ForecastSection = ({ forecast }: ForecastSectionProps) => {
  const forecastCurrentDay =
    forecast && forecast?.length > 1 && forecast[0].isDaytime
      ? forecast[0]
      : undefined;

  return (
    <>
      <section
        aria-label="current day weather forecast"
        className="flex flex-col lg:flex-row gap-6 py-2 pl-4 mb-4"
      >
        {forecastCurrentDay && (
          <CurrentDayForecastCard {...forecastCurrentDay} />
        )}
        <CurrentDayForecastCard {...forecast[forecastCurrentDay ? 1 : 0]} />
      </section>

      <p className="text-start text-md font-medium mb-4 pl-4">
        Forecast for the next 6 days
      </p>

      <section
        aria-label="6 day weather forecast"
        className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 py-2 px-4"
      >
        {forecast.slice(forecastCurrentDay ? 2 : 1).map((day) => (
          <ForecastCard key={day.name} {...day} />
        ))}
      </section>
    </>
  );
};

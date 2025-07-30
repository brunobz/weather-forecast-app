export interface ForecastCardProps {
  name: string;
  temperature: number;
  temperatureUnit: string;
  shortForecast: string;
  icon: string;
  isDaytime: boolean;
  startTime: string;
}

export default function ForecastCard({
  name,
  temperature,
  temperatureUnit,
  shortForecast,
  icon,
  isDaytime,
  startTime,
}: ForecastCardProps) {
  const formattedDate = new Date(startTime).toLocaleDateString("en", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <article
      role="region"
      aria-label={`Forecast for ${name}`}
      className="flex flex-col items-center bg-white rounded-lg shadow-md p-4 text-center min-w-60"
    >
      <h3 className="text-lg font-semibold mb-2">{name}</h3>
      <p className="text-sm text-gray-600 mb-2">{formattedDate}</p>
      <img src={icon} alt={shortForecast} className="w-16 h-16 mb-2" />
      <p className="text-sm mb-1">{shortForecast}</p>
      <p className="text-xl font-bold">
        {temperature}°{temperatureUnit}
      </p>
      <p className="text-xs mt-1 text-gray-500">
        {isDaytime ? "Day" : "Night"}
      </p>
    </article>
  );
}

import { UmbrellaIcon } from "@/components/ui/icons/UmbrellaIcon";

export interface CurrentDayForecastCardProps {
  name: string;
  temperature: number;
  temperatureUnit: string;
  shortForecast: string;
  icon: string;
  isDaytime: boolean;
  startTime: string;
  detailedForecast: string;
  probabilityOfPrecipitation: number;
}

export default function CurrentDayForecastCard({
  name,
  temperature,
  temperatureUnit,
  shortForecast,
  icon,
  detailedForecast,
  probabilityOfPrecipitation,
}: CurrentDayForecastCardProps) {
  return (
    <article
      role="region"
      aria-label={`Forecast for ${name}`}
      className="flex flex-col lg:flex-row bg-white rounded-lg shadow-md p-4 text-center max-w-[100%] lg:max-w-[50%] gap-3"
    >
      <img src={icon} alt={shortForecast} className="w-16 h-20 self-center" />
      <div>
        <div className="flex flex-row gap-4">
          <div className="flex flex-col flex-grow-[0.7] lg:flex-grow items-center">
            <h3 className="text-lg lg:w-40">{name}</h3>
            <p className="text-2xl font-bold">
              {temperature}°{temperatureUnit}
            </p>
          </div>
          <div className="flex flex-row gap-2 items-center lg:items-start">
            <UmbrellaIcon
              className="text-blue-600 mt-1"
              height="24"
              width="24"
            />
            <p className="text-lg">{probabilityOfPrecipitation} %</p>
          </div>
        </div>
        <p className="text-xs mt-1 text-gray-500">{detailedForecast}</p>
      </div>
    </article>
  );
}

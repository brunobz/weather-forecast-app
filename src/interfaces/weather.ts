export interface IForecastDay {
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

export interface IRawPeriod {
  number: number;
  name: string;
  startTime: string;
  endTime: string;
  isDaytime: boolean;
  temperature: number;
  temperatureUnit: string;
  shortForecast: string;
  icon: string;
  detailedForecast: string;
  probabilityOfPrecipitation: { unitCode: string; value: number };
}

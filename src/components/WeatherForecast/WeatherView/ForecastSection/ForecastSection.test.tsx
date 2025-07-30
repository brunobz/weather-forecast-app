import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ForecastSection } from "./ForecastSection";
import type { IForecastDay } from "@/interfaces/weather";

const baseDay: IForecastDay = {
  name: "",
  startTime: "",
  temperature: 70,
  temperatureUnit: "F",
  shortForecast: "",
  detailedForecast: "",
  icon: "",
  isDaytime: true,
  probabilityOfPrecipitation: 0,
};

const currentNight: IForecastDay = {
  ...baseDay,
  name: "Tonight",
  isDaytime: false,
  probabilityOfPrecipitation: 60,
};

const generateForecast = (count = 7, isDayFirst = true): IForecastDay[] => {
  return Array.from({ length: count }, (_, i) => ({
    ...baseDay,
    name: `Day ${isDayFirst ? i + 3 : i + 2}`,
    isDaytime: isDayFirst ? i % 2 === 0 : false,
  }));
};

describe("ForecastSection", () => {
  it("renders current day forecast when first period is daytime", () => {
    const forecast = generateForecast(5, true);
    render(
      <ForecastSection
        forecast={[
          { ...baseDay, name: "Today" },
          { ...currentNight },
          ...forecast,
        ]}
      />
    );

    expect(screen.getByText(/Today/i)).toBeInTheDocument();
    expect(screen.getByText(/Tonight/i)).toBeInTheDocument();

    expect(screen.getByText("Day 3")).toBeInTheDocument();
    expect(screen.getByText("Day 7")).toBeInTheDocument();
  });

  it("renders fallback for current day when first period is night", () => {
    const forecast = generateForecast(6, false);
    render(<ForecastSection forecast={[{ ...currentNight }, ...forecast]} />);

    expect(screen.queryByText(/Today/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Tonight/i)).toBeInTheDocument();
    expect(screen.getByText(/60/i)).toBeInTheDocument();

    expect(screen.getByText("Day 2")).toBeInTheDocument();
    expect(screen.getByText("Day 7")).toBeInTheDocument();
  });

  it("renders section headings and aria-labels", () => {
    const forecast = generateForecast();
    render(<ForecastSection forecast={forecast} />);

    expect(
      screen.getByRole("region", { name: /current day weather forecast/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: /6 day weather forecast/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Forecast for the next 6 days/i)
    ).toBeInTheDocument();
  });
});

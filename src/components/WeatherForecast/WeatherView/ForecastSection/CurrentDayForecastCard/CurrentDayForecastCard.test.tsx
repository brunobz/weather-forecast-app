import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import CurrentDayForecastCard from "./CurrentDayForecastCard";

describe("CurrentDayForecastCard", () => {
  const mockProps = {
    name: "Today",
    temperature: 75,
    temperatureUnit: "F",
    isDaytime: true,
    startTime: "",
    shortForecast: "Partly Cloudy",
    icon: "https://example.com/icon.png",
    detailedForecast: "Partly cloudy with a slight chance of rain.",
    probabilityOfPrecipitation: 20,
  };

  it("renders the forecast card with all provided data", () => {
    render(<CurrentDayForecastCard {...mockProps} />);

    expect(
      screen.getByRole("region", { name: /forecast for today/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/today/i)).toBeInTheDocument();

    expect(screen.getByText("75°F")).toBeInTheDocument();

    const icon = screen.getByRole("img", { name: /partly cloudy/i });
    expect(icon).toHaveAttribute("src", mockProps.icon);

    expect(screen.getByText(/20 %/)).toBeInTheDocument();

    expect(screen.getByText(mockProps.detailedForecast)).toBeInTheDocument();
  });
});

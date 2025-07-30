import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import WeatherView from "./WeatherView";
import * as useGeocodeHook from "@/hooks/geocode/useGeocode";
import * as useWeatherHook from "@/hooks/weather/useWeather";
import userEvent from "@testing-library/user-event";
import type { IForecastDay } from "@/interfaces/weather";

const mockCoords = {
  lat: 38.8977,
  lng: -77.0365,
  address: "1600 Pennsylvania Ave NW, Washington, DC",
};

const mockForecast: IForecastDay[] = [
  {
    name: "Monday",
    temperature: 72,
    temperatureUnit: "F",
    shortForecast: "Sunny",
    detailedForecast: "Clear and sunny.",
    icon: "https://example.com/icon.png",
    isDaytime: true,
    startTime: "2025-07-29T06:00:00-04:00",
    probabilityOfPrecipitation: 10,
  },
];

describe("WeatherView", () => {
  const fetchCoordinatesMock = vi.fn();
  const fetchForecastMock = vi.fn();
  const clearForecastMock = vi.fn();

  beforeEach(() => {
    vi.spyOn(useGeocodeHook, "useGeocode").mockReturnValue({
      fetchCoordinates: fetchCoordinatesMock,
      loading: false,
      error: null,
    });

    vi.spyOn(useWeatherHook, "useWeather").mockReturnValue({
      forecast: mockForecast,
      loading: false,
      error: null,
      fetchForecast: fetchForecastMock,
      clearForecast: clearForecastMock,
    });
  });

  it("renders title and form", () => {
    render(<WeatherView />);
    expect(
      screen.getByRole("heading", { name: /7-day weather forecast/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /enter address/i })
    ).toBeInTheDocument();
  });

  it("calls handleSubmit and updates state with coordinates and forecast", async () => {
    fetchCoordinatesMock.mockResolvedValueOnce(mockCoords);

    render(<WeatherView />);
    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button", { name: /get forecast/i });

    await userEvent.type(input, "1600 Pennsylvania Ave NW");
    await userEvent.click(button);

    await waitFor(() => {
      expect(fetchCoordinatesMock).toHaveBeenCalled();
      expect(fetchForecastMock).toHaveBeenCalledWith(
        mockCoords.lat,
        mockCoords.lng
      );
    });

    expect(await screen.findByText(mockCoords.address)).toBeInTheDocument();
    expect(await screen.findByText(/latitude/i)).toBeInTheDocument();
  });

  it("displays loading message when loading", () => {
    vi.spyOn(useWeatherHook, "useWeather").mockReturnValue({
      forecast: [],
      loading: true,
      error: null,
      fetchForecast: fetchForecastMock,
      clearForecast: clearForecastMock,
    });

    render(<WeatherView />);
    expect(screen.getByText(/loading forecast/i)).toBeInTheDocument();
  });

  it("displays error message if geocode or forecast fails", () => {
    vi.spyOn(useGeocodeHook, "useGeocode").mockReturnValue({
      fetchCoordinates: fetchCoordinatesMock,
      loading: false,
      error: "Failed to geocode",
    });

    render(<WeatherView />);
    expect(screen.getByText(/failed to geocode/i)).toBeInTheDocument();
  });

  it("shows ForecastSection when forecast is available", () => {
    render(<WeatherView />);
    expect(
      screen.getByText(/Forecast for the next 6 days/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/monday/i)).toBeInTheDocument();
  });
});

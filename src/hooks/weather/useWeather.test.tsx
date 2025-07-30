import { renderHook, act } from "@testing-library/react";
import { useWeather } from "./useWeather";
import axios from "axios";
import { beforeEach, describe, expect, it, vi, type Mock } from "vitest";

vi.mock("axios");
const mockedAxios = axios as unknown as { get: Mock };

const mockPointResponse = {
  data: {
    properties: {
      forecast: "https://api.weather.gov/fake-forecast-url",
    },
  },
};

const mockForecastResponse = {
  data: {
    properties: {
      periods: [
        {
          name: "Monday",
          temperature: 75,
          temperatureUnit: "F",
          shortForecast: "Sunny",
          icon: "https://example.com/icon.png",
          isDaytime: true,
          startTime: "2023-07-30T06:00:00-04:00",
          detailedForecast: "Clear skies",
          probabilityOfPrecipitation: { value: 10 },
        },
      ],
    },
  },
};

describe("useWeather", () => {
  beforeEach(() => {
    mockedAxios.get = vi.fn();
  });

  it("fetches and sets forecast data", async () => {
    mockedAxios.get
      .mockResolvedValueOnce(mockPointResponse)
      .mockResolvedValueOnce(mockForecastResponse);

    const { result } = renderHook(() => useWeather());

    await act(async () => {
      await result.current.fetchForecast(38.8977, -77.0365);
    });

    expect(result.current.forecast).toHaveLength(1);
    expect(result.current.forecast?.[0].name).toBe("Monday");
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("sets an error when forecast URL is missing", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { properties: {} } });

    const { result } = renderHook(() => useWeather());

    await act(async () => {
      await result.current.fetchForecast(0, 0);
    });

    expect(result.current.error).toBe(
      "Could not determine forecast URL for this location."
    );
    expect(result.current.forecast).toBeNull();
  });

  it("sets an error when periods are missing or invalid", async () => {
    mockedAxios.get
      .mockResolvedValueOnce(mockPointResponse)
      .mockResolvedValueOnce({ data: { properties: { periods: null } } });

    const { result } = renderHook(() => useWeather());

    await act(async () => {
      await result.current.fetchForecast(0, 0);
    });

    expect(result.current.error).toBe("Forecast data is not available.");
    expect(result.current.forecast).toBeNull();
  });

  it("handles fetch error gracefully", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() => useWeather());

    await act(async () => {
      await result.current.fetchForecast(0, 0);
    });

    expect(result.current.error).toBe("Failed to fetch forecast.");
    expect(result.current.forecast).toBeNull();
  });

  it("clears the forecast when clearForecast is called", async () => {
    const { result } = renderHook(() => useWeather());

    act(() => {
      result.current.clearForecast();
    });

    expect(result.current.forecast).toEqual([]);
  });
});

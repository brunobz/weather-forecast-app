import { renderHook, act } from "@testing-library/react";
import { useGeocode } from "@/hooks/geocode/useGeocode";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Mock } from "vitest";

global.fetch = vi.fn();

describe("useGeocode", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches coordinates successfully", async () => {
    const mockApiResponse = {
      result: {
        addressMatches: [
          {
            coordinates: { x: -77.0365, y: 38.8977 },
            matchedAddress: "1600 Pennsylvania Ave NW",
          },
        ],
      },
    };

    (fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiResponse,
    });

    const { result } = renderHook(() => useGeocode());

    let coords = null;

    await act(async () => {
      coords = await result.current.fetchCoordinates(
        "1600 Pennsylvania Ave NW"
      );
    });

    expect(coords).toEqual({
      lat: 38.8977,
      lng: -77.0365,
      address: "1600 Pennsylvania Ave NW",
    });
  });

  it("returns null and sets error on failure", async () => {
    (fetch as Mock).mockRejectedValueOnce(new Error("API failed"));

    const { result } = renderHook(() => useGeocode());

    let coords = null;

    await act(async () => {
      coords = await result.current.fetchCoordinates("invalid");
    });

    expect(coords).toBeNull();
    expect(result.current.error).toBe("API failed");
  });
});

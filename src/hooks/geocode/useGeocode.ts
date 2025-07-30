import type { ICoordinates } from "@/interfaces/coordinates";
import { useState } from "react";

export function useGeocode() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCoordinates = async (
    address: string
  ): Promise<ICoordinates | null> => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        address,
        benchmark: "Public_AR_Current",
        format: "json",
      });

      const response = await fetch(`/api/geocode?${params.toString()}`);
      if (!response.ok) {
        throw new Error("Failed to fetch geocoding data");
      }

      const data = await response.json();
      const result = data?.result?.addressMatches?.[0]?.coordinates;

      if (!result) {
        throw new Error("No coordinates found for the given address");
      }

      return {
        lat: result.y,
        lng: result.x,
        address: data?.result?.addressMatches?.[0].matchedAddress,
      };
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    fetchCoordinates,
    loading,
    error,
  };
}

import { useState, useEffect, useCallback, useRef } from "react";

interface RequestConfig {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: HeadersInit;
  body?: any;
  credentials?: RequestCredentials;
}

function useFetch<T>() {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [responseData, setResponseData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const controllerRef = useRef<AbortController | null>(null);

  const sendRequest = useCallback(async (config: RequestConfig) => {
    if (controllerRef.current) {
      if (!controllerRef.current.signal.aborted) {
        controllerRef.current.abort();
      }
      controllerRef.current = null;
    }

    const newController = new AbortController();
    controllerRef.current = newController;

    setLoading(true);

    const fullUrl = config.url.startsWith("http")
      ? config.url
      : `${baseURL}${config.url}`;

    try {
      if (newController.signal.aborted) {
        return;
      }

      const response = await fetch(fullUrl, {
        method: config.method || "GET",
        headers: {
          "Content-Type": "application/json",
          ...config.headers,
        },
        body: JSON.stringify(config.body),
        signal: newController.signal,
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResponseData(data);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === "AbortError") {
          return;
        }
        console.error("Fetch error:", error);
      }
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
        controllerRef.current = null;
      }
    };
  }, []);

  return { sendRequest, responseData, loading };
}

export default useFetch;

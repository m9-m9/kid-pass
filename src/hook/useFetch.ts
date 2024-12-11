import { useState, useEffect, useCallback, useRef } from "react";

interface RequestConfig {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: HeadersInit;
  body?: any;
}

interface UseFetchResult<T> {
  sendRequest: (config: RequestConfig) => Promise<void>;
  responseData: T | null;
  loading: boolean;
  destroy: () => void;
}

function useFetch<T>() {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [responseData, setResponseData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const controllerRef = useRef<AbortController | null>(null);

  const sendRequest = useCallback(async (config: RequestConfig) => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const newController = new AbortController();
    controllerRef.current = newController;

    setLoading(true);

    const fullUrl = config.url.startsWith("http") ? config.url : `${baseURL}${config.url}`;

    try {
      const response = await fetch(fullUrl, {
        method: config.method || "GET",
        headers: {
          ...config.headers,
        },
        body: config.body,
        signal: newController.signal,
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
          console.log("Request was aborted");
        } else {
          console.error("Fetch error:", error);
        }
      }
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const destroy = useCallback(() => {
    if (controllerRef.current) {
      controllerRef.current.abort();
      controllerRef.current = null;
    }
    setResponseData(null);
    setLoading(false);
  }, []);

  useEffect(() => {
    return destroy;
  }, []);

  return { sendRequest, responseData, loading, destroy };
}

export default useFetch;

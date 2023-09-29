import { useCallback, useState } from "react";

function useHttp() {
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState(null);

  const requestHttpHandler = useCallback(async (url, dataHandler) => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Request failed!");
      }
      const responseData = await response.json();
      dataHandler(responseData);
      setIsLoading(false);
      setHttpError(null);
    } catch (error) {
      setHttpError(error.message);
      setIsLoading(false);
    }
  }, []);
  return { httpError, isLoading, requestHttpHandler };
}

export default useHttp;

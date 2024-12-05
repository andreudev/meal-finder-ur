import { useEffect, useState } from "react";
import axios from "axios";

export default function useHttpData<T>(url: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let ignore = false;
    const controler = new AbortController();
    const { signal } = controler;
    setLoading(true);

    axios
      .get<{ meals: T[] }>(url, { signal })
      .then(({ data }) => {
        if (!ignore) setData(data.meals);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
      controler.abort();
    };
  }, [url]);

  return { data, loading, setData, setLoading };
}

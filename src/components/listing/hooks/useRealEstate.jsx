import { useEffect, useState } from "react";

export default function useRealEstate(id) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const url = id
    ? `https://api.real-estate-manager.redberryinternship.ge/api/real-estates/${id}`
    : "https://api.real-estate-manager.redberryinternship.ge/api/real-estates";

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const token = "9d03d602-ad5d-4740-8a84-0de10102669f";

        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }

        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  return { data, error, loading };
}

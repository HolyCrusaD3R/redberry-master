import { useState } from "react";

export default function useDelete() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function deleteRealEstate(id) {
    try {
      setLoading(true);
      setError(null);

      const token = "9d03d602-ad5d-4740-8a84-0de10102669f";
      const url = `https://api.real-estate-manager.redberryinternship.ge/api/real-estates/${id}`;

      const res = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }

      return true;
    } catch (err) {
      console.error(err);
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }

  return { deleteRealEstate, error, loading };
}

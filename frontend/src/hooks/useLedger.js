import { useState } from "react";
import { getAccountHistoryAPI } from "../api/ledger.api";

const useLedger = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHistory = async (accountId) => {
    try {
      setLoading(true);
      setError(null);

      const res = await getAccountHistoryAPI(accountId);

      setHistory(res.data.history || []);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to fetch history"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    history,
    loading,
    error,
    fetchHistory,
  };
};

export default useLedger;
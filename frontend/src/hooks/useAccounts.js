import { useState, useCallback } from "react";
import {
  getAccountsAPI,
  createAccountAPI,
  getBalanceAPI,
} from "../api/account.api";

const useAccounts = () => {
  const [accounts, setAccounts]   = useState([]);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState(null);

  const fetchAccounts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAccountsAPI();
      setAccounts(res.data.accounts || res.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch accounts");
    } finally {
      setLoading(false);
    }
  }, []);

  const createAccount = async () => {
    setLoading(true);
    setError(null);
    try {
      await createAccountAPI();
      await fetchAccounts();
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || "Failed to create account";
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const getBalance = async (accountId) => {
    try {
      const res = await getBalanceAPI(accountId);
      return { success: true, balance: res.data.balance ?? res.data };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Failed to fetch balance",
      };
    }
  };

  return {
    accounts,
    loading,
    error,
    fetchAccounts,
    createAccount,
    getBalance,
  };
};

export default useAccounts;
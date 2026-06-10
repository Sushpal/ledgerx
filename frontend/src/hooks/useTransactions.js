import { useState } from "react";
import { createTransactionAPI, fundAccountAPI } from "../api/transaction.api";

const useTransactions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  const createTransaction = async ({ fromAccount, toAccount, amount, idempotencyKey }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await createTransactionAPI({
        fromAccount,
        toAccount,
        amount: Number(amount),
        idempotencyKey,
      });
      return { success: true, data: res.data, idempotencyKey };
    } catch (err) {
      const message = err.response?.data?.message || "Transaction failed";
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const fundAccount = async ({ toAccount, amount, idempotencyKey }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fundAccountAPI({
        toAccount,
        amount: Number(amount),
        idempotencyKey,
      });
      return { success: true, data: res.data, idempotencyKey };
    } catch (err) {
      const message = err.response?.data?.message || "Funding failed";
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  return { createTransaction, fundAccount, loading, error, clearError };
};

export default useTransactions;
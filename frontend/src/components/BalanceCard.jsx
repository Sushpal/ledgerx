import { useState } from "react";
import useAccounts from "../hooks/useAccounts";
import { formatCurrency } from "../utils/formatCurrency";
import LoadingSpinner from "./LoadingSpinner";

const BalanceCard = ({ accounts }) => {
  const { getBalance }                = useAccounts();
  const [selectedId, setSelectedId]   = useState("");
  const [balance, setBalance]         = useState(null);
  const [loadingBal, setLoadingBal]   = useState(false);
  const [error, setError]             = useState(null);

  const handleCheck = async () => {
    if (!selectedId) return;
    setLoadingBal(true);
    setError(null);
    setBalance(null);

    const result = await getBalance(selectedId);

    if (result.success) {
      setBalance(result.balance);
    } else {
      setError(result.message);
    }
    setLoadingBal(false);
  };

  // Reset when account changes
  const handleSelect = (e) => {
    setSelectedId(e.target.value);
    setBalance(null);
    setError(null);
  };

  return (
    <div className="bg-[#1a1a1a] border border-[#272727] rounded-xl p-5">
      <h3 className="text-sm font-semibold text-[#f0ede8] mb-1">
        Check balance
      </h3>
      <p className="text-xs text-[#8a8480] mb-4">
        Select an account to see its current balance
      </p>

      <div className="flex gap-3 mb-4">
        <select
          value={selectedId}
          onChange={handleSelect}
          className="flex-1 bg-[#151515] border border-[#303030] rounded-lg px-3 py-2.5 text-sm text-[#f0ede8] outline-none focus:border-[#c8a96e] transition-colors cursor-pointer"
        >
          <option value="" disabled className="text-[#4a4744]">
            Select account
          </option>
          {accounts.map((acc) => (
            <option key={acc._id} value={acc._id}>
              {acc.accountNumber}
            </option>
          ))}
        </select>

        <button
          onClick={handleCheck}
          disabled={!selectedId || loadingBal}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#c8a96e] text-[#0f0f0f] text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-40 cursor-pointer"
        >
          {loadingBal ? <LoadingSpinner size="sm" /> : null}
          {loadingBal ? "Checking..." : "Get balance"}
        </button>
      </div>

      {/* Balance result */}
      {balance !== null && (
        <div className="flex items-center justify-between bg-[#151515] border border-[#272727] rounded-lg px-4 py-3">
          <span className="text-xs text-[#8a8480]">Available balance</span>
          <span className="font-mono text-lg font-medium text-[#f0ede8]">
            {formatCurrency(balance)}
          </span>
        </div>
      )}

      {error && (
        <p className="text-xs text-[#f87171] bg-[#f8717110] border border-[#f8717125] rounded-lg px-3 py-2">
          {error}
        </p>
      )}
    </div>
  );
};

export default BalanceCard;
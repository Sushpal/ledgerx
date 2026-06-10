import { useState, useEffect } from "react";
import { generateRequestId } from "../utils/generateRequestId";
import { formatCurrency } from "../utils/formatCurrency";
import LoadingSpinner from "./LoadingSpinner";

const TransferForm = ({ accounts, onSubmit, loading }) => {
  const [fromAccount, setFromAccount] = useState("");
  const [toAccount, setToAccount]     = useState("");
  const [amount, setAmount]           = useState("");
  const [requestId, setRequestId] = useState(() => generateRequestId());
  const [error, setError]             = useState(null);

  useEffect(() => {
    if (accounts.length === 1) {
      setFromAccount(accounts[0]._id);
    }
  }, [accounts]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!fromAccount) {
      setError("Please select a sender account");
      return;
    }
    if (!toAccount.trim()) {
      setError("Please enter a recipient account ID");
      return;
    }
    if (fromAccount === toAccount.trim()) {
      setError("Sender and recipient accounts cannot be the same");
      return;
    }
    if (!amount || Number(amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    // requestId generated here — same key shown in UI passed to parent
    onSubmit({
      fromAccount,
      toAccount: toAccount.trim(),
      amount,
      requestId,
    });
    setRequestId(generateRequestId());
  };

  const parsedAmount = Number(amount);
  const showPreview  = parsedAmount > 0 && fromAccount && toAccount.trim();
  const selectedAccount = accounts.find(
    (acc) => acc._id === fromAccount
  );

  return (
    <div className="bg-[#1a1a1a] border border-[#272727] rounded-xl p-6">
      <h2 className="text-sm font-semibold text-[#f0ede8] mb-1">
        Send money
      </h2>
      <p className="text-xs text-[#8a8480] mb-6">
        Transfer funds to another account
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-[#8a8480]">From</label>
          <select
            value={fromAccount}
            onChange={(e) => setFromAccount(e.target.value)}
            required
            className="bg-[#151515] border border-[#303030] rounded-lg px-3 py-2.5 text-sm text-[#f0ede8] outline-none focus:border-[#c8a96e] transition-colors cursor-pointer"
          >
            <option value="" disabled>Select your account</option>
            {accounts.map((acc) => (
              <option key={acc._id} value={acc._id}>
                {acc.accountNumber} — {acc.status}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-[#8a8480]">
            To account number 
          </label>
          <input
            type="text"
            value={toAccount}
            onChange={(e) => setToAccount(e.target.value)}
            required
            placeholder="ACCXXXXXXXX"
            className="bg-[#151515] border border-[#303030] rounded-lg px-3 py-2.5 text-sm text-[#f0ede8] placeholder-[#4a4744] outline-none focus:border-[#c8a96e] transition-colors font-mono"
          />
          <p className="text-xs text-[#4a4744]">
            Ask the recipient to share their account number
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-[#8a8480]">
            Amount (INR)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-sm text-[#4a4744]">
              ₹
            </span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              min="1"
              placeholder="0"
              className="w-full bg-[#151515] border border-[#303030] rounded-lg pl-7 pr-3 py-2.5 text-sm text-[#f0ede8] placeholder-[#4a4744] outline-none focus:border-[#c8a96e] transition-colors font-mono"
            />
          </div>
        </div>

        {/* Request ID — exact key that will be sent to backend */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-[#8a8480]">
            Request ID
          </label>
          <div className="flex items-center justify-between bg-[#151515] border border-[#272727] rounded-lg px-3 py-2.5">
            <span className="font-mono text-xs text-[#4a4744] truncate">
              {requestId}
            </span>
            <span className="font-mono text-xs text-[#c8a96e] ml-3 flex-shrink-0">
              auto
            </span>
          </div>
          <p className="text-xs text-[#4a4744]">
            Ensures this transfer is processed exactly once
          </p>
        </div>

        {showPreview && (
          <div className="bg-[#151515] border border-[#272727] rounded-lg p-3 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#f8717110] border border-[#f8717125] text-[#f87171]">
                  DEBIT
                </span>
                <span className="font-mono text-xs text-[#8a8480]">
                  {selectedAccount?.accountNumber}
                </span>
              </div>
              <span className="font-mono text-sm font-medium text-[#f87171]">
                −{formatCurrency(parsedAmount)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#4ade8010] border border-[#4ade8025] text-[#4ade80]">
                  CREDIT
                </span>
                <span className="font-mono text-xs text-[#8a8480] truncate max-w-[120px]">
                  {toAccount.slice(-6).toUpperCase()}
                </span>
              </div>
              <span className="font-mono text-sm font-medium text-[#4ade80]">
                +{formatCurrency(parsedAmount)}
              </span>
            </div>
          </div>
        )}

        {error && (
          <p className="text-xs text-[#f87171] bg-[#f8717110] border border-[#f8717125] rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 w-full bg-[#c8a96e] hover:opacity-90 disabled:opacity-50 text-[#0f0f0f] font-semibold text-sm rounded-lg py-2.5 transition-opacity cursor-pointer"
        >
          {loading ? <LoadingSpinner size="sm" /> : null}
          {loading
            ? "Processing..."
            : showPreview
            ? `Send ${formatCurrency(parsedAmount)}`
            : "Send money"}
        </button>
      </form>
    </div>
  );
};

export default TransferForm;
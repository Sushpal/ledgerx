import { useState } from "react";
import { generateRequestId } from "../utils/generateRequestId";
import { formatCurrency } from "../utils/formatCurrency";
import LoadingSpinner from "./LoadingSpinner";

const FundAccountForm = ({ accounts, onSubmit, loading }) => {
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount]       = useState("");
  const [requestId, setRequestId] = useState(() => generateRequestId());
  const [error, setError]         = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!toAccount) {
      setError("Please enter an account number");
      return;
    }
    if (!amount || Number(amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    // Same requestId shown in UI passed directly to parent
    onSubmit({
      toAccount,
      amount,
      requestId,
    });
    setRequestId(generateRequestId());
  };

  const parsedAmount = Number(amount);
  const showPreview  = parsedAmount > 0 && toAccount;

  return (
    <div className="bg-[#1a1a1a] border border-[#c8a96e30] rounded-xl p-6">

      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#c8a96e10] border border-[#c8a96e25]">
          <div className="w-1.5 h-1.5 rounded-full bg-[#c8a96e]" />
          <span className="font-mono text-xs text-[#c8a96e]">SYSTEM</span>
        </div>
        <h2 className="text-sm font-semibold text-[#f0ede8]">Fund account</h2>
      </div>

      <p className="text-xs text-[#8a8480] mb-6">
        Deposit initial funds into any account from the system
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-[#8a8480]">
            Account to fund
          </label>
          <input
            type="text"
            value={toAccount}
            onChange={(e) => setToAccount(e.target.value)}
            required
            placeholder="Enter Account Number"
            className="bg-[#151515] border border-[#303030] rounded-lg px-3 py-2.5 text-sm text-[#f0ede8] placeholder-[#4a4744] outline-none focus:border-[#c8a96e] transition-colors font-mono"
          />
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

        {/* Request ID — exact key sent to backend */}
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
        </div>

        {showPreview && (
          <div className="bg-[#151515] border border-[#272727] rounded-lg p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#4ade8010] border border-[#4ade8025] text-[#4ade80]">
                CREDIT
              </span>
              <span className="font-mono text-xs text-[#8a8480]">
                  ACC · {toAccount}
              </span>
            </div>
            <span className="font-mono text-sm font-medium text-[#4ade80]">
              +{formatCurrency(parsedAmount)}
            </span>
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
            ? `Fund ${formatCurrency(parsedAmount)}`
            : "Fund account"}
        </button>
      </form>
    </div>
  );
};

export default FundAccountForm;
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TransferForm from "../components/TransferForm";
import FundAccountForm from "../components/FundAccountForm";
import useAccounts from "../hooks/useAccounts";
import useTransactions from "../hooks/useTransactions";
import { useAuthContext } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

// Result card — shown after success or failure
const ResultCard = ({ result, onDismiss }) => {
  const isSuccess = result.success;

  return (
    <div className={`rounded-xl border p-5 ${
      isSuccess
        ? "bg-[#4ade8010] border-[#4ade8025]"
        : "bg-[#f8717110] border-[#f8717125]"
    }`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <p className={`text-sm font-semibold ${
            isSuccess ? "text-[#4ade80]" : "text-[#f87171]"
          }`}>
            {isSuccess ? "Transfer successful" : "Transfer failed"}
          </p>
          {isSuccess && result.idempotencyKey && (
            <p className="font-mono text-xs text-[#8a8480]">
              Request ID: {result.idempotencyKey}
            </p>
          )}
          {!isSuccess && result.message && (
            <p className="text-xs text-[#f87171] opacity-80">
              {result.message}
            </p>
          )}
        </div>
        <button
          onClick={onDismiss}
          className="text-[#4a4744] hover:text-[#8a8480] transition-colors text-lg leading-none cursor-pointer flex-shrink-0"
        >
          ×
        </button>
      </div>
    </div>
  );
};

const TransferPage = () => {
  const { isSystemUser }                       = useAuthContext();
  const { accounts, loading: acctLoading,
          error: acctError, fetchAccounts }     = useAccounts();
  const { createTransaction, fundAccount,
          loading: txLoading }                  = useTransactions();
  const [result, setResult]                    = useState(null);

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  const handleTransfer = async ({ fromAccount, toAccount, amount, requestId }) => {
    setResult(null);
    const res = await createTransaction({
      fromAccount,
      toAccount,
      amount,
      idempotencyKey: requestId,
    });
    setResult({
      success: res.success,
      message: res.message,
      idempotencyKey: res.idempotencyKey,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFund = async ({ toAccount, amount, requestId }) => {
    setResult(null);
    const res = await fundAccount({
      toAccount,
      amount,
      idempotencyKey: requestId,
    });
    setResult({
      success: res.success,
      message: res.message,
      idempotencyKey: res.idempotencyKey,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <Navbar />

      <main className="pt-24 px-6 max-w-2xl mx-auto pb-16">

        <div className="mb-8">
          <h1 className="text-xl font-semibold text-[#f0ede8]">
            {isSystemUser ? "System transfers" : "Transfer"}
          </h1>
          <p className="text-sm text-[#8a8480] mt-1">
            {isSystemUser
              ? "Fund accounts or transfer between accounts"
              : "Send money to another account"}
          </p>
        </div>

        {result && (
          <div className="mb-6">
            <ResultCard result={result} onDismiss={() => setResult(null)} />
          </div>
        )}

        {acctLoading && (
          <div className="flex items-center justify-center py-16">
            <LoadingSpinner size="lg" />
          </div>
        )}

        {!acctLoading && acctError && (
          <div className="bg-[#f8717110] border border-[#f8717125] rounded-xl px-4 py-3 mb-6">
            <p className="text-sm text-[#f87171]">{acctError}</p>
            <button
              onClick={fetchAccounts}
              className="mt-2 text-xs text-[#c8a96e] hover:opacity-80 transition-opacity cursor-pointer"
            >
              Try again
            </button>
          </div>
        )}

        {!acctLoading && !acctError && accounts.length === 0 && (
          <div className="bg-[#1a1a1a] border border-[#272727] rounded-xl px-5 py-10 text-center">
            <p className="text-sm text-[#8a8480]">No accounts found</p>
            <p className="text-xs text-[#4a4744] mt-1">
              Create an account on the Home page first
            </p>
          </div>
        )}

        {!acctLoading && !acctError && accounts.length > 0 && (
          <div className="flex flex-col gap-5">
            {isSystemUser && (
              <FundAccountForm
                accounts={accounts}
                onSubmit={handleFund}
                loading={txLoading}
              />
            )}
            {!isSystemUser && (
              <TransferForm
                accounts={accounts}
                onSubmit={handleTransfer}
                loading={txLoading}
              />
)}
          </div>
        )}
      </main>
    </div>
  );
};

export default TransferPage;
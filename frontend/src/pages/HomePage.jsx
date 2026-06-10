import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import AccountCard from "../components/AccountCard";
import CreateAccountModal from "../components/CreateAccountModal";
import BalanceCard from "../components/BalanceCard";
import useAccounts from "../hooks/useAccounts";
import LoadingSpinner from "../components/LoadingSpinner";

const HomePage = () => {
  const { accounts, loading, error, fetchAccounts, createAccount } = useAccounts();
  const [showModal, setShowModal]   = useState(false);
  const [creating, setCreating]     = useState(false);
  const [createError, setCreateError] = useState(null);
  const [createSuccess, setCreateSuccess] = useState(false);

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  const handleCreateAccount = async () => {
    setCreating(true);
    setCreateError(null);
    setCreateSuccess(false);

    const result = await createAccount();

    if (result.success) {
      setCreateSuccess(true);
      setShowModal(false);
      // Clear success message after 3s
      setTimeout(() => setCreateSuccess(false), 3000);
    } else {
      setCreateError(result.message);
    }
    setCreating(false);
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <Navbar />

      {/* Page content — offset for fixed navbar */}
      <main className="pt-24 px-6 max-w-3xl mx-auto pb-16">

        {/* Page heading */}
        <div className="mb-8">
          <h1 className="text-xl font-semibold text-[#f0ede8]">Accounts</h1>
          <p className="text-sm text-[#8a8480] mt-1">
            Manage your accounts and check balances
          </p>
        </div>

        {/* Success toast */}
        {createSuccess && (
          <div className="mb-5 flex items-center gap-2.5 bg-[#4ade8010] border border-[#4ade8025] rounded-xl px-4 py-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" />
            <p className="text-sm text-[#4ade80]">
              Account created successfully
            </p>
          </div>
        )}

        {/* Create account error */}
        {createError && (
          <div className="mb-5 bg-[#f8717110] border border-[#f8717125] rounded-xl px-4 py-3">
            <p className="text-sm text-[#f87171]">{createError}</p>
          </div>
        )}

        {/* Accounts section */}
        <div className="bg-[#1a1a1a] border border-[#272727] rounded-xl overflow-hidden mb-5">

          {/* Section header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#272727]">
            <div>
              <h2 className="text-sm font-semibold text-[#f0ede8]">
                Your accounts
              </h2>
              <p className="text-xs text-[#8a8480] mt-0.5">
                {accounts.length} {accounts.length === 1 ? "account" : "accounts"}
              </p>
            </div>
            <button
              onClick={() => { setCreateError(null); setShowModal(true); }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#c8a96e] text-[#0f0f0f] text-xs font-semibold rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              New account
            </button>
          </div>

          {/* Account list */}
          <div className="divide-y divide-[#272727]">
            {loading && (
              <div className="flex items-center justify-center py-12">
                <LoadingSpinner size="md" />
              </div>
            )}

            {!loading && error && (
              <div className="px-5 py-8 text-center">
                <p className="text-sm text-[#f87171]">{error}</p>
                <button
                  onClick={fetchAccounts}
                  className="mt-3 text-xs text-[#c8a96e] hover:opacity-80 transition-opacity cursor-pointer"
                >
                  Try again
                </button>
              </div>
            )}

            {!loading && !error && accounts.length === 0 && (
              <div className="px-5 py-12 text-center">
                <p className="text-sm text-[#8a8480]">No accounts yet</p>
                <p className="text-xs text-[#4a4744] mt-1">
                  Open your first account to get started
                </p>
              </div>
            )}

            {!loading && !error && accounts.map((account) => (
              <div key={account._id} className="px-5 py-3">
                <AccountCard account={account} />
              </div>
            ))}
          </div>
        </div>

        {/* Balance checker — only show if accounts exist */}
        {accounts.length > 0 && (
          <BalanceCard accounts={accounts} />
        )}
      </main>

      {/* Modal */}
      {showModal && (
        <CreateAccountModal
          onConfirm={handleCreateAccount}
          onClose={() => { setShowModal(false); setCreateError(null); }}
          loading={creating}
        />
      )}
    </div>
  );
};

export default HomePage;
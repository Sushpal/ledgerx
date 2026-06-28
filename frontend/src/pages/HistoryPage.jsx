import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import useAccounts from "../hooks/useAccounts";
import useLedger from "../hooks/useLedger";
import TransactionHistory from "../components/TransactionHistory";

const HistoryPage = () => {
  const { accounts, fetchAccounts }           = useAccounts();
  const { history, fetchHistory }             = useLedger();
  const [selectedAccount, setSelectedAccount] = useState("");

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  useEffect(() => {
    if (accounts.length > 0 && !selectedAccount) {
      setSelectedAccount(accounts[0]._id);
    }
  }, [accounts]);

  useEffect(() => {
    if (selectedAccount) {
      fetchHistory(selectedAccount);
    }
  }, [selectedAccount]);

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <Navbar />

      <main className="pt-24 px-6 max-w-3xl mx-auto pb-16">

        <div className="mb-8">
          <h1 className="text-xl font-semibold text-cream">
            Transaction History
          </h1>
          <p className="text-sm text-warm-grey mt-1">
            View all account activity
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-sm text-warm-grey mb-2">
            Select Account
          </label>
          <select
            value={selectedAccount}
            onChange={(e) => setSelectedAccount(e.target.value)}
            className="w-full bg-dark-bg border border-[#303030] rounded-lg px-3 py-2 text-sm text-cream outline-none focus:border-gold"
          >
            {accounts.map((acc) => (
              <option key={acc._id} value={acc._id}>
                {acc.accountNumber}
              </option>
            ))}
          </select>
        </div>

        <TransactionHistory history={history} />
      </main>
    </div>
  );
};

export default HistoryPage;
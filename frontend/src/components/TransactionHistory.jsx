const TransactionHistory = ({ history }) => {
  if (history.length === 0) {
    return (
      <div className="bg-card-bg border border-border-subtle rounded-xl p-6">
        <p className="text-sm text-warm-grey">
          No transactions found
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card-bg border border-border-subtle rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-border-subtle">
        <h2 className="text-sm font-semibold text-cream">
          Transaction History
        </h2>
      </div>

      <div className="divide-y divide-border-subtle">
        {history.map((entry) => (
          <div
            key={entry._id}
            className="px-5 py-4 flex items-center justify-between"
          >
            <div>
              <p
                className={`text-sm font-medium ${
                  entry.type === "CREDIT"
                    ? "text-[#4ade80]"
                    : "text-[#f87171]"
                }`}
              >
                {entry.type}
              </p>

              <p className="text-xs text-warm-grey">
                {new Date(entry.createdAt).toLocaleString()}
              </p>
              <p className="text-xs text-warm-grey mt-1">
                {entry.type === "CREDIT"
                    ? `Received from ${entry.transaction?.fromAccount?.accountNumber || "SYSTEM"}`
                    : `Sent to ${entry.transaction?.toAccount?.accountNumber}`}
              </p>
            </div>

            <span
              className={`font-mono text-sm ${
                entry.type === "CREDIT"
                  ? "text-[#4ade80]"
                  : "text-[#f87171]"
              }`}
            >
              {entry.type === "CREDIT" ? "+" : "-"}₹{entry.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionHistory;
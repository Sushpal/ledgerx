const TransactionHistory = ({ history }) => {
  if (history.length === 0) {
    return (
      <div className="bg-[#1a1a1a] border border-[#272727] rounded-xl p-6">
        <p className="text-sm text-[#8a8480]">
          No transactions found
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#1a1a1a] border border-[#272727] rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-[#272727]">
        <h2 className="text-sm font-semibold text-[#f0ede8]">
          Transaction History
        </h2>
      </div>

      <div className="divide-y divide-[#272727]">
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

              <p className="text-xs text-[#8a8480]">
                {new Date(entry.createdAt).toLocaleString()}
              </p>
              <p className="text-xs text-[#8a8480] mt-1">
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
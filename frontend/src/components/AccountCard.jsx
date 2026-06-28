const STATUS_STYLES = {
  ACTIVE: {
    dot: "bg-[#4ade80]",
    text: "text-[#4ade80]",
    bg: "bg-[#4ade8010] border-[#4ade8025]",
  },
  FROZEN: {
    dot: "bg-[#93c5fd]",
    text: "text-[#93c5fd]",
    bg: "bg-[#93c5fd10] border-[#93c5fd25]",
  },
  CLOSED: {
    dot: "bg-warm-grey",
    text: "text-warm-grey",
    bg: "bg-warm-grey/10 border-warm-grey/20",
  },
};

const AccountCard = ({ account }) => {
  const status = STATUS_STYLES[account.status] || STATUS_STYLES.ACTIVE;

  const accountNumber = account.accountNumber;

  return (
    <div className="bg-card-bg border border-border-subtle rounded-xl p-4 flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <span className="font-mono text-xs text-[#4a4744] tracking-widest">
          {accountNumber}
        </span>
        <span className="font-mono text-xs text-warm-grey">
          INR · {account.currency || "INR"}
        </span>
      </div>

      <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-medium ${status.bg} ${status.text}`}>
        <div className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
        {account.status}
      </div>
    </div>
  );
};

export default AccountCard;
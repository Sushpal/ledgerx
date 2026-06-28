import useAuth from "../hooks/useAuth";
import { useAuthContext } from "../context/AuthContext";
import LoadingSpinner from "./LoadingSpinner";

const ProfileCard = ({ accounts }) => {
  const { user, isSystemUser }    = useAuthContext();
  const { handleLogout, loading } = useAuth();

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  return (
    <div className="flex flex-col gap-5">

      {/* Avatar + name */}
      <div className="bg-card-bg border border-border-subtle rounded-xl p-6 flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-xl font-semibold text-gold flex-shrink-0">
          {initials}
        </div>
        <div className="flex flex-col gap-0.5 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-base font-semibold text-cream truncate">
              {user?.name}
            </p>
            {isSystemUser && (
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-gold/10 border border-gold/20 flex-shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                <span className="font-mono text-xs text-gold">
                  SYSTEM
                </span>
              </div>
            )}
          </div>
          <p className="text-sm text-warm-grey truncate">{user?.email}</p>
        </div>
      </div>

      {/* Details */}
      <div className="bg-card-bg border border-border-subtle rounded-xl overflow-hidden">
        <div className="px-5 py-3.5 border-b border-border-subtle">
          <p className="text-xs font-medium text-warm-grey tracking-wide">
            Account details
          </p>
        </div>

        <div className="divide-y divide-border-subtle">
          <div className="flex items-center justify-between px-5 py-4">
            <span className="text-sm text-warm-grey">Full name</span>
            <span className="text-sm font-medium text-cream">
              {user?.name}
            </span>
          </div>
          <div className="flex items-center justify-between px-5 py-4">
            <span className="text-sm text-warm-grey">Email address</span>
            <span className="text-sm font-medium text-cream truncate max-w-[200px]">
              {user?.email}
            </span>
          </div>
          <div className="flex items-center justify-between px-5 py-4">
            <span className="text-sm text-warm-grey">Account type</span>
            <span className={`text-sm font-medium ${
              isSystemUser ? "text-gold" : "text-cream"
            }`}>
              {isSystemUser ? "System" : "Standard"}
            </span>
          </div>
          <div className="px-5 py-4">
            <span className="text-sm text-warm-grey">
              Account Numbers
            </span>
            <div className="mt-2 flex flex-col gap-2">
              {accounts?.length > 0 ? (
                accounts.map((acc) => (
                  <div
                    key={acc._id}
                    className="font-mono text-sm text-gold"
                  >
                    {acc.accountNumber}
                  </div>
                ))
              ) : (
                <div className="text-sm text-warm-grey">
                  No accounts found
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Logout */}
      <div className="bg-card-bg border border-border-subtle rounded-xl overflow-hidden">
        <div className="px-5 py-3.5 border-b border-border-subtle">
          <p className="text-xs font-medium text-warm-grey tracking-wide">
            Session
          </p>
        </div>
        <div className="px-5 py-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-cream">
              Sign out
            </p>
            <p className="text-xs text-[#4a4744] mt-0.5">
              Ends your session and clears stored credentials
            </p>
          </div>
          <button
            onClick={handleLogout}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-transparent border border-[#f8717125] text-[#f87171] text-sm font-medium rounded-lg hover:bg-[#f8717110] transition-colors disabled:opacity-50 cursor-pointer"
          >
            {loading ? <LoadingSpinner size="sm" /> : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16,17 21,12 16,7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
            )}
            {loading ? "Signing out..." : "Sign out"}
          </button>
        </div>
      </div>

    </div>
  );
};

export default ProfileCard;
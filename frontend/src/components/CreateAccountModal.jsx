import { useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";

const CreateAccountModal = ({ onConfirm, onClose, loading }) => {

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[#1a1a1a] border border-[#272727] rounded-2xl p-6 w-full max-w-sm mx-4 shadow-2xl">

        <h3 className="text-base font-semibold text-[#f0ede8] mb-2">
          Open new account
        </h3>
        <p className="text-sm text-[#8a8480] leading-relaxed mb-6">
          A new INR account will be created for you. You can receive funds
          and make transfers from it immediately.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-[#8a8480] bg-transparent border border-[#303030] rounded-lg hover:border-[#4a4744] transition-colors disabled:opacity-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#0f0f0f] bg-[#c8a96e] rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
          >
            {loading ? <LoadingSpinner size="sm" /> : null}
            {loading ? "Creating..." : "Open account"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountModal;
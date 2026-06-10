import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../components/LoadingSpinner";

const RegisterPage = () => {
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const { handleRegister, loading, error } = useAuth();

  const onSubmit = (e) => {
    e.preventDefault();
    handleRegister(name, email, password);
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex">

      {/* Left — branding */}
      <div className="hidden lg:flex flex-col justify-center px-20 w-1/2 border-r border-[#272727]">
        <div className="mb-16">
          <span className="font-mono text-base font-medium text-[#f0ede8] tracking-tight">
            Ledger<span className="text-[#c8a96e]">X</span>
          </span>
        </div>
        <h1 className="text-4xl font-light text-[#f0ede8] leading-snug tracking-tight mb-4">
          Your accounts. <br />
          <span className="font-semibold">Your audit trail.</span>
        </h1>
        <p className="text-sm text-[#8a8480] leading-relaxed max-w-sm mb-12">
          Open an account, receive funds, and transfer money — all backed by a
          double-entry ledger that never forgets.
        </p>
        <div className="flex flex-col gap-3">
          {[
            "Create multiple accounts instantly",
            "Receive initial funds from the system",
            "Transfer money with duplicate protection",
            "Permanent record of every transaction",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3 text-sm text-[#8a8480]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#c8a96e] flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Right — form */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 px-8 bg-[#151515]">

        {/* Mobile logo */}
        <div className="mb-8 lg:hidden">
          <span className="font-mono text-base font-medium text-[#f0ede8]">
            Ledger<span className="text-[#c8a96e]">X</span>
          </span>
        </div>

        <div className="w-full max-w-sm">
          <div className="bg-[#1a1a1a] border border-[#272727] rounded-2xl p-8">
            <h2 className="text-lg font-semibold text-[#f0ede8] mb-1">
              Create your account
            </h2>
            <p className="text-sm text-[#8a8480] mb-7">
              Get started in under a minute
            </p>

            <form onSubmit={onSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-[#8a8480]">
                  Full name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Sushpal"
                  className="bg-[#151515] border border-[#303030] rounded-lg px-3 py-2.5 text-sm text-[#f0ede8] placeholder-[#4a4744] outline-none focus:border-[#c8a96e] transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-[#8a8480]">
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="bg-[#151515] border border-[#303030] rounded-lg px-3 py-2.5 text-sm text-[#f0ede8] placeholder-[#4a4744] outline-none focus:border-[#c8a96e] transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-[#8a8480]">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  minLength={6}
                  className="bg-[#151515] border border-[#303030] rounded-lg px-3 py-2.5 text-sm text-[#f0ede8] placeholder-[#4a4744] outline-none focus:border-[#c8a96e] transition-colors"
                />
              </div>

              {error && (
                <p className="text-xs text-[#f87171] bg-[#f8717110] border border-[#f8717125] rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 w-full bg-[#c8a96e] hover:opacity-90 disabled:opacity-50 text-[#0f0f0f] font-semibold text-sm rounded-lg py-2.5 transition-opacity mt-1 cursor-pointer"
              >
                {loading ? <LoadingSpinner size="sm" /> : null}
                {loading ? "Creating account..." : "Create account"}
              </button>
            </form>

            <p className="text-center text-sm text-[#8a8480] mt-5">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#c8a96e] hover:opacity-80 transition-opacity"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
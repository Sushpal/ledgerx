import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../components/LoadingSpinner";

const LoginPage = () => {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin, loading, error } = useAuth();

  const onSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex">

      {/* Left — branding */}
      <div className="hidden lg:flex flex-col justify-center px-20 w-1/2 border-r border-border-subtle">
        <div className="mb-16">
          <span className="font-mono text-base font-medium text-cream tracking-tight">
            Ledger<span className="text-gold">X</span>
          </span>
        </div>
        <h1 className="text-4xl font-light text-cream leading-snug tracking-tight mb-4">
          Move money <br />
          <span className="font-semibold">with confidence.</span>
        </h1>
        <p className="text-sm text-warm-grey leading-relaxed max-w-sm mb-12">
          Account-based transfers with a full transaction record. Every move is
          logged, traceable, and permanent.
        </p>
        <div className="flex flex-col gap-3">
          {[
            "Complete activity history for every account",
            "Transfers protected against duplicates",
            "Email confirmation on every transaction",
            "Secure session with automatic expiry",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3 text-sm text-warm-grey">
              <div className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Right — form */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 px-8 bg-dark-bg">

        {/* Mobile logo */}
        <div className="mb-8 lg:hidden">
          <span className="font-mono text-base font-medium text-cream">
            Ledger<span className="text-gold">X</span>
          </span>
        </div>

        <div className="w-full max-w-sm">
          <div className="bg-card-bg border border-border-subtle rounded-2xl p-8">
            <h2 className="text-lg font-semibold text-cream mb-1">
              Welcome back
            </h2>
            <p className="text-sm text-warm-grey mb-7">
              Sign in to your account
            </p>

            <form onSubmit={onSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-warm-grey">
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="bg-dark-bg border border-[#303030] rounded-lg px-3 py-2.5 text-sm text-cream placeholder-[#4a4744] outline-none focus:border-gold transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-warm-grey">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="bg-dark-bg border border-[#303030] rounded-lg px-3 py-2.5 text-sm text-cream placeholder-[#4a4744] outline-none focus:border-gold transition-colors"
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
                className="flex items-center justify-center gap-2 w-full bg-gold hover:opacity-90 disabled:opacity-50 text-[#0f0f0f] font-semibold text-sm rounded-lg py-2.5 transition-opacity mt-1 cursor-pointer"
              >
                {loading ? <LoadingSpinner size="sm" /> : null}
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            <p className="text-center text-sm text-warm-grey mt-5">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-gold hover:opacity-80 transition-opacity"
              >
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
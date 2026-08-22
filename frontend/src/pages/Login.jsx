import  { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HeartPulse,
  ShieldCheck,
  Eye,
  EyeOff,
  ArrowRight,
  LockKeyhole,
  Mail,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen cardio-gradient flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-6xl grid lg:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* Left branding */}
        <div className="hidden lg:flex relative bg-slate-950 text-white p-12 flex-col justify-between overflow-hidden">

          <div className="absolute -top-32 -right-32 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />

          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl" />

          <div className="relative z-10">

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500 flex items-center justify-center">
                <HeartPulse size={27} />
              </div>

              <div>
                <h1 className="text-xl font-bold">
                  CardioSecure
                </h1>

                <p className="text-xs text-slate-400">
                  AI Healthcare Platform
                </p>
              </div>
            </div>

          </div>

          <div className="relative z-10">

            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 border border-white/10 text-sm text-cyan-200 mb-6">
              <ShieldCheck size={17} />
              Privacy-Preserving AI
            </div>

            <h2 className="text-5xl font-bold leading-tight mb-6">
              Intelligent
              <br />
              cardiovascular
              <br />
              <span className="text-cyan-400">
                risk prediction.
              </span>
            </h2>

            <p className="text-slate-400 max-w-md leading-7">
              A research platform combining federated learning,
              transformer-based tabular AI, differential privacy,
              and explainable artificial intelligence.
            </p>

          </div>

          <div className="relative z-10 text-sm text-slate-500">
            FT-Transformer • FedAvg • FedProx • DP-SGD • SHAP
          </div>

        </div>

        {/* Login */}
        <div className="p-8 sm:p-12 lg:p-14 flex items-center">

          <div className="w-full max-w-md mx-auto">

            <div className="lg:hidden flex items-center gap-3 mb-10">
              <div className="w-11 h-11 rounded-xl bg-slate-950 text-white flex items-center justify-center">
                <HeartPulse size={24} />
              </div>

              <div>
                <h1 className="font-bold text-lg">
                  CardioSecure
                </h1>

                <p className="text-xs text-slate-500">
                  Privacy-Preserving AI
                </p>
              </div>
            </div>

            <div className="mb-8">

              <p className="text-cyan-600 font-semibold text-sm mb-2">
                Welcome back
              </p>

              <h2 className="text-3xl font-bold text-slate-900">
                Sign in to your account
              </h2>

              <p className="text-slate-500 mt-2">
                Access your cardiovascular AI dashboard.
              </p>

            </div>

            {error && (
              <div className="mb-5 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Email */}
              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email address
                </label>

                <div className="relative">

                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition"
                  />

                </div>

              </div>

              {/* Password */}
              <div>

                <div className="flex justify-between mb-2">

                  <label className="text-sm font-semibold text-slate-700">
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-xs font-semibold text-cyan-600 hover:text-cyan-700"
                  >
                    Forgot password?
                  </button>

                </div>

                <div className="relative">

                  <LockKeyhole
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-11 pr-12 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>

                </div>

              </div>

              {/* Login */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-slate-950 text-white font-semibold flex items-center justify-center gap-2 hover:bg-slate-800 transition disabled:opacity-60"
              >
                {loading ? (
                  "Signing in..."
                ) : (
                  <>
                    Sign in
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

            </form>

            <div className="relative my-8">

              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>

              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-xs text-slate-400">
                  SECURE ACCESS
                </span>
              </div>

            </div>

            <p className="text-center text-sm text-slate-500">

              Don't have an account?

              <Link
                to="/register"
                className="ml-1 font-semibold text-cyan-600 hover:text-cyan-700"
              >
                Create account
              </Link>

            </p>

            <div className="mt-8 flex items-start gap-3 p-4 rounded-xl bg-slate-50">

              <ShieldCheck
                size={18}
                className="text-cyan-600 mt-0.5 flex-shrink-0"
              />

              <p className="text-xs text-slate-500 leading-5">
                Your CardioSecure account provides access to a
                research-oriented AI decision-support platform.
                This system does not provide medical diagnosis.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
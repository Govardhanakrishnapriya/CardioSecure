
import  { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HeartPulse,
  UserPlus,
  Mail,
  LockKeyhole,
  UserRound,
  Eye,
  EyeOff,
  ShieldCheck,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Researcher",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    try {
      await register(
        form.name,
        form.email,
        form.password,
        form.role
      );

      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen cardio-gradient flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-5">

        {/* Branding */}
        <div className="lg:col-span-2 bg-slate-950 text-white p-10 flex flex-col justify-between">

          <div>

            <div className="flex items-center gap-3 mb-14">

              <div className="w-11 h-11 rounded-xl bg-cyan-500 flex items-center justify-center">
                <HeartPulse size={25} />
              </div>

              <div>
                <h1 className="font-bold">
                  CardioSecure
                </h1>

                <p className="text-xs text-slate-400">
                  AI Healthcare Platform
                </p>
              </div>

            </div>

            <h2 className="text-3xl font-bold leading-tight">
              Join the future of
              <span className="text-cyan-400">
                {" "}privacy-aware healthcare AI.
              </span>
            </h2>

            <p className="mt-5 text-slate-400 leading-7">
              Explore cardiovascular prediction using
              federated learning, differential privacy,
              and explainable AI.
            </p>

          </div>

          <div className="mt-10 flex items-center gap-3 text-sm text-slate-500">
            <ShieldCheck size={18} />
            Privacy-aware research platform
          </div>

        </div>

        {/* Form */}
        <div className="lg:col-span-3 p-8 sm:p-12">

          <div className="max-w-md mx-auto">

            <div className="mb-8">

              <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-5">
                <UserPlus size={23} />
              </div>

              <h2 className="text-3xl font-bold text-slate-900">
                Create account
              </h2>

              <p className="text-slate-500 mt-2">
                Set up your CardioSecure research account.
              </p>

            </div>

            {error && (
              <div className="mb-5 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Full name
                </label>

                <div className="relative">
                  <UserRound
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    value={form.name}
                    onChange={(e) =>
                      updateField("name", e.target.value)
                    }
                    placeholder="Dr. Alex Johnson"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      updateField("email", e.target.value)
                    }
                    placeholder="you@example.com"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Role
                </label>

                <select
                  value={form.role}
                  onChange={(e) =>
                    updateField("role", e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                >
                  <option>Doctor</option>
                  <option>Researcher</option>
                  <option>Hospital Administrator</option>
                  <option>Student / Researcher</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) =>
                      updateField("password", e.target.value)
                    }
                    placeholder="Minimum 8 characters"
                    className="w-full pl-11 pr-12 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Confirm password
                </label>

                <input
                  type="password"
                  value={form.confirmPassword}
                  onChange={(e) =>
                    updateField(
                      "confirmPassword",
                      e.target.value
                    )
                  }
                  placeholder="Repeat your password"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 mt-3 rounded-xl bg-slate-950 text-white font-semibold hover:bg-slate-800 transition"
              >
                Create account
              </button>

            </form>

            <p className="text-center text-sm text-slate-500 mt-7">

              Already have an account?

              <Link
                to="/login"
                className="ml-1 font-semibold text-cyan-600"
              >
                Sign in
              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}
import { useState } from "react";
import {
  Bell,
  Lock,
  Save,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import AppShell from "../components/AppShell";
import PageHeader from "../components/PageHeader";
import { useAuth } from "../context/AuthContext";

export default function Settings() {
  const { user } = useAuth();

  const [name, setName] = useState(
    user?.name || "Research User"
  );

  const [email, setEmail] = useState(
    user?.email || "researcher@example.com"
  );

  const [notifications, setNotifications] = useState(true);

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <AppShell>

      <PageHeader
        eyebrow="Account"
        title="Settings"
        description="Manage your CardioSecure profile and application preferences."
      />

      <div className="grid lg:grid-cols-3 gap-6">

        {/* Profile */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">

          <div className="flex items-center gap-4 pb-6 border-b border-slate-100">

            <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
              <UserRound size={22} />
            </div>

            <div>
              <h2 className="text-xl font-bold">
                Profile Information
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Update your research account details.
              </p>
            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-5 mt-7">

            <div>
              <label className="field-label">
                Full Name
              </label>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="field-input"
              />
            </div>

            <div>
              <label className="field-label">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="field-input"
              />
            </div>

            <div>
              <label className="field-label">
                Role
              </label>

              <input
                value={user?.role || "Researcher"}
                disabled
                className="field-input opacity-60"
              />
            </div>

          </div>

          <button
            onClick={handleSave}
            className="mt-7 px-5 py-3 rounded-xl bg-slate-950 text-white font-semibold flex items-center gap-2 hover:bg-slate-800"
          >
            <Save size={17} />

            {saved ? "Saved!" : "Save Changes"}
          </button>

        </div>

        {/* Security */}
        <div className="bg-slate-950 rounded-2xl p-7 text-white">

          <div className="w-11 h-11 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center">
            <Lock size={21} />
          </div>

          <h2 className="text-xl font-bold mt-6">
            Security
          </h2>

          <p className="text-sm text-slate-400 mt-2 leading-6">
            Your account provides access to the CardioSecure
            research platform.
          </p>

          <div className="mt-7 space-y-4">

            <div className="flex items-center gap-3">
              <ShieldCheck
                size={17}
                className="text-emerald-400"
              />
              <span className="text-sm text-slate-300">
                Privacy-aware platform
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Lock
                size={17}
                className="text-emerald-400"
              />
              <span className="text-sm text-slate-300">
                Protected account
              </span>
            </div>

          </div>

        </div>

      </div>

      {/* Preferences */}
      <div className="mt-6 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">

        <div className="flex items-center gap-4">

          <div className="w-11 h-11 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
            <Bell size={21} />
          </div>

          <div>
            <h2 className="font-bold">
              Notifications
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Control dashboard notification preferences.
            </p>
          </div>

        </div>

        <div className="mt-6 flex items-center justify-between">

          <div>
            <p className="font-semibold text-sm">
              Enable notifications
            </p>

            <p className="text-xs text-slate-400 mt-1">
              Receive updates about prediction activity.
            </p>
          </div>

          <button
            onClick={() =>
              setNotifications(!notifications)
            }
            className={`
              relative w-12 h-7 rounded-full transition
              ${
                notifications
                  ? "bg-cyan-500"
                  : "bg-slate-300"
              }
            `}
          >
            <span
              className={`
                absolute top-1 w-5 h-5 bg-white rounded-full shadow transition
                ${
                  notifications
                    ? "left-6"
                    : "left-1"
                }
              `}
            />
          </button>

        </div>

      </div>

    </AppShell>
  );
}
import {
  LockKeyhole,
  ShieldCheck,
  Activity,
  Gauge,
  Info,
} from "lucide-react";

import AppShell from "../components/AppShell";
import PageHeader from "../components/PageHeader";

const privacyExperiments = [
  {
    name: "DP-SGD Test",
    epsilon: "6.9239",
    delta: "1e-5",
    description: "Initial local DP training experiment.",
  },
  {
    name: "Local DP Training",
    epsilon: "3.1850",
    delta: "1e-5",
    description: "Recorded local privacy budget.",
  },
  {
    name: "Formal Adaptive DP-FedAvg",
    epsilon: "2.2398",
    delta: "1e-5",
    description: "Maximum client epsilon recorded in round 1.",
  },
];

export default function Privacy() {
  return (
    <AppShell>

      <PageHeader
        eyebrow="Privacy Engineering"
        title="Differential Privacy"
        description="Review the privacy-preserving mechanisms and recorded privacy budgets used in the experimental pipeline."
      />

      {/* Status */}
      <div className="bg-slate-950 text-white rounded-3xl p-7 sm:p-9 mb-7">

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

          <div className="flex items-start gap-4">

            <div className="w-12 h-12 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center">
              <LockKeyhole size={23} />
            </div>

            <div>

              <h2 className="text-xl font-bold">
                Privacy-aware training pipeline
              </h2>

              <p className="text-slate-400 text-sm mt-2 max-w-2xl leading-6">
                The project evaluates differential privacy using
                DP-SGD, gradient clipping, noise injection and
                privacy accounting.
              </p>

            </div>

          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Privacy Pipeline Available
          </div>

        </div>

      </div>

      {/* Mechanisms */}
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 mb-7">

        {[
          [ShieldCheck, "DP-SGD", "Differentially private optimization"],
          [Gauge, "Gradient Clipping", "Bounds individual gradients"],
          [Activity, "Noise Injection", "Adds calibrated Gaussian noise"],
          [LockKeyhole, "Privacy Accounting", "Tracks epsilon and delta"],
        ].map(([Icon, title, text]) => (

          <div
            key={title}
            className="bg-white border border-slate-200 rounded-2xl p-6"
          >

            <Icon
              size={23}
              className="text-cyan-600"
            />

            <h3 className="font-bold mt-5">
              {title}
            </h3>

            <p className="text-sm text-slate-500 mt-2 leading-5">
              {text}
            </p>

          </div>

        ))}

      </div>

      {/* Epsilon */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6">

        <div className="mb-6">
          <h2 className="text-lg font-bold">
            Recorded Privacy Budgets
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Values recorded during the project's DP experiments.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">

          {privacyExperiments.map((experiment) => (

            <div
              key={experiment.name}
              className="p-5 rounded-2xl bg-slate-50 border border-slate-200"
            >

              <p className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                {experiment.name}
              </p>

              <div className="flex items-end gap-2 mt-4">

                <span className="text-4xl font-bold">
                  {experiment.epsilon}
                </span>

                <span className="text-sm text-slate-400 mb-1">
                  ε
                </span>

              </div>

              <p className="text-xs text-slate-500 mt-2">
                δ = {experiment.delta}
              </p>

              <p className="text-sm text-slate-500 mt-5 leading-5">
                {experiment.description}
              </p>

            </div>

          ))}

        </div>

      </div>

      <div className="mt-6 flex gap-3 p-4 rounded-xl bg-amber-50 border border-amber-100">

        <Info
          size={18}
          className="text-amber-600 flex-shrink-0"
        />

        <p className="text-xs text-amber-800 leading-5">
          Privacy budgets shown here are experimental records from
          the project and should not be interpreted as a universal
          privacy guarantee for every deployment configuration.
        </p>

      </div>

    </AppShell>
  );
}
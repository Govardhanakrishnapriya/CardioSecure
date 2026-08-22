import {
  Brain,
  HeartPulse,
  Network,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import AppShell from "../components/AppShell";
import PageHeader from "../components/PageHeader";

export default function About() {
  return (
    <AppShell>

      <PageHeader
        eyebrow="Research Platform"
        title="About CardioSecure"
        description="An AI healthcare research platform combining tabular deep learning, federated learning, differential privacy and explainable AI."
      />

      <div className="grid lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2 bg-slate-950 rounded-3xl p-7 sm:p-9 text-white">

          <div className="w-12 h-12 rounded-xl bg-cyan-500 flex items-center justify-center">
            <HeartPulse size={24} />
          </div>

          <h2 className="text-3xl font-bold mt-7">
            Privacy-aware cardiovascular AI
          </h2>

          <p className="text-slate-400 mt-5 leading-7 max-w-3xl">
            CardioSecure evaluates cardiovascular risk prediction
            using an FT-Transformer architecture and compares
            centralized, federated and differential-privacy-aware
            training approaches.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mt-8">

            {[
              [
                Brain,
                "FT-Transformer",
                "Transformer-based tabular learning.",
              ],
              [
                Network,
                "Federated Learning",
                "Collaborative training across hospitals.",
              ],
              [
                ShieldCheck,
                "Differential Privacy",
                "DP-SGD and privacy accounting experiments.",
              ],
              [
                Sparkles,
                "Explainable AI",
                "SHAP-based model interpretation.",
              ],
            ].map(([Icon, title, text]) => (

              <div
                key={title}
                className="p-5 rounded-2xl bg-white/5 border border-white/10"
              >

                <Icon
                  size={21}
                  className="text-cyan-400"
                />

                <h3 className="font-bold mt-4">
                  {title}
                </h3>

                <p className="text-sm text-slate-400 mt-2">
                  {text}
                </p>

              </div>

            ))}

          </div>

        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-7">

          <h2 className="text-xl font-bold">
            Best Results
          </h2>

          <div className="mt-7 space-y-5">

            {[
              ["Accuracy", "88.04%"],
              ["Precision", "89.22%"],
              ["Recall", "89.22%"],
              ["F1 Score", "89.22%"],
              ["AUC", "0.9071"],
            ].map(([label, value]) => (

              <div
                key={label}
                className="flex justify-between items-center pb-4 border-b border-slate-100"
              >
                <span className="text-sm text-slate-500">
                  {label}
                </span>

                <span className="font-bold">
                  {value}
                </span>
              </div>

            ))}

          </div>

        </div>

      </div>

      <div className="mt-6 p-5 rounded-2xl bg-amber-50 border border-amber-100">

        <p className="text-sm text-amber-800 leading-6">
          <strong>Academic Research Platform:</strong>{" "}
          CardioSecure is intended for research and decision-support
          experimentation. Predictions should not be treated as
          medical diagnoses.
        </p>

      </div>

    </AppShell>
  );
}
import {
  Award,
  Brain,
  CheckCircle2,
  Target,
  TrendingUp,
} from "lucide-react";

import AppShell from "../components/AppShell";
import PageHeader from "../components/PageHeader";

const models = [
  {
    name: "FT-Transformer",
    type: "Centralized Baseline",
    accuracy: 85.87,
    precision: 85.85,
    recall: 89.22,
    f1: 87.50,
    auc: 0.9091,
  },
  {
    name: "FedAvg + FT-Transformer",
    type: "Federated Learning",
    accuracy: 88.04,
    precision: 89.22,
    recall: 89.22,
    f1: 89.22,
    auc: 0.9071,
    best: true,
  },
  {
    name: "FedProx + FT-Transformer",
    type: "Federated Learning",
    accuracy: 86.41,
    precision: 87.38,
    recall: 88.24,
    f1: 87.80,
    auc: 0.9159,
    bestAuc: true,
  },
  {
    name: "Experimental Adaptive DP-FedAvg",
    type: "Differential Privacy",
    accuracy: 83.70,
    precision: 85.29,
    recall: 85.29,
    f1: 85.29,
    auc: 0.8942,
  },
  {
    name: "Formal Adaptive DP-FedAvg",
    type: "Differential Privacy",
    accuracy: 86.41,
    precision: 87.38,
    recall: 88.24,
    f1: 87.80,
    auc: 0.9061,
  },
];

export default function Models() {
  return (
    <AppShell>

      <PageHeader
        eyebrow="Model Evaluation"
        title="Model Performance"
        description="Compare the centralized, federated, and privacy-preserving approaches evaluated in the CardioSecure research pipeline."
      />

      {/* Best metrics */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-7">

        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <div className="w-11 h-11 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
            <Target size={21} />
          </div>

          <p className="text-sm text-slate-500 mt-5">
            Best Accuracy
          </p>

          <h2 className="text-3xl font-bold mt-1">
            88.04%
          </h2>

          <p className="text-xs text-slate-400 mt-2">
            FedAvg + FT-Transformer
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Award size={21} />
          </div>

          <p className="text-sm text-slate-500 mt-5">
            Best Precision
          </p>

          <h2 className="text-3xl font-bold mt-1">
            89.22%
          </h2>

          <p className="text-xs text-slate-400 mt-2">
            FedAvg + FT-Transformer
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <div className="w-11 h-11 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
            <TrendingUp size={21} />
          </div>

          <p className="text-sm text-slate-500 mt-5">
            Best Recall
          </p>

          <h2 className="text-3xl font-bold mt-1">
            89.22%
          </h2>

          <p className="text-xs text-slate-400 mt-2">
            FT-Transformer / FedAvg
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Brain size={21} />
          </div>

          <p className="text-sm text-slate-500 mt-5">
            Best AUC
          </p>

          <h2 className="text-3xl font-bold mt-1">
            0.9159
          </h2>

          <p className="text-xs text-slate-400 mt-2">
            FedProx + FT-Transformer
          </p>
        </div>

      </div>

      {/* Model cards */}
      <div className="space-y-5">

        {models.map((model) => (

          <div
            key={model.name}
            className={`
              bg-white border rounded-2xl p-6
              ${
                model.best
                  ? "border-cyan-300 ring-2 ring-cyan-50"
                  : "border-slate-200"
              }
            `}
          >

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">

              <div className="flex items-start gap-4">

                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                  <Brain size={22} />
                </div>

                <div>

                  <div className="flex flex-wrap items-center gap-2">

                    <h3 className="text-lg font-bold text-slate-900">
                      {model.name}
                    </h3>

                    {model.best && (
                      <span className="px-2.5 py-1 rounded-full bg-cyan-50 text-cyan-700 text-[11px] font-bold">
                        BEST ACCURACY
                      </span>
                    )}

                    {model.bestAuc && (
                      <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-[11px] font-bold">
                        BEST AUC
                      </span>
                    )}

                  </div>

                  <p className="text-sm text-slate-400 mt-1">
                    {model.type}
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-2 text-sm text-emerald-600 font-semibold">
                <CheckCircle2 size={17} />
                Evaluated
              </div>

            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mt-7">

              {[
                ["Accuracy", `${model.accuracy.toFixed(2)}%`],
                ["Precision", `${model.precision.toFixed(2)}%`],
                ["Recall", `${model.recall.toFixed(2)}%`],
                ["F1 Score", `${model.f1.toFixed(2)}%`],
                ["AUC", model.auc.toFixed(4)],
              ].map(([label, value]) => (

                <div
                  key={label}
                  className="p-4 rounded-xl bg-slate-50"
                >
                  <p className="text-xs text-slate-400">
                    {label}
                  </p>

                  <p className="text-xl font-bold text-slate-900 mt-1">
                    {value}
                  </p>
                </div>

              ))}

            </div>

          </div>

        ))}

      </div>

      <div className="mt-6 p-4 rounded-xl bg-slate-950 text-slate-300 text-xs leading-5">
        The metrics displayed here correspond to the experimental results
        recorded for the CardioSecure project. They are presented for
        research and evaluation purposes.
      </div>

    </AppShell>
  );
}
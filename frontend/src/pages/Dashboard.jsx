import {  useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Activity,
  Brain,
  Target,
  Award,
  ShieldCheck,
  
  ArrowUpRight,
  CheckCircle2,
  LockKeyhole,
  Hospital,
  Sparkles,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import MetricCard from "../components/MetricCard";
import PageHeader from "../components/PageHeader";

const fedAvgRounds = [
  { round: 1, accuracy: 88.04, auc: 90.71 },
  { round: 2, accuracy: 85.87, auc: 92.13 },
  { round: 3, accuracy: 86.41, auc: 91.63 },
  { round: 4, accuracy: 85.33, auc: 92.00 },
  { round: 5, accuracy: 85.87, auc: 92.36 },
  { round: 6, accuracy: 85.87, auc: 92.62 },
  { round: 7, accuracy: 85.33, auc: 92.60 },
  { round: 8, accuracy: 83.70, auc: 91.82 },
  { round: 9, accuracy: 86.41, auc: 92.93 },
  { round: 10, accuracy: 83.70, auc: 92.09 },
];

const hospitals = [
  {
    name: "Hospital 1",
    samples: 245,
    class0: 109,
    class1: 136,
  },
  {
    name: "Hospital 2",
    samples: 245,
    class0: 110,
    class1: 135,
  },
  {
    name: "Hospital 3",
    samples: 244,
    class0: 109,
    class1: 135,
  },
];

const modelComparison = [
  {
    name: "FT-Transformer",
    accuracy: 85.87,
    auc: 0.9091,
  },
  {
    name: "FedAvg + FT",
    accuracy: 88.04,
    auc: 0.9071,
  },
  {
    name: "FedProx + FT",
    accuracy: 86.41,
    auc: 0.9159,
  },
  {
    name: "Formal DP-FedAvg",
    accuracy: 86.41,
    auc: 0.9061,
  },
];

export default function Dashboard() {
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [predictions] = useState(() => {
  try {
    const savedPredictions = localStorage.getItem("predictions");

    return savedPredictions
      ? JSON.parse(savedPredictions)
      : [];
  } catch {
    return [];
  }
});
const totalPredictions = predictions.length;

const highRiskPredictions = predictions.filter(
  (prediction) =>
    prediction.result === "Elevated Risk"
).length;

const lowRiskPredictions = predictions.filter(
  (prediction) =>
    prediction.result === "Lower Risk"
).length;

const latestPrediction =
  predictions.length > 0
    ? predictions[0]
    : null;

  return (
    <div
      className={
        darkMode
          ? "min-h-screen bg-slate-950"
          : "min-h-screen bg-slate-50"
      }
    >

      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onToggle={() => setCollapsed(!collapsed)}
      />

      <div
        className={`
          min-h-screen transition-all duration-300
          ${collapsed ? "lg:pl-[84px]" : "lg:pl-[270px]"}
        `}
      >

        <Navbar
          onMenuClick={() => setMobileOpen(true)}
          darkMode={darkMode}
          onToggleTheme={() => setDarkMode(!darkMode)}
        />

        <main className="p-4 sm:p-6 lg:p-8 max-w-[1700px] mx-auto">

          <PageHeader
            eyebrow="AI Healthcare Analytics"
            title="Welcome to CardioSecure"
            description="Monitor your privacy-preserving cardiovascular prediction platform and model performance."
            actionLabel="New Prediction"
            onAction={() => navigate("/prediction")}
          />

          {/* Main model banner */}
          <div className="relative overflow-hidden rounded-3xl bg-slate-950 text-white p-6 sm:p-8 mb-7">

            <div className="absolute -top-24 -right-20 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl" />

            <div className="absolute -bottom-32 left-1/3 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl" />

            <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-7">

              <div>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-xs font-medium text-cyan-200 mb-4">
                  <Sparkles size={14} />
                  Best Performing Federated Model
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold">
                  FedAvg + FT-Transformer
                </h2>

                <p className="text-slate-400 mt-2 max-w-2xl">
                  Collaborative tabular learning across three hospital
                  environments without requiring centralized raw patient data.
                </p>

              </div>

              <div className="flex flex-wrap gap-3">

                <div className="px-5 py-4 rounded-2xl bg-white/5 border border-white/10 min-w-[130px]">
                  <p className="text-xs text-slate-500">
                    Accuracy
                  </p>

                  <p className="text-2xl font-bold mt-1">
                    88.04%
                  </p>
                </div>

                <div className="px-5 py-4 rounded-2xl bg-white/5 border border-white/10 min-w-[130px]">
                  <p className="text-xs text-slate-500">
                    AUC
                  </p>

                  <p className="text-2xl font-bold mt-1">
                    0.9071
                  </p>
                </div>

              </div>

            </div>
          </div>
          {/* Live Prediction Summary */}

<div className="grid md:grid-cols-4 gap-5 mb-7">

  <div className="bg-white border border-slate-200 rounded-2xl p-6">

    <p className="text-sm text-slate-500">
      Total Predictions
    </p>

    <p className="text-3xl font-bold text-slate-900 mt-2">
      {totalPredictions}
    </p>

    <p className="text-xs text-slate-400 mt-2">
      Predictions generated in this browser
    </p>

  </div>


  <div className="bg-white border border-slate-200 rounded-2xl p-6">

    <p className="text-sm text-slate-500">
      Elevated Risk
    </p>

    <p className="text-3xl font-bold text-red-600 mt-2">
      {highRiskPredictions}
    </p>

    <p className="text-xs text-slate-400 mt-2">
      High-risk model outputs
    </p>

  </div>


  <div className="bg-white border border-slate-200 rounded-2xl p-6">

    <p className="text-sm text-slate-500">
      Lower Risk
    </p>

    <p className="text-3xl font-bold text-emerald-600 mt-2">
      {lowRiskPredictions}
    </p>

    <p className="text-xs text-slate-400 mt-2">
      Lower-risk model outputs
    </p>

  </div>


  <div className="bg-slate-950 rounded-2xl p-6 text-white">

    <p className="text-sm text-slate-400">
      Latest Prediction
    </p>

    {latestPrediction ? (
      <>
        <p className="text-3xl font-bold text-cyan-400 mt-2">
          {latestPrediction.probability}
        </p>

        <p className="text-xs text-slate-400 mt-2">
          {latestPrediction.result}
        </p>
      </>
    ) : (
      <>
        <p className="text-lg font-semibold mt-3">
          No predictions yet
        </p>

        <button
          onClick={() => navigate("/prediction")}
          className="text-xs text-cyan-400 mt-3"
        >
          Create your first prediction →
        </button>
      </>
    )}

  </div>

</div>

          {/* Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-7">

            <MetricCard
              title="Accuracy"
              value="88.04%"
              icon={Target}
              description="Best FedAvg test performance"
            />

            <MetricCard
              title="Precision"
              value="89.22%"
              icon={Award}
              description="Positive prediction precision"
            />

            <MetricCard
              title="Recall"
              value="89.22%"
              icon={Activity}
              description="Disease detection sensitivity"
            />

            <MetricCard
              title="F1 Score"
              value="89.22%"
              icon={Brain}
              description="Balanced classification score"
            />

          </div>

          {/* Middle section */}
          <div className="grid xl:grid-cols-3 gap-6 mb-7">

            {/* Performance chart */}
            <div className="xl:col-span-2 bg-white border border-slate-200 rounded-2xl p-6">

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">

                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    FedAvg Round Performance
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    Accuracy and AUC across 10 federated rounds
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs">

                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
                    Accuracy
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                    AUC
                  </div>

                </div>

              </div>

              <div className="h-[270px] flex items-end gap-2 sm:gap-4 px-2">

                {fedAvgRounds.map((item) => {

                  const minValue = 75;
const maxValue = 100;

const height = `${Math.max(
  8,
  ((item.accuracy - minValue) /
    (maxValue - minValue)) *
    100
)}%`;

const aucHeight = `${Math.max(
  8,
  ((item.auc - minValue) /
    (maxValue - minValue)) *
    100
)}%`;

                  return (
                    <div
                      key={item.round}
                      className="flex-1 h-full flex items-end justify-center gap-1.5"
                    >

                      <div
                        title={`Round ${item.round}: Accuracy ${item.accuracy}%`}
                        className="w-1/2 max-w-[22px] rounded-t-lg bg-cyan-500 hover:bg-cyan-400 transition-all"
                        style={{
                          height,
                        }}
                      />

                      <div
                        title={`Round ${item.round}: AUC ${(
                          item.auc / 100
                        ).toFixed(4)}`}
                        className="w-1/2 max-w-[22px] rounded-t-lg bg-slate-300 hover:bg-slate-400 transition-all"
                        style={{
                          height: aucHeight,
                        }}
                      />

                    </div>
                  );
                })}

              </div>

              <div className="grid grid-cols-10 gap-2 mt-3 text-center text-[10px] text-slate-400">

                {fedAvgRounds.map((item) => (
                  <span key={item.round}>
                    R{item.round}
                  </span>
                ))}

              </div>

            </div>

            {/* AUC card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6">

              <div className="flex items-center justify-between">

                <div>
                  <h3 className="font-bold text-slate-900">
                    Discrimination
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    ROC-AUC performance
                  </p>
                </div>

                <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
                  <Activity size={20} />
                </div>

              </div>

              <div className="flex items-center justify-center py-8">

                <div className="relative w-44 h-44 rounded-full bg-slate-100 flex items-center justify-center">

                  <div className="absolute inset-3 rounded-full border-[14px] border-cyan-500 border-r-slate-100 border-b-slate-100 rotate-[20deg]" />

                  <div className="text-center relative">
                    <p className="text-4xl font-bold text-slate-900">
                      0.9071
                    </p>

                    <p className="text-xs text-slate-400 mt-1">
                      AUC
                    </p>
                  </div>

                </div>

              </div>

              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">

                <div className="flex gap-3">

                  <CheckCircle2
                    size={18}
                    className="text-emerald-600 flex-shrink-0"
                  />

                  <div>
                    <p className="text-sm font-semibold text-emerald-800">
                      Strong discrimination
                    </p>

                    <p className="text-xs text-emerald-700/70 mt-1">
                      The model demonstrates good separation
                      between the evaluated classes.
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* Bottom */}
          <div className="grid xl:grid-cols-3 gap-6">

            {/* Hospitals */}
            <div className="xl:col-span-2 bg-white border border-slate-200 rounded-2xl p-6">

              <div className="flex items-center justify-between mb-6">

                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Federated Network
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    Participating hospital data distribution
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  3 Hospitals Active
                </div>

              </div>

              <div className="grid md:grid-cols-3 gap-4">

                {hospitals.map((hospital) => (

                  <div
                    key={hospital.name}
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-cyan-200 hover:bg-cyan-50/30 transition"
                  >

                    <div className="flex items-center justify-between">

                      <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-cyan-600">
                        <Hospital size={20} />
                      </div>

                      <span className="text-xs font-semibold text-emerald-600">
                        Active
                      </span>

                    </div>

                    <h4 className="font-bold text-slate-900 mt-5">
                      {hospital.name}
                    </h4>

                    <p className="text-2xl font-bold text-slate-900 mt-1">
                      {hospital.samples}
                    </p>

                    <p className="text-xs text-slate-400">
                      total samples
                    </p>

                    <div className="mt-5">

                      <div className="flex justify-between text-xs mb-2">
                        <span className="text-slate-500">
                          Class 0
                        </span>

                        <span className="font-semibold text-slate-700">
                          {hospital.class0}
                        </span>
                      </div>

                      <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-slate-400 rounded-full"
                          style={{
                            width: `${
                              (hospital.class0 /
                                hospital.samples) *
                              100
                            }%`,
                          }}
                        />
                      </div>

                      <div className="flex justify-between text-xs mt-3 mb-2">
                        <span className="text-slate-500">
                          Class 1
                        </span>

                        <span className="font-semibold text-slate-700">
                          {hospital.class1}
                        </span>
                      </div>

                      <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-cyan-500 rounded-full"
                          style={{
                            width: `${
                              (hospital.class1 /
                                hospital.samples) *
                              100
                            }%`,
                          }}
                        />
                      </div>

                    </div>

                  </div>

                ))}

              </div>

            </div>

            {/* Security */}
            <div className="bg-slate-950 rounded-2xl p-6 text-white">

              <div className="w-11 h-11 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center mb-5">
                <LockKeyhole size={21} />
              </div>

              <h3 className="text-xl font-bold">
                Privacy & Security
              </h3>

              <p className="text-sm text-slate-400 mt-2 leading-6">
                Your research pipeline incorporates
                privacy-preserving federated training.
              </p>

              <div className="mt-6 space-y-4">

                <div className="flex items-center gap-3">
                  <CheckCircle2
                    size={17}
                    className="text-emerald-400"
                  />
                  <span className="text-sm text-slate-300">
                    Federated Learning
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <CheckCircle2
                    size={17}
                    className="text-emerald-400"
                  />
                  <span className="text-sm text-slate-300">
                    Differential Privacy
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <CheckCircle2
                    size={17}
                    className="text-emerald-400"
                  />
                  <span className="text-sm text-slate-300">
                    Gradient Clipping
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <CheckCircle2
                    size={17}
                    className="text-emerald-400"
                  />
                  <span className="text-sm text-slate-300">
                    Explainable AI
                  </span>
                </div>

              </div>

              <button
                onClick={() => navigate("/privacy")}
                className="w-full mt-7 py-3 rounded-xl bg-white text-slate-950 text-sm font-semibold hover:bg-slate-100 transition flex items-center justify-center gap-2"
              >
                View Privacy Details
                <ArrowUpRight size={16} />
              </button>

            </div>

          </div>

          {/* Model comparison */}
          <div className="mt-6 bg-white border border-slate-200 rounded-2xl p-6">

            <div className="flex items-center justify-between mb-6">

              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Model Comparison
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Accuracy and AUC across your evaluated models
                </p>
              </div>

              <button
                onClick={() => navigate("/models")}
                className="text-sm font-semibold text-cyan-600 hover:text-cyan-700 flex items-center gap-1"
              >
                View all
                <ArrowUpRight size={15} />
              </button>

            </div>

            <div className="space-y-5">

              {modelComparison.map((model) => (

                <div key={model.name}>

                  <div className="flex justify-between mb-2">

                    <span className="text-sm font-semibold text-slate-700">
                      {model.name}
                    </span>

                    <div className="flex gap-4 text-xs text-slate-400">
                      <span>
                        Accuracy{" "}
                        <strong className="text-slate-700">
                          {model.accuracy}%
                        </strong>
                      </span>

                      <span>
                        AUC{" "}
                        <strong className="text-slate-700">
                          {model.auc}
                        </strong>
                      </span>
                    </div>

                  </div>

                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden">

                    <div
                      className="h-full rounded-full bg-cyan-500 transition-all duration-700"
                      style={{
                        width: `${model.accuracy}%`,
                      }}
                    />

                  </div>

                </div>

              ))}

            </div>

          </div>

          {/* Disclaimer */}
          <div className="mt-6 flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-100">

            <ShieldCheck
              size={18}
              className="text-amber-600 mt-0.5 flex-shrink-0"
            />

            <p className="text-xs text-amber-800 leading-5">
              <strong>Research / Decision Support Only:</strong>{" "}
              CardioSecure is an academic research platform.
              Its predictions are not medical diagnoses and should
              not replace assessment by qualified healthcare professionals.
            </p>

          </div>

        </main>

      </div>

    </div>
  );
}
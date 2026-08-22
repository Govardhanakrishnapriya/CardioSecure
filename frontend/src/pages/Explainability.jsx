import { useState } from "react";

import {
  Brain,
  Info,
  Sparkles,
  TrendingUp,
  HeartPulse,
} from "lucide-react";

import AppShell from "../components/AppShell";
import PageHeader from "../components/PageHeader";

const featureNames = {
  age: "Age",
  sex: "Sex",
  chestPain: "Chest pain type",
  restingBP: "Resting blood pressure",
  cholesterol: "Cholesterol",
  fastingBloodSugar: "Fasting blood sugar",
  restingECG: "Resting ECG",
  maxHeartRate: "Maximum heart rate",
  exerciseAngina: "Exercise angina",
  oldpeak: "Oldpeak",
  stSlope: "ST slope",
};

export default function Explainability() {
  const [prediction] = useState(() => {
  const savedPrediction = localStorage.getItem(
    "latestPrediction"
  );

  return savedPrediction
    ? JSON.parse(savedPrediction)
    : null;
});

  const probability = prediction
    ? prediction.probability
    : null;

  return (
    <AppShell>
      <PageHeader
        eyebrow="Explainable AI"
        title="Model Explainability"
        description="Inspect the latest cardiovascular prediction and the clinical features provided to the FT-Transformer model."
      />

      {/* Overview */}
      <div className="grid md:grid-cols-3 gap-5 mb-7">

        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <Sparkles
            className="text-cyan-600"
            size={24}
          />

          <p className="text-sm text-slate-500 mt-5">
            Explainability Method
          </p>

          <p className="text-xl font-bold mt-1">
            SHAP
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <Brain
            className="text-violet-600"
            size={24}
          />

          <p className="text-sm text-slate-500 mt-5">
            Features Explained
          </p>

          <p className="text-2xl font-bold mt-1">
            11
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <TrendingUp
            className="text-emerald-600"
            size={24}
          />

          <p className="text-sm text-slate-500 mt-5">
            Latest Prediction
          </p>

          <p className="text-xl font-bold mt-1">
            {prediction
              ? prediction.prediction
              : "No Data"}
          </p>
        </div>

      </div>

      {!prediction ? (

        <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center">

          <HeartPulse
            size={50}
            className="mx-auto text-cyan-500 mb-5"
          />

          <h2 className="text-xl font-bold">
            No Prediction Available
          </h2>

          <p className="text-slate-500 mt-3">
            Generate a cardiovascular prediction first.
            The latest patient input will then appear here.
          </p>

        </div>

      ) : (

        <div className="grid xl:grid-cols-3 gap-6">

          {/* Prediction Result */}
          <div className="xl:col-span-1 bg-slate-950 rounded-3xl p-7 text-white">

            <div className="w-12 h-12 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center">
              <Brain size={23} />
            </div>

            <p className="text-xs uppercase tracking-wider text-cyan-400 font-bold mt-6">
              Latest Prediction
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {prediction.prediction}
            </h2>

            <p className="text-slate-400 mt-4 text-sm leading-6">
              This explanation is associated with the most
              recently submitted patient clinical information.
            </p>

            <div className="mt-8 p-5 rounded-2xl bg-white/5 border border-white/10">

              <p className="text-xs text-slate-500">
                Predicted Probability
              </p>

              <p className="text-4xl font-bold mt-2 text-cyan-400">
                {(probability * 100).toFixed(2)}%
              </p>

              <p className="text-sm text-slate-400 mt-2">
                Model output: {probability}
              </p>

            </div>

            <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">

              <p className="text-xs text-slate-500">
                Model
              </p>

              <p className="font-semibold mt-1">
                FedAvg + FT-Transformer
              </p>

            </div>

          </div>

          {/* Patient Features */}
          <div className="xl:col-span-2 bg-white border border-slate-200 rounded-3xl p-7">

            <div className="flex items-center justify-between mb-7">

              <div>
                <h2 className="text-xl font-bold">
                  Patient Clinical Features
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Input values used for the latest model prediction.
                </p>
              </div>

              <Sparkles
                size={22}
                className="text-cyan-600"
              />

            </div>

            <div className="grid md:grid-cols-2 gap-4">

              {Object.entries(prediction.features).map(
                ([key, value]) => (

                  <div
                    key={key}
                    className="border border-slate-200 rounded-2xl p-5 hover:border-cyan-300 transition"
                  >

                    <p className="text-xs uppercase tracking-wide text-slate-400 font-semibold">
                      {featureNames[key]}
                    </p>

                    <p className="text-2xl font-bold text-slate-900 mt-2">
                      {value}
                    </p>

                  </div>

                )
              )}

            </div>

          </div>

        </div>

      )}

      <div className="mt-6 flex gap-3 p-4 rounded-xl bg-blue-50 border border-blue-100">

        <Info
          size={18}
          className="text-blue-600 mt-0.5 flex-shrink-0"
        />

        <p className="text-xs text-blue-800 leading-5">
          This page currently displays the latest prediction and
          the clinical input features used by the model. The next
          integration step is to connect the real SHAP values
          generated from your trained FT-Transformer model.
          These explanations describe model behavior and should not
          be interpreted as clinical causation or medical diagnosis.
        </p>

      </div>

    </AppShell>
  );
}
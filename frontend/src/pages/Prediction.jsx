import { useState } from "react";
import {
  Activity,
  HeartPulse,
  AlertTriangle,
  CheckCircle2,
  Loader2,
} from "lucide-react";

export default function Prediction() {
  // ============================================================
  // FORM STATE
  // ============================================================

  const [form, setForm] = useState({
    age: "",
    sex: "",
    chestPain: "",
    restingBP: "",
    cholesterol: "",
    fastingBloodSugar: "",
    restingECG: "",
    maxHeartRate: "",
    exerciseAngina: "",
    oldpeak: "",
    stSlope: "",
  });

  // ============================================================
  // RESULT STATE
  // ============================================================

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ============================================================
  // HANDLE FORM CHANGE
  // ============================================================

  const handleChange = (e) => {
    setForm((previousForm) => ({
      ...previousForm,
      [e.target.name]: e.target.value,
    }));
  };

  // ============================================================
  // HANDLE PREDICTION
  // ============================================================

  const handlePredict = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setResult(null);

    try {
      // ----------------------------------------------------------
      // FEATURE ORDER
      // Must exactly match backend:
      //
      // age
      // sex
      // chest pain
      // resting bp
      // cholesterol
      // fasting blood sugar
      // resting ecg
      // max heart rate
      // exercise angina
      // oldpeak
      // ST slope
      // ----------------------------------------------------------

      const features = [
        Number(form.age),
        Number(form.sex),
        Number(form.chestPain),
        Number(form.restingBP),
        Number(form.cholesterol),
        Number(form.fastingBloodSugar),
        Number(form.restingECG),
        Number(form.maxHeartRate),
        Number(form.exerciseAngina),
        Number(form.oldpeak),
        Number(form.stSlope),
      ];

      console.log("======================================");
      console.log("SENDING FEATURES:");
      console.log(features);
      console.log("======================================");

      // ----------------------------------------------------------
      // SEND REQUEST TO BACKEND
      // ----------------------------------------------------------

      const response = await fetch(
  "https://cardiosecure-api.onrender.com/predict",
  {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      features: features,
    }),
  }
);

      // ----------------------------------------------------------
      // GET RESPONSE
      // ----------------------------------------------------------

      const data = await response.json();

      console.log("======================================");
      console.log("RAW BACKEND RESPONSE:");
      console.log(data);
      console.log("Prediction:", data.prediction);
      console.log("Probability:", data.probability);
      console.log("======================================");

      if (!response.ok) {
        throw new Error(
          data.detail || "Prediction request failed"
        );
      }

      // ----------------------------------------------------------
      // NORMALIZE BACKEND DATA
      // ----------------------------------------------------------

      const probability = Number(data.probability);

      const predictionText = String(
        data.prediction || ""
      )
        .trim()
        .toLowerCase();

      // ----------------------------------------------------------
      // DETERMINE RISK
      //
      // First check backend prediction.
      // If prediction is missing or unexpected, use probability.
      // ----------------------------------------------------------

      let normalizedPrediction;

      if (
        predictionText === "high risk" ||
        predictionText === "high" ||
        predictionText === "elevated risk"
      ) {
        normalizedPrediction = "High Risk";
      } else if (
        predictionText === "low risk" ||
        predictionText === "low" ||
        predictionText === "lower risk"
      ) {
        normalizedPrediction = "Low Risk";
      } else {
        normalizedPrediction =
          probability >= 0.5
            ? "High Risk"
            : "Low Risk";
      }

      // ----------------------------------------------------------
      // CREATE CLEAN RESULT
      // ----------------------------------------------------------

      const cleanResult = {
        prediction: normalizedPrediction,
        probability: probability,
      };

      console.log("======================================");
      console.log("FINAL FRONTEND RESULT:");
      console.log(cleanResult);
      console.log("======================================");

      setResult(cleanResult);

      // ==========================================================
      // SAVE PREDICTION HISTORY
      // ==========================================================

      const isHighRisk =
        normalizedPrediction === "High Risk";

      const newPrediction = {
        id: `P-${Date.now()}`,

        date: new Date().toLocaleString(),

        probability:
          `${(probability * 100).toFixed(2)}%`,

        result: isHighRisk
          ? "Elevated Risk"
          : "Lower Risk",

        model: "FT-Transformer",
      };

      const existingHistory = JSON.parse(
        localStorage.getItem("predictionHistory") || "[]"
      );

      const updatedHistory = [
        newPrediction,
        ...existingHistory,
      ];

      localStorage.setItem(
        "predictionHistory",
        JSON.stringify(updatedHistory)
      );

      // ==========================================================
      // SAVE LATEST PREDICTION
      // ==========================================================

      const latestPrediction = {
        probability: probability,

        prediction: normalizedPrediction,

        features: {
          age: Number(form.age),
          sex: Number(form.sex),
          chestPain: Number(form.chestPain),
          restingBP: Number(form.restingBP),
          cholesterol: Number(form.cholesterol),
          fastingBloodSugar:
            Number(form.fastingBloodSugar),
          restingECG:
            Number(form.restingECG),
          maxHeartRate:
            Number(form.maxHeartRate),
          exerciseAngina:
            Number(form.exerciseAngina),
          oldpeak:
            Number(form.oldpeak),
          stSlope:
            Number(form.stSlope),
        },
      };

      localStorage.setItem(
        "latestPrediction",
        JSON.stringify(latestPrediction)
      );

    } catch (err) {
      console.error(
        "Prediction error:",
        err
      );

      setError(
        err.message ||
        "Unable to connect to the prediction server."
      );

    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // DETERMINE CURRENT RISK
  // ============================================================

  const isHighRisk =
    result?.prediction === "High Risk";

  // ============================================================
  // UI
  // ============================================================

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="mb-8">

          <div className="flex items-center gap-3 mb-3">

            <div className="w-12 h-12 rounded-2xl bg-cyan-100 text-cyan-600 flex items-center justify-center">
              <HeartPulse size={26} />
            </div>

            <div>
              <p className="text-cyan-600 font-semibold text-sm">
                CARDIOVASCULAR AI
              </p>

              <h1 className="text-3xl font-bold text-slate-900">
                Heart Disease Prediction
              </h1>
            </div>

          </div>

          <p className="text-slate-500">
            Enter patient clinical information to generate a
            cardiovascular risk prediction using your trained
            FT-Transformer model.
          </p>

        </div>


        {/* MAIN GRID */}

        <div className="grid lg:grid-cols-3 gap-8">


          {/* FORM */}

          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8">

            <div className="flex items-center gap-2 mb-6">

              <Activity
                size={20}
                className="text-cyan-600"
              />

              <h2 className="text-xl font-bold text-slate-900">
                Patient Clinical Data
              </h2>

            </div>


            <form
              onSubmit={handlePredict}
              className="grid md:grid-cols-2 gap-5"
            >

              <Input
                label="Age"
                name="age"
                value={form.age}
                onChange={handleChange}
              />


              <Select
                label="Sex"
                name="sex"
                value={form.sex}
                onChange={handleChange}
                options={[
                  {
                    label: "Female",
                    value: 0,
                  },
                  {
                    label: "Male",
                    value: 1,
                  },
                ]}
              />


              <Select
                label="Chest Pain Type"
                name="chestPain"
                value={form.chestPain}
                onChange={handleChange}
                options={[
                  {
                    label: "Type 0",
                    value: 0,
                  },
                  {
                    label: "Type 1",
                    value: 1,
                  },
                  {
                    label: "Type 2",
                    value: 2,
                  },
                  {
                    label: "Type 3",
                    value: 3,
                  },
                ]}
              />


              <Input
                label="Resting Blood Pressure"
                name="restingBP"
                value={form.restingBP}
                onChange={handleChange}
              />


              <Input
                label="Cholesterol"
                name="cholesterol"
                value={form.cholesterol}
                onChange={handleChange}
              />


              <Select
                label="Fasting Blood Sugar"
                name="fastingBloodSugar"
                value={form.fastingBloodSugar}
                onChange={handleChange}
                options={[
                  {
                    label: "False",
                    value: 0,
                  },
                  {
                    label: "True",
                    value: 1,
                  },
                ]}
              />


              <Select
                label="Resting ECG"
                name="restingECG"
                value={form.restingECG}
                onChange={handleChange}
                options={[
                  {
                    label: "Type 0",
                    value: 0,
                  },
                  {
                    label: "Type 1",
                    value: 1,
                  },
                  {
                    label: "Type 2",
                    value: 2,
                  },
                ]}
              />


              <Input
                label="Maximum Heart Rate"
                name="maxHeartRate"
                value={form.maxHeartRate}
                onChange={handleChange}
              />


              <Select
                label="Exercise Angina"
                name="exerciseAngina"
                value={form.exerciseAngina}
                onChange={handleChange}
                options={[
                  {
                    label: "No",
                    value: 0,
                  },
                  {
                    label: "Yes",
                    value: 1,
                  },
                ]}
              />


              <Input
                label="Oldpeak"
                name="oldpeak"
                value={form.oldpeak}
                onChange={handleChange}
              />


              <Select
                label="ST Slope"
                name="stSlope"
                value={form.stSlope}
                onChange={handleChange}
                options={[
                  {
                    label: "Down",
                    value: 0,
                  },
                  {
                    label: "Flat",
                    value: 1,
                  },
                  {
                    label: "Up",
                    value: 2,
                  },
                ]}
              />


              <div className="md:col-span-2 mt-3">

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-slate-950 hover:bg-slate-800 disabled:opacity-70 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition"
                >

                  {loading ? (
                    <>
                      <Loader2
                        size={20}
                        className="animate-spin"
                      />

                      Generating Prediction...
                    </>
                  ) : (
                    <>
                      <HeartPulse size={20} />

                      Generate AI Prediction
                    </>
                  )}

                </button>

              </div>

            </form>

          </div>


          {/* RESULT */}

          <div className="bg-slate-950 rounded-3xl p-7 text-white">

            <h2 className="text-xl font-bold mb-2">
              Prediction Result
            </h2>

            <p className="text-slate-400 text-sm mb-8">
              AI-generated cardiovascular risk assessment.
            </p>


            {/* EMPTY STATE */}

            {!result && !loading && !error && (

              <div className="text-center py-12">

                <HeartPulse
                  size={50}
                  className="mx-auto text-cyan-400 mb-5"
                />

                <p className="text-slate-400">
                  Enter patient data and generate a prediction.
                </p>

              </div>

            )}


            {/* LOADING */}

            {loading && (

              <div className="flex flex-col items-center justify-center py-16">

                <Loader2
                  size={45}
                  className="animate-spin text-cyan-400"
                />

                <p className="text-slate-400 mt-5">
                  Running FT-Transformer...
                </p>

              </div>

            )}


            {/* ERROR */}

            {error && (

              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
                {error}
              </div>

            )}


            {/* RESULT */}

            {result && (

              <div>


                {/* RISK CARD */}

                <div
                  className={`p-5 rounded-2xl border ${
                    isHighRisk
                      ? "bg-red-500/10 border-red-500/30"
                      : "bg-emerald-500/10 border-emerald-500/30"
                  }`}
                >

                  <div className="flex items-center gap-3">

                    {isHighRisk ? (

                      <AlertTriangle
                        className="text-red-400"
                        size={28}
                      />

                    ) : (

                      <CheckCircle2
                        className="text-emerald-400"
                        size={28}
                      />

                    )}

                    <div>

                      <p className="text-sm text-slate-400">
                        Risk Classification
                      </p>

                      <h3
                        className={`text-2xl font-bold ${
                          isHighRisk
                            ? "text-red-400"
                            : "text-emerald-400"
                        }`}
                      >

                        {result.prediction}

                      </h3>

                    </div>

                  </div>

                </div>


                {/* PROBABILITY */}

                <div className="mt-8">

                  <p className="text-slate-400 text-sm">
                    Predicted Probability
                  </p>

                  <p
                    className={`text-5xl font-bold mt-2 ${
                      isHighRisk
                        ? "text-red-400"
                        : "text-emerald-400"
                    }`}
                  >

                    {(result.probability * 100).toFixed(2)}%

                  </p>

                </div>


                {/* MODEL INFO */}

                <div className="mt-8 border-t border-white/10 pt-6 space-y-3 text-sm">

                  <ResultRow
                    label="Model"
                    value="FT-Transformer"
                  />

                  <ResultRow
                    label="Model Accuracy"
                    value="88.04%"
                  />

                  <ResultRow
                    label="Precision"
                    value="89.22%"
                  />

                  <ResultRow
                    label="Recall"
                    value="89.22%"
                  />

                  <ResultRow
                    label="F1 Score"
                    value="89.22%"
                  />

                  <ResultRow
                    label="AUC"
                    value="0.9071"
                  />

                </div>

              </div>

            )}

          </div>

        </div>


        {/* DISCLAIMER */}

        <div className="mt-8 p-5 bg-amber-50 border border-amber-200 rounded-2xl text-sm text-amber-800">

          <strong>
            Research / Decision Support Only:
          </strong>

          {" "}

          This AI system is part of an academic research project.
          Predictions should not be considered a medical diagnosis.

        </div>

      </div>

    </div>
  );
}


// ============================================================
// INPUT COMPONENT
// ============================================================

function Input({
  label,
  name,
  value,
  onChange,
}) {
  return (
    <div>

      <label className="block text-sm font-semibold text-slate-700 mb-2">
        {label}
      </label>

      <input
        type="number"
        name={name}
        value={value}
        onChange={onChange}
        required
        step="any"
        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
      />

    </div>
  );
}


// ============================================================
// SELECT COMPONENT
// ============================================================

function Select({
  label,
  name,
  value,
  onChange,
  options,
}) {
  return (
    <div>

      <label className="block text-sm font-semibold text-slate-700 mb-2">
        {label}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        required
        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
      >

        <option value="">
          Select
        </option>

        {options.map((option) => (

          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>

        ))}

      </select>

    </div>
  );
}


// ============================================================
// RESULT ROW COMPONENT
// ============================================================

function ResultRow({
  label,
  value,
}) {
  return (
    <div className="flex justify-between">

      <span className="text-slate-400">
        {label}
      </span>

      <span className="font-semibold">
        {value}
      </span>

    </div>
  );
}
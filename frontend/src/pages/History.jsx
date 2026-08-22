import { useState } from "react";

import {
  Activity,
  CalendarDays,
  CheckCircle2,
  Clock,
} from "lucide-react";

import AppShell from "../components/AppShell";
import PageHeader from "../components/PageHeader";

export default function History() {
  const [predictions] = useState(() => {
  return JSON.parse(
    localStorage.getItem("predictionHistory") || "[]"
  );
});

  return (
    <AppShell>
      <PageHeader
        eyebrow="Prediction Records"
        title="Prediction History"
        description="Review previous cardiovascular risk prediction requests and their model outputs."
      />

      {/* Statistics Cards */}
      <div className="grid md:grid-cols-3 gap-5 mb-7">
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <Activity className="text-cyan-600" />

          <p className="text-sm text-slate-500 mt-5">
            Total Predictions
          </p>

          <p className="text-3xl font-bold mt-1">
            {predictions.length}
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <CheckCircle2 className="text-emerald-600" />

          <p className="text-sm text-slate-500 mt-5">
            Completed
          </p>

          <p className="text-3xl font-bold mt-1">
            {predictions.length}
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <Clock className="text-violet-600" />

          <p className="text-sm text-slate-500 mt-5">
            Model
          </p>

          <p className="text-lg font-bold mt-2">
            FedAvg + FT
          </p>
        </div>
      </div>

      {/* Prediction History Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <CalendarDays
              size={20}
              className="text-cyan-600"
            />

            <div>
              <h2 className="font-bold">
                Recent Predictions
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Your saved cardiovascular prediction results.
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-left">
                <th className="px-6 py-4 text-slate-400">
                  ID
                </th>

                <th className="px-6 py-4 text-slate-400">
                  Date
                </th>

                <th className="px-6 py-4 text-slate-400">
                  Probability
                </th>

                <th className="px-6 py-4 text-slate-400">
                  Result
                </th>

                <th className="px-6 py-4 text-slate-400">
                  Model
                </th>
              </tr>
            </thead>

            <tbody>
              {predictions.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-12 text-center text-slate-500"
                  >
                    No prediction history available yet.
                    <br />
                    Run a prediction to see it here.
                  </td>
                </tr>
              ) : (
                predictions.map((prediction) => (
                  <tr
                    key={prediction.id}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition"
                  >
                    <td className="px-6 py-5 font-semibold">
                      {prediction.id}
                    </td>

                    <td className="px-6 py-5 text-slate-500">
                      {prediction.date}
                    </td>

                    <td className="px-6 py-5 font-bold">
                      {prediction.probability}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`
                          px-3 py-1.5 rounded-full text-xs font-semibold
                          ${
                            prediction.result === "Elevated Risk"
                              ? "bg-amber-50 text-amber-700"
                              : "bg-emerald-50 text-emerald-700"
                          }
                        `}
                      >
                        {prediction.result}
                      </span>
                    </td>

                    <td className="px-6 py-5 text-slate-500">
                      {prediction.model}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
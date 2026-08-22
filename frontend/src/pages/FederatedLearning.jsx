import {
  Building2,
  CheckCircle2,
  Network,
  Server,
  
  Users,
} from "lucide-react";

import AppShell from "../components/AppShell";
import PageHeader from "../components/PageHeader";

const rounds = [
  [1, "88.04%", "0.9071", "Completed"],
  [2, "85.87%", "0.9213", "Completed"],
  [3, "86.41%", "0.9163", "Completed"],
  [4, "85.33%", "0.9200", "Completed"],
  [5, "85.87%", "0.9236", "Completed"],
  [6, "85.87%", "0.9262", "Completed"],
  [7, "85.33%", "0.9260", "Completed"],
  [8, "83.70%", "0.9182", "Completed"],
  [9, "86.41%", "0.9293", "Completed"],
  [10, "83.70%", "0.9209", "Completed"],
];

export default function FederatedLearning() {
  return (
    <AppShell>

      <PageHeader
        eyebrow="Distributed AI"
        title="Federated Learning"
        description="Monitor the collaborative training architecture used to evaluate cardiovascular prediction across participating hospital environments."
      />

      {/* Network overview */}
      <div className="grid md:grid-cols-3 gap-5 mb-7">

        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <Network size={23} className="text-cyan-600" />

          <p className="text-sm text-slate-500 mt-5">
            Federated Clients
          </p>

          <p className="text-3xl font-bold mt-1">
            3
          </p>

          <p className="text-xs text-slate-400 mt-2">
            Hospital environments
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <Server size={23} className="text-violet-600" />

          <p className="text-sm text-slate-500 mt-5">
            Aggregation
          </p>

          <p className="text-3xl font-bold mt-1">
            FedAvg
          </p>

          <p className="text-xs text-slate-400 mt-2">
            Weighted model aggregation
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <Users size={23} className="text-emerald-600" />

          <p className="text-sm text-slate-500 mt-5">
            Training Rounds
          </p>

          <p className="text-3xl font-bold mt-1">
            10
          </p>

          <p className="text-xs text-slate-400 mt-2">
            Recorded FedAvg rounds
          </p>
        </div>

      </div>

      {/* Architecture */}
      <div className="bg-slate-950 rounded-3xl p-7 sm:p-9 text-white mb-7">

        <div className="flex items-center gap-3 mb-8">
          <Network className="text-cyan-400" />
          <h2 className="text-xl font-bold">
            Federated Architecture
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">

          {["Hospital 1", "Hospital 2", "Hospital 3"].map(
            (hospital, index) => (

              <div
                key={hospital}
                className="p-5 rounded-2xl bg-white/5 border border-white/10"
              >

                <Building2
                  className="text-cyan-400"
                  size={23}
                />

                <h3 className="font-bold mt-5">
                  {hospital}
                </h3>

                <p className="text-sm text-slate-400 mt-2">
                  Local FT-Transformer training
                </p>

                <div className="mt-5 flex items-center gap-2 text-xs text-emerald-400">
                  <CheckCircle2 size={15} />
                  Client {index + 1} connected
                </div>

              </div>
            )
          )}

        </div>

        <div className="flex justify-center my-6">
          <div className="px-5 py-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm font-semibold">
            ↓ Secure model update aggregation ↓
          </div>
        </div>

        <div className="max-w-md mx-auto p-5 rounded-2xl bg-cyan-500 text-white text-center">

          <Server className="mx-auto" />

          <h3 className="font-bold mt-3">
            Global FedAvg Model
          </h3>

          <p className="text-sm text-cyan-100 mt-1">
            Aggregated FT-Transformer
          </p>

        </div>

      </div>

      {/* Round table */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6">

        <h2 className="text-lg font-bold">
          Federated Training Rounds
        </h2>

        <p className="text-sm text-slate-500 mt-1 mb-6">
          Recorded round-level evaluation results.
        </p>

        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead>
              <tr className="border-b border-slate-200 text-left">
                <th className="py-3 pr-6 text-slate-400 font-medium">
                  Round
                </th>
                <th className="py-3 pr-6 text-slate-400 font-medium">
                  Accuracy
                </th>
                <th className="py-3 pr-6 text-slate-400 font-medium">
                  AUC
                </th>
                <th className="py-3 text-slate-400 font-medium">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>

              {rounds.map((row) => (

                <tr
                  key={row[0]}
                  className="border-b border-slate-100 last:border-0"
                >
                  <td className="py-4 font-semibold">
                    Round {row[0]}
                  </td>

                  <td className="py-4">
                    {row[1]}
                  </td>

                  <td className="py-4 font-semibold">
                    {row[2]}
                  </td>

                  <td className="py-4">

                    <span className="inline-flex items-center gap-1.5 text-emerald-600 text-xs font-semibold">
                      <CheckCircle2 size={14} />
                      {row[3]}
                    </span>

                  </td>
                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </AppShell>
  );
}
import { useOutletContext } from "react-router-dom";
import { FaCheck, FaTimes } from "react-icons/fa";

function ManagerOvertimeRequests() {
  const { pendingOT, onOTDecisionSubmit } = useOutletContext();

  return (
    <div className="glass-card p-6 lg:p-8 border border-white/40 dark:border-slate-700/50 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h3 className="text-2xl font-extrabold mb-6 text-slate-900 dark:text-white">Overtime Request</h3>
      <div className="space-y-4">
        {pendingOT?.data?.map((ot) => (
          <div
            key={ot._id}
            className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-5 hover:shadow-lg transition-all duration-300 hover:border-rose-300 dark:hover:border-rose-700"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="font-extrabold text-lg text-slate-900 dark:text-white tracking-tight">{ot.employee.name}</span>
                <span className="text-[11px] bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                  {ot.requestedHours} hrs requested
                </span>
              </div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Date: {ot.attendance.date} <span className="mx-2">•</span> Email: {ot.employee.email}</p>
              <div className="mt-2 p-3 bg-slate-100/80 dark:bg-slate-800/80 rounded-xl border border-slate-200/50 dark:border-slate-700/50">
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300 italic">
                  &ldquo;{ot.reason}&rdquo;
                </p>
              </div>
              {ot.status !== "pending" && (
                <div className="text-xs font-bold mt-3">
                  Status:{" "}
                  <span className={ot.status === "approved" ? "text-emerald-500" : "text-rose-500"}>
                    {ot.status.toUpperCase()}
                  </span>
                  {ot.remarks && <span className="text-slate-400 font-medium ml-2"> — Remarks: {ot.remarks}</span>}
                </div>
              )}
            </div>

            {ot.status === "pending" && (
              <div className="flex gap-3 mt-4 md:mt-0">
                <button
                  onClick={() => {
                    const notes = prompt("Enter approval remarks (optional):");
                    if (notes !== null) onOTDecisionSubmit(ot._id, true, notes);
                  }}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-black transition-all glow-btn flex items-center gap-2 shadow-lg shadow-emerald-600/20"
                >
                  <FaCheck /> Approve
                </button>
                <button
                  onClick={() => {
                    const notes = prompt("Enter rejection reason:");
                    if (notes) onOTDecisionSubmit(ot._id, false, notes);
                  }}
                  className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-sm font-black transition-all glow-btn flex items-center gap-2 shadow-lg shadow-rose-600/20"
                >
                  <FaTimes /> Reject
                </button>
              </div>
            )}
          </div>
        ))}
        {!pendingOT?.data?.length && (
          <p className="text-center py-10 text-slate-500 font-medium">No overtime requests found.</p>
        )}
      </div>
    </div>
  );
}

export default ManagerOvertimeRequests;

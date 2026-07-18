import { useState } from "react";
import useOvertime from "../../managers/hooks/useOvertime.js";

function OvertimeRequestModal({ attendanceId, onClose }) {
  const [otHours, setOtHours] = useState(1);
  const [otReason, setOtReason] = useState("");
  const { handleOTSubmit, isSubmitting } = useOvertime();

  const onSubmit = (e) => {
    e.preventDefault();
    handleOTSubmit(attendanceId, otHours, otReason, onClose);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 dark:bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="glass-card w-full max-w-md p-8 border border-white/50 dark:border-slate-700/50 shadow-2xl space-y-6 animate-in zoom-in-95 duration-200 relative overflow-hidden">
        
        {/* Subtle decorative glow inside modal */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-rose-500/20 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex justify-between items-center relative z-10">
          <h4 className="text-2xl font-extrabold text-slate-900 dark:text-white">Request Overtime</h4>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-all hover-lift"
          >
            ✕
          </button>
        </div>
        
        <form onSubmit={onSubmit} className="space-y-5 relative z-10">
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">
              Overtime Hours
            </label>
            <input
              type="number"
              step="0.5"
              min="0.5"
              required
              className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 subtle-ring shadow-sm"
              value={otHours}
              onChange={(e) => setOtHours(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">
              Reason / Task Done
            </label>
            <textarea
              required
              rows="3"
              className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 subtle-ring shadow-sm resize-none"
              placeholder="Completed database architecture modifications..."
              value={otReason}
              onChange={(e) => setOtReason(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 premium-gradient-bg text-white font-black rounded-2xl glow-btn disabled:opacity-50 mt-4 text-lg"
          >
            {isSubmitting ? "Submitting Request..." : "Submit Request"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default OvertimeRequestModal;

import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import dayjs from "dayjs";
import { FaMapMarkerAlt } from "react-icons/fa";
import useAttendance from "../../employee/hooks/useAttendance.js"


function ManagerAttendanceLogs() {

  
  const { teamLogs, refetchLogs } = useOutletContext();
  const [selectedLog, setSelectedLog] = useState(null);
  const [verifyStatus, setVerifyStatus] = useState("valid");
  const [verifyRemarks, setVerifyRemarks] = useState("");

  const { handleVerify } = useAttendance();

  const handleVerifySubmit = (e) => {
    e.preventDefault();
    handleVerify(selectedLog._id, verifyStatus, verifyRemarks, () => {
      setSelectedLog(null);
      setVerifyRemarks("");
      refetchLogs();
    });
  };

  return (
    <>
      <div className="glass-card p-6 lg:p-8 border border-white/40 dark:border-slate-700/50 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h3 className="text-2xl font-extrabold mb-6 text-slate-900 dark:text-white">Team Attendance</h3>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
          <table className="w-full text-left text-sm border-collapse whitespace-nowrap">
            <thead className="bg-slate-100/80 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700">
              <tr className="text-slate-600 dark:text-slate-300">
                <th className="py-4 px-5 font-bold uppercase tracking-wider text-xs">Employee</th>
                <th className="py-4 px-5 font-bold uppercase tracking-wider text-xs">Date</th>
                <th className="py-4 px-5 font-bold uppercase tracking-wider text-xs">Punch In/Out</th>
                <th className="py-4 px-5 font-bold uppercase tracking-wider text-xs">Working Hours</th>
                <th className="py-4 px-5 font-bold uppercase tracking-wider text-xs">Selfie Preview</th>
                <th className="py-4 px-5 font-bold uppercase tracking-wider text-xs">Status</th>
                <th className="py-4 px-5 font-bold uppercase tracking-wider text-xs text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/50 dark:divide-slate-700/50">
              {teamLogs?.data?.map((log) => (
                <tr key={log._id} className="hover:bg-rose-50/50 dark:hover:bg-rose-900/10 transition-colors duration-150">
                  <td className="py-4 px-5">
                    <div className="font-bold text-slate-900 dark:text-white">{log.employee.name}</div>
                    <div className="text-[11px] font-medium text-slate-500">{log.employee.email}</div>
                  </td>
                  <td className="py-4 px-5 font-medium text-slate-600 dark:text-slate-400">{log.date}</td>
                  <td className="py-4 px-5">
                    <div className="text-[11px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-500">In: {dayjs(log.punchIn).format("hh:mm A")}</div>
                    <div className="text-[11px] font-black uppercase tracking-wider text-rose-600 dark:text-rose-500 mt-1">
                      Out: {log.punchOut ? dayjs(log.punchOut).format("hh:mm A") : "Active"}
                    </div>
                  </td>
                  <td className="py-4 px-5 font-black text-rose-600 dark:text-rose-400">
                    {log.workingHours} <span className="text-xs font-semibold opacity-70">hrs</span>
                  </td>
                  <td className="py-4 px-5">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 shadow-md">
                      <img
                        src={`https://dta-backend-4i1g.onrender.com${log.selfieUrl}`}
                        alt="Selfie"
                        className="w-full h-full object-cover hover:scale-125 transition-transform duration-500 cursor-pointer"
                        onClick={() => setSelectedLog(log)}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100";
                        }}
                      />
                    </div>
                  </td>
                  <td className="py-4 px-5">
                    <span
                      className={`text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm border ${log.status === "valid"
                        ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50"
                        : log.status === "invalid"
                          ? "bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800/50"
                          : "bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800/50"
                        }`}
                    >
                      {log.status}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-right">
                    <button
                      onClick={() = className="cursor-pointer"> {
                        setSelectedLog(log);
                        setVerifyStatus(log.status === "pending" ? "valid" : log.status);
                        setVerifyRemarks(log.remarks || "");
                      }}
                      className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-black transition-all glow-btn shadow-lg shadow-rose-600/20"
                    >
                      Verify Record
                    </button>
                  </td>
                </tr>
              ))}
              {!teamLogs?.data?.length && (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-slate-500 font-medium">
                    No logs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Verification Modal */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 dark:bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="glass-card w-full max-w-2xl p-8 border border-white/50 dark:border-slate-700/50 shadow-2xl space-y-6 animate-in zoom-in-95 duration-200 relative overflow-hidden">
            
            {/* Subtle decorative glow inside modal */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-rose-500/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex justify-between items-center relative z-10">
              <div>
                <h4 className="text-2xl font-extrabold text-slate-900 dark:text-white">Verify Attendance</h4>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">{selectedLog.employee.name} <span className="mx-2">•</span> {selectedLog.date}</p>
              </div>
              <button
                onClick={() = className="cursor-pointer"> setSelectedLog(null)}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-all hover-lift"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
              {/* Image Column */}
              <div className="rounded-3xl overflow-hidden aspect-square border-4 border-white dark:border-slate-800 bg-slate-100 dark:bg-slate-900 shadow-xl relative group">
                <img
                  src={`https://dta-backend-4i1g.onrender.com${selectedLog.selfieUrl}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  alt="Captured Selfie"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&h=400";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Data and form Column */}
              <div className="space-y-6 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <FaMapMarkerAlt /> GPS Position
                  </div>
                  <div className="p-4 bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl text-sm space-y-1.5 shadow-inner">
                    <div className="flex justify-between items-center text-slate-600 dark:text-slate-300"><span className="font-medium">Latitude</span> <span className="font-bold text-slate-900 dark:text-white">{selectedLog.location.latitude}</span></div>
                    <div className="flex justify-between items-center text-slate-600 dark:text-slate-300"><span className="font-medium">Longitude</span> <span className="font-bold text-slate-900 dark:text-white">{selectedLog.location.longitude}</span></div>
                  </div>
                </div>

                <form onSubmit={handleVerifySubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Validation Status
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() = className="cursor-pointer"> setVerifyStatus("valid")}
                        className={`py-3.5 rounded-xl text-sm font-black border-2 transition-all ${verifyStatus === "valid"
                          ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border-emerald-500 shadow-md shadow-emerald-500/20"
                          : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"
                          }`}
                      >
                        VALID
                      </button>
                      <button
                        type="button"
                        onClick={() = className="cursor-pointer"> setVerifyStatus("invalid")}
                        className={`py-3.5 rounded-xl text-sm font-black border-2 transition-all ${verifyStatus === "invalid"
                          ? "bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 border-rose-500 shadow-md shadow-rose-500/20"
                          : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"
                          }`}
                      >
                        INVALID
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Verification Note
                    </label>
                    <textarea
                      rows="2"
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 text-sm font-medium subtle-ring shadow-sm resize-none"
                      placeholder="Add remarks..."
                      value={verifyRemarks}
                      onChange={(e) => setVerifyRemarks(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="cursor-pointer w-full py-4 premium-gradient-bg text-white font-black rounded-2xl text-lg transition-all glow-btn shadow-lg shadow-rose-600/30"
                  >
                    Submit Validation
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ManagerAttendanceLogs;

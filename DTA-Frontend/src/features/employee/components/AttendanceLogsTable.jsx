import React from "react";
import dayjs from "dayjs";
import { FaCalendarAlt } from "react-icons/fa";

function AttendanceLogsTable({ logs }) {
  return (
    <div className="lg:col-span-2 space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Attendance Logs */}
      <div className="glass-card p-6 lg:p-8 border border-white/40 dark:border-slate-700/50 shadow-xl">
        <div className="flex items-center justify-between mb-6">
           <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
             <div className="text-slate-500 dark:text-slate-400">
               <FaCalendarAlt size={22} />
             </div>
             Your Attendance Logs
           </h3>
        </div>
        
        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
          <table className="w-full text-left text-sm border-collapse whitespace-nowrap">
            <thead className="bg-slate-100/80 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700">
              <tr className="text-slate-600 dark:text-slate-300">
                <th className="py-4 px-5 font-bold uppercase tracking-wider text-xs">Date</th>
                <th className="py-4 px-5 font-bold uppercase tracking-wider text-xs">Punch In</th>
                <th className="py-4 px-5 font-bold uppercase tracking-wider text-xs">Punch Out</th>
                <th className="py-4 px-5 font-bold uppercase tracking-wider text-xs">Working Hours</th>
                <th className="py-4 px-5 font-bold uppercase tracking-wider text-xs">Validation</th>
                <th className="py-4 px-5 font-bold uppercase tracking-wider text-xs">OT Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/50 dark:divide-slate-700/50">
              {logs?.map((log) => (
                <tr key={log._id} className="hover:bg-rose-50/50 dark:hover:bg-rose-900/10 transition-colors duration-150">
                  <td className="py-4 px-5 font-semibold text-slate-800 dark:text-slate-200">{log.date}</td>
                  <td className="py-4 px-5 text-slate-600 dark:text-slate-400 font-medium">{dayjs(log.punchIn).format("hh:mm A")}</td>
                  <td className="py-4 px-5 text-slate-600 dark:text-slate-400 font-medium">{log.punchOut ? dayjs(log.punchOut).format("hh:mm A") : "—"}</td>
                  <td className="py-4 px-5">
                    <span
                      className={`font-black ${
                        log.workingHours >= 8 ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"
                      }`}
                    >
                      {log.workingHours} <span className="text-xs font-semibold opacity-70">hrs</span>
                    </span>
                  </td>
                  <td className="py-4 px-5">
                    <span
                      className={`text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                        log.status === "valid"
                          ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50 shadow-sm"
                          : log.status === "invalid"
                          ? "bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800/50 shadow-sm"
                          : "bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800/50 shadow-sm"
                      }`}
                    >
                      {log.status}
                    </span>
                  </td>
                  <td className="py-4 px-5">
                    {log.overtimeStatus === "none" ? (
                      <span className="text-slate-400 dark:text-slate-500 font-medium italic">none</span>
                    ) : (
                      <span
                        className={`text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm ${
                          log.overtimeStatus === "approved"
                            ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                            : log.overtimeStatus === "rejected"
                            ? "bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800"
                            : "bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800"
                        }`}
                      >
                        {log.overtimeStatus} ({log.overtimeHours}h)
                      </span>
                    )}
                  </td>
                </tr>
              ))}
              {!logs?.length && (
                <tr>
                  <td colSpan="6" className="py-12 text-center">
                    <div className="flex flex-col items-center justify-center space-y-3">
                       <FaCalendarAlt className="text-4xl text-slate-300 dark:text-slate-600" />
                       <span className="text-slate-500 dark:text-slate-400 font-medium">No attendance logs found for this period.</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AttendanceLogsTable;

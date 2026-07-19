import dayjs from "dayjs";
import { FaDownload } from "react-icons/fa";
import useAdmin from "../hooks/useAdmin.js";

function DailyReportGenerator({ reportDate, setReportDate, reportRes }) {
  const { handleExportCSV } = useAdmin();

  const exportReport = () => {
    handleExportCSV(reportRes?.data, reportDate);
  };

  return (
    <div className="glass-card p-6 lg:p-8 border border-white/40 dark:border-slate-700/50 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">Daily Report</h3>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
            Compile and export workspace attendance statistics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="date"
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 text-sm font-bold subtle-ring shadow-sm"
            value={reportDate}
            onChange={(e) => setReportDate(e.target.value)}
          />
          <button
            onClick={exportReport}
            className="cursor-pointer px-5 py-2.5 premium-gradient-bg text-white rounded-xl text-sm font-black transition-all flex items-center gap-2 glow-btn"
          >
            <FaDownload /> Export CSV
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
        <table className="w-full text-left text-sm border-collapse whitespace-nowrap">
          <thead className="bg-slate-100/80 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700">
            <tr className="text-slate-600 dark:text-slate-300">
              <th className="py-4 px-5 font-bold uppercase tracking-wider text-xs">Employee</th>
              <th className="py-4 px-5 font-bold uppercase tracking-wider text-xs">Punch In</th>
              <th className="py-4 px-5 font-bold uppercase tracking-wider text-xs">Punch Out</th>
              <th className="py-4 px-5 font-bold uppercase tracking-wider text-xs">Working Hours</th>
              <th className="py-4 px-5 font-bold uppercase tracking-wider text-xs">Location</th>
              <th className="py-4 px-5 font-bold uppercase tracking-wider text-xs">Validation</th>
              <th className="py-4 px-5 font-bold uppercase tracking-wider text-xs">Overtime</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/50 dark:divide-slate-700/50">
            {reportRes?.data?.map((row) => (
              <tr
                key={row.attendanceId}
                className="hover:bg-rose-50/50 dark:hover:bg-rose-900/10 transition-colors duration-150"
              >
                <td className="py-4 px-5">
                  <div className="font-bold text-slate-900 dark:text-white">
                    {row.employeeName}
                  </div>
                  <div className="text-[11px] font-medium text-slate-500">
                    {row.employeeEmail}
                  </div>
                </td>
                <td className="py-4 px-5 font-medium text-slate-600 dark:text-slate-400">
                  {dayjs(row.punchIn).format("hh:mm A")}
                </td>
                <td className="py-4 px-5 font-medium text-slate-600 dark:text-slate-400">
                  {row.punchOut ? dayjs(row.punchOut).format("hh:mm A") : "Active"}
                </td>
                <td className="py-4 px-5 font-black text-rose-600 dark:text-rose-400">
                  {row.workingHours} <span className="text-xs font-semibold opacity-70">hrs</span>
                </td>
                <td className="py-4 px-5">
                  <span className="text-[11px] font-mono font-semibold text-slate-500 bg-slate-200/50 dark:bg-slate-800/50 px-2 py-1 rounded">
                    {row.location.latitude.toFixed(4)},{" "}
                    {row.location.longitude.toFixed(4)}
                  </span>
                </td>
                <td className="py-4 px-5">
                  <span
                    className={`text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border shadow-sm ${row.status === "valid"
                        ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50"
                        : row.status === "invalid"
                          ? "bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800/50"
                          : "bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800/50"
                      }`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="py-4 px-5">
                  {row.overtimeStatus === "none" ? (
                    <span className="text-slate-400 dark:text-slate-500 font-medium italic">none</span>
                  ) : (
                    <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm bg-slate-200/50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300">
                      {row.overtimeStatus} ({row.overtimeHours}h)
                    </span>
                  )}
                </td>
              </tr>
            ))}
            {!reportRes?.data?.length && (
              <tr>
                <td colSpan="7" className="py-12 text-center text-slate-500 font-medium">
                  No logs found for this date.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DailyReportGenerator;

import { NavLink, Outlet } from "react-router-dom";
import { useGetAttendanceTeamQuery } from "../../employee/api/attendance.api.js";
import { useGetOTRequestsTeamQuery } from "../api/overtimeApi.js";
import useOvertime from "../hooks/useOvertime.js";

const DashBoard = () => {

    const { data: teamLogs, refetch: refetchLogs } = useGetAttendanceTeamQuery();
    const { data: pendingOT, refetch: refetchOT } = useGetOTRequestsTeamQuery();

    const { handleOTDecision } = useOvertime();

    const onOTDecisionSubmit = (id, approve, reason = "") => {
        handleOTDecision(id, approve, reason, () => {
            refetchOT();
            refetchLogs();
        });
    };

    return (
        <div className="space-y-8">
            <nav className="flex gap-2 p-1.5 bg-slate-200/50 dark:bg-slate-800/50 rounded-2xl w-fit backdrop-blur-md border border-slate-300/50 dark:border-slate-700/50 shadow-sm">
                <NavLink
                    to="/manager/attendance"
                    className={({ isActive }) =>
                        `px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${isActive
                            ? "bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 shadow-md"
                            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800/50"
                        }`
                    }
                >
                    Team Attendance
                </NavLink>
                <NavLink
                    to="/manager/overtime"
                    className={({ isActive }) =>
                        `px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 flex items-center gap-2 ${isActive
                            ? "bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 shadow-md"
                            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800/50"
                        }`
                    }
                >
                    Overtime Requests
                    <span className="bg-rose-100 dark:bg-rose-900/60 text-rose-600 dark:text-rose-400 text-xs py-0.5 px-2 rounded-full font-black shadow-sm">
                        {pendingOT?.data?.filter((r) => r.status === "pending").length || 0}
                    </span>
                </NavLink>
            </nav>

            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Outlet context={{ teamLogs, refetchLogs, pendingOT, refetchOT, onOTDecisionSubmit }} />
            </div>
        </div>
    );
}

export default DashBoard;
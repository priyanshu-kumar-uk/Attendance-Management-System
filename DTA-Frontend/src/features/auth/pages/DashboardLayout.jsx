import { useSelector } from "react-redux";
import { FaSun, FaMoon, FaPowerOff } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import { selectUser } from "../auth.slice.js";
import { useTheme } from "../../theme/useTheme.js";
import useAuth from "../hooks/useAuth.js";
import DashboardRedirect from "../../../routes/DashboardRedirect.jsx";

function DashboardLayout() {

  const { handleLogout } = useAuth();
  const user = useSelector(selectUser);
  const { darkMode, setDarkMode } = useTheme();


  return (
    <div className="min-h-screen bg-slate-100 dark:bg-[radial-gradient(ellipse_at_center,_#6b7280_0%,_#1f2937_50%,_#030712_100%)] text-slate-800 dark:text-slate-100 transition-colors duration-300 flex flex-col relative overflow-hidden z-0">
      <DashboardRedirect />
      
      {/* Texture Background Overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.03] dark:opacity-[0.25] mix-blend-multiply dark:mix-blend-overlay pointer-events-none -z-10"></div>
      
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/4 w-[40rem] h-[20rem] bg-rose-500/5 dark:bg-rose-500/0 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      <header className="sticky top-0 z-30 glass-card dark:!bg-[#111827] mx-4 mt-4 mb-2 !rounded-3xl p-4 px-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-xl font-extrabold tracking-tight m-0 text-slate-900 dark:text-white leading-tight">D-Table</h1>
            <p className="text-xs font-medium text-rose-600 dark:text-rose-400 uppercase tracking-widest">Attendance Center</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col items-end">
            <span className="font-bold text-sm text-slate-900 dark:text-white leading-tight">{user?.name}</span>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300 uppercase tracking-wider">
              {user?.role}
            </span>
          </div>

          <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-700 mx-1 hidden sm:block"></div>

          <button
            onClick={() = className="cursor-pointer"> setDarkMode(!darkMode)}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all hover-lift shadow-sm"
          >
            {darkMode ? <FaSun size={16} /> : <FaMoon size={16} />}
          </button>

          <button
            onClick={handleLogout}
            className="cursor-pointer p-2.5 rounded-2xl bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/50 shadow-sm border border-rose-100 dark:border-rose-800 transition-all hover-lift"
          >
            <FaPowerOff size={16} />
          </button>
        </div>
      </header>

      <main className="flex-1 p-6 max-w-7xl mx-auto w-full relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;

import { NavLink } from "react-router-dom"


const Navigations = ({ usersRes }) => {

    return (
        <nav className="flex gap-2 p-1.5 bg-slate-200/50 dark:bg-slate-800/50 rounded-2xl w-fit backdrop-blur-md border border-slate-300/50 dark:border-slate-700/50 mb-8 shadow-sm">
            <NavLink 
                to="/admin/dir" 
                className={({ isActive }) => `px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${isActive ? "bg-white dark:bg-slate-900 text-orange-600 dark:text-orange-400 shadow-md" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800/50"}`} 
            >
                User Directory ({usersRes?.data?.length || 0})
            </NavLink>

            <NavLink 
                to="/admin/reports" 
                className={({ isActive }) => `px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${isActive ? "bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 shadow-md" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800/50"}`} 
            >
                Daily Reports
            </NavLink>

            <NavLink 
                to="/admin/attendance" 
                className={({ isActive }) => `px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${isActive ? "bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 shadow-md" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800/50"}`} 
            >
                Attendance Logs
            </NavLink>
        </nav>
    );
}

export default Navigations
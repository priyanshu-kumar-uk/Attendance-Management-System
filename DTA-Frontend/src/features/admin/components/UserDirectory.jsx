import { FaUsers } from "react-icons/fa";
import { useOutletContext } from "react-router-dom";

function UserDirectory() {

  const { usersRes: users } = useOutletContext();
  
  return (users &&
    <div className="glass-card p-6 lg:p-8 border border-white/40 dark:border-slate-700/50 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
          <div className="text-slate-500 dark:text-slate-400">
            <FaUsers size={22} />
          </div>
          Employee Directory
        </h3>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
        <table className="w-full text-left text-sm border-collapse whitespace-nowrap">
          <thead className="bg-slate-100/80 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700">
            <tr className="text-slate-600 dark:text-slate-300">
              <th className="py-4 px-5 font-bold uppercase tracking-wider text-xs">User Details</th>
              <th className="py-4 px-5 font-bold uppercase tracking-wider text-xs">Email Address</th>
              <th className="py-4 px-5 font-bold uppercase tracking-wider text-xs">Company Role</th>
              <th className="py-4 px-5 font-bold uppercase tracking-wider text-xs">Direct Manager</th>
              <th className="py-4 px-5 font-bold uppercase tracking-wider text-xs">Account Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/50 dark:divide-slate-700/50">
            {users?.map((user) => (
              <tr onClick={() => console.log(user)} key={user._id} className="hover:bg-rose-50/50 dark:hover:bg-rose-900/10 transition-colors duration-150 cursor-pointer">
                <td className="py-4 px-5 font-bold text-slate-900 dark:text-white">{user.name}</td>
                <td className="py-4 px-5 text-slate-600 dark:text-slate-400 font-medium">{user.email}</td>
                <td className="py-4 px-5">
                  <span className="capitalize px-3 py-1 rounded-full bg-slate-200/50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 font-black text-[11px] uppercase tracking-wider shadow-sm">
                    {user.role}
                  </span>
                </td>
                <td className="py-4 px-5">
                  {user.manager ? (
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900 dark:text-slate-200">{user.manager.name}</span>
                      <span className="text-[11px] font-medium text-slate-500">{user.manager.email}</span>
                    </div>
                  ) : (
                    <span className="text-slate-400 dark:text-slate-500 font-medium italic">None</span>
                  )}
                </td>
                <td className="py-4 px-5">
                  <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800/50 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Active
                  </span>
                </td>
              </tr>
            ))}
            {!users?.length && (
              <tr>
                <td colSpan="5" className="py-12 text-center text-slate-500 font-medium">
                  No users loaded.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserDirectory;

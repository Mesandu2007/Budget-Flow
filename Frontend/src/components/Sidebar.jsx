import { Link } from "react-router-dom";
import { X } from "lucide-react";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <>
    
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
        />
      )}

      <div
        className={`
          fixed top-0 left-0 h-full w-64 bg-gray-900 text-white p-5 z-50
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:block
        `}
      >
        
        <button
          className="md:hidden mb-4"
          onClick={() => setSidebarOpen(false)}
        >
          <X />
        </button>

        <h1 className="text-2xl font-bold mb-8">FinTrack</h1>

        <div className="flex flex-col gap-4">
          <Link to="/">Dashboard</Link>
          <Link to="/transactions">Transactions</Link>
          <Link to="/budgets">Budgets</Link>
          <Link to="/analytics">Analytics</Link>
        </div>
      </div>
    </>
  );
}
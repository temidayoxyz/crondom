import { Routes, Route, Link, useLocation } from "react-router-dom";
import Dashboard from "./components/Dashboard.jsx";
import JobForm from "./components/JobForm.jsx";
import Logs from "./components/Logs.jsx";

export default function App() {
  const location = useLocation();

  const nav = [
    { path: "/", label: "Dashboard", icon: "⊞" },
    { path: "/new", label: "New Job", icon: "+" },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
            <span className="text-orange-500 text-xl">⏱</span>
            <span>crondom</span>
          </Link>
          <nav className="flex gap-1">
            {nav.map(({ path, label, icon }) => (
              <Link
                key={path}
                to={path}
                className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                  location.pathname === path
                    ? "bg-orange-600 text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`}
              >
                {icon} {label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/new" element={<JobForm />} />
          <Route path="/edit/:id" element={<JobForm />} />
          <Route path="/logs/:id" element={<Logs />} />
        </Routes>
      </main>
    </div>
  );
}

import { Routes, Route, Link, useLocation } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
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

          <SignedIn>
            <div className="flex items-center gap-4">
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
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-8 h-8",
                  },
                }}
              />
            </div>
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-4 py-1.5 bg-orange-600 hover:bg-orange-500 rounded-md text-sm font-medium transition-colors">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 py-6">
        <SignedIn>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/new" element={<JobForm />} />
            <Route path="/edit/:id" element={<JobForm />} />
            <Route path="/logs/:id" element={<Logs />} />
          </Routes>
        </SignedIn>

        <SignedOut>
          <div className="flex flex-col items-center justify-center py-32">
            <span className="text-6xl mb-6">⏱</span>
            <h1 className="text-3xl font-bold mb-2">crondom</h1>
            <p className="text-gray-400 mb-8 text-center max-w-md">
              Schedule and monitor HTTP cron jobs — from a simple dashboard,
              running on a $0 stack.
            </p>
            <SignInButton mode="modal">
              <button className="px-6 py-3 bg-orange-600 hover:bg-orange-500 rounded-lg text-base font-medium transition-colors">
                Sign in to get started
              </button>
            </SignInButton>
          </div>
        </SignedOut>
      </main>
    </div>
  );
}

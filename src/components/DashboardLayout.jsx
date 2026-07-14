import { Outlet, Link, useLocation, Navigate } from "react-router-dom";
import { useUser, SignInButton, UserButton } from "@clerk/clerk-react";

export default function DashboardLayout() {
  const { isLoaded, isSignedIn, user } = useUser();
  const location = useLocation();

  const nav = [
    { path: "/dashboard", label: "Dashboard", icon: "⊞" },
    { path: "/dashboard/new", label: "New Job", icon: "+" },
  ];

  // Wait for Clerk to determine auth state
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  // Redirect to sign-in if not authenticated
  if (!isSignedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2 text-lg font-semibold">
            <span className="text-orange-500 text-xl">⏱</span>
            <span>crondom</span>
          </Link>

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
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        <Outlet context={{ user }} />
      </main>
    </div>
  );
}

import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage.jsx";
import LoginPage from "./components/LoginPage.jsx";
import SignupPage from "./components/SignupPage.jsx";
import DashboardLayout from "./components/DashboardLayout.jsx";
import Dashboard from "./components/Dashboard.jsx";
import JobForm from "./components/JobForm.jsx";
import Logs from "./components/Logs.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/new" element={<JobForm />} />
        <Route path="/dashboard/edit/:id" element={<JobForm />} />
        <Route path="/dashboard/logs/:id" element={<Logs />} />
      </Route>
    </Routes>
  );
}

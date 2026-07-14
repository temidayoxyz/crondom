import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/landing/LandingPage.jsx";
import SignInPage from "./components/auth/SignInPage.jsx";
import SignUpPage from "./components/auth/SignUpPage.jsx";
import DashboardLayout from "./components/dashboard/DashboardLayout.jsx";
import Overview from "./components/dashboard/Overview.jsx";
import Jobs from "./components/dashboard/Jobs.jsx";
import JobForm from "./components/dashboard/JobForm.jsx";
import JobDetail from "./components/dashboard/JobDetail.jsx";
import Executions from "./components/dashboard/Executions.jsx";
import Settings from "./components/dashboard/Settings.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Overview />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="jobs/new" element={<JobForm />} />
        <Route path="jobs/:id" element={<JobDetail />} />
        <Route path="jobs/:id/edit" element={<JobForm />} />
        <Route path="executions" element={<Executions />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

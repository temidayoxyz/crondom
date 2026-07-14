import { SignIn } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col items-center justify-center px-4">
      <Link to="/" className="flex items-center gap-2 text-lg font-semibold mb-8">
        <span className="text-orange-500 text-xl">⏱</span>
        <span>crondom</span>
      </Link>

      <SignIn
        appearance={{
          baseTheme: undefined,
          elements: {
            rootBox: "w-full max-w-sm",
            card: "bg-gray-900 border border-gray-800 shadow-none",
            headerTitle: "text-gray-100",
            headerSubtitle: "text-gray-400",
            formButtonPrimary: "bg-orange-600 hover:bg-orange-500",
            formFieldLabel: "text-gray-400",
            formFieldInput: "bg-gray-800 border-gray-700 text-gray-100",
            footerActionLink: "text-orange-400 hover:text-orange-300",
            socialButtonsBlockButton: "bg-gray-800 border-gray-700 text-gray-100 hover:bg-gray-700",
            dividerLine: "bg-gray-700",
            dividerText: "text-gray-500",
          },
        }}
      />

      <p className="mt-6 text-sm text-gray-500">
        Don't have an account?{" "}
        <Link to="/signup" className="text-orange-400 hover:text-orange-300">
          Sign up
        </Link>
      </p>
    </div>
  );
}

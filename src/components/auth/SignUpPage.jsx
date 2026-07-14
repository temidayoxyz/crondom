import { SignUp } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-main)] flex">
      {/* Form side */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="12" stroke="var(--color-green-strong)" strokeWidth="2" />
              <circle cx="16" cy="16" r="3" fill="var(--color-green-signal)" />
              <path d="M16 10v6l3.5 2" stroke="var(--color-green-strong)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-sm font-semibold text-[var(--color-text-main)]">crondom</span>
          </Link>

          <SignUp
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "bg-transparent shadow-none border border-[var(--color-border)] rounded-2xl p-6",
                headerTitle: "text-lg font-bold text-[var(--color-text-main)]",
                headerSubtitle: "text-sm text-[var(--color-text-secondary)]",
                formButtonPrimary: "bg-[var(--color-text-main)] text-[var(--color-bg-main)] hover:opacity-90 rounded-xl",
                formFieldLabel: "text-xs font-medium text-[var(--color-text-secondary)]",
                formFieldInput: "bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg text-sm",
                footerActionLink: "text-[var(--color-green-strong)] hover:opacity-80",
                identityPreviewText: "text-[var(--color-text-secondary)]",
                identityPreviewEditButton: "text-[var(--color-green-strong)]",
                socialButtonsBlockButton: "bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-text-main)] hover:bg-[var(--color-bg-secondary)]/80 rounded-xl",
                socialButtonsBlockButtonText: "text-sm font-medium",
                dividerLine: "bg-[var(--color-border)]",
                dividerText: "text-[var(--color-text-muted)]",
                formFieldAction: "text-[var(--color-green-strong)]",
                alertText: "text-[var(--color-red-error)]",
                alert: "bg-[var(--color-red-error)]/5 border border-[var(--color-red-error)]/20 rounded-lg",
              },
            }}
          />
        </div>
      </div>

      {/* Illustration side */}
      <div className="hidden lg:flex flex-1 bg-[var(--color-bg-secondary)] items-center justify-center">
        <div className="p-12 text-center">
          <svg width="200" height="200" viewBox="0 0 260 260" className="mx-auto mb-8">
            <rect x="50" y="50" width="160" height="160" rx="16" fill="var(--color-bg-elevated)" stroke="var(--color-border)" strokeWidth="1" />
            <circle cx="130" cy="100" r="4" fill="var(--color-green-signal)" />
            <text x="130" y="125" textAnchor="middle" fill="var(--color-text-main)" fontSize="13" fontFamily="Inter, sans-serif" fontWeight="600">Welcome to crondom</text>
            <text x="130" y="145" textAnchor="middle" fill="var(--color-text-secondary)" fontSize="11" fontFamily="Inter, sans-serif">Create your first job</text>
            <rect x="70" y="160" width="120" height="10" rx="5" fill="var(--color-green-strong)" opacity="0.2" />
            <rect x="70" y="160" width="60" height="10" rx="5" fill="var(--color-green-signal)" />
          </svg>
          <p className="text-sm text-[var(--color-text-muted)] max-w-xs mx-auto">
            Create a free account and start scheduling HTTP jobs in seconds.
          </p>
        </div>
      </div>
    </div>
  );
}

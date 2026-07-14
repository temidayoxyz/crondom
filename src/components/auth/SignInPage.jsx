import { SignIn } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

export default function SignInPage() {
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

          <SignIn
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
            <g transform="translate(130, 130)">
              {Array.from({ length: 60 }).map((_, i) => {
                const angle = i * 6 - 90;
                const rad = (angle * Math.PI) / 180;
                const x1 = 90 * Math.cos(rad);
                const y1 = 90 * Math.sin(rad);
                const x2 = 80 * Math.cos(rad);
                const y2 = 80 * Math.sin(rad);
                return (
                  <line
                    key={i}
                    x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke={i < 30 ? "var(--color-green-signal)" : "var(--color-border-strong)"}
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    opacity={i < 30 ? 0.8 : 0.2}
                  />
                );
              })}
            </g>
            <circle cx="130" cy="130" r="8" fill="var(--color-green-signal)" className="animate-scheduler-pulse" />
            <text x="130" y="160" textAnchor="middle" fill="var(--color-text-secondary)" fontSize="12" fontFamily="Inter, sans-serif">Authenticating...</text>
          </svg>
          <p className="text-sm text-[var(--color-text-muted)] max-w-xs mx-auto">
            Sign in to access your scheduler, manage jobs, and monitor executions.
          </p>
        </div>
      </div>
    </div>
  );
}

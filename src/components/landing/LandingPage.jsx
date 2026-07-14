import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Clock,
  Activity,
  Play,
  Terminal,
  Globe,
  Shield,
  Code,
  CheckCircle,
  AlertTriangle,
  XCircle,
  ChevronDown,
  Menu,
  X,
  Moon,
  Sun,
  ArrowRight,
} from "lucide-react";
import { useTheme } from "../../hooks/useTheme.js";

// ─── Exported Landing Page ────────────────────────────────

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <MarketingHeader />
      <main>
        <HeroSection />
        <StackSection />
        <ComposerSection />
        <HowItWorksSection />
        <ExecutionSection />
        <FeatureBento />
        <PricingFAQCtaSection />
      </main>
      <MarketingFooter />
    </div>
  );
}

// ─── Header ────────────────────────────────────────────────

function MarketingHeader() {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "Product", href: "#features" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-bg-main)]/80 backdrop-blur-lg border-b border-[var(--color-border)]">
      <div className="max-w-[1240px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="relative w-8 h-8 flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="absolute inset-0">
              <circle cx="16" cy="16" r="12" stroke="var(--color-green-strong)" strokeWidth="2" />
              <circle cx="16" cy="16" r="3" fill="var(--color-green-signal)" />
              <path d="M16 10v6l3.5 2" stroke="var(--color-green-strong)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-[var(--color-text-main)]">crondom</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-main)] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/temidayoxyz/crondom"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-main)] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            <span className="text-xs">★</span>
          </a>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-text-main)] hover:bg-[var(--color-bg-secondary)] transition-all"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
          </button>

          <Link
            to="/sign-in"
            className="hidden sm:block px-4 py-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-main)] transition-colors"
          >
            Sign in
          </Link>

          <Link
            to="/sign-up"
            className="px-4 py-2 text-sm font-medium bg-[var(--color-text-main)] text-[var(--color-bg-main)] rounded-lg hover:opacity-90 transition-all"
          >
            Start Free
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-[var(--color-text-secondary)]"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[var(--color-border)] bg-[var(--color-bg-main)]">
          <div className="px-6 py-4 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-main)]"
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/sign-in"
              onClick={() => setMobileOpen(false)}
              className="block text-sm text-[var(--color-text-secondary)]"
            >
              Sign in
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

// ─── Section 1: Hero ──────────────────────────────────────

function HeroSection() {
  return (
    <section className="pt-32 md:pt-40 pb-24 md:pb-32 overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left side — copy */}
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium text-[var(--color-green-strong)] bg-[var(--color-green-strong)]/5 border border-[var(--color-green-strong)]/10 rounded-full">
              <Activity size={12} />
              Open-source HTTP scheduler
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] text-[var(--color-text-main)]">
              Schedule anything.
              <br />
              <span className="text-[var(--color-green-strong)]">Pay nothing.</span>
            </h1>

            <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-lg">
              Create HTTP cron jobs, monitor executions, and never worry about infrastructure costs.
            </p>

            <div className="flex items-center gap-4 pt-2">
              <Link
                to="/sign-up"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-text-main)] text-[var(--color-bg-main)] font-medium rounded-xl hover:opacity-90 transition-all"
              >
                Start Free
                <ArrowRight size={16} />
              </Link>
              <a
                href="https://github.com/temidayoxyz/crondom"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--color-border)] text-[var(--color-text-secondary)] rounded-xl hover:bg-[var(--color-bg-secondary)] transition-all"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                View on GitHub
              </a>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 pt-4">
              {["No VPS", "No paid tiers", "No credit card"].map((item) => (
                <span key={item} className="flex items-center gap-1.5 text-sm text-[var(--color-text-muted)]">
                  <CheckCircle size={14} className="text-[var(--color-green-signal)]" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Right side — scheduler illustration */}
          <div className="relative flex items-center justify-center">
            <SchedulerRing />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Scheduler Ring SVG ───────────────────────────────────

function SchedulerRing() {
  const segments = 60;
  const radius = 100;
  const center = 130;
  const strokeWidth = 2.5;
  const gap = 1;

  const segmentAngle = 360 / segments;
  const segmentLength = ((2 * Math.PI * radius) / segments) - gap;

  return (
    <div className="relative w-[280px] h-[280px] md:w-[320px] md:h-[320px]">
      <svg width="260" height="260" viewBox="0 0 260 260" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* Ring segments */}
        <g transform="translate(130, 130)">
          {Array.from({ length: segments }).map((_, i) => {
            const angle = i * segmentAngle - 90;
            const rad = (angle * Math.PI) / 180;
            const x1 = radius * Math.cos(rad);
            const y1 = radius * Math.sin(rad);
            const x2 = (radius - 12) * Math.cos(rad);
            const y2 = (radius - 12) * Math.sin(rad);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={i === 0 ? "var(--color-green-signal)" : "var(--color-border-strong)"}
                strokeWidth={i === 0 ? 3 : 1.5}
                strokeLinecap="round"
                opacity={i === 0 ? 1 : 0.4}
                className={i === 0 ? "animate-scheduler-pulse" : ""}
              />
            );
          })}
        </g>

        {/* Inner job card */}
        <g transform="translate(130, 130)">
          <rect x="-60" y="-42" width="120" height="84" rx="12" fill="var(--color-bg-elevated)" stroke="var(--color-border)" strokeWidth="1" />
          <text x="0" y="-18" textAnchor="middle" fill="var(--color-text-main)" fontSize="11" fontFamily="Inter, sans-serif" fontWeight="600">API health check</text>
          <text x="0" y="-2" textAnchor="middle" fill="var(--color-text-secondary)" fontSize="9" fontFamily="JetBrains Mono, monospace">GET</text>
          <text x="0" y="12" textAnchor="middle" fill="var(--color-text-muted)" fontSize="9" fontFamily="JetBrains Mono, monospace">*/5 * * * *</text>
          <circle cx="-40" cy="28" r="4" fill="var(--color-green-signal)" />
          <text x="-28" y="32" textAnchor="start" fill="var(--color-text-muted)" fontSize="9">Active</text>
        </g>

        {/* Pulse path */}
        <path
          d="M 130 40 Q 130 10, 200 20 Q 230 30, 220 70"
          fill="none"
          stroke="var(--color-green-signal)"
          strokeWidth="2"
          strokeDasharray="4 4"
          opacity="0.6"
          className="animate-request-travel"
        />

        {/* Destination node */}
        <circle cx="215" cy="65" r="6" fill="var(--color-bg-elevated)" stroke="var(--color-green-strong)" strokeWidth="1.5" />
        <text x="215" y="82" textAnchor="middle" fill="var(--color-text-muted)" fontSize="8" fontFamily="JetBrains Mono, monospace">200 OK</text>
      </svg>

      {/* Floating labels */}
      <div className="absolute -top-2 -right-2 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-lg px-3 py-1.5 text-xs text-[var(--color-text-muted)] shadow-sm">
        Next run in <span className="text-[var(--color-text-secondary)] font-mono">00:42</span>
      </div>
      <div className="absolute -bottom-2 -left-2 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-lg px-3 py-1.5 text-xs text-[var(--color-text-muted)] shadow-sm">
        Duration <span className="text-[var(--color-green-strong)] font-mono">218ms</span>
      </div>
    </div>
  );
}

// ─── Section 2: How Scheduling Works ─────────────────────

function StackSection() {
  const steps = [
    {
      label: "1. Define the job",
      items: [
        "Name your job and choose an HTTP method",
        "Set the endpoint URL and request headers",
        "Write a cron expression or pick a preset",
      ],
    },
    {
      label: "2. Scheduler checks",
      items: [
        "Your job is checked automatically when due",
        "The HTTP request is sent to your endpoint",
        "Response status and body are captured",
      ],
    },
    {
      label: "3. Results are stored",
      items: [
        "Every execution is logged with full details",
        "Status codes, duration, and output preserved",
        "Review failures and retry when needed",
      ],
    },
  ];

  return (
    <section id="features" className="py-24 md:py-32 border-t border-[var(--color-border)]">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-text-main)] mb-4">
            The request lifecycle, end to end.
          </h2>
          <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto">
            From definition to execution to inspection — every step is transparent and predictable.
          </p>
        </div>

        {/* Three-column flow */}
        <div className="relative max-w-4xl mx-auto mb-16">
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <div
                key={step.label}
                className="relative bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-2xl p-6 hover:border-[var(--color-green-strong)]/20 transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[var(--color-green-strong)]/5 flex items-center justify-center">
                    <span className="text-xs font-bold text-[var(--color-green-strong)]">{i + 1}</span>
                  </div>
                  <span className="text-sm font-semibold text-[var(--color-text-main)]">{step.label.replace(/^\d+\. /, '')}</span>
                </div>
                <ul className="space-y-2.5">
                  {step.items.map((item) => (
                    <li key={item} className="text-sm text-[var(--color-text-secondary)] flex items-start gap-2">
                      <span className="text-[var(--color-green-signal)] mt-0.5 shrink-0">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute -right-4 top-1/3 text-[var(--color-text-muted)]">
                    <ArrowRight size={18} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Flow visualization */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2 text-xs text-[var(--color-text-muted)]">
            <span className="px-3 py-1.5 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-full">Dashboard</span>
            <ArrowRight size={12} />
            <span className="px-3 py-1.5 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-full">Schedule</span>
            <ArrowRight size={12} />
            <span className="px-3 py-1.5 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-full">Execute</span>
            <ArrowRight size={12} />
            <span className="px-3 py-1.5 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-full">Log</span>
            <ArrowRight size={12} />
            <span className="px-3 py-1.5 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-full">Review</span>
          </div>
        </div>

        {/* Supporting cards */}
        <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {[
            {
              icon: <Clock size={18} />,
              title: "Timed execution",
              desc: "Jobs run on the schedule you define. No manual triggering, no missed intervals.",
            },
            {
              icon: <Terminal size={18} />,
              title: "Full request control",
              desc: "Set method, headers, and body. Every HTTP detail is configurable per job.",
            },
            {
              icon: <Activity size={18} />,
              title: "Complete visibility",
              desc: "Every execution is logged with status, duration, response, and error details.",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-xl p-5 group hover:border-[var(--color-green-strong)]/20 transition-all"
            >
              <div className="w-8 h-8 rounded-lg bg-[var(--color-green-strong)]/5 flex items-center justify-center text-[var(--color-green-strong)] mb-3 group-hover:scale-105 transition-transform">
                {card.icon}
              </div>
              <h3 className="text-sm font-semibold text-[var(--color-text-main)] mb-1">{card.title}</h3>
              <p className="text-sm text-[var(--color-text-secondary)]">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 3: Interactive Job Composer ──────────────────

function ComposerSection() {
  const cronExamples = [
    { expr: "* * * * *", desc: "Every minute" },
    { expr: "*/5 * * * *", desc: "Every five minutes" },
    { expr: "0 * * * *", desc: "Every hour" },
    { expr: "0 0 * * *", desc: "Daily at midnight" },
  ];

  return (
    <section className="py-24 md:py-32 border-t border-[var(--color-border)]">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Left — copy */}
          <div className="space-y-6 sticky top-28">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-text-main)]">
              Create a job without fighting the interface.
            </h2>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              Name your job, set the URL, pick a schedule. The cron expression updates a human-readable preview so you always know when it will run.
            </p>
            <ul className="space-y-3">
              {["Job name and endpoint", "HTTP method selection", "Cron expression with preview", "Headers and request body", "Retry configuration"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                  <CheckCircle size={14} className="text-[var(--color-green-signal)] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right — interactive preview */}
          <div className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-2xl p-6 shadow-sm">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">Job name</label>
                <input
                  type="text"
                  defaultValue="API health check"
                  className="w-full px-3 py-2 text-sm bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-main)] focus:outline-none focus:border-[var(--color-green-strong)] transition-colors"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">Endpoint URL</label>
                <input
                  type="text"
                  defaultValue="https://api.example.com/health"
                  className="w-full px-3 py-2 text-sm bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-main)] font-mono focus:outline-none focus:border-[var(--color-green-strong)] transition-colors"
                  readOnly
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {["GET", "POST", "PUT"].map((method) => (
                  <button
                    key={method}
                    className={`px-3 py-2 text-xs font-mono font-medium rounded-lg border transition-all ${
                      method === "GET"
                        ? "bg-[var(--color-green-strong)]/5 border-[var(--color-green-strong)]/20 text-[var(--color-green-strong)]"
                        : "bg-[var(--color-bg-secondary)] border-[var(--color-border)] text-[var(--color-text-muted)]"
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">Cron expression</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    defaultValue="*/5 * * * *"
                    className="flex-1 px-3 py-2 text-sm bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-main)] font-mono focus:outline-none focus:border-[var(--color-green-strong)]"
                    readOnly
                  />
                  <button className="px-3 py-2 text-sm bg-[var(--color-text-main)] text-[var(--color-bg-main)] rounded-lg font-medium">
                    Test
                  </button>
                </div>
                <p className="mt-2 text-xs text-[var(--color-green-strong)] font-mono">
                  Runs every five minutes
                </p>
                <div className="mt-2 flex gap-2 flex-wrap">
                  {cronExamples.map((ex) => (
                    <span
                      key={ex.expr}
                      className="px-2 py-1 text-[10px] font-mono text-[var(--color-text-muted)] bg-[var(--color-bg-secondary)] rounded"
                    >
                      {ex.expr}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-2 border-t border-[var(--color-border)]">
                <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)]">
                  <span>Next runs:</span>
                  <span className="font-mono text-[var(--color-text-secondary)]">12:00, 12:05, 12:10</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section 4: How It Works ──────────────────────────────

function HowItWorksSection() {
  const steps = [
    {
      icon: <Code size={20} />,
      title: "Create a job",
      description: "Give it a name, cron expression, and the URL you want called. Set the HTTP method, headers, and body when needed.",
    },
    {
      icon: <Activity size={20} />,
      title: "The scheduler runs it",
      description: "A workflow checks due jobs and sends the correct HTTP request to your endpoint.",
    },
    {
      icon: <Terminal size={20} />,
      title: "View execution logs",
      description: "Every run is captured with status codes, output, duration, and error details.",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 md:py-32 border-t border-[var(--color-border)]">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-text-main)] mb-4">
            From schedule to execution in three steps.
          </h2>
          <p className="text-[var(--color-text-secondary)] max-w-lg mx-auto">
            The entire flow is designed to be transparent and predictable.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {steps.map((step, i) => (
            <div key={step.title} className="relative flex gap-6 pb-12 last:pb-0">
              {/* Timeline */}
              <div className="flex flex-col items-center shrink-0">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-bg-elevated)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-green-strong)]">
                  {step.icon}
                </div>
                {i < steps.length - 1 && (
                  <div className="w-px flex-1 bg-gradient-to-b from-[var(--color-green-strong)]/20 to-transparent mt-2" />
                )}
              </div>

              <div className="pt-1.5">
                <h3 className="text-lg font-semibold text-[var(--color-text-main)] mb-2">{step.title}</h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 5: Execution Visibility ──────────────────────

function ExecutionSection() {
  const logs = [
    { status: 200, job: "API health check", method: "GET", duration: "218ms", response: "OK" },
    { status: 204, job: "Refresh cache", method: "POST", duration: "1.2s", response: "No Content" },
    { status: 500, job: "Nightly backup", method: "POST", duration: "30s", response: "Server Error" },
    { status: 401, job: "Sync customers", method: "GET", duration: "412ms", response: "Unauthorized" },
    { status: 429, job: "Generate report", method: "POST", duration: "5.3s", response: "Too Many", content: "Requests" },
  ];

  const getStatusColor = (code) => {
    if (code < 300) return "text-[var(--color-green-strong)]";
    if (code < 400) return "text-[var(--color-amber-warning)]";
    return "text-[var(--color-red-error)]";
  };

  return (
    <section className="py-24 md:py-32 border-t border-[var(--color-border)]">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-text-main)] mb-4">
            Every run leaves a clear trail.
          </h2>
          <p className="text-[var(--color-text-secondary)] max-w-lg mx-auto">
            Execution logs give you full visibility into every request, response, and failure.
          </p>
        </div>

        {/* Summary bar */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "Success rate", value: "98.2%", color: "text-[var(--color-green-strong)]" },
              { label: "Avg duration", value: "1.4s", color: "text-[var(--color-text-secondary)]" },
              { label: "Runs today", value: "1,247", color: "text-[var(--color-text-secondary)]" },
              { label: "Failed", value: "3", color: "text-[var(--color-red-error)]" },
            ].map((stat) => (
              <div key={stat.label} className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-xl p-4 text-center">
                <p className={`text-xl font-bold font-mono ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-[var(--color-text-muted)] mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Execution table */}
        <div className="max-w-4xl mx-auto bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--color-border)]">
                  {["Status", "Job", "Method", "Started", "Duration", "Response"].map((header) => (
                    <th key={header} className="text-left px-4 py-3 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {logs.map((log, i) => (
                  <tr
                    key={i}
                    className="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-bg-secondary)] transition-colors cursor-pointer"
                  >
                    <td className="px-4 py-3">
                      <span className={`font-mono text-sm font-medium ${getStatusColor(log.status)}`}>
                        {log.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-[var(--color-text-main)]">{log.job}</td>
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs text-[var(--color-text-muted)] bg-[var(--color-bg-secondary)] px-2 py-0.5 rounded">
                        {log.method}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-[var(--color-text-secondary)] font-mono">12:34:56</td>
                    <td className="px-4 py-3 text-sm text-[var(--color-text-secondary)] font-mono">{log.duration}</td>
                    <td className="px-4 py-3 text-sm text-[var(--color-text-secondary)]">{log.response}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section 6: Everything You Need (Bento) ───────────────

function FeatureBento() {
  const features = [
    {
      icon: <Clock size={18} />,
      title: "Cron Scheduling",
      desc: "Standard cron expressions with a plain-language preview and next-run markers.",
      wide: false,
      tall: false,
    },
    {
      icon: <Activity size={18} />,
      title: "Execution Logs",
      desc: "Every response is captured with full request and response details you can inspect.",
      wide: true,
      tall: false,
    },
    {
      icon: <Shield size={18} />,
      title: "User Isolation",
      desc: "Jobs and data are scoped per account. You see only what belongs to you.",
      wide: false,
      tall: false,
    },
    {
      icon: <Globe size={18} />,
      title: "HTTP Methods",
      desc: "GET, POST, PUT, PATCH, DELETE — with custom headers, body, and authentication.",
      wide: false,
      tall: false,
    },
    {
      icon: <Terminal size={18} />,
      title: "Responsive Dashboard",
      desc: "Full-featured on desktop and mobile with toggle, edit, and management controls.",
      wide: false,
      tall: true,
    },
    {
      icon: <CheckCircle size={18} />,
      title: "Truly Free",
      desc: "Every infrastructure layer runs on a free tier. No credit card. No time limit.",
      wide: false,
      tall: false,
    },
  ];

  return (
    <section className="py-24 md:py-32 border-t border-[var(--color-border)]">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-text-main)] mb-4">
            Everything required to schedule, run, and understand your jobs.
          </h2>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => (
            <div
              key={f.title}
              className={`bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-2xl p-6 hover:border-[var(--color-green-strong)]/20 transition-all ${
                f.wide ? "sm:col-span-2" : ""
              } ${f.tall ? "sm:row-span-2" : ""}`}
            >
              <div className="w-9 h-9 rounded-xl bg-[var(--color-green-strong)]/5 flex items-center justify-center text-[var(--color-green-strong)] mb-4">
                {f.icon}
              </div>
              <h3 className="text-sm font-semibold text-[var(--color-text-main)] mb-2">{f.title}</h3>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 7: Open Source and Deployment ────────────────

function OpenSourceSection() {
  const checks = [
    "Fork the repositories",
    "Create a database",
    "Add authentication credentials",
    "Add repository secrets",
    "Enable the scheduler",
    "Deploy the application",
    "Create the first job",
  ];

  return (
    <section id="open-source" className="py-24 md:py-32 border-t border-[var(--color-border)]">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Left — key points */}
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-text-main)]">
              Your scheduler. Your data. Your code.
            </h2>

            <div className="space-y-6">
              {[
                {
                  icon: <Globe size={18} />,
                  title: "No VPS needed",
                  desc: "No servers to provision, Docker to configure, or nginx to maintain.",
                },
                {
                  icon: <Shield size={18} />,
                  title: "Your data stays yours",
                  desc: "Jobs and logs are stored inside your own database. You control the access.",
                },
                {
                  icon: <Code size={18} />,
                  title: "Open source",
                  desc: "The complete codebase is publicly available. Fork it, audit it, extend it — it's yours.",
                },
                {
                  icon: <Clock size={18} />,
                  title: "Deploy in minutes",
                  desc: "Two repositories, three secrets, and one push to go from zero to your first job.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="w-9 h-9 rounded-xl bg-[var(--color-green-strong)]/5 flex items-center justify-center text-[var(--color-green-strong)] shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--color-text-main)] mb-1">{item.title}</h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — deployment checklist */}
          <div className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-2xl p-6 md:p-8 shadow-sm">
            <h3 className="text-sm font-semibold text-[var(--color-text-main)] mb-6">Deployment checklist</h3>
            <div className="space-y-0">
              {checks.map((item, i) => (
                <div key={item} className="flex items-center gap-3 py-3 border-b border-[var(--color-border)] last:border-0">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                    i < 6 ? "bg-[var(--color-green-strong)]/5 text-[var(--color-green-strong)]" : "text-[var(--color-text-muted)]"
                  }`}>
                    {i + 1}
                  </div>
                  <span className={`text-sm ${i < 6 ? "text-[var(--color-text-main)]" : "text-[var(--color-text-secondary)]"}`}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section 8: Pricing, FAQ, CTA ─────────────────────────

function PricingFAQCtaSection() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: "What is a cron job?",
      a: "A cron job is a scheduled task that runs automatically at defined times. crondom makes HTTP requests to your URL on the schedule you define.",
    },
    {
      q: "How often can jobs run?",
      a: "The scheduler checks every 60 seconds. The fastest interval is once per minute (expression: * * * * *).",
    },
    {
      q: "Is it really free?",
      a: "Yes. It runs entirely on free tiers. No credit card required and no time limit on the free tier.",
    },
    {
      q: "What happens if a job fails?",
      a: "Failed jobs are logged with the HTTP status code and error message. You can review all failures from your dashboard.",
    },
    {
      q: "Can I use a custom domain?",
      a: "Yes. The frontend supports custom domains for branded access.",
    },
    {
      q: "How do I deploy it myself?",
      a: "Fork the two repositories, set up a database and authentication, add the API secrets, and push to main. Full instructions are in the README.",
    },
  ];

  return (
    <section id="pricing" className="py-24 md:py-32 border-t border-[var(--color-border)]">
      <div className="max-w-[1240px] mx-auto px-6">
        {/* Pricing */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-text-main)] mb-4">
            One plan. One price. Zero dollars.
          </h2>
        </div>

        <div className="max-w-sm mx-auto mb-24">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-b from-[var(--color-green-strong)]/20 via-[var(--color-green-strong)]/5 to-transparent rounded-2xl blur opacity-60" />
            <div className="relative bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-2xl p-8 text-center">
              <p className="text-xs text-[var(--color-text-muted)] font-medium tracking-wider uppercase mb-4">Free</p>
              <p className="text-5xl font-bold text-[var(--color-text-main)]">
                $0
                <span className="text-base text-[var(--color-text-secondary)] font-normal ml-1">/month</span>
              </p>
              <ul className="mt-8 space-y-3 text-sm text-left">
                {[
                  "Unlimited cron jobs",
                  "Unlimited executions",
                  "Execution logs with details",
                  "All HTTP methods",
                  "Custom headers and body",
                  "User authentication",
                  "Responsive dashboard",
                  "Open-source codebase",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[var(--color-text-secondary)]">
                    <CheckCircle size={14} className="text-[var(--color-green-signal)] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to="/sign-up"
                className="mt-8 block w-full py-3 bg-[var(--color-text-main)] text-[var(--color-bg-main)] font-medium rounded-xl hover:opacity-90 transition-all"
              >
                Get Started
              </Link>
              <p className="mt-3 text-xs text-[var(--color-text-muted)]">No credit card required.</p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto mb-24">
          <h2 id="faq" className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-text-main)] mb-12 text-center scroll-mt-20">
            Frequently asked questions
          </h2>
          <div className="space-y-0 divide-y divide-[var(--color-border)]">
            {faqs.map((faq) => (
              <div key={faq.q} className="py-1">
                <button
                  onClick={() => setOpenFaq(openFaq === faq.q ? null : faq.q)}
                  className="flex items-center justify-between w-full px-4 py-4 text-left text-sm font-medium text-[var(--color-text-main)] hover:text-[var(--color-green-strong)] transition-colors"
                >
                  {faq.q}
                  <ChevronDown
                    size={16}
                    className={`text-[var(--color-text-muted)] transition-transform ${
                      openFaq === faq.q ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === faq.q && (
                  <div className="px-4 pb-4 text-sm text-[var(--color-text-secondary)] leading-relaxed animate-fade-in-up">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center max-w-lg mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-text-main)] mb-4">
            Ready to schedule your first job?
          </h2>
          <p className="text-[var(--color-text-secondary)] mb-8">
            Create a free account, set up your first cron job in 30 seconds, and watch it run.
          </p>
          <Link
            to="/sign-up"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[var(--color-text-main)] text-[var(--color-bg-main)] font-medium rounded-xl hover:opacity-90 transition-all shadow-lg"
          >
            Start Free — No Credit Card
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────

function MarketingFooter() {
  const { theme, toggleTheme } = useTheme();

  return (
    <footer className="border-t border-[var(--color-border)] py-16">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="12" stroke="var(--color-green-strong)" strokeWidth="2" />
                <circle cx="16" cy="16" r="3" fill="var(--color-green-signal)" />
                <path d="M16 10v6l3.5 2" stroke="var(--color-green-strong)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-sm font-semibold">crondom</span>
            </Link>
            <p className="text-sm text-[var(--color-text-secondary)] mb-4 max-w-xs">
              A free and open-source HTTP cron job manager.
            </p>
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-main)] border border-[var(--color-border)] rounded-lg transition-all"
            >
              {theme === "light" ? <Moon size={14} /> : <Sun size={14} />}
              {theme === "light" ? "Dark mode" : "Light mode"}
            </button>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-2">
              {["Features", "How it works", "Pricing"].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(/ /g, "-")}`} className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-main)] transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-2">
              {["Documentation", "Cron guide", "Deployment guide", "FAQ"].map((item) => (
                <li key={item}>
                  <a href="#faq" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-main)] transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Open source */}
          <div>
            <h4 className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-4">Open source</h4>
            <ul className="space-y-2">
              {[
                { label: "Source code", href: "https://github.com/temidayoxyz/crondom" },
                { label: "Issues", href: "https://github.com/temidayoxyz/crondom/issues" },
                { label: "Contributing", href: "https://github.com/temidayoxyz/crondom" },
                { label: "License", href: "https://github.com/temidayoxyz/crondom" },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} target="_blank" rel="noreferrer" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-main)] transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[var(--color-border)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--color-text-muted)]">
            Free and open-source.
          </p>
          <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)]">
            <a href="#" className="hover:text-[var(--color-text-secondary)]">Privacy</a>
            <a href="#" className="hover:text-[var(--color-text-secondary)]">Terms</a>
            <a href="#" className="hover:text-[var(--color-text-secondary)]">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

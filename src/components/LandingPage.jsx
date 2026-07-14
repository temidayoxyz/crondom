import { Link } from "react-router-dom";

// ─── Design System ──────────────────────────────────────────
// Subject: Cron scheduling — precision, time, automation
// Palette: Midnight base, amber primary, emerald for success
// Signature: Animated cron ticker (the cron expression as motif)
// Risk: Decorative cron expressions scrolling in the hero bg

const sections = [
  { id: "hero", component: HeroSection },
  { id: "features", component: FeaturesSection },
  { id: "how-it-works", component: HowItWorksSection },
  { id: "why", component: WhySection },
  { id: "pricing", component: PricingSection },
  { id: "faq", component: FaqSection },
  { id: "cta", component: CtaSection },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#080C14] text-[#F1F5F9]">
      <Nav />
      {sections.map((s) => (
        <s.component key={s.id} />
      ))}
      <Footer />
    </div>
  );
}

// ─── Nav ────────────────────────────────────────────────────

function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#080C14]/80 backdrop-blur-lg border-b border-white/[0.04]">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 group-hover:bg-amber-500/20 transition-colors">
            <span className="text-amber-400 text-lg font-bold">⌁</span>
          </span>
          <span className="text-base font-semibold tracking-tight">crondom</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {["Features", "How it works", "Pricing", "FAQ"].map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase().replace(/ /g, "-")}`}
              className="text-[#64748B] hover:text-[#F1F5F9] transition-colors tracking-wide"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="px-4 py-2 text-sm text-[#94A3B8] hover:text-[#F1F5F9] transition-colors"
          >
            Sign in
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 text-sm font-medium bg-amber-500 hover:bg-amber-400 text-[#080C14] rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

// ─── Hero ───────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Background — grid + glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxRTI5M0IiIGZpbGwtb3BhY2l0eT0iMC4zIj48cGF0aCBkPSJNMzYgMzR2LTRoNHY0aC00em0wLTh2LTRoNHY0aC00em0tOCA4di00aDR2NGgtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/[0.03] via-transparent to-[#080C14]" />
      </div>

      {/* Decorative cron ticker — the signature element */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        <div className="absolute top-1/4 -left-20 rotate-12 text-[#1E293B] text-6xl font-mono font-bold leading-none tracking-wider whitespace-nowrap opacity-20 animate-pulse" style={{ animationDuration: "8s" }}>
          */5 * * * * &nbsp;&nbsp; 0 9 * * 1-5 &nbsp;&nbsp; @daily &nbsp;&nbsp; */15 * * * *
        </div>
        <div className="absolute top-3/4 -right-20 -rotate-6 text-[#1E293B] text-5xl font-mono font-bold leading-none tracking-wider whitespace-nowrap opacity-10">
          30 2 * * * &nbsp;&nbsp; @weekly &nbsp;&nbsp; 0 */4 * * * &nbsp;&nbsp; @reboot
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-24 md:py-32 text-center relative w-full">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/5 border border-amber-500/10 text-amber-400/80 text-xs font-medium tracking-wider mb-8 uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          Zero infrastructure. Zero cost.
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
          Schedule anything.
          <br />
          <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
            Pay nothing.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-[#64748B] max-w-2xl mx-auto mb-10 leading-relaxed">
          A cron job manager built on the $0 stack — GitHub Actions, Turso, and GitHub Pages. 
          Create HTTP cron jobs, monitor every execution, and never provision a server.
        </p>

        {/* CTAs */}
        <div className="flex items-center justify-center gap-4">
          <Link
            to="/signup"
            className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-[#080C14] font-semibold rounded-xl transition-all hover:scale-[1.03] active:scale-[0.97] shadow-lg shadow-amber-500/20"
          >
            Start Free
          </Link>
          <a
            href="#how-it-works"
            className="px-8 py-3.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] rounded-xl text-sm font-medium transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            See how it works
          </a>
        </div>

        {/* Stats / trust markers */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm text-[#475569]">
          {[
            ["GitHub Actions", "Unlimited minutes"],
            ["Turso", "500MB database"],
            ["GitHub Pages", "Free hosting"],
            ["Clerk", "Auth included"],
          ].map(([label, desc]) => (
            <div key={label} className="flex items-center gap-1.5">
              <span className="text-emerald-500 text-lg">✓</span>
              <span className="font-medium text-[#64748B]">{label}</span>
              <span className="text-[#475569] hidden sm:inline">· {desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Features ──────────────────────────────────────────────

const features = [
  {
    icon: "🕒",
    title: "Cron Scheduling",
    description: "Standard cron expressions for any interval — every minute, hourly, daily, or complex patterns like 0 9 * * 1-5.",
  },
  {
    icon: "📊",
    title: "Execution Logs",
    description: "Every run is captured: status code, response body, duration, and errors. Expand any entry to inspect full details.",
  },
  {
    icon: "🔐",
    title: "User Isolation",
    description: "Jobs are scoped per account. You see only your own jobs and logs. Authentication handled by Clerk.",
  },
  {
    icon: "🌐",
    title: "All HTTP Methods",
    description: "GET, POST, PUT, PATCH, DELETE with custom headers and body for any API or webhook integration.",
  },
  {
    icon: "⌨️",
    title: "Toggle & Manage",
    description: "Enable or disable jobs with one click. Edit, duplicate, or delete — all from a dark-themed responsive dashboard.",
  },
  {
    icon: "💰",
    title: "Truly Free",
    description: "No VPS, no paid tier, no credit card. Runs on free public-repo GitHub Actions, Turso, and GitHub Pages.",
  },
];

function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 md:py-32 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-xs font-mono text-amber-500/60 tracking-[0.2em] uppercase">/* features */</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-4 mb-4">
            Everything you need to schedule
          </h2>
          <p className="text-[#64748B] max-w-lg mx-auto">
            No bloat. No hidden costs. Just the tools to define, run, and monitor HTTP cron jobs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-white/[0.04] rounded-2xl overflow-hidden">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-[#0F172A] p-7 md:p-8 hover:bg-[#111D35] transition-colors"
            >
              <span className="text-2xl">{f.icon}</span>
              <h3 className="text-base font-semibold mt-4 mb-2 tracking-tight">{f.title}</h3>
              <p className="text-sm text-[#64748B] leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ──────────────────────────────────────────

const steps = [
  {
    title: "Create a job",
    description: "Give it a name, a cron expression like */5 * * * *, and the URL to call. Set method, headers, and body if needed.",
  },
  {
    title: "Scheduler runs it",
    description: "A GitHub Actions workflow checks every 60 seconds. When a job is due, it fires the HTTP request and captures the result.",
  },
  {
    title: "Review the logs",
    description: "Every execution is recorded — status code, response output, timing, and errors. All visible from your dashboard.",
  },
];

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-24 md:py-32 border-t border-white/[0.04] scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-xs font-mono text-amber-500/60 tracking-[0.2em] uppercase">/* workflow */</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-4 mb-4">
            Three steps to your first job
          </h2>
          <p className="text-[#64748B] max-w-lg mx-auto">
            From zero to your first scheduled HTTP call in under 60 seconds.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <div key={step.title} className="relative flex gap-6 md:gap-10 pb-12 md:pb-16 last:pb-0">
              {/* Timeline line + dot */}
              <div className="flex flex-col items-center shrink-0">
                <div className="w-10 h-10 rounded-full bg-[#0F172A] border border-[#1E293B] flex items-center justify-center text-sm font-semibold text-amber-400 z-10">
                  {i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div className="w-px flex-1 bg-gradient-to-b from-amber-500/20 to-transparent mt-2" />
                )}
              </div>

              {/* Content */}
              <div className="pt-1.5">
                <h3 className="text-lg font-semibold tracking-tight mb-2">{step.title}</h3>
                <p className="text-sm text-[#64748B] leading-relaxed max-w-xl">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Why ───────────────────────────────────────────────────

const reasons = [
  {
    icon: "⊞",
    title: "No VPS needed",
    desc: "No servers to provision, no Docker to configure, no nginx to maintain. The scheduler runs entirely on GitHub Actions.",
  },
  {
    icon: "◈",
    title: "Your data stays yours",
    desc: "Jobs and logs are stored in your Turso database. You own it, you control the access. No third-party data silo.",
  },
  {
    icon: "⌁",
    title: "Open source",
    desc: "The entire codebase is public on GitHub. Fork it, audit it, extend it — it's yours to own and modify.",
  },
  {
    icon: "⚡",
    title: "Deploy in 5 minutes",
    desc: "Two repos, three secrets, one push. From a fresh terminal to your first job executing in under five minutes.",
  },
];

function WhySection() {
  return (
    <section id="why" className="relative py-24 md:py-32 border-t border-white/[0.04] scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-xs font-mono text-amber-500/60 tracking-[0.2em] uppercase">/* rationale */</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-4 mb-4">
            Why crondom?
          </h2>
          <p className="text-[#64748B] max-w-lg mx-auto">
            Built differently so you never get a bill — and never hit a paywall.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {reasons.map((item) => (
            <div
              key={item.title}
              className="group bg-[#0F172A] border border-white/[0.04] rounded-xl p-6 hover:border-amber-500/10 hover:bg-[#111D35] transition-all"
            >
              <div className="flex items-start gap-4">
                <span className="text-amber-400/60 text-xl mt-0.5 font-mono">{item.icon}</span>
                <div>
                  <h3 className="font-semibold text-sm tracking-tight mb-1.5">{item.title}</h3>
                  <p className="text-sm text-[#64748B] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Pricing ───────────────────────────────────────────────

function PricingSection() {
  return (
    <section id="pricing" className="relative py-24 md:py-32 border-t border-white/[0.04] scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-xs font-mono text-amber-500/60 tracking-[0.2em] uppercase">/* pricing */</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-4 mb-4">
            One plan. Free forever.
          </h2>
          <p className="text-[#64748B] max-w-lg mx-auto">
            No tiers, no hidden limits, no upgrade prompts. Just a cron job manager that costs zero.
          </p>
        </div>

        <div className="max-w-sm mx-auto">
          <div className="relative group">
            {/* Glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-b from-amber-500/20 via-amber-500/5 to-transparent rounded-2xl blur opacity-60 group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-[#0F172A] border border-white/[0.06] rounded-2xl p-8 text-center">
              <p className="text-xs text-[#64748B] font-mono tracking-wider uppercase mb-4">Free</p>
              <p className="text-6xl font-bold tracking-tight">
                $0
                <span className="text-base text-[#64748B] font-normal ml-1">/month</span>
              </p>
              <ul className="mt-8 space-y-3 text-sm text-left">
                {[
                  "Unlimited cron jobs",
                  "Unlimited executions",
                  "Full execution logs",
                  "All HTTP methods",
                  "Custom headers & body",
                  "User authentication",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[#94A3B8]">
                    <span className="text-emerald-500 text-sm">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to="/signup"
                className="mt-8 block w-full py-3 bg-amber-500 hover:bg-amber-400 text-[#080C14] font-semibold rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ───────────────────────────────────────────────────

const faqs = [
  {
    q: "What is a cron job?",
    a: "A cron job is a scheduled task that runs automatically at defined times or intervals. crondom makes HTTP requests to your URL on the schedule you define — like calling a backup API every day at 2 AM.",
  },
  {
    q: "How fast can jobs run?",
    a: "The scheduler checks for due jobs every 60 seconds. The fastest valid interval is once per minute (expression: * * * * *).",
  },
  {
    q: "Is it really free?",
    a: "Yes. It runs entirely on free tiers: GitHub Actions (public repos get unlimited minutes), Turso (500MB database), and GitHub Pages. No credit card required.",
  },
  {
    q: "What happens when a job fails?",
    a: "Failed jobs are logged with the HTTP status code and error message. You can review all failures in the execution logs from your dashboard.",
  },
  {
    q: "Can I use my own domain?",
    a: "Yes. The frontend supports custom domains via GitHub Pages. Clerk authentication also supports custom domains if you need branded sign-in pages.",
  },
  {
    q: "How do I deploy this myself?",
    a: "Fork the two repos (frontend and scheduler), set up a Turso database and a Clerk app, add the API secrets to GitHub, and push to main. Full instructions in the README.",
  },
];

function FaqSection() {
  return (
    <section id="faq" className="relative py-24 md:py-32 border-t border-white/[0.04] scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-xs font-mono text-amber-500/60 tracking-[0.2em] uppercase">/* faq */</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-4 mb-4">
            Frequently asked questions
          </h2>
          <p className="text-[#64748B] max-w-lg mx-auto">
            Everything you need to know before signing up.
          </p>
        </div>

        <div className="max-w-3xl mx-auto divide-y divide-white/[0.04]">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group open:bg-white/[0.02] rounded-xl transition-colors"
            >
              <summary className="flex items-center justify-between px-5 py-5 cursor-pointer list-none text-sm font-medium hover:text-amber-400 transition-colors">
                {faq.q}
                <span className="text-[#475569] group-open:text-amber-400 transition-colors ml-4">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="group-open:rotate-180 transition-transform">
                    <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </summary>
              <div className="px-5 pb-5 text-sm text-[#64748B] leading-relaxed max-w-2xl">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA ───────────────────────────────────────────────────

function CtaSection() {
  return (
    <section className="relative py-24 md:py-32 border-t border-white/[0.04]">
      <div className="absolute inset-0 bg-gradient-to-b from-amber-500/[0.02] to-transparent pointer-events-none" />
      <div className="max-w-6xl mx-auto px-4 text-center relative">
        <span className="text-xs font-mono text-amber-500/60 tracking-[0.2em] uppercase">/* go */</span>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-4 mb-4">
          Ready to schedule your first job?
        </h2>
        <p className="text-[#64748B] mb-8 max-w-lg mx-auto">
          Create a free account, define your first cron job in 30 seconds, and watch it run.
        </p>
        <Link
          to="/signup"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-[#080C14] font-semibold rounded-xl transition-all hover:scale-[1.03] active:scale-[0.97] shadow-lg shadow-amber-500/20"
        >
          Start Free
          <span className="text-lg">→</span>
        </Link>
      </div>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-white/[0.04] py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 text-xs font-bold">⌁</span>
            <span className="text-sm font-semibold">crondom</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-[#475569]">
            <a href="https://github.com/temidayoxyz/crondom" target="_blank" rel="noreferrer" className="hover:text-[#94A3B8] transition-colors">
              Frontend repo
            </a>
            <a href="https://github.com/temidayoxyz/crondom-scheduler" target="_blank" rel="noreferrer" className="hover:text-[#94A3B8] transition-colors">
              Scheduler repo
            </a>
            <a href="#features" className="hover:text-[#94A3B8] transition-colors">
              Features
            </a>
          </div>
          <p className="text-[10px] text-[#475569]">
            No servers. No bills. No BS.
          </p>
        </div>
      </div>
    </footer>
  );
}

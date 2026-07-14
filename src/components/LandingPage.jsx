import { Link } from "react-router-dom";

const sections = [
  {
    id: "hero",
    component: HeroSection,
  },
  {
    id: "features",
    component: FeaturesSection,
  },
  {
    id: "how-it-works",
    component: HowItWorksSection,
  },
  {
    id: "why",
    component: WhySection,
  },
  {
    id: "pricing",
    component: PricingSection,
  },
  {
    id: "faq",
    component: FaqSection,
  },
  {
    id: "cta",
    component: CtaSection,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Nav />
      {sections.map((s) => (
        <s.component key={s.id} />
      ))}
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
          <span className="text-orange-500 text-xl">⏱</span>
          <span>crondom</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="px-4 py-1.5 text-sm text-gray-300 hover:text-white transition-colors"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="px-4 py-1.5 bg-orange-600 hover:bg-orange-500 rounded-md text-sm font-medium transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-gray-800">
      <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent pointer-events-none" />
      <div className="max-w-6xl mx-auto px-4 py-24 md:py-32 text-center relative">
        <span className="text-6xl mb-6 block">⏱</span>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
          Schedule anything.
          <br />
          <span className="text-orange-500">Pay nothing.</span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-8">
          crondom is a cron job manager that runs on a $0 stack.
          Create HTTP cron jobs, monitor executions, and never worry about infrastructure costs.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            to="/signup"
            className="px-6 py-3 bg-orange-600 hover:bg-orange-500 rounded-lg text-base font-medium transition-colors"
          >
            Start Free
          </Link>
          <a
            href="#how-it-works"
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-base transition-colors"
          >
            How it works
          </a>
        </div>
        <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-500">
          <span>✅ GitHub Actions runs it</span>
          <span>✅ Turso stores it</span>
          <span>✅ GitHub Pages hosts it</span>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: "🕒",
      title: "Cron Scheduling",
      description: "Use standard cron expressions to schedule HTTP calls at any interval — every minute, hourly, daily, or complex patterns.",
    },
    {
      icon: "📊",
      title: "Execution Logs",
      description: "Every run is logged with status, response output, duration, and errors. Expand any log entry to see full details.",
    },
    {
      icon: "🔐",
      title: "User Isolation",
      description: "Jobs are scoped per user account. You only see your own jobs and logs. Authentication handled by Clerk.",
    },
    {
      icon: "🌐",
      title: "HTTP Methods",
      description: "Supports GET, POST, PUT, PATCH, DELETE with custom headers and request body for any API integration.",
    },
    {
      icon: "📱",
      title: "Responsive UI",
      description: "Dark-themed dashboard works on desktop and mobile. Toggle jobs on/off, edit, or delete with one click.",
    },
    {
      icon: "💰",
      title: "Truly Free",
      description: "No VPS, no paid tiers, no credit card. Runs on free GitHub Actions minutes, Turso, and GitHub Pages.",
    },
  ];

  return (
    <section id="features" className="border-b border-gray-800 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2">Everything you need</h2>
        <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
          A simple cron job manager without the complexity or cost.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors"
            >
              <span className="text-2xl">{f.icon}</span>
              <h3 className="text-lg font-semibold mt-3 mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      step: "1",
      title: "Create a job",
      description: "Give it a name, cron expression, and the URL you want called. Set HTTP method, headers, and body if needed.",
    },
    {
      step: "2",
      title: "Scheduler runs it",
      description: "A GitHub Actions workflow runs every 60 seconds, checks your jobs, and fires HTTP requests when they're due.",
    },
    {
      step: "3",
      title: "View execution logs",
      description: "Every run is captured — status codes, response output, timing, and errors. All visible from your dashboard.",
    },
  ];

  return (
    <section id="how-it-works" className="border-b border-gray-800 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2">How it works</h2>
        <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
          Three simple steps to schedule your first cron job.
        </p>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((s, i) => (
            <div key={s.step} className="text-center">
              <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">
                {s.step}
              </div>
              <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{s.description}</p>
              {i < steps.length - 1 && (
                <div className="hidden md:block text-gray-600 text-2xl mt-4">↓</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhySection() {
  return (
    <section id="why" className="border-b border-gray-800 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2">Why crondom?</h2>
        <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
          Built differently so you never get a bill.
        </p>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            {
              title: "No VPS needed",
              desc: "No servers to provision, no Docker to configure, no nginx to maintain. The scheduler runs on GitHub Actions.",
            },
            {
              title: "Your data stays yours",
              desc: "Jobs and logs are stored in your Turso database. You own it, you control it. No third-party storage.",
            },
            {
              title: "Open source",
              desc: "The entire codebase is public on GitHub. Fork it, audit it, extend it — it's yours.",
            },
            {
              title: "Takes 5 minutes to deploy",
              desc: "Two repos, three secrets, one push. From zero to your first scheduled job in under five minutes.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-gray-900 border border-gray-800 rounded-xl p-6"
            >
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section id="pricing" className="border-b border-gray-800 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2">Simple pricing</h2>
        <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
          One plan. One price. Zero dollars.
        </p>
        <div className="max-w-sm mx-auto">
          <div className="bg-gray-900 border border-orange-500/30 rounded-2xl p-8 text-center">
            <p className="text-sm text-gray-400 uppercase tracking-wider mb-2">Free</p>
            <p className="text-5xl font-bold mb-1">
              $0
              <span className="text-lg text-gray-400 font-normal">/month</span>
            </p>
            <ul className="mt-6 space-y-3 text-sm text-left">
              {[
                "Unlimited cron jobs",
                "Unlimited executions (public repo)",
                "Execution logs with details",
                "All HTTP methods",
                "Custom headers & body",
                "User authentication",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              to="/signup"
              className="mt-8 block w-full py-3 bg-orange-600 hover:bg-orange-500 rounded-lg font-medium transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  const faqs = [
    {
      q: "What is a cron job?",
      a: "A cron job is a scheduled task that runs automatically at specified times. crondom makes HTTP requests to your URL on the schedule you define.",
    },
    {
      q: "How often can jobs run?",
      a: "The scheduler checks every 60 seconds. The fastest interval is once per minute (expression: * * * * *).",
    },
    {
      q: "Is it really free?",
      a: "Yes. It runs on free tiers: GitHub Actions (public repos get unlimited minutes), Turso (500MB free), and GitHub Pages. No credit card needed.",
    },
    {
      q: "What happens if a job fails?",
      a: "Failed jobs are logged with the error message and status code. You can review failures in the execution logs on your dashboard.",
    },
    {
      q: "Can I use a custom domain?",
      a: "Yes. The frontend supports custom domains via GitHub Pages. Clerk authentication also supports custom domains for branding.",
    },
    {
      q: "How do I deploy it myself?",
      a: "Fork the two repos (frontend and scheduler), set up a Turso database, create a Clerk app, add the secrets, and push. Full instructions are in the README.",
    },
  ];

  return (
    <section id="faq" className="border-b border-gray-800 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2">Frequently asked questions</h2>
        <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
          Everything you need to know about crondom.
        </p>
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden"
            >
              <summary className="px-6 py-4 cursor-pointer hover:bg-gray-800/50 font-medium transition-colors">
                {faq.q}
              </summary>
              <div className="px-6 pb-4 text-sm text-gray-400 leading-relaxed">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="border-b border-gray-800 py-20">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to schedule your first job?</h2>
        <p className="text-gray-400 mb-8 max-w-lg mx-auto">
          Create a free account, set up your first cron job in 30 seconds, and watch it run.
        </p>
        <Link
          to="/signup"
          className="inline-block px-8 py-3 bg-orange-600 hover:bg-orange-500 rounded-lg text-base font-medium transition-colors"
        >
          Start Free — No Credit Card
        </Link>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <span className="text-orange-500">⏱</span>
            <span>crondom</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a href="https://github.com/temidayoxyz/crondom" target="_blank" rel="noreferrer" className="hover:text-gray-300 transition-colors">
              Frontend Repo
            </a>
            <a href="https://github.com/temidayoxyz/crondom-scheduler" target="_blank" rel="noreferrer" className="hover:text-gray-300 transition-colors">
              Scheduler Repo
            </a>
            <a href="#features" className="hover:text-gray-300 transition-colors">
              Features
            </a>
          </div>
          <p className="text-xs text-gray-600">
            Built on a $0 stack. No servers, no bills, no BS.
          </p>
        </div>
      </div>
    </footer>
  );
}

import { useUser, useClerk } from "@clerk/clerk-react";
import { Moon, Sun, Globe, LogOut, Shield } from "lucide-react";
import { useTheme } from "../../hooks/useTheme.js";

export default function Settings() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const { theme, toggleTheme } = useTheme();

  const sections = [
    {
      title: "Account",
      icon: Shield,
      fields: [
        { label: "Name", value: user?.fullName || "—" },
        { label: "Email", value: user?.primaryEmailAddress?.emailAddress || "—" },
        { label: "Session", control: "signout" },
      ],
    },
    {
      title: "Preferences",
      icon: Globe,
      fields: [
        { label: "Theme", control: "theme" },
        { label: "Timezone", value: Intl.DateTimeFormat().resolvedOptions().timeZone },
      ],
    },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-xl font-bold text-[var(--color-text-main)]">Settings</h1>

      {sections.map((section) => {
        const Icon = section.icon;
        return (
          <div key={section.title} className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-[var(--color-border)] flex items-center gap-2">
              <Icon size={16} className="text-[var(--color-text-muted)]" />
              <h2 className="text-sm font-semibold text-[var(--color-text-main)]">{section.title}</h2>
            </div>
            <div className="divide-y divide-[var(--color-border)]">
              {section.fields.map((field) => (
                <div key={field.label} className="px-6 py-4 flex items-center justify-between">
                  <span className="text-sm text-[var(--color-text-secondary)]">{field.label}</span>
                  {field.control === "theme" ? (
                    <button
                      onClick={toggleTheme}
                      className="flex items-center gap-2 px-3 py-1.5 border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] transition-all"
                    >
                      {theme === "light" ? <Moon size={14} /> : <Sun size={14} />}
                      {theme === "light" ? "Dark" : "Light"}
                    </button>
                  ) : field.control === "signout" ? (
                    <button
                      onClick={() => signOut({ redirectUrl: "/" })}
                      className="flex items-center gap-2 px-3 py-1.5 border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-red-error)] hover:bg-[var(--color-red-error)]/5 transition-all"
                    >
                      <LogOut size={14} />
                      Sign out
                    </button>
                  ) : (
                    <span className="text-sm text-[var(--color-text-main)]">{field.value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

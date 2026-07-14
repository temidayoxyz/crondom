import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Moon, Sun, Globe, Clock, User } from "lucide-react";
import { useTheme } from "../../hooks/useTheme.js";

export default function Settings() {
  const { user } = useUser();
  const { theme, toggleTheme } = useTheme();

  const sections = [
    {
      title: "Profile",
      icon: User,
      fields: [
        { label: "Name", value: user?.fullName || "—" },
        { label: "Email", value: user?.primaryEmailAddress?.emailAddress || "—" },
      ],
    },
    {
      title: "Preferences",
      icon: Globe,
      fields: [
        { label: "Theme", value: "Controls", control: "theme" },
        { label: "Timezone", value: Intl.DateTimeFormat().resolvedOptions().timeZone },
        { label: "Date format", value: "24-hour" },
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

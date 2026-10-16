import { useState } from "react";
import { Sparkles, ArrowRight, Zap, Database, Layers } from "lucide-react";

function App() {
  const [hovered, setHovered] = useState<number | null>(null);

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Powered by Vite for instant hot module reloading and optimized builds.",
    },
    {
      icon: Database,
      title: "Supabase Ready",
      description: "Database, authentication, and real-time features wired up out of the box.",
    },
    {
      icon: Layers,
      title: "Tailwind CSS",
      description: "A clean, responsive design system with consistent spacing and typography.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900" />
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }} />
        <div className="relative mx-auto max-w-4xl px-6 py-24 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm ring-1 ring-white/20">
            <Sparkles className="h-4 w-4" />
            Ready to Build
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
            Start Your Project
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-primary-100">
            A modern starter kit with Vite, React, Tailwind CSS, and Supabase.
            Tell me what you'd like to build and I'll make it happen.
          </p>
          <button
            className="group mt-10 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-base font-semibold text-primary-700 shadow-lg transition-all hover:bg-primary-50 hover:shadow-xl active:scale-95"
          >
            Get Started
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </header>

      {/* Features */}
      <main className="mx-auto max-w-5xl px-6 py-20">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={i}
                className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:shadow-md hover:border-primary-300"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl transition-colors ${
                  hovered === i ? "bg-primary-600 text-white" : "bg-primary-50 text-primary-600"
                }`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-8 text-center text-sm text-slate-500">
        Built with Vite, React, Tailwind CSS & Supabase
      </footer>
    </div>
  );
}

export default App;

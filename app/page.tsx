import Link from "next/link";

const features = [
  {
    title: "Budget Planner",
    description:
      "Track rent, groceries, transport, tuition, and weekend plans with smart forecasts built around student life in Sydney.",
    accent: "from-cyan-400 to-blue-500",
  },
  {
    title: "AI Student Assistant",
    description:
      "Ask questions about uni admin, documents, accommodation, banking, and everyday tasks before or after you arrive.",
    accent: "from-violet-400 to-fuchsia-500",
  },
  {
    title: "Arrival Checklist",
    description:
      "Turn the chaos of landing in a new country into a guided plan for SIM cards, Opal, TFN, housing, and essentials.",
    accent: "from-emerald-400 to-teal-500",
  },
  {
    title: "Study Helper",
    description:
      "Plan assignments, summarize notes, prepare for exams, and keep study routines moving with calm, contextual support.",
    accent: "from-amber-300 to-orange-500",
  },
];

const progressItems = [
  { label: "Rent & bills", value: "68%", widthClass: "w-[68%]" },
  { label: "Study plan", value: "82%", widthClass: "w-[82%]" },
  { label: "Arrival tasks", value: "54%", widthClass: "w-[54%]" },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#05070f] bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:64px_64px] text-white">
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#05070f]/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <a href="#" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-300/30 bg-cyan-300/10 shadow-[0_0_40px_rgba(34,211,238,0.18)]">
              <span className="h-4 w-4 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(103,232,249,0.95)]" />
            </span>
            <span className="text-lg font-semibold tracking-wide">Atlas AI</span>
          </a>

          <div className="hidden items-center gap-8 text-sm font-medium text-slate-300 md:flex">
            <a href="#features" className="transition hover:text-white">
              Features
            </a>
            <a href="#students" className="transition hover:text-white">
              Students
            </a>
            <a href="#start" className="transition hover:text-white">
              Start
            </a>
          </div>

          <a
            href="#start"
            className="rounded-full border border-white/15 bg-white/10 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-black/20 transition hover:border-cyan-300/60 hover:bg-cyan-300/10"
          >
            Join Waitlist
          </a>
        </div>
      </nav>

      <section className="relative mx-auto flex min-h-[calc(100vh-73px)] max-w-7xl items-center px-6 py-20 lg:px-8">
        <div className="grid w-full items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-100">
              Built for international students in Sydney
            </div>

            <h1 className="text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
              AI Copilot for International Students
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              Atlas AI helps international students budget smarter, get study
              support, and settle into Sydney with clear guidance for the
              moments that usually feel overwhelming.
            </p>

            <div id="start" className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#"
                className="rounded-full bg-cyan-300 px-8 py-4 text-center text-sm font-bold text-slate-950 shadow-[0_0_35px_rgba(103,232,249,0.35)] transition hover:-translate-y-1 hover:bg-cyan-200"
              >
                Get Started
              </a>
              <a
                href="#features"
                className="rounded-full border border-white/15 bg-white/10 px-8 py-4 text-center text-sm font-bold text-white transition hover:-translate-y-1 hover:border-white/30 hover:bg-white/15"
              >
                Explore Features
              </a>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-lg border border-white/10 bg-[#08111f]/90 p-5 shadow-2xl shadow-black/40 backdrop-blur-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Weekly outlook</p>
                <p className="mt-1 text-2xl font-semibold">Sydney ready</p>
              </div>
              <div className="rounded-full bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-300">
                On track
              </div>
            </div>

            <div className="space-y-4">
              {progressItems.map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg bg-white/[0.05] p-4"
                >
                  <div className="mb-3 flex items-center justify-between text-sm">
                    <span className="text-slate-300">{item.label}</span>
                    <span className="font-semibold text-white">
                      {item.value}
                    </span>
                  </div>

                  <div className="h-2 rounded-full bg-white/10">
                    <div
                      className={`h-2 rounded-full bg-gradient-to-r from-cyan-300 to-violet-400 ${item.widthClass}`}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-lg border border-cyan-300/20 bg-cyan-300/10 p-4">
              <p className="text-sm font-semibold text-cyan-100">
                AI suggestion
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Your transport spend is trending high. Switch two weekly rides
                to off-peak trips and keep $42 for groceries.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
            Premium toolkit
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Everything students need to land, learn, and live with confidence.
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {features.map((feature) => {
            const route =
              feature.title === "Budget Planner"
                ? "/budget"
                : feature.title === "AI Student Assistant"
                ? "/chat"
                : null;

            const card = (
              <article className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.06] p-6 shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-2 hover:border-cyan-300/40 hover:bg-white/[0.09] cursor-pointer">
                <div
                  className={`mb-8 h-12 w-12 rounded-lg bg-gradient-to-br ${feature.accent} p-[1px] shadow-lg transition group-hover:scale-110`}
                >
                  <div className="h-full w-full rounded-lg bg-[#07111f]/80" />
                </div>

                <h3 className="text-xl font-semibold text-white">
                  {feature.title}
                </h3>

                <p className="mt-4 text-sm leading-6 text-slate-300">
                  {feature.description}
                </p>

                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-cyan-300 via-violet-400 to-emerald-300 opacity-0 transition group-hover:opacity-100" />
              </article>
            );

            return route ? (
              <Link key={feature.title} href={route}>
                {card}
              </Link>
            ) : (
              <div key={feature.title}>
                {card}
              </div>
            );
          })}

        </div>
      </section>
    </main>
  );
}
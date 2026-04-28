"use client";

import { useMemo, useState } from "react";

const deadlines = [
  {
    id: "microwave-lab",
    title: "Microwave Lab Report",
    course: "Microwave Engineering",
    due: "Tomorrow",
    priority: "high",
    progress: 72,
  },
  {
    id: "network-quiz",
    title: "Network Security Quiz",
    course: "Cyber Systems",
    due: "Fri",
    priority: "medium",
    progress: 45,
  },
  {
    id: "data-brief",
    title: "Data Analytics Brief",
    course: "Business Analytics",
    due: "Mon",
    priority: "medium",
    progress: 58,
  },
  {
    id: "reflection",
    title: "Weekly Reflection",
    course: "Academic Skills",
    due: "Next Wed",
    priority: "low",
    progress: 24,
  },
];

const weeklyPlan = [
  { day: "Mon", focus: "Readings", hours: "2.5h", active: true },
  { day: "Tue", focus: "Lab notes", hours: "3h", active: true },
  { day: "Wed", focus: "Quiz prep", hours: "2h", active: false },
  { day: "Thu", focus: "Draft report", hours: "3.5h", active: true },
  { day: "Fri", focus: "Review", hours: "1.5h", active: false },
];

const suggestedPrompts = [
  "Summarize my lecture notes into key exam points",
  "Explain difficult concepts with simple examples",
  "Generate quiz questions for Unit 3",
  "Create a revision plan for this weekend",
];

const productivityBars = [
  { label: "Deep Work", value: "82%", width: "w-[82%]" },
  { label: "Revision", value: "68%", width: "w-[68%]" },
  { label: "Assignments", value: "74%", width: "w-[74%]" },
];

const revisionTopics = [
  "Waveguides and propagation modes",
  "Microwave network parameters",
  "Impedance matching techniques",
  "Smith chart applications",
];

const vivaQuestions = [
  "Why are waveguides preferred at microwave frequencies?",
  "How do S-parameters describe a microwave network?",
  "What happens when impedance matching is poor?",
];

const practiceQuiz = [
  "Calculate guide wavelength for a rectangular waveguide.",
  "Identify dominant mode for TE propagation.",
  "Compare lumped and distributed circuit behavior.",
];

function Logo() {
  return (
    <a href="/" className="flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-300/30 bg-cyan-300/10 shadow-[0_0_40px_rgba(34,211,238,0.18)]">
        <span className="h-4 w-4 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(103,232,249,0.95)]" />
      </span>
      <span className="text-lg font-semibold tracking-wide">Atlas AI</span>
    </a>
  );
}

function PriorityBadge({ priority }) {
  const styles = {
    high: "border-rose-300/30 bg-rose-400/10 text-rose-200",
    medium: "border-amber-300/30 bg-amber-400/10 text-amber-200",
    low: "border-emerald-300/30 bg-emerald-400/10 text-emerald-200",
  };

  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs font-semibold capitalize ${styles[priority]}`}
    >
      {priority}
    </span>
  );
}

function StatCard({ label, value, tone = "cyan", onClick }) {
  const toneClass =
    tone === "emerald"
      ? "text-emerald-300"
      : tone === "violet"
        ? "text-violet-200"
        : "text-cyan-200";

  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-lg border border-white/10 bg-white/[0.06] p-5 text-left shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/[0.09]"
    >
      <p className="text-sm text-slate-400">{label}</p>
      <p className={`mt-3 text-3xl font-bold tracking-tight ${toneClass}`}>
        {value}
      </p>
    </button>
  );
}

function ProgressBar({ width }) {
  return (
    <div className="h-2 overflow-hidden rounded-full bg-white/10">
      <div
        className={`h-full rounded-full bg-gradient-to-r from-cyan-300 to-violet-400 shadow-[0_0_24px_rgba(103,232,249,0.25)] ${width}`}
      />
    </div>
  );
}

function AssignmentCard({ item, selected, onSelect }) {
  const widthClass =
    item.progress >= 70
      ? "w-[72%]"
      : item.progress >= 55
        ? "w-[58%]"
        : item.progress >= 40
          ? "w-[45%]"
          : "w-[24%]";

  return (
    <button
      type="button"
      onClick={() => onSelect(item.id)}
      className={`w-full rounded-lg border p-4 text-left transition hover:-translate-y-1 hover:border-cyan-300/40 ${
        selected
          ? "border-cyan-300/50 bg-cyan-300/10"
          : "border-white/10 bg-white/[0.05]"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold text-white">{item.title}</h3>
          <p className="mt-1 text-sm text-slate-400">{item.course}</p>
        </div>
        <PriorityBadge priority={item.priority} />
      </div>
      <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
        <span>Due {item.due}</span>
        <span>{item.progress}% complete</span>
      </div>
      <div className="mt-3">
        <ProgressBar width={widthClass} />
      </div>
    </button>
  );
}

function ModuleShell({ eyebrow, title, children }) {
  return (
    <section className="rounded-lg border border-white/10 bg-[#08111f]/90 p-5 shadow-2xl shadow-black/30 backdrop-blur-2xl">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-2xl font-bold tracking-tight">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function PromptChip({ prompt, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(prompt)}
      className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-300/40 hover:bg-cyan-300/10 hover:text-white"
    >
      {prompt}
    </button>
  );
}

function AnalyticsWidget({ title, value, copy }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.05] p-4 transition hover:border-cyan-300/30 hover:bg-white/[0.08]">
      <p className="text-sm text-slate-400">{title}</p>
      <p className="mt-2 text-2xl font-bold text-white">{value}</p>
      <p className="mt-2 text-sm leading-6 text-slate-400">{copy}</p>
    </div>
  );
}

function PrepCard({ title, items }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.05] p-4 transition hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-cyan-300/10">
      <h3 className="font-semibold text-white">{title}</h3>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div key={item} className="flex gap-3 text-sm leading-6 text-slate-300">
            <span className="mt-2 h-2 w-2 rounded-full bg-cyan-300" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function StudyHelperPage() {
  const [selectedAssignment, setSelectedAssignment] = useState("microwave-lab");
  const [studyPrompt, setStudyPrompt] = useState(
    "Summarize notes for Microwave Engineering Unit 3",
  );
  const [examUnit, setExamUnit] = useState("Microwave Engineering Unit 3");
  const [planGenerated, setPlanGenerated] = useState(false);
  const [focusStarted, setFocusStarted] = useState(false);

  const assignmentProgress = useMemo(() => {
    const total = deadlines.reduce((sum, item) => sum + item.progress, 0);
    return Math.round(total / deadlines.length);
  }, []);

  const selected = deadlines.find((item) => item.id === selectedAssignment);

  return (
    <main className="min-h-screen bg-[#05070f] bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:64px_64px] px-6 py-8 text-white lg:px-8">
      <div className="mx-auto max-w-7xl">
        <nav className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Logo />
          <div className="flex gap-3">
            <a href="/chat" className="rounded-full border border-white/15 bg-white/10 px-5 py-2 text-sm font-semibold text-white transition hover:border-cyan-300/60 hover:bg-cyan-300/10">
              Chat Assistant
            </a>
            <a href="/" className="rounded-full border border-white/15 bg-white/10 px-5 py-2 text-sm font-semibold text-white transition hover:border-cyan-300/60 hover:bg-cyan-300/10">
              Home
            </a>
          </div>
        </nav>

        <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
              Study Helper
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              AI productivity workspace for serious student momentum.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Plan assignments, generate study support, track focus, and turn exam prep into a guided workflow.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <StatCard label="Tasks Due" value="4" onClick={() => setSelectedAssignment("microwave-lab")} />
            <StatCard label="Focus Score" value="82%" tone="emerald" onClick={() => setFocusStarted(true)} />
            <StatCard label="Revision Streak" value="7 Days" tone="violet" onClick={() => setPlanGenerated(true)} />
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <ModuleShell eyebrow="Module 1" title="Assignment Planner">
            <div className="grid gap-6 xl:grid-cols-[1fr_0.85fr]">
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold text-white">Upcoming Deadlines</h3>
                  <span className="rounded-full bg-rose-400/10 px-3 py-1 text-xs font-semibold text-rose-200">
                    2 priority alerts
                  </span>
                </div>
                <div className="space-y-3">
                  {deadlines.map((item) => (
                    <AssignmentCard key={item.id} item={item} selected={selectedAssignment === item.id} onSelect={setSelectedAssignment} />
                  ))}
                </div>
              </div>

              <div className="space-y-5">
                <div className="rounded-lg border border-white/10 bg-white/[0.05] p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-white">Weekly Study Planner</h3>
                    <span className="rounded-full bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-200">
                      This week
                    </span>
                  </div>
                  <div className="mt-4 grid gap-3">
                    {weeklyPlan.map((item) => (
                      <button
                        key={item.day}
                        type="button"
                        className={`flex items-center justify-between rounded-lg border p-3 text-left transition hover:border-cyan-300/40 ${
                          item.active ? "border-cyan-300/30 bg-cyan-300/10" : "border-white/10 bg-white/[0.04]"
                        }`}
                      >
                        <span>
                          <span className="font-semibold text-white">{item.day}</span>
                          <span className="ml-3 text-sm text-slate-400">{item.focus}</span>
                        </span>
                        <span className="text-sm font-semibold text-cyan-200">{item.hours}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg border border-cyan-300/20 bg-cyan-300/10 p-4">
                  <p className="text-sm font-semibold text-cyan-100">Upcoming Submissions Board</p>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    Selected: {selected ? selected.title : "Microwave Lab Report"}. Atlas recommends completing the outline, evidence, and final edit in separate sessions.
                  </p>
                </div>

                <div className="rounded-lg border border-white/10 bg-white/[0.05] p-4">
                  <div className="mb-3 flex justify-between text-sm">
                    <span className="text-slate-300">Assignment progress</span>
                    <span className="font-semibold text-white">{assignmentProgress}%</span>
                  </div>
                  <ProgressBar width="w-[50%]" />
                </div>
              </div>
            </div>
          </ModuleShell>

          <ModuleShell eyebrow="Module 2" title="AI Study Assistant">
            <div className="rounded-lg border border-white/10 bg-white/[0.05] p-4">
              <label className="text-sm font-semibold text-white">Ask Atlas Study AI</label>
              <textarea
                value={studyPrompt}
                onChange={(event) => setStudyPrompt(event.target.value)}
                rows={5}
                className="mt-3 w-full resize-none rounded-lg border border-white/10 bg-[#05070f] px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/20"
                placeholder="Summarize notes, explain concepts, or generate quiz questions..."
              />
              <div className="mt-4 flex flex-wrap gap-2">
                {suggestedPrompts.map((prompt) => (
                  <PromptChip key={prompt} prompt={prompt} onSelect={setStudyPrompt} />
                ))}
              </div>
              <button
                type="button"
                onClick={() => setPlanGenerated(true)}
                className="mt-5 rounded-full bg-cyan-300 px-6 py-3 text-sm font-bold text-slate-950 shadow-[0_0_35px_rgba(103,232,249,0.28)] transition hover:-translate-y-1 hover:bg-cyan-200"
              >
                Generate Study Plan
              </button>
            </div>
          </ModuleShell>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <ModuleShell eyebrow="Module 3" title="Smart Study Dashboard">
            <div className="grid gap-4 sm:grid-cols-3">
              <AnalyticsWidget title="Best focus block" value="9:00 PM" copy="Your strongest study consistency is after dinner." />
              <AnalyticsWidget title="Weekly output" value="14.5h" copy="Four focused blocks are already logged." />
              <AnalyticsWidget title="Readiness lift" value="+18%" copy="Quiz practice is improving confidence." />
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_0.85fr]">
              <div className="rounded-lg border border-white/10 bg-white/[0.05] p-4">
                <h3 className="font-semibold text-white">Productivity Progress</h3>
                <div className="mt-5 space-y-4">
                  {productivityBars.map((item) => (
                    <div key={item.label}>
                      <div className="mb-2 flex justify-between text-sm">
                        <span className="text-slate-300">{item.label}</span>
                        <span className="font-semibold text-white">{item.value}</span>
                      </div>
                      <ProgressBar width={item.width} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-emerald-300/20 bg-emerald-400/10 p-4">
                <p className="text-sm font-semibold text-emerald-200">Focus Timer</p>
                <p className="mt-4 text-5xl font-bold tracking-tight text-white">25:00</p>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  Pomodoro-style sprint for revision, lab writing, or quiz prep.
                </p>
                <button
                  type="button"
                  onClick={() => setFocusStarted(true)}
                  className="mt-5 rounded-full bg-emerald-300 px-6 py-3 text-sm font-bold text-slate-950 transition hover:-translate-y-1 hover:bg-emerald-200"
                >
                  Start Focus Session
                </button>
              </div>
            </div>

            {(planGenerated || focusStarted) && (
              <div className="mt-6 rounded-lg border border-cyan-300/20 bg-cyan-300/10 p-4">
                <p className="text-sm font-semibold text-cyan-100">Live Study Signal</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {focusStarted
                    ? "Focus session armed. Put your phone away and work on the selected assignment first."
                    : "Study plan generated. Atlas recommends two deep work sessions and one quiz review today."}
                </p>
              </div>
            )}
          </ModuleShell>

          <ModuleShell eyebrow="Module 4" title="Exam Prep Generator">
            <div className="rounded-lg border border-white/10 bg-white/[0.05] p-4">
              <label className="text-sm font-semibold text-white">Unit or topic</label>
              <input
                value={examUnit}
                onChange={(event) => setExamUnit(event.target.value)}
                className="mt-3 w-full rounded-lg border border-white/10 bg-[#05070f] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/20"
                placeholder="Microwave Engineering Unit 3"
              />
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <PrepCard title="Revision Topics" items={revisionTopics} />
              <PrepCard title="Possible Viva Questions" items={vivaQuestions} />
              <PrepCard title="Practice Quiz" items={practiceQuiz} />
              <div className="rounded-lg border border-violet-300/20 bg-violet-400/10 p-4">
                <h3 className="font-semibold text-white">Exam Readiness Score</h3>
                <p className="mt-4 text-5xl font-bold tracking-tight text-violet-100">78%</p>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  For {examUnit || "Microwave Engineering Unit 3"}, improve readiness by practicing viva answers and formulas.
                </p>
                <div className="mt-4">
                  <ProgressBar width="w-[78%]" />
                </div>
              </div>
            </div>
          </ModuleShell>
        </section>
      </div>
    </main>
  );
}

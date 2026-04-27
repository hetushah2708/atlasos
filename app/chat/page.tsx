"use client";

import { FormEvent, useState } from "react";

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
  time: string;
};

const suggestedPrompts = [
  "How much does student housing cost in Sydney?",
  "How do I get a TFN?",
  "How to balance part-time work and study?",
];

const sampleMessages: Message[] = [
  {
    id: 1,
    role: "assistant",
    content:
      "Hi, I am Atlas AI. Ask me about budgeting, study planning, Sydney setup, student admin, or the first few weeks after arrival.",
    time: "09:30",
  },
  {
    id: 2,
    role: "user",
    content: "I am arriving in Sydney next month. What should I organise first?",
    time: "09:31",
  },
  {
    id: 3,
    role: "assistant",
    content:
      "Start with accommodation, airport transfer, a local SIM, Opal card, bank account, and university enrolment checks. After that, apply for a TFN if you plan to work part-time.",
    time: "09:31",
  },
];

function getAssistantReply(prompt: string) {
  const lowerPrompt = prompt.toLowerCase();

  if (lowerPrompt.includes("housing") || lowerPrompt.includes("rent")) {
    return "Student housing in Sydney varies by suburb and room type. Shared rooms are usually the lowest-cost option, while studios and city-adjacent rooms cost more. Budget for rent, bond, utilities, transport, and basic setup costs before signing anything.";
  }

  if (lowerPrompt.includes("tfn")) {
    return "You can apply for a Tax File Number online through the Australian Taxation Office after you arrive in Australia. You will usually need your passport details, Australian address, and visa information.";
  }

  if (lowerPrompt.includes("work") || lowerPrompt.includes("study")) {
    return "A strong rhythm is to block fixed study hours first, then place work shifts around lectures, commute time, and assessment deadlines. Keep at least one recovery window each week so your schedule stays realistic.";
  }

  return "I can help you turn that into a practical student plan. Share your suburb, course load, weekly income, or arrival date and I will map the next steps clearly.";
}

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

function PromptButton({
  prompt,
  onSelect,
}: {
  prompt: string;
  onSelect: (prompt: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(prompt)}
      className="w-full rounded-lg border border-white/10 bg-white/[0.05] p-4 text-left text-sm leading-6 text-slate-300 transition hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-cyan-300/10 hover:text-white"
    >
      {prompt}
    </button>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[88%] rounded-lg border p-4 shadow-xl shadow-black/20 sm:max-w-[75%] ${
          isUser
            ? "border-cyan-300/30 bg-cyan-300 text-slate-950"
            : "border-white/10 bg-white/[0.06] text-slate-100"
        }`}
      >
        <div className="mb-2 flex items-center justify-between gap-4">
          <span
            className={`text-xs font-semibold uppercase tracking-[0.18em] ${
              isUser ? "text-slate-800" : "text-cyan-200"
            }`}
          >
            {isUser ? "You" : "Atlas"}
          </span>
          <span
            className={
              isUser ? "text-xs text-slate-700" : "text-xs text-slate-500"
            }
          >
            {message.time}
          </span>
        </div>
        <p className="text-sm leading-6">{message.content}</p>
      </div>
    </div>
  );
}

function ChatInput({
  value,
  onChange,
  onSubmit,
}: {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 border-t border-white/10 bg-[#08111f]/95 p-4 sm:flex-row"
    >
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-12 flex-1 rounded-lg border border-white/10 bg-[#05070f] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/20"
        placeholder="Ask Atlas AI about student life in Sydney..."
      />
      <button
        type="submit"
        className="rounded-full bg-cyan-300 px-7 py-3 text-sm font-bold text-slate-950 shadow-[0_0_35px_rgba(103,232,249,0.28)] transition hover:-translate-y-1 hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={!value.trim()}
      >
        Send
      </button>
    </form>
  );
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [draft, setDraft] = useState("");

  function handleSend() {
    const content = draft.trim();

    if (!content) {
      return;
    }

    const now = new Date();
    const time = now.toLocaleTimeString("en-AU", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content,
      time,
    };

    const assistantMessage: Message = {
      id: Date.now() + 1,
      role: "assistant",
      content: getAssistantReply(content),
      time,
    };

    setMessages((current) => [...current, userMessage, assistantMessage]);
    setDraft("");
  }

  return (
    <main className="min-h-screen bg-[#05070f] bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:64px_64px] px-6 py-8 text-white lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl flex-col">
        <nav className="mb-8 flex items-center justify-between">
          <Logo />
          <a
            href="/"
            className="rounded-full border border-white/15 bg-white/10 px-5 py-2 text-sm font-semibold text-white transition hover:border-cyan-300/60 hover:bg-cyan-300/10"
          >
            Home
          </a>
        </nav>

        <section className="grid flex-1 gap-6 lg:grid-cols-[360px_1fr]">
          <aside className="rounded-lg border border-white/10 bg-[#08111f]/90 p-5 shadow-2xl shadow-black/30 backdrop-blur-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
              AI Student Assistant
            </p>
            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight">
              Ask before the admin spiral starts.
            </h1>
            <p className="mt-4 text-sm leading-6 text-slate-300">
              Get calm guidance for budgeting, Sydney setup, student paperwork,
              study routines, and part-time work planning.
            </p>

            <div className="mt-8">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-white">
                  Suggested prompts
                </h2>
                <span className="rounded-full bg-violet-400/10 px-3 py-1 text-xs font-semibold text-violet-200">
                  Ready
                </span>
              </div>

              <div className="space-y-3">
                {suggestedPrompts.map((prompt) => (
                  <PromptButton
                    key={prompt}
                    prompt={prompt}
                    onSelect={setDraft}
                  />
                ))}
              </div>
            </div>
          </aside>

          <section className="flex min-h-[640px] flex-col overflow-hidden rounded-lg border border-white/10 bg-[#08111f]/90 shadow-2xl shadow-black/30 backdrop-blur-2xl">
            <div className="flex items-center justify-between border-b border-white/10 p-5">
              <div>
                <p className="text-sm text-slate-400">Conversation</p>
                <h2 className="mt-1 text-xl font-semibold">Atlas Assistant</h2>
              </div>
              <div className="rounded-full bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-300">
                Online
              </div>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto p-5">
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
            </div>

            <ChatInput
              value={draft}
              onChange={setDraft}
              onSubmit={handleSend}
            />
          </section>
        </section>
      </div>
    </main>
  );
}

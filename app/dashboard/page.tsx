"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function DashboardPage() {
  const [user, setUser] = useState<any>({
name:"Student"
});
  const [arrivalProgress, setArrivalProgress] = useState(63);
  const [focusScore, setFocusScore] = useState(82);
  const [budgetBuffer, setBudgetBuffer] = useState(595);
  const [budgetHealth, setBudgetHealth] = useState("Stable");
  const [riskLevel, setRiskLevel] = useState("Low");
  const [studyStreak, setStudyStreak] = useState(4);
  const [recommendations,setRecommendations] = useState([
 "Finish bank setup this week",
 "Maintain your study momentum",
 "Review monthly savings plan"
]);
const [readinessScore,setReadinessScore] = useState(72);
const [readinessStatus,setReadinessStatus] = useState("On Track");

  const [suggestion, setSuggestion] = useState(
    "Finish TFN and bank setup to reach 85% readiness."
  );

  const [tasks, setTasks] = useState([
    "Apply TFN",
    "Open Bank Account",
    "Review Weekly Budget",
  ]);

  const updateReadinessScore = (
arrival:number,
focus:number,
budget:number
) => {

const budgetScore =
budget >=3000
?100
:budget>=1500
?75
:50;

const score=Math.round(
arrival*0.4 +
focus*0.3 +
budgetScore*0.3
);

setReadinessScore(score);

if(score>=85){
 setReadinessStatus("Nearly Ready");
}
else if(score>=70){
 setReadinessStatus("On Track");
}
else{
 setReadinessStatus("Settling In");
}

};

  useEffect(() => {
    const loadProfile = async () => {

const {
data:{user:authUser}
}=await supabase.auth.getUser();

if(!authUser) return;

const {data,error}=await supabase
.from("profiles")
.select("*")
.eq("id",authUser.id)
.single();

if(!error && data){

setUser((prev:any)=>({
...prev,
name:data.full_name || "Student"
}));

}

};

loadProfile();
    const savedUser = localStorage.getItem("atlasUser");

    if (savedUser) {
  const parsedUser = JSON.parse(savedUser);

  setUser(parsedUser);

  const budget = Number(
    parsedUser.budget || budgetBuffer
  );

  setBudgetBuffer(budget);

  if (budget >= 3000) {
    setBudgetHealth("Strong");
    setRiskLevel("Low");
    if(budget>=3000){
 setRecommendations(prev=>[
   ...prev.slice(0,2),
   "Strong buffer — consider saving 20%"
 ]);
}

if(budget<1500){
 setRecommendations(prev=>[
   ...prev.slice(0,2),
   "Reduce monthly expenses this week"
 ]);
}
  }
  else if (budget >= 1500) {
    setBudgetHealth("Stable");
    setRiskLevel("Medium");
  }
  else{
    setBudgetHealth("Tight");
    setRiskLevel("High");
  }
}

    // ARRIVAL MODULE
    const arrival = localStorage.getItem("arrivalChecklist");

    if (arrival) {

 const parsed = JSON.parse(arrival);

 const values = Object.values(parsed);

 const completed =
 values.filter(Boolean).length;

 const total = values.length || 1;

 const percent = Math.round(
  (completed/total)*100
 );

 setArrivalProgress(percent);
 updateReadinessScore(
 percent,
 focusScore,
 Number(user?.budget || budgetBuffer)
);

 const pending=[];

 if(!parsed["tfn"]){
   pending.push("Apply TFN");
 }

 if(!parsed["bank"]){
   pending.push("Open Bank Account");
 }

 if(!parsed["sim"]){
   pending.push("Get SIM");
 }

 if(pending.length){
   setTasks(pending);

   setSuggestion(
    `You still need ${pending.slice(0,2).join(" and ")}`
   );
   setRecommendations([
 `Complete ${pending[0]} first`,
 "Prioritize essential admin tasks",
 "Finish setup to improve readiness score"
]);
 }

}

    // STUDY MODULE
    const study = localStorage.getItem("atlasStudy");

    if (study) {
      const parsed = JSON.parse(study);

      if(parsed.focusScore){
 setFocusScore(parsed.focusScore);

 if(parsed.focusScore>=85){
   setStudyStreak(7);
 }
 else if(parsed.focusScore>=70){
   setStudyStreak(4);
 }
 else{
   setStudyStreak(2);
 }
}
    }
  }, []);

  const cards = [
    {
      title: "Budget Planner",
      href: "/budget",
      desc: "Track expenses and savings.",
    },
    {
      title: "AI Student Assistant",
      href: "/chat",
      desc: "Ask Atlas for guidance.",
    },
    {
      title: "Arrival Checklist",
      href: "/arrival",
      desc: "Complete Sydney setup tasks.",
    },
    {
      title: "Study Helper",
      href: "/study",
      desc: "Manage assignments and revision.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#05070f] text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">

        <nav className="flex justify-between items-center mb-10">
          <Link href="/" className="text-2xl font-bold">
            Atlas AI
          </Link>

          <div className="flex gap-4">
            <Link
              href="/chat"
              className="px-5 py-2 rounded-full bg-white/10"
            >
              Chat
            </Link>

            <Link
              href="/"
              className="px-5 py-2 rounded-full bg-white/10"
            >
              Home
            </Link>
          </div>
        </nav>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-8 mb-8">
          <p className="text-cyan-300 text-sm uppercase tracking-[0.2em]">
            Student Dashboard
          </p>

          <h1 className="text-5xl font-bold mt-4">
            Welcome {user?.name || "Student"}
          </h1>

          <p className="mt-4 text-slate-300">
            Your personalized international student command center.
          </p>
          <div className="mt-6 rounded-2xl bg-cyan-300/10 p-5 border border-cyan-300/20">

<p className="text-cyan-300 text-sm uppercase">
Atlas Readiness Score
</p>

<div className="flex items-end gap-4 mt-3">

<h2 className="text-5xl font-bold">
{readinessScore}
</h2>

<span className="text-xl mb-2">
/100
</span>

<span className="ml-auto px-4 py-2 rounded-full bg-white/10">
{readinessStatus}
</span>

</div>

<div className="mt-4 h-3 bg-white/10 rounded-full">
<div
className="h-3 rounded-full bg-cyan-300"
style={{
width:`${readinessScore}%`
}}
/>
</div>

</div>

          <div className="grid md:grid-cols-3 gap-5 mt-8">
            <div className="rounded-2xl bg-cyan-400/10 p-6">
              <p>Sydney Readiness</p>
              <h2 className="text-3xl font-bold mt-2">
                {arrivalProgress}%
              </h2>
            </div>

            <div className="rounded-2xl bg-emerald-400/10 p-6">
              <p>Budget Buffer</p>
              <h2 className="text-3xl font-bold mt-2">
                ${user?.budget || budgetBuffer}
              </h2>
            </div>

            <div className="rounded-2xl bg-violet-400/10 p-6">
              <p>Focus Score</p>
              <h2 className="text-3xl font-bold mt-2">
                {focusScore}%
              </h2>
            </div>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-6 mb-8">

<div className="rounded-3xl border border-white/10 bg-white/5 p-6">
<p className="text-cyan-300 text-sm uppercase">
Atlas Insight
</p>

<h3 className="text-2xl font-semibold mt-3">
Next Priority
</h3>

<p className="mt-4 text-slate-300">
{tasks[0] || "Stay on track"}
</p>
</div>


<div className="rounded-3xl border border-white/10 bg-white/5 p-6">
<p className="text-cyan-300 text-sm uppercase">
Budget Health
</p>

<h3 className="text-2xl font-semibold mt-3">
{budgetHealth}
</h3>

<p className="mt-4 text-slate-300">
Risk Level: {riskLevel}
</p>
</div>


<div className="rounded-3xl border border-white/10 bg-white/5 p-6">
<p className="text-cyan-300 text-sm uppercase">
Study Streak
</p>

<h3 className="text-2xl font-semibold mt-3">
{studyStreak} Days
</h3>

<p className="mt-4 text-slate-300">
Momentum building
</p>
</div>

</section>

        <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {cards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:-translate-y-2 transition"
            >
              <h3 className="text-2xl font-semibold">
                {card.title}
              </h3>

              <p className="mt-4 text-slate-300">
                {card.desc}
              </p>

              <p className="mt-6 text-cyan-300 font-semibold">
                Open Module →
              </p>
            </Link>
          ))}
        </section>
        <section className="rounded-3xl border border-white/10 bg-white/5 p-8 mb-8">

<p className="text-cyan-300 text-sm uppercase tracking-[0.2em]">
Atlas Recommendations
</p>

<h2 className="text-3xl font-bold mt-4">
Your Next Best Moves
</h2>

<div className="grid md:grid-cols-3 gap-5 mt-8">

{recommendations.map((item,index)=>(

<div
key={index}
className="rounded-2xl bg-white/5 p-6 border border-white/10"
>

<div className="text-cyan-300 mb-3">
0{index+1}
</div>

<p className="text-lg leading-relaxed">
{item}
</p>

</div>

))}

</div>

</section>

        <section className="grid lg:grid-cols-2 gap-6 mt-10">

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-semibold">
              AI Suggestions
            </h2>

            <div className="mt-6 rounded-2xl bg-cyan-300/10 p-5">
              {suggestion}
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <p>Arrival Setup {arrivalProgress}%</p>

                <div className="h-2 bg-white/10 rounded-full mt-2">
                  <div
                    className="h-2 rounded-full bg-cyan-300"
                    style={{ width: `${arrivalProgress}%` }}
                  />
                </div>
              </div>

              <div>
                <p>Study Momentum {focusScore}%</p>

                <div className="h-2 bg-white/10 rounded-full mt-2">
                  <div
                    className="h-2 rounded-full bg-violet-400"
                    style={{ width: `${focusScore}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-semibold">
              Upcoming Tasks
            </h2>

            <div className="space-y-4 mt-6">
              {tasks.map((task) => (
                <div
                  key={task}
                  className="p-4 rounded-2xl bg-white/5"
                >
                  {task}
                </div>
              ))}
            </div>
          </div>

        </section>

      </div>
    </main>
  );
}
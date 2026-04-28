"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

const steps = ["Personal Profile", "Arrival Setup", "Goals", "Complete"];

const goals = [
  "Save Money",
  "Find Part-Time Job",
  "Study Support",
  "Settle in Sydney",
];

const progressClasses = ["w-1/4", "w-1/2", "w-3/4", "w-full"];

function Logo() {
  return (
    <a href="/" className="flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-300/30 bg-cyan-300/10 shadow-[0_0_40px_rgba(34,211,238,0.18)]">
        <span className="h-4 w-4 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(103,232,249,0.95)]" />
      </span>
      <span className="text-lg font-semibold tracking-wide text-white">
        Atlas AI
      </span>
    </a>
  );
}

function TextInput(props) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-200">
        {props.label}
      </span>
      <input
        type={props.type || "text"}
        value={props.value}
        onChange={(e)=>props.onChange(e.target.value)}
        placeholder={props.placeholder}
        className="mt-3 w-full rounded-lg border border-white/10 bg-[#05070f] px-4 py-4 text-sm text-white outline-none transition placeholder:text-slate-600 hover:border-cyan-300/30 focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/20"
      />
    </label>
  );
}

function StepIndicator(props){
const active=props.currentStep>=props.index;

return(
<div className="flex items-center gap-3">
<span
className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm font-bold ${
active
? "border-cyan-300/50 bg-cyan-300 text-slate-950"
: "border-white/10 bg-white/[0.05] text-slate-500"
}`}
>
{props.index+1}
</span>

<span className={active?"text-white":"text-slate-500"}>
{props.label}
</span>
</div>
);
}

function GoalCard(props){
return(
<button
type="button"
onClick={props.onClick}
className={`rounded-lg border p-5 text-left transition hover:-translate-y-1 hover:border-cyan-300/50 ${
props.selected
? "border-cyan-300/50 bg-cyan-300/10"
: "border-white/10 bg-white/[0.05]"
}`}
>
<div className="flex items-center justify-between">
<h3 className="font-semibold text-white">
{props.goal}
</h3>

<span
className={`h-4 w-4 rounded-full border ${
props.selected
?"border-cyan-300 bg-cyan-300"
:"border-white/20"
}`}
/>
</div>

<p className="mt-3 text-sm text-slate-400">
Atlas AI will personalize recommendations around this goal.
</p>

</button>
);
}

export default function OnboardingPage(){

const [step,setStep]=useState(0);

const [profile,setProfile]=useState({
name:"",
country:"",
university:"",
course:"",
arrivalMonth:"",
accommodationSecured:false,
monthlyBudget:""
});

const [selectedGoals,setSelectedGoals]=useState([
"Save Money",
"Study Support"
]);

function updateProfile(field,value){
setProfile(current=>({
...current,
[field]:value
}));
}

function toggleGoal(goal){
setSelectedGoals(current=>
current.includes(goal)
?current.filter(item=>item!==goal)
:[...current,goal]
);
}

function goNext(){
setStep(current=>Math.min(current+1,steps.length-1));
}

function goBack(){
setStep(current=>Math.max(current-1,0));
}

return(
<main className="min-h-screen bg-[#05070f] bg-[size:64px_64px] px-6 py-8 text-white lg:px-8">

<div className="mx-auto max-w-7xl">

<nav className="mb-8 flex items-center justify-between">
<Logo/>

<a
href="/"
className="rounded-full border border-white/15 bg-white/10 px-5 py-2 text-sm font-semibold"
>
Home
</a>
</nav>


<section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">

<div>

<p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
Atlas onboarding
</p>

<h1 className="mt-4 text-5xl font-bold">
Build your Sydney student profile in minutes.
</h1>

<p className="mt-5 text-lg text-slate-300">
Atlas AI uses your profile and goals to personalize your student journey.
</p>

<div className="mt-8 rounded-lg border border-white/10 bg-white/[0.05] p-5">

<div className="mb-4 flex justify-between text-sm">
<span>
Step {step+1} of {steps.length}
</span>
<span className="text-cyan-200">
{steps[step]}
</span>
</div>

<div className="h-3 rounded-full bg-white/10">
<div
className={`h-full rounded-full bg-gradient-to-r from-cyan-300 via-violet-400 to-emerald-300 ${progressClasses[step]}`}
/>
</div>

<div className="mt-6 grid gap-4">
{steps.map((label,index)=>(
<StepIndicator
key={label}
label={label}
index={index}
currentStep={step}
/>
))}
</div>

</div>

</div>


<div className="rounded-lg border border-white/10 bg-[#08111f]/90 p-6">

{step===0 && (
<>
<p className="text-cyan-300 uppercase text-sm">
Personal Profile
</p>

<h2 className="mt-3 text-3xl font-bold">
Tell Atlas who you are.
</h2>

<div className="mt-6 grid gap-5 sm:grid-cols-2">
<TextInput
label="Name"
value={profile.name}
onChange={(v)=>updateProfile("name",v)}
/>

<TextInput
label="Country"
value={profile.country}
onChange={(v)=>updateProfile("country",v)}
/>

<TextInput
label="University"
value={profile.university}
onChange={(v)=>updateProfile("university",v)}
/>

<TextInput
label="Course"
value={profile.course}
onChange={(v)=>updateProfile("course",v)}
/>
</div>
</>
)}


{step===1 && (
<>
<p className="text-cyan-300 uppercase text-sm">
Arrival Setup
</p>

<h2 className="mt-3 text-3xl font-bold">
Prepare your first month.
</h2>

<div className="mt-6 grid gap-5">

<TextInput
label="Arrival Month"
value={profile.arrivalMonth}
onChange={(v)=>updateProfile("arrivalMonth",v)}
/>

<button
type="button"
onClick={()=>updateProfile(
"accommodationSecured",
!profile.accommodationSecured
)}
className="rounded-lg border border-white/10 bg-white/[0.05] p-5"
>
Accommodation Secured:
{" "}
{profile.accommodationSecured ? "Yes" : "No"}
</button>

<TextInput
label="Monthly Budget"
type="number"
value={profile.monthlyBudget}
onChange={(v)=>updateProfile("monthlyBudget",v)}
/>

</div>
</>
)}



{step===2 && (
<>
<p className="text-cyan-300 uppercase text-sm">
Goals Selection
</p>

<h2 className="mt-3 text-3xl font-bold">
Choose what matters most.
</h2>

<div className="mt-6 grid gap-4 sm:grid-cols-2">
{goals.map(goal=>(
<GoalCard
key={goal}
goal={goal}
selected={selectedGoals.includes(goal)}
onClick={()=>toggleGoal(goal)}
/>
))}
</div>
</>
)}



{step===3 && (
<div className="py-6 text-center">

<div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/10">
<span className="h-8 w-8 rounded-full bg-cyan-300"/>
</div>

<p className="mt-8 text-cyan-300 uppercase text-sm">
Profile complete
</p>

<h2 className="mt-4 text-4xl font-bold">
You are 42% Sydney Ready
</h2>

<p className="mt-4 text-slate-300">
Atlas has enough context to personalize your journey.
</p>

<button
onClick={async()=>{

try{

const {data:{user}}=await supabase.auth.getUser();

if(!user){
alert("Please login first");
window.location.href="/login";
return;
}

const {error}=await supabase
.from("profiles")
.upsert({
id:user.id,
full_name:profile.name,
university:profile.university,
country:profile.country
});

if(error){
alert("Database save failed");
return;
}

localStorage.setItem(
"atlasUser",
JSON.stringify({
name:profile.name,
university:profile.university,
budget:profile.monthlyBudget,
goals:selectedGoals
})
);

window.location.href="/dashboard";

}catch(e){
alert("Something went wrong");
}

}}
className="mt-8 inline-flex rounded-full bg-cyan-300 px-8 py-4 font-bold text-slate-950"
>
Continue To Dashboard
</button>

</div>
)}



<div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:justify-between">

<button
onClick={goBack}
disabled={step===0}
className="rounded-full border border-white/15 bg-white/10 px-6 py-3 disabled:opacity-40"
>
Back
</button>

{step<steps.length-1 && (
<button
onClick={goNext}
className="rounded-full bg-cyan-300 px-8 py-3 font-bold text-slate-950"
>
Continue
</button>
)}

</div>

</div>

</section>

</div>

</main>
);

}
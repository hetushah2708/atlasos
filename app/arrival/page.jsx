"use client";

import { useMemo, useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

const phases = [
{
id:"before",
title:"Before Flying",
description:"Lock down the essentials before the airport day arrives."
},
{
id:"week",
title:"First Week in Sydney",
description:"Handle the core setup tasks that make the city easier."
},
{
id:"month",
title:"First Month",
description:"Build a stable routine for work, study, health, and money."
}
];

const checklistItems = [
{
id:"passport-visa",
label:"Passport / Visa docs",
phase:"before",
urgent:true,
initialDone:true
},
{
id:"oshc",
label:"OSHC insurance",
phase:"before",
urgent:true,
initialDone:true
},
{
id:"accommodation",
label:"Accommodation booked",
phase:"before",
urgent:true,
initialDone:true
},
{
id:"airport-pickup",
label:"Airport pickup arranged",
phase:"before",
initialDone:true
},
{
id:"forex-card",
label:"Forex / bank card ready",
phase:"before",
initialDone:true
},
{
id:"sim-card",
label:"Get SIM card",
phase:"week",
initialDone:true
},
{
id:"opal-card",
label:"Buy Opal card",
phase:"week",
initialDone:true
},
{
id:"tfn",
label:"Apply for TFN",
phase:"week",
urgent:true
},
{
id:"bank-account",
label:"Open bank account",
phase:"week",
urgent:true
},
{
id:"university-enrolment",
label:"Complete university enrolment",
phase:"week",
urgent:true,
initialDone:true
},
{
id:"resume",
label:"Build part-time resume",
phase:"month"
},
{
id:"budget",
label:"Set up monthly budget",
phase:"month",
href:"/budget",
initialDone:true
},
{
id:"health",
label:"Medicare / health essentials",
phase:"month"
},
{
id:"discounts",
label:"Student discounts",
phase:"month"
},
{
id:"local-admin",
label:"Local admin setup",
phase:"month"
}
];

const progressWidths = [
"w-0",
"w-[7%]",
"w-[13%]",
"w-1/5",
"w-[27%]",
"w-1/3",
"w-2/5",
"w-[47%]",
"w-[53%]",
"w-3/5",
"w-2/3",
"w-[73%]",
"w-4/5",
"w-[87%]",
"w-[93%]",
"w-full"
];

function Logo(){
return(
<a href="/" className="flex items-center gap-3">
<span className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-300/30 bg-cyan-300/10 shadow-[0_0_40px_rgba(34,211,238,0.18)]">
<span className="h-4 w-4 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(103,232,249,0.95)]"/>
</span>
<span className="text-lg font-semibold tracking-wide">
Atlas AI
</span>
</a>
)
}

function StatCard({label,value,tone="cyan"}){

const toneClass=
tone==="emerald"
?"text-emerald-300"
:tone==="amber"
?"text-amber-300"
:"text-cyan-200";

return(
<div className="rounded-lg border border-white/10 bg-white/[0.06] p-5 shadow-xl shadow-black/20">
<p className="text-sm text-slate-400">
{label}
</p>

<p className={`mt-3 text-3xl font-bold ${toneClass}`}>
{value}
</p>
</div>
)
}

function ProgressTracker({completed,total,percent}){
return(
<div className="rounded-lg border border-white/10 bg-[#08111f]/90 p-5">
<div className="flex justify-between items-end">
<div>
<p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
Progress Tracker
</p>

<h2 className="mt-3 text-3xl font-bold">
{percent}% settled
</h2>
</div>

<p className="text-sm text-slate-400">
{completed} of {total} onboarding tasks completed
</p>
</div>

<div className="mt-6 h-3 rounded-full bg-white/10 overflow-hidden">
<div className={`h-full bg-gradient-to-r from-cyan-300 via-violet-400 to-emerald-300 ${progressWidths[completed]}`}/>
</div>
</div>
)
}

function ChecklistTask({item,checked,onToggle}){
return(
<div className="group flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-3">
<input
type="checkbox"
checked={checked}
onChange={()=>onToggle(item.id)}
className="h-5 w-5 accent-cyan-300"
/>

<label
className={`flex-1 text-sm font-medium ${
checked
?"text-slate-500 line-through"
:"text-slate-100"
}`}
>
{item.label}
</label>

{item.href && (
<a
href={item.href}
className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs"
>
Open
</a>
)}
</div>
)
}

function PhaseCard({phase,items,checkedMap,onToggle}){

const completed=
items.filter(item=>checkedMap[item.id]).length;

return(
<article className="rounded-lg border border-white/10 bg-[#08111f]/90 p-5">
<div className="mb-5 flex justify-between">
<div>
<h2 className="text-xl font-semibold">
{phase.title}
</h2>

<p className="mt-2 text-sm text-slate-400">
{phase.description}
</p>
</div>

<span className="rounded-full bg-white/[0.06] px-3 py-1 text-xs text-cyan-200">
{completed}/{items.length}
</span>

</div>

<div className="space-y-3">
{items.map(item=>(
<ChecklistTask
key={item.id}
item={item}
checked={checkedMap[item.id]}
onToggle={onToggle}
/>
))}
</div>

</article>
)
}

function AiSuggestions({pendingUrgent}){

const hasTfnAndBank=
pendingUrgent.some(i=>i.id==="tfn") &&
pendingUrgent.some(i=>i.id==="bank-account");

return(
<div className="rounded-lg border border-cyan-300/20 bg-cyan-300/10 p-5">
<p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-200">
AI Suggestions
</p>

<p className="mt-4 text-lg font-semibold">
{
hasTfnAndBank
?"You still need TFN and bank setup"
:pendingUrgent.length>0
?`Focus next on ${pendingUrgent[0].label}`
:"Your urgent setup tasks are complete"
}
</p>
</div>
)
}

function NextAction({item}){
return(
<div className="rounded-lg border border-white/10 bg-white/[0.06] p-5">
<p className="text-sm uppercase tracking-[0.25em] text-violet-200">
Next Recommended Action
</p>

<h2 className="mt-4 text-2xl font-bold">
{item?item.label:"You are settled"}
</h2>
</div>
)
}

export default function ArrivalChecklistPage(){

const defaultChecklistState=
checklistItems.reduce((map,item)=>{
map[item.id]=Boolean(item.initialDone);
return map;
},{});

const [checkedMap,setCheckedMap]=useState(
defaultChecklistState
);

useEffect(()=>{

const loadChecklist=async()=>{

const {
data:{user}
}=await supabase.auth.getUser();

if(user){

const {data}=await supabase
.from("arrival_progress")
.select("*")
.eq("user_id",user.id);

if(data && data.length){

const mergedChecklist={
...defaultChecklistState
};

data.forEach(item=>{
if(
Object.prototype.hasOwnProperty.call(
mergedChecklist,
item.task_id
)
){
mergedChecklist[item.task_id]=item.completed;
}
});

setCheckedMap(
mergedChecklist
);

localStorage.setItem(
"arrivalChecklist",
JSON.stringify(mergedChecklist)
);

return;
}

}

const savedChecklist=
localStorage.getItem("arrivalChecklist");

if(savedChecklist){
setCheckedMap(
JSON.parse(savedChecklist)
);
}

};

loadChecklist();

},[]);

const dashboard=useMemo(()=>{

const completed=
checklistItems.filter(
item=>checkedMap[item.id]
).length;

const pendingItems=
checklistItems.filter(
item=>!checkedMap[item.id]
);

const pendingUrgent=
pendingItems.filter(
item=>item.urgent
);

const nextAction=
pendingUrgent[0] || pendingItems[0];

const percent=Math.round(
(completed/checklistItems.length)*100
);

return{
completed,
pending:pendingItems.length,
urgent:pendingUrgent.length,
pendingUrgent,
nextAction,
percent
};

},[checkedMap]);

async function toggleTask(id){

const updated={
...checkedMap,
[id]:!checkedMap[id]
};

setCheckedMap(updated);

localStorage.setItem(
"arrivalChecklist",
JSON.stringify(updated)
);

const {
data:{user}
}=await supabase.auth.getUser();

if(user){

await supabase
.from("arrival_progress")
.upsert(
{
user_id:user.id,
task_id:id,
completed:updated[id]
},
{
onConflict:"user_id,task_id",
ignoreDuplicates:false
}
);

}

}

return(
<main className="min-h-screen bg-[#05070f] bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:64px_64px] px-6 py-8 text-white lg:px-8">

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

<section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
<div>
<p className="text-sm uppercase tracking-[0.25em] text-cyan-300">
Arrival Checklist
</p>

<h1 className="mt-4 text-5xl font-bold">
Your Sydney onboarding control center.
</h1>
</div>

<div className="grid gap-4 sm:grid-cols-3">
<StatCard label="Tasks Completed" value={dashboard.completed} tone="emerald"/>
<StatCard label="Pending" value={dashboard.pending}/>
<StatCard label="Urgent" value={dashboard.urgent} tone="amber"/>
</div>
</section>

<section className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
<ProgressTracker
completed={dashboard.completed}
total={checklistItems.length}
percent={dashboard.percent}
/>

<NextAction item={dashboard.nextAction}/>
</section>

<section className="mt-8 grid gap-6 lg:grid-cols-3">
{phases.map(phase=>(
<PhaseCard
key={phase.id}
phase={phase}
items={checklistItems.filter(
item=>item.phase===phase.id
)}
checkedMap={checkedMap}
onToggle={toggleTask}
/>
))}
</section>

<section className="mt-8">
<AiSuggestions
pendingUrgent={dashboard.pendingUrgent}
/>
</section>

</div>
</main>
)

}
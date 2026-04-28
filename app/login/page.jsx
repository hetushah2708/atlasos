"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "../../lib/supabase";

function Logo() {
  return (
    <a href="/" className="flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-300/30 bg-cyan-300/10">
        <span className="h-4 w-4 rounded-full bg-cyan-300"/>
      </span>
      <span className="text-lg font-semibold text-white">
        Atlas AI
      </span>
    </a>
  );
}

export default function LoginPage() {

const router=useRouter();

const [mode,setMode]=useState("login");

const [email,setEmail]=useState("");
const [password,setPassword]=useState("");

const [loading,setLoading]=useState(false);
const [message,setMessage]=useState("");



const handleAuth=async()=>{

if(!email || !password){
setMessage("Enter email and password");
return;
}

setLoading(true);
setMessage("");

try{

if(mode==="signup"){

const {error}=await supabase.auth.signUp({
email,
password
});

if(error){
setMessage(error.message);
setLoading(false);
return;
}

setMessage(
"Signup successful. Check email verification, then login."
);

}

else{

const {error}=await supabase.auth.signInWithPassword({
email,
password
});

if(error){
setMessage(error.message);
setLoading(false);
return;
}

router.push("/dashboard");

}

}catch(e){

setMessage("Authentication failed");

}

setLoading(false);

};



return(
<main className="min-h-screen bg-[#05070f] text-white px-6 py-8">

<div className="mx-auto max-w-7xl min-h-screen">

<nav className="mb-10 flex items-center justify-between">
<Logo/>

<a
href="/"
className="rounded-full border border-white/15 bg-white/10 px-5 py-2 text-sm font-semibold"
>
Home
</a>

</nav>



<section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] items-center">

<div>

<div className="mb-6 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm">
Sydney student onboarding starts here
</div>

<h1 className="text-5xl font-bold leading-tight">
Your AI Copilot for Student Life in Sydney
</h1>

<p className="mt-6 text-slate-300 text-lg">
Sign in to plan budgets, track arrival tasks and ask Atlas AI for support.
</p>

</div>



<div className="rounded-lg border border-white/10 bg-[#08111f]/90 p-6">

<div className="mb-6 flex rounded-full border border-white/10 bg-white/[0.04] p-1">

<button
onClick={()=>setMode("login")}
className={`flex-1 rounded-full px-4 py-2 ${
mode==="login"
?"bg-cyan-300 text-black"
:"text-slate-300"
}`}
>
Login
</button>

<button
onClick={()=>setMode("signup")}
className={`flex-1 rounded-full px-4 py-2 ${
mode==="signup"
?"bg-cyan-300 text-black"
:"text-slate-300"
}`}
>
Sign Up
</button>

</div>



<p className="text-cyan-300 uppercase text-sm">
{mode==="login"
?"Welcome back"
:"Create account"}
</p>

<h2 className="mt-3 text-3xl font-bold">
{mode==="login"
?"Continue your Atlas journey"
:"Start your student command center"}
</h2>



<div className="mt-6 space-y-5">

<div>
<label className="text-sm">
Email
</label>

<input
value={email}
onChange={(e)=>setEmail(e.target.value)}
type="email"
placeholder="you@student.edu"
className="mt-3 w-full rounded-lg border border-white/10 bg-[#05070f] px-4 py-4"
/>
</div>



<div>
<label className="text-sm">
Password
</label>

<input
value={password}
onChange={(e)=>setPassword(e.target.value)}
type="password"
placeholder="Enter password"
className="mt-3 w-full rounded-lg border border-white/10 bg-[#05070f] px-4 py-4"
/>
</div>

</div>



{message && (
<p className="mt-4 text-sm text-cyan-300">
{message}
</p>
)}



<button
onClick={handleAuth}
disabled={loading}
className="mt-6 w-full rounded-full bg-cyan-300 px-6 py-4 font-bold text-black"
>
{loading
?"Loading..."
:mode==="login"
?"Login"
:"Create Account"}
</button>

</div>

</section>

</div>

</main>
);

}
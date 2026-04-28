"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function AtlasCopilot(){

const pathname = usePathname();

const [open,setOpen]=useState(false);
const [minimized,setMinimized]=useState(false);

const [message,setMessage]=useState("");

const [suggestedPrompts,setSuggestedPrompts]=useState([
"Apply TFN",
"Budget Help",
"Study Plan"
]);

const [messages,setMessages]=useState([
{
role:"assistant",
content:"Hi — I'm Atlas Copilot. Ask me about budgeting, Sydney setup or study."
}
]);



useEffect(()=>{

if(pathname==="/budget"){
setSuggestedPrompts([
"Reduce rent costs",
"Weekly grocery budget",
"Save money tips"
]);
}

else if(pathname==="/arrival"){
setSuggestedPrompts([
"Apply TFN",
"Open bank account",
"Sydney setup help"
]);
}

else if(pathname==="/study"){
setSuggestedPrompts([
"Quiz me",
"Make revision plan",
"Focus strategy"
]);
}

else{
setSuggestedPrompts([
"Apply TFN",
"Budget Help",
"Study Plan"
]);
}

},[pathname]);



const sendMessage = async(customPrompt)=>{

const outgoing=customPrompt || message;

if(!outgoing.trim()) return;

const userMsg={
role:"user",
content:outgoing
};

setMessages(prev=>[
...prev,
userMsg
]);

setMessage("");

try{

const res=await fetch("/api/chat",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
message:outgoing
})
});

const data=await res.json();

setMessages(prev=>[
...prev,
{
role:"assistant",
content:data.reply || "No response"
}
]);

}catch{

setMessages(prev=>[
...prev,
{
role:"assistant",
content:"Atlas is temporarily unavailable."
}
]);

}

};



return(
<>

<button
onClick={()=>setOpen(!open)}
className="
fixed bottom-6 right-6 z-50
bg-cyan-400 text-black
font-semibold
px-5 py-3
rounded-full
shadow-xl
hover:scale-105
transition
"
>
{open ? "Close Atlas" : "💬 Ask Atlas"}
</button>



{open && (

<div
className={`
fixed
right-6
z-50
rounded-3xl
border border-white/10
bg-[#08111d]
shadow-2xl
flex flex-col
overflow-hidden
transition-all
${minimized
? "bottom-24 w-[320px] h-[90px]"
: "bottom-24 w-[390px] h-[560px]"
}
`}
>

<div className="p-4 border-b border-white/10 flex justify-between items-center">

<div>
<h3 className="font-semibold">
Atlas Copilot
</h3>

<p className="text-xs text-slate-400">
{pathname.replace("/","") || "dashboard"} assistant
</p>
</div>

<div className="flex gap-3">

<button
onClick={()=>setMinimized(!minimized)}
className="text-sm opacity-70 hover:opacity-100"
>
{minimized ? "⬆" : "—"}
</button>

<button
onClick={()=>setOpen(false)}
>
✕
</button>

</div>

</div>



{!minimized && (
<>

<div className="px-4 pt-4 flex flex-wrap gap-2">
{suggestedPrompts.map((prompt,index)=>(
<button
key={index}
onClick={()=>sendMessage(prompt)}
className="
text-xs
px-3 py-2
rounded-full
bg-white/5
border border-white/10
hover:bg-cyan-300/20
transition
"
>
{prompt}
</button>
))}
</div>



<div className="flex-1 overflow-y-auto p-4 space-y-4">

{messages.map((msg,index)=>(

<div
key={index}
className={`p-3 rounded-2xl text-sm ${
msg.role==="user"
? "bg-cyan-300 text-black ml-12"
: "bg-white/5 mr-12"
}`}
>
{msg.content}
</div>

))}

</div>



<div className="p-4 border-t border-white/10 flex gap-2">

<input
value={message}
onChange={(e)=>setMessage(e.target.value)}
onKeyDown={(e)=>{
if(e.key==="Enter"){
sendMessage();
}
}}
placeholder="Ask Atlas..."
className="
flex-1
bg-white/5
rounded-xl
px-4 py-3
outline-none
"
/>

<button
onClick={()=>sendMessage()}
className="
bg-cyan-400
text-black
px-4
rounded-xl
font-medium
"
>
Send
</button>

</div>

</>
)}

</div>

)}

</>
);

}
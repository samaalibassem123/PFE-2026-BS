import { useState } from "react";

export interface Step{
    step:string
    time:string
}


const useSyncronization =async ()=>{

    const [steps, setSteps] = useState<Step[]>()


    const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API_API_URL}/etl`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            }
            );

    if (!response.body) return;

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
        const {done, value} = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split("\n");
        buffer = parts.pop() || ""; // keep last incomplete chunk

        for (const part of parts) {
            console.log(part)
            if (!part.trim()) continue;
            const chunkData:{step:string, time:string} = JSON.parse(part)
            if (chunkData.step){
                setSteps((prev)=>prev ?[...prev, chunkData]:[chunkData])
            }
            console.log(part)
        }

    }
    return {
        steps
    }
}

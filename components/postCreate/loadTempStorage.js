import { supabase } from "../../src/supabase.js";

handlerTempStorage()

export function handlerTempStorage() {
    loadTempStorageLength();
}

async function loadTempStorageLength() {
    const lengthEl = document.getElementById("tempStorageLength");
    
    const {count, error} = await supabase.from("Posts")
    .select("*", { count: "exact", head: true})
    .eq("user_id", (await supabase.auth.getUser()).data.user.id)
    .eq("status", 1);

    if(error){
        console.log(error);
        return;
    }

    lengthEl.textContent = count;
}
import { supabase } from "../../src/supabase.js";


deleteControler();

function deleteControler(){
    const postDeleteBtn_mobile = document.getElementById("postBtnDelete_mobile");
    const postDeleteBtn_desk = document.getElementById("postBtnDelete_desk");

    postDeleteBtn_mobile.addEventListener("click", () =>{
        postDelete();    
    })
    postDeleteBtn_desk.addEventListener("click", () =>{
        postDelete();    
    })
}

async function postDelete() {
    const params = new URLSearchParams(window.location.search);
    const postId = params.get("id");

    if(!postId){
        console.error("post id 없음");
        return;
    }

    const {error} = await supabase
    .from("Posts")
    .delete()
    .eq("id", postId);

    if(error){
        console.error("삭제 실패 :", error);
        return;
    }

    window.location.href = "/pages/devlog.html";
}
import { supabase } from "../../src/supabase.js";
resumeDraftPrompt();
async function resumeDraftPrompt() {
    const lastestTemp = await searchConditionalTable();
    if (!lastestTemp) return;

    const isResume = confirm("최근 작성중인 글이 있습니다. 이어서 작성하시겠습니까?");

    if (isResume) {
        loadTable(lastestTemp);
    }

}

export async function searchConditionalTable() {
    const {
        data: { session },
        error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session) {
        console.error("로그인 상태가 아닙니다.", sessionError);
        return null;
    }

    const { data: lastesTemp, error } = await supabase
        .from("Posts")
        .select("*")
        .eq("user_id", session.user.id)
        .eq("status", 1)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

    if (error) {
        console.error("최근 임시저장 글 조회 실패", error);
        return null;
    }

    return lastesTemp;
}

function loadTable(post) {
    const title = document.getElementById("title");
    const content = document.getElementById("content");
    
    title.textContent = post.title ?? "";
    content.textContent = post.content ?? "";

    const url = new URL(window.location.href);
    url.searchParams.set("id", post.id);
    history.replaceState({}, "", url);
}
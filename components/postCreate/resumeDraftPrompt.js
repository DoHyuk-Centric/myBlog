import { supabase } from "../../src/supabase.js";

initDraftPage();

async function initDraftPage() {
  const postId = new URLSearchParams(window.location.search).get("id");

  if (postId) {
    await loadDraftById(postId);
    return;
  }

  await resumeDraftPrompt();
}

async function resumeDraftPrompt() {
  const latestTemp = await searchConditionalTable();
  if (!latestTemp) return;

  const isResume = confirm("최근 작성중인 글이 있습니다. 이어서 작성하시겠습니까?");

  if (!isResume) return;

  fillForm(latestTemp);
  updateUrl(latestTemp.id);
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

  const { data: latestTemp, error } = await supabase
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

  return latestTemp;
}

async function loadDraftById(postId) {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session) {
    console.error("로그인 상태가 아닙니다.", sessionError);
    return;
  }

  const { data, error } = await supabase
    .from("Posts")
    .select("*")
    .eq("id", postId)
    .eq("user_id", session.user.id)
    .eq("status", 1)
    .single();

  if (error) {
    console.error("임시저장 글 조회 실패", error);
    return;
  }

  fillForm(data);
}

function fillForm(post) {
  const title = document.getElementById("title");
  const content = document.getElementById("content");

  title.value = post.title ?? "";
  content.value = post.content ?? "";
}

function updateUrl(postId) {
  const url = new URL(window.location.href);
  url.searchParams.set("id", postId);
  history.replaceState({}, "", url);
}
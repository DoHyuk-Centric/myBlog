import { supabase } from "./supabase.js";

const listEl = document.getElementById("storageList");
const uploadBtn = document.getElementById("uploadBtn");
const imageInput = document.getElementById("imageInput");

/* ========================
   스토리지 목록 불러오기
========================= */
async function loadStorageList() {
  listEl.innerHTML = "<li>불러오는 중...</li>";

  const { data, error } = await supabase.storage
    .from("Post")
    .list("posts", {
      limit: 100,
      sortBy: { column: "created_at", order: "desc" }
    });

  if (error) {
    console.error("LIST ERROR:", error);
    listEl.innerHTML = "<li>불러오기 실패</li>";
    return;
  }

  if (!data || data.length === 0) {
    listEl.innerHTML = "<li>파일 없음</li>";
    return;
  }

  listEl.innerHTML = "";

  data.forEach(file => {
    // 폴더 방어 (중요)
    if (!file.metadata) return;

    const filePath = `posts/${file.name}`;
    const publicUrl = supabase.storage
      .from("Post")
      .getPublicUrl(filePath).data.publicUrl;

    const li = document.createElement("li");
    li.className =
      "border rounded p-2 bg-white dark:bg-gray-700 flex flex-col gap-2";

    li.innerHTML = `
      <img
        src="${publicUrl}"
        class="rounded object-cover aspect-square"
      />
      <div class="text-xs break-all">${file.name}</div>
      <button
        class="delete-btn border text-red-500 text-sm py-1 rounded"
      >
        삭제
      </button>
    `;

    // 삭제 버튼
    li.querySelector(".delete-btn").onclick = async () => {
      const ok = confirm("이 파일을 삭제할까요?");
      if (!ok) return;

      const { error } = await supabase.storage
        .from("Post")
        .remove([filePath]);

      if (error) {
        console.error("DELETE ERROR:", error);
        alert("삭제 실패");
        return;
      }

      await loadStorageList();
    };

    listEl.appendChild(li);
  });
}

/* =========================
   업로드
========================= */
uploadBtn.onclick = async () => {
  const file = imageInput.files[0];
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    alert("이미지 파일만 업로드 가능합니다.");
    return;
  }

  const ext = file.name.split(".").pop();
  const filePath = `posts/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage
    .from("Post")
    .upload(filePath, file, {
      cacheControl: "31536000",
      upsert: false
    });

  if (error) {
    console.error("UPLOAD ERROR:", error);
    alert("업로드 실패");
    return;
  }

  imageInput.value = "";
  await loadStorageList();
};

/* 최초 로드 */
loadStorageList();

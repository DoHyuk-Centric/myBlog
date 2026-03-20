export function updatePostList(totalCount, postsPerPage, currentPage, onPageClick) {
    const list = document.getElementById("posts-listNumber");
    list.innerHTML = "";

    const totalPages = Math.ceil(totalCount / postsPerPage);

    if (totalPages <= 1) return;

    for (let i = 0; i < totalPages; i++) {
        const btn = document.createElement("button");
        btn.textContent = i + 1;
        btn.classList.add("px-2", "py-1", "text-sm", "text-gray-400", "dark:text-gray-500", "cursor-pointer");

        if (i === currentPage) {
            btn.classList.remove("text-sm", "text-gray-400", "dark:text-gray-500");
            btn.classList.add("text-base", "font-bold", "text-black", "dark:text-white");
        }

        btn.addEventListener("click", () => onPageClick(i));
        list.appendChild(btn);
    }
}
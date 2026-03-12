const button = document.getElementById("discordCopy");
const message = button.dataset.copy;

button.addEventListener("click", async() => {
    await navigator.clipboard.writeText(message);
    showToast("Copy!");
})

function showToast(message) {
  const toast = document.createElement("div");

  toast.textContent = message;
  toast.className =
    "fixed bottom-10 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 rounded-lg";

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2000);
}
const infoItem = ({ label, period }) => `
  <p class="whitespace-nowrap">
    ${label}
    ${period ? `<span class="text-xs sm:text-sm xl:text-lg">(${period})</span>` : ""}
  </p>`;

const infoRow = ({ icon, items }) => `
  <ul class="text-sm sm:text-xl xl:text-3xl gap-5 sm:gap-10 flex items-center">
    <img
      class="w-8.5 h-8.5 sm:w-11.25 sm:h-11.25 xl:w-15.5 xl:h-15.5"
      src="${icon.src}"
      alt="${icon.alt}"
    />
    <li class="flex flex-col gap-3">
      ${items.map(infoItem).join("")}
    </li>
  </ul>`;

const profileImage = ({ src, alt }) => `
  <img
    class="w-60 sm:w-100 xl:w-150 rounded-2xl shadow-lg mr-0 md:mr-10"
    src="${src}"
    alt="${alt}"
  />`;

const profileCard = ({ name, info }) => `
  <div class="flex flex-col rounded-lg shadow-lg gap-1 sm:gap-4
              bg-gray-200 text-black p-5 sm:p-10 xl:p-20">
    <h2 class="text-xl sm:text-3xl xl:text-5xl mb-1 sm:mb-5">${name}</h2>
    <nav class="grid gap-5 sm:gap-10">
      ${info.map(infoRow).join("")}
    </nav>
  </div>`;

export { profileImage, profileCard };
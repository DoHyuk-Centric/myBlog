const desktopIcon = ({ app, src, label, imgClass, labelClass }) => `
  <button data-app="${app}" class="flex flex-col justify-center w-max">
    <img class="${imgClass}" width="256" height="256" src="${src}" alt="" />
    <span class="${labelClass}">${label}</span>
  </button>`;

const sidebarItem = ({ app, src, label, labelClass, imgClass, indent }) => `
  <button data-app="${app}"
    class="flex gap-1 items-center cursor-pointer ${indent ? "ml-4" : ""}">
    <img width="16" height="16" src="${src}" class="${imgClass}" alt="" />
    <p class="${labelClass}">${label}</p>
  </button>`;

const folderFile = ({ app, src, label, type, size }) => `
  <button ${app ? `data-app="${app}"` : ""} class="flex gap-2 items-center">
    <img class="w-15 h-15" width="48" height="48" src="${src}" alt="" />
    <div class="flex flex-col text-start">
      <p>${label}</p>
      ${type ? `<p class="text-gray-500 text-sm leading-none">${type}</p>` : ""}
      ${size ? `<p class="text-gray-500 text-sm leading-none">${size}</p>` : ""}
    </div>
  </button>`;

const desktopFile = ({ app, src, label }) => `
  <button data-app="${app}" class="flex gap-2 items-center">
    <img class="w-15 h-15" width="443" height="448" src="${src}" alt="" />
    <div class="flex flex-col text-start"><p>${label}</p></div>
  </button>`;

const folderWindow = ({ sidebar, folderFiles, desktopFiles }) => `
  <div id="winXpFolderContents"
    class="absolute left-1/2 top-1/2 transition-transform
           -translate-x-1/2 -translate-y-1/2 w-200 h-100">
    <div class="rounded-t-xl w-full h-full flex flex-col overflow-hidden">

      <header class="w-full p-2 h-10 flex gap-1 items-center rounded-t-xl
                     bg-[linear-gradient(0deg,rgba(0,85,229,1)_0%,rgba(0,85,229,1)_15%,rgba(0,85,229,1)_85%,rgba(59,148,255,1)_100%)]
                     text-white">
        <img class="w-5 h-5" width="16" height="16"
          src="../img/window/xpFileExplorer.ico" alt="" />
        <span class="font-[xp]">내 문서</span>
        <div id="winXpFolderButtonComponent" class="ml-auto mr-[px] h-full">
          <button data-app="winXpMin" class="w-max h-max">
            <img class="w-6 h-6" width="21" height="21"
              src="../img/window/winXpMin.png" alt="" />
          </button>
          <button data-app="winXpFolderDisplay" class="w-max h-max">
            <img class="w-6 h-6" width="21" height="21"
              src="../img/window/winXpFolderDisplay.png" alt="" />
          </button>
          <button data-app="winXpExit" class="w-max h-max">
            <img class="w-6 h-6" width="20" height="21"
              src="../img/window/xpExit.png" alt="" />
          </button>
        </div>
      </header>

      <main class="bg-white border-l-4 flex-1 border-r-4 border-b-4
                   border-[#0055E5] flex flex-col gap-0.5">

        <div class="font-[xp] flex gap-0.5">
          <div class="flex gap-4 bg-[#EFEEE3] border-[#E0DCCC] pl-4 border-b border-r w-full">
            <p>파일(F)</p><p>편집(E)</p><p>보기(V)</p>
            <p>즐겨찾기(A)</p><p>도구(T)</p><p>도움말(H)</p>
          </div>
          <div class="bg-white w-12 border-[#E0DCCC] border-b flex items-center justify-center">
            <img class="inline-block" width="20" height="20"
              src="../img/window/winXpMS.png" alt="" />
          </div>
        </div>

        <div class="font-[xp] flex gap-0.5 w-full">
          <div class="bg-[#EFEEE3] px-1 flex gap-3 border-[#E0DCCC] border-b border-r">
            <button class="flex justify-center items-center">
              <img class="p-2" src="../img/window/winXpBackButton.png" alt="" />
              <p class="flex justify-center items-center gap-2">뒤로
                <span class="text-[6px]">▼</span>
              </p>
            </button>
            <button class="flex justify-center items-center gap-2">
              <img class="p-2" src="../img/window/winXpNextButton.png" alt="" />
              <span class="text-[6px] text-gray-400">▼</span>
            </button>
            <button>
              <img src="../img/window/winXpUpFolder.png" alt="" />
            </button>
          </div>
          <div class="bg-[#EFEEE3] px-1 gap-3 border-[#E0DCCC] border-b border-r
                      flex justify-center items-center">
            <button class="flex gap-2 justify-center items-center">
              <img class="inline-block w-5 h-5" width="24" height="24"
                src="../img/window/winXpMagnifyingGlass.ico" alt="" />
              <span>검색</span>
            </button>
            <button class="flex gap-2 justify-center items-center">
              <img class="inline-block w-5 h-5" width="32" height="32"
                src="../img/window/winXpFolderSearch.ico" alt="" />
              <span>폴더</span>
            </button>
          </div>
          <div class="bg-[#EFEEE3] px-1 border-b border-[#E0DCCC] flex flex-1">
            <button class="flex justify-center items-center">
              <img class="inline-block w-7 h-7" width="32" height="32"
                src="../img/window/winXpFolderReadMore.ico" alt="" />
              <span class="text-[6px]">▼</span>
            </button>
          </div>
        </div>

        <div class="flex font-[xp] w-full gap-0.5">
          <div class="bg-[#EFEEE3] px-1.5 text-center border-b border-[#E0DCCC]">
            <p class="text-gray-400">주소(D)</p>
          </div>
          <div class="flex-1 flex justify-end">
            <div class="border border-[#8DA8C1] flex justify-end flex-1">
              <div class="flex items-center mr-auto ml-1 gap-1">
                <img class="w-5 h-5" width="256" height="256"
                  src="../img/window/folder.png" alt="" />
                <p>내 문서</p>
              </div>
              <button class="mr-0.5">
                <img width="16" height="17"
                  src="../img/window/winXpDirectionSearch.png" alt="" />
              </button>
            </div>
            <button class="flex gap-1 bg-[#EFEEE3] border-b border-[#E0DCCC] px-2">
              <img src="../img/window/winXpMoveButton.png" alt="" />
              <p>이동</p>
            </button>
          </div>
        </div>

        <div class="font-[xp] w-full flex-1 flex">
          <div class="flex flex-col h-full border-r-2 border-[#EFEEE3]">
            <div class="bg-[#EFEEE3] border-b border-[#E0DCCC] w-50 flex">
              <p class="ml-2">폴더</p>
              <button class="ml-auto mr-2">
                <img class="w-3 h-3" width="30" height="30"
                  src="../img/mode/light/delete_light.png" alt="" />
              </button>
            </div>
            <div id="winXpFolerAside" class="h-full px-1 flex flex-col gap-px">
              ${sidebar.map(sidebarItem).join("")}
            </div>
          </div>

          <div class="h-full w-full flex-1 px-5 py-3">
            <div id="winDisplayDesktop" class="hidden w-full h-full">
              <div class="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-10">
                ${desktopFiles.map(desktopFile).join("")}
              </div>
            </div>
            <div id="winDisplayFolder" class="hidden">
              <div class="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-10">
                ${folderFiles.map(folderFile).join("")}
              </div>
            </div>
            <div id="winDisplayComputer" class="hidden">
              <p class="ml-1 mb-5 font-bold border-b border-blue-400">하드 디스크 드라이브</p>
              <div class="flex gap-2 items-center">
                <img class="w-15 h-15" width="49" height="49"
                  src="../img/window/winXpDrive.png" alt="" />
                <div class="flex flex-col text-start"><p>로컬 디스크 (C:)</p></div>
              </div>
              <p class="ml-1 my-5 font-bold border-b border-blue-400">이동식 저장소가 있는 장치</p>
              <div class="flex gap-2 items-center">
                <img class="w-15 h-15" width="60" height="60"
                  src="../img/window/winXpDvdDrive.png" alt="" />
                <div class="flex flex-col text-start"><p>DVD 드라이브 (D:)</p></div>
              </div>
            </div>
            <div id="winDisplayNetwork" class="hidden">
              <p class="ml-1 mb-5 font-bold border-b border-blue-400">LAN 또는 고속 인터넷</p>
              <div class="flex gap-2 items-center">
                <img class="w-15 h-15" width="70" height="70"
                  src="../img/window/winXpEthernet.png" alt="" />
                <div class="flex flex-col text-start"><p>로컬 영역 연결 2</p></div>
              </div>
            </div>
            <div id="winDisplayTrash" class="hidden"></div>
          </div>
        </div>

      </main>
    </div>
  </div>`;

const taskbar = () => `
  <div class="flex h-7.5 w-full font-[xp] text-white
              [text-shadow:1px_1px_0_black] relative">
    <div class="absolute bottom-0 w-40 overflow-hidden">
      <img class="" width="110" height="30"
        src="../img/window/xpStartButton.png" alt="" />
    </div>
    <div class="bg-linear-to-b pl-30 border-t border-white/40
                from-blue-400 via-blue-600 to-blue-800
                w-full flex gap-1.5 items-center">
      <img class="w-5 h-5 mt-0.5" width="19" height="18"
        src="../img/window/xpContents1.png" alt="" />
      <img class="w-5 h-5" width="16" height="16"
        src="../img/window/xpExplorer.ico" alt="" />
      <img class="w-5 h-5" width="21" height="20"
        src="../img/window/xpNateon.png" alt="" />
    </div>
    <div class="border-l border-black/70 bg-linear-to-b from-cyan-200
                via-blue-400 to-blue-600 w-55 flex gap-2 pl-2 items-center">
      <img class="w-4 h-4" width="17" height="20"
        src="../img/window/xpWall.png" alt="" />
      <img class="w-4 h-4" width="21" height="22"
        src="../img/window/xpAlyak.png" alt="" />
      <img class="w-4 h-4" width="17" height="16"
        src="../img/window/xpSound.png" alt="" />
      <img class="w-4 h-4" width="18" height="20"
        src="../img/window/xpContents2.png" alt="" />
      <time id="xpCurrentTime" datetime=""
        class="ml-auto mr-3 [text-shadow:0px_0px_0_black] text-sm whitespace-nowrap">
      </time>
    </div>
  </div>`;

export const buildDesktop = (data) => `
  <div class="mt-20 hidden lg:flex lg:flex-col w-full h-[calc(100vh-80px)]
              bg-cover bg-no-repeat bg-center relative"
    style="background-image: url(/img/window/winXPbaground.png)">
    <div id="winXPContents" class="flex flex-col gap-8 ml-3 flex-1">
      ${data.desktop.icons.map(desktopIcon).join("")}
    </div>
    ${folderWindow(data.desktop)}
    ${taskbar()}
  </div>`;
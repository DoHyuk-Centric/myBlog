export const mobileStatusBar = () => `
  <div class="h-8 flex items-center px-4 text-sm">
    <time id="mobileCurrentTime" class="text-black flex-1 pl-1" datetime="">17:28</time>
    <div class="flex items-center gap-1">
      <span class="w-3 h-3 rounded-full bg-black"></span>
    </div>
    <div class="flex-1 flex justify-end">
      <img class="" width="20" height="20" src="/img/oneUI/battery.png" />
    </div>
  </div>`;

const dockButton = ({ app, src, class: cls, imgClass }) => `
  <button data-app="${app}" class="${cls}">
    <img class="${imgClass}" width="50" height="50" src="${src}" alt="" />
  </button>`;

export const mobileHome = ({ dock }) => `
  <div id="mobileHome" class="flex w-full flex-1 relative">
    <div class="absolute p-5 w-full">
      <span class="p-5 flex flex-col text-black rounded-2xl bg-amber-200 w-full h-max">
        <p class="mb-2 md:text-[20px]">노트</p>
        <p class="text-xs md:text-[16px]">삼성 갤럭시 ONE UI를 기반으로 디자인하였습니다.</p>
        <p class="text-xs md:text-[16px]">실제 운용이 가능한 서비스</p>
        <p class="text-xs md:text-[16px]">아래 앱을 터치해 더 자세한 정보를 만나보세요!</p>
      </span>
    </div>
    <div class="absolute bottom-25 left-1/2 transition-transform -translate-x-1/2">
      <span class="block w-3 h-3 md:w-4 md:h-4 border border-white/60 bg-black/70 rounded-full"></span>
    </div>
    <div id="mobileDock"
      class="absolute flex justify-evenly w-full pl-2 pr-2 bottom-5 left-1/2 transition-transform -translate-x-1/2">
      ${dock.map(dockButton).join("")}
    </div>
  </div>`;

const kakaoApp = () => `
  <div data-app="kakao" class="w-full h-full flex flex-col text-white">
    <header class="h-12 px-4 flex items-center border-b border-white/20">
      <div class="flex gap-6 items-center">
        <button id="kakaoExit" class="text-2xl">←</button>
        <span class="text-lg">DoHyuk.js</span>
      </div>
      <div class="flex ml-auto">
        <button>
          <img class="w-7 h-7" width="40" height="40"
            src="../img/mode/dark/search_dark.png" alt="" />
        </button>
      </div>
    </header>
    <main class="flex-1 gap-4 flex flex-col items-center p-4 overflow-auto">
      <div>
        <span id="kakaoTalkCurrentDay"
          class="text-xs px-3 py-2 bg-[#1B1B1B] text-center rounded-full">
          2026년 2월 26일 목요일 >
        </span>
      </div>
      <div class="w-full flex gap-3">
        <div class="w-12 h-12 rounded-[20px] border overflow-hidden">
          <img class="bg-white w-full h-full" width="1024" height="1024"
            src="../img/oneUI/kakaoTalkprofile.png" alt="" />
        </div>
        <div class="flex flex-col gap-3">
          <span class="text-sm">DoHyuk.js</span>
          <div class="flex gap-1">
            <a class="cursor-pointer" href="https://open.kakao.com/o/sPeTPrii"
              target="_blank" rel="noreferrer noopener">
              <img class="w-60 h-30" width="432" height="217"
                src="../img/oneUI/kakaotalkopenchat.png" alt="" />
              <div class="w-60 h-25 p-3 flex flex-col justify-evenly bg-[#1B1B1B] rounded-2xl">
                <p class="text-start">Dohyuk.dev 문의사항</p>
                <p class="text-start text-sm text-[#616161]">여기를 눌러 링크를 확인하세요.</p>
                <p class="text-start text-blue-400 underline">open.kakao.com</p>
              </div>
            </a>
            <time id="kakaoTalkCurrentTime" class="mt-auto text-[8px]" datetime=""></time>
          </div>
        </div>
      </div>
    </main>
  </div>`;

const gmailApp = () => `
  <div data-app="gmail" class="w-full h-full flex flex-col bg-[#121212] text-white">
    <header class="h-14 px-3 flex items-center gap-3 border-b border-white/10">
      <button id="gmailExit"
        class="w-10 h-10 grid place-items-center rounded-full hover:bg-white/10 active:bg-white/15">
        <span class="text-2xl leading-none">←</span>
      </button>
      <button class="flex-1 h-10 px-4 rounded-full bg-white/10 hover:bg-white/12
                     active:bg-white/15 flex items-center gap-3 text-white/80">
        <span class="text-sm">메일 검색</span>
        <span class="ml-auto text-[11px] text-white/50">받은편지함</span>
      </button>
      <button class="w-10 h-10 rounded-full bg-white/10 grid place-items-center
                     hover:bg-white/12 active:bg-white/15">
        <span class="text-sm font-semibold text-blue-400">G</span>
      </button>
    </header>
    <div class="px-3 pt-3">
      <div class="flex gap-2">
        <button class="px-4 h-9 rounded-full bg-blue-500/20 text-blue-200
                       border border-blue-400/20 text-sm">기본</button>
        <button class="px-4 h-9 rounded-full bg-white/5 hover:bg-white/8
                       text-white/80 text-sm">소셜</button>
        <button class="px-4 h-9 rounded-full bg-white/5 hover:bg-white/8
                       text-white/80 text-sm">프로모션</button>
      </div>
    </div>
    <main class="flex-1 px-3 pt-3 pb-20 overflow-auto">
      <div class="flex items-center justify-between px-1 mb-2 text-xs text-white/60">
        <span>받은편지함</span>
        <span>오늘</span>
      </div>
      <ul class="flex flex-col gap-2">
        <li class="rounded-2xl bg-white/6 hover:bg-white/8 border border-white/10">
          <button class="w-full p-3 flex gap-3 text-left">
            <div class="w-10 h-10 rounded-full bg-blue-500/25 grid place-items-center
                        text-blue-200 font-semibold">D</div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2">
                <span class="font-semibold truncate">Dohyuk.dev</span>
                <span class="ml-auto text-[11px] text-white/70">오후 3:12</span>
              </div>
              <div class="text-sm font-semibold truncate">[문의] 포트폴리오 피드백 요청</div>
              <div class="text-xs text-white/60 truncate">안녕하세요! About 페이지 UI 개선 관련해서…</div>
            </div>
            <div class="w-10 flex items-start justify-end">
              <span class="w-2 h-2 mt-2 rounded-full bg-blue-400"></span>
            </div>
          </button>
        </li>
        <li class="rounded-2xl bg-white/3 hover:bg-white/6 border border-white/8">
          <button class="w-full p-3 flex gap-3 text-left">
            <div class="w-10 h-10 rounded-full bg-white/10 grid place-items-center
                        text-white/80 font-semibold">G</div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2">
                <span class="truncate text-white/90">Google</span>
                <span class="ml-auto text-[11px] text-white/50">오전 10:41</span>
              </div>
              <div class="text-sm truncate text-white/80">보안 알림: 새 기기에서 로그인</div>
              <div class="text-xs text-white/50 truncate">계정 보안을 위해 확인이 필요합니다.</div>
            </div>
            <div class="w-10 flex items-start justify-end">
              <span class="text-white/40 text-lg">☆</span>
            </div>
          </button>
        </li>
        <li class="rounded-2xl bg-white/3 hover:bg-white/6 border border-white/8">
          <button class="w-full p-3 flex gap-3 text-left">
            <div class="w-10 h-10 rounded-full bg-green-500/20 grid place-items-center
                        text-green-200 font-semibold">V</div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2">
                <span class="truncate text-white/90">Vercel</span>
                <span class="ml-auto text-[11px] text-white/50">어제</span>
              </div>
              <div class="text-sm truncate text-white/80">Deployment completed</div>
              <div class="text-xs text-white/50 truncate">Your project has been successfully deployed.</div>
            </div>
            <div class="w-10 flex items-start justify-end">
              <span class="text-white/40 text-lg">☆</span>
            </div>
          </button>
        </li>
      </ul>
    </main>
    <span class="absolute w-43 right-18 bottom-7 text-xs text-amber-100">
      문의사항이 있으신경우 우측버튼을 눌러서 메일을 보내보세요! →
    </span>
    <a href="https://mail.google.com/mail/?view=cm&to=clzlsdlwhgdk12@gmail.com"
      target="_blank" rel="noopener noreferrer"
      class="absolute right-4 bottom-5 w-14 h-14 rounded-2xl bg-blue-500
             hover:bg-blue-400 active:bg-blue-600 shadow-lg grid place-items-center">
      <span class="text-2xl leading-none">✎</span>
    </a>
  </div>`;

export const mobileApps = () => `
  <div id="mobileApp" class="hidden w-full flex-1 relative bg-[#080808]">
    ${kakaoApp()}
    ${gmailApp()}
    <div data-app="chrome" class="w-full h-full flex flex-col bg-[#121212] text-white"></div>
    <div data-app="excel"  class="w-full h-full flex flex-col bg-[#121212] text-white"></div>
  </div>`;

export const mobileFooter = () => `
  <div id="mobileFooter"
    class="flex justify-evenly items-center h-10 bg-black/5 rounded-b-3xl">
    <button data-app="mobileHamberger" class="cursor-pointer">
      <img src="../img/oneUI/mobileHamberger.png" width="30" height="30" alt="" />
    </button>
    <button data-app="mobileHome"
      class="cursor-pointer w-6 h-6 border-3 border-white rounded-lg"></button>
    <button data-app="mobileBack" class="cursor-pointer text-white text-2xl">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round"
        stroke-linejoin="round" class="w-6 h-6 text-white">
        <path d="M15 5 L8 12 L15 19" />
      </svg>
    </button>
  </div>`;

export const buildMobile = (data) => `
  <div class="lg:hidden flex flex-col w-full h-full bg-cover bg-no-repeat bg-center rounded-3xl"
    style="background-image: url(../img/oneUI/mobileBackground.png)">
    ${mobileStatusBar()}
    ${mobileHome(data.mobile)}
    ${mobileApps()}
    ${mobileFooter()}
  </div>`;
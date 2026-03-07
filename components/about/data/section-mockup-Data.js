export const SECTION_MOCKUP_DATA = {

  mobile: {
    dock: [
      {
        app: "kakao",
        src: "../img/oneUI/kakaotalk.png",
        class: "rounded-2xl cursor-pointer",
        imgClass: "rounded-2xl w-14 h-14 md:w-20 md:h-20 active:brightness-75",
      },
      {
        app: "gmail",
        src: "../img/oneUI/gmail.png",
        class: "rounded-2xl cursor-pointer bg-[#e4e4e4] w-14 h-14 md:w-20 md:h-20 flex justify-center items-center active:brightness-75",
        imgClass: "w-12 h-10 md:w-18 md:h-16",
      },
      {
        app: "chrome",
        src: "../img/oneUI/chrome.png",
        class: "rounded-2xl cursor-pointer bg-[#e4e4e4] w-14 h-14 md:w-20 md:h-20 flex justify-center items-center active:brightness-75",
        imgClass: "rounded-2xl md:w-18 md:h-18",
      },
      {
        app: "excel",
        src: "../img/oneUI/excel.png",
        class: "rounded-2xl cursor-pointer bg-[#e4e4e4] w-14 h-14 md:w-20 md:h-20 flex justify-center items-center active:brightness-75",
        imgClass: "rounded-2xl md:w-18 md:h-18",
      },
    ],
  },

  desktop: {
    icons: [
      {
        app: "winXpFolder",
        src: "../img/window/folder.png",
        label: "내 문서",
        imgClass: "w-12 h-12 m-4 -mb-1",
        labelClass: "text-center mr-2 font-[xp] [text-shadow:1px_1px_0_black] text-white",
      },
      {
        app: "winXpMyCom",
        src: "../img/window/myComputer.png",
        label: "내 컴퓨터",
        imgClass: "w-12 h-12 m-4 -mb-1",
        labelClass: "text-center mr-2 font-[xp] [text-shadow:1px_1px_0_black] text-white",
      },
      {
        app: "winXpNetwork",
        src: "../img/window/myNetwork.png",
        label: "내 네트워크 환경",
        imgClass: "w-12 h-12 m-4 mb-0",
        labelClass: "text-center w-20 leading-none mr-2 font-[xp] [text-shadow:1px_1px_0_black] text-white",
      },
      {
        app: "winXpTrash",
        src: "../img/window/xpTrash.ico",
        label: "휴지통",
        imgClass: "w-12 h-12 m-4 mb-0",
        labelClass: "text-center w-20 leading-none mr-2 font-[xp] [text-shadow:1px_1px_0_black] text-white",
      },
    ],

    sidebar: [
      {
        app: "winXpDesktop",
        src: "../img/window/winXpBackgroundIcon.png",
        label: "바탕 화면",
        labelClass: "pr-2",
        imgClass: "",
      },
      {
        app: "winXpMyfolder",
        src: "../img/window/winXpMyFoler.ico",
        label: "내 문서",
        labelClass: "pr-2 bg-[#EDEADA]",
        imgClass: "w-4 h-4",
        indent: true,
      },
      {
        app: "winXpMyComputer",
        src: "../img/window/122.ico",
        label: "내 컴퓨터",
        labelClass: "pr-2",
        imgClass: "w-4 h-4",
        indent: true,
      },
      {
        app: "winXpMyNetwork",
        src: "../img/window/141.ico",
        label: "내 네트워크 환경",
        labelClass: "pr-2",
        imgClass: "w-4 h-4",
        indent: true,
      },
      {
        app: "winXpTrash",
        src: "../img/window/xpTrash.ico",
        label: "휴지통",
        labelClass: "pr-2",
        imgClass: "w-4 h-4",
        indent: true,
      },
    ],

    folderFiles: [
      {
        app: null,
        src: "../img/window/winXpExcel.jpg",
        label: "백로그.excel",
        type: "파일",
        size: "1KB",
      },
      {
        app: "winXpGithub",
        src: "../img/window/winXpGithub.png",
        label: "깃허브",
        type: "HTML Document",
        size: "1KB",
      },
      {
        app: "winXpKakao",
        src: "../img/window/winXpKakao.png",
        label: "카카오톡",
        type: "HTML Document",
        size: "1KB",
      },
      {
        app: "winXpChrome",
        src: "../img/window/winXpChrome.png",
        label: "블로그",
        type: "HTML Document",
        size: "1KB",
      },
    ],

    desktopFiles: [
      { app: "winXpFolder",  src: "../img/window/folder.png",      label: "내 문서" },
      { app: "winXpMyCom",   src: "../img/window/myComputer.png",   label: "내 컴퓨터" },
      { app: "winXpNetwork", src: "../img/window/myNetwork.png",    label: "내 네트워크 환경" },
      { app: "winXpTrash",   src: "../img/window/xpTrash.ico",      label: "휴지통" },
    ],
  },
};
function desktop(){
    const winXp = document.querySelector("#winXPContents");
    
    const appActions = {
        winXpFolder: () => {
            console.log("내 문서");
        },
        winXpMyCom: () => {
            console.log("내 컴퓨터");
        },
        winXpNetwork: () => {
            console.log("내 네트워크 환경");
        },
        winXpTrash: () => {
            console.log("휴지통");
        },
    }

    winXp.addEventListener("dblclick", (e) => {
        const btn = e.target.closest("button");
        if(!btn){
            return;
        }
        
        const action = appActions[btn.dataset.app];
        if(action){
            action();
        }
    })
}
desktop();


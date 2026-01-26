previewAnimation();
function previewAnimation(){
    const previewToggle = document.getElementById("preview-toggle");
    const previewAside = document.getElementById("preview-aside");
    const postsection = document.getElementById("post-section");
    const previewInput = document.getElementById("preview-input");
    
    let previewOpen = true;
    let mpreviewOpen = false;
    
    const isDesktop = () => window.matchMedia("(min-width: 768px)").matches;
    
    previewToggle.addEventListener("click", () => {
        if(isDesktop()){
            previewOpen = !previewOpen;
            previewAside.classList.toggle("md:translate-x-full", !previewOpen);
            postsection.classList.toggle("md:grid-cols-2", previewOpen);
            postsection.classList.toggle("md:grid-cols-1", !previewOpen);
            previewToggle.classList.toggle("md:bottom-4", previewOpen);
            previewInput.classList.toggle("md:w-1/2", previewOpen);
    
        }
        else{
            mpreviewOpen = !mpreviewOpen;
            previewAside.classList.toggle("translate-x-full", !mpreviewOpen);
        }
    });
}


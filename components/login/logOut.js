import { signOut } from "firebase/auth";
import { auth } from "./firebase";

logOutHandler();

function logOutHandler(){
    document.getElementById("logout").addEventListener("click", () => {
        signOut(auth);
        window.location.href = "index.html";
    })
}
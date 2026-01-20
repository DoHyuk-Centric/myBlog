import { signOut } from "firebase/auth";
import { auth } from "./firebase";

logOutHandler();

function logOutHandler(){
    document.getElementById("logout").addEventListener("click", () => {
        signOut(auth);
    })
}
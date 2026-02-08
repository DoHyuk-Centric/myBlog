// 파이어 베이스 UID를 supabase로 넘김
import { currentUser } from "../login/firebase.js"

export function getUid() {
  if (!currentUser) return null;
  return currentUser.uid;
}
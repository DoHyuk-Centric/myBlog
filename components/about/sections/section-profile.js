import { SECTION_PROFILE_DATA } from '../data/section-profile-Data.js';
import { profileImage, profileCard } from './profile/profile-templates.js';

function buildHeader(data){
    return `
    ${profileImage(data.image)}
    ${profileCard(data)}`;
}

export function mountProfile(){
    const section = document.getElementById("section-profile");
    section.innerHTML = buildHeader(SECTION_PROFILE_DATA);
}
import { initDesktop } from './mockup/desktop.js';
import { initGetTime } from './mockup/getTime.js';
import { initMobile } from './mockup/mobile.js';

export function mountMockup(){
    initDesktop();
    initGetTime();
    initMobile();
}
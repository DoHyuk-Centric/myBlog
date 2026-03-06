import { initCardDragAnimation } from './mockup/animation/cardDrag.js';
import { initDesktop } from './mockup/desktop.js';
import { initGetTime } from './mockup/getTime.js';
import { initMobile } from './mockup/mobile.js';
import { initMobileButtonEvent } from './mockup/mobileButtonEvent.js';

export function mountMockup(){
    initCardDragAnimation();
    initDesktop();
    initGetTime();
    initMobile();
    initMobileButtonEvent();
}
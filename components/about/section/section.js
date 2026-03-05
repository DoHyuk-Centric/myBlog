import { initCardDragAnimation } from './animation/cardDrag.js';
import { initDesktop } from './desktop.js';
import { initGetTime } from './getTime.js';
import { initMobile } from './mobile.js';
import { initMobileButtonEvent } from './mobileButtonEvent.js';

export function initSection(){
    initCardDragAnimation();
    initDesktop();
    initGetTime();
    initMobile();
    initMobileButtonEvent();
}
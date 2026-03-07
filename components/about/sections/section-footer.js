import { SECTION_FOOTER_DATA }  from '../data/section-footer-Data.js';
import { buildFooter }  from './footer/footer-templates.js';

export function mountFooter() {
  const section = document.getElementById("section-footer");
  section.innerHTML = buildFooter(SECTION_FOOTER_DATA);
}
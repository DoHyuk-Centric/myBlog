const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("opacity-100", "translate-y-0");
      entry.target.classList.remove("opacity-0", "translate-y-10");
      observer.unobserve(entry.target); // 한 번만 실행
    }
  });
}, { threshold: 0.5 }); // 요소가 10% 보이면 실행

document.querySelectorAll(".scroll-reveal").forEach(el => observer.observe(el));
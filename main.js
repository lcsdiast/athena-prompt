/* ─────────────────────────────────────────
   TSS Support · IA Evolutiva
   main.js — Comportamentos e animações
   ───────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {

  // ─── 1. Intersection Observer — Animações de Reveal ───────────────────────
  // Aplica fade-in + slide-up nos elementos com classe .reveal
  // conforme o usuário rola a página.

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Anima apenas uma vez
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  // Aplica stagger (atraso escalonado) a cada grupo de 4 elementos
  document.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 0.09}s`;
    observer.observe(el);
  });


  // ─── 2. Efeito de Scroll no Header ────────────────────────────────────────
  // Realça a borda inferior do header ao rolar a página.

  const header = document.querySelector('header');

  window.addEventListener('scroll', () => {
    header.style.borderBottomColor = window.scrollY > 40
      ? 'rgba(255,255,255,0.06)'
      : 'rgba(255,255,255,0.04)';
  }, { passive: true });


  // ─── 3. Scroll Suave com Offset ───────────────────────────────────────────
  // Compensa a altura do header fixo (64px + margem) ao navegar por âncoras.

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 72,
        behavior: 'smooth'
      });
    });
  });

});

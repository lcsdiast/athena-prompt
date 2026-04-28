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

   // ─── 4. Modal de Evidências Científicas ───────────────────────────────────
 
  const overlay   = document.getElementById('modal-overlay');
  const allModals = document.querySelectorAll('.modal');
 
  /** Abre o modal correspondente ao ID informado */
  function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
 
    // Garante que só um modal esteja ativo por vez
    allModals.forEach(m => m.classList.remove('active'));
 
    modal.classList.add('active');
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // trava o scroll da página
  }
 
  /** Fecha todos os modais */
  function closeModal() {
    allModals.forEach(m => m.classList.remove('active'));
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
 
  // Botões "Ver Evidências Científicas" nos cards
  document.querySelectorAll('.evidence-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      openModal(btn.dataset.modal);
    });
  });
 
  // Botões de fechar (×) dentro dos modais
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', closeModal);
  });
 
  // Clique no backdrop fecha o modal
  overlay.querySelector('.modal-backdrop').addEventListener('click', closeModal);
 
  // Tecla Escape fecha o modal
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal();
  });
 

});

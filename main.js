document.addEventListener('DOMContentLoaded', () => {

  // ─── 1. Scroll Suave Inteligente ──────────────────────────────────────────
  // Agora ele entende links como "index.html#gems" e faz o scroll corretamente
  document.querySelectorAll('a[href*="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const url = new URL(a.href);
      const isSamePage = url.pathname === window.location.pathname || url.pathname.endsWith(window.location.pathname);
      
      if (isSamePage) {
        const target = document.querySelector(url.hash);
        if (target) {
          e.preventDefault();
          window.scrollTo({
            top: target.offsetTop - 72,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // ─── 2. Função de Copiar (Com Fallback de Segurança) ──────────────────────
  const copyPromptBtn = document.getElementById('copy-prompt-btn');
  
  if (copyPromptBtn) {
    copyPromptBtn.addEventListener('click', () => {
      const textToCopy = document.getElementById('prompt-text').innerText;

      // Função auxiliar para copiar
      const execCopy = (text) => {
        if (navigator.clipboard && window.isSecureContext) {
          return navigator.clipboard.writeText(text);
        } else {
          // Método reserva para quando o navegador bloqueia (ex: abrindo arquivo local)
          const textArea = document.createElement("textarea");
          textArea.value = text;
          textArea.style.position = "fixed";
          textArea.style.left = "-9999px";
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          try {
            document.execCommand('copy');
            textArea.remove();
            return Promise.resolve();
          } catch (err) {
            textArea.remove();
            return Promise.reject(err);
          }
        }
      };

      execCopy(textToCopy).then(() => {
        const originalHTML = copyPromptBtn.innerHTML;
        copyPromptBtn.innerHTML = `✅ Copiado!`;
        copyPromptBtn.style.background = '#2ECC8A';
        copyPromptBtn.style.color = '#fff';
        
        setTimeout(() => {
          copyPromptBtn.innerHTML = originalHTML;
          copyPromptBtn.style = '';
        }, 2000);
      }).catch(err => {
        alert("Erro ao copiar. Por favor, selecione o texto e copie manualmente.");
      });
    });
  }

  // ─── 3. Intersection Observer (Animações) ─────────────────────────────────
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // ─── 4. Modais ───────────────────────────────────────────────────────────
  const overlay = document.getElementById('modal-overlay');
  if (overlay) {
    document.querySelectorAll('.evidence-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const modalId = btn.dataset.modal;
        document.getElementById(modalId).classList.add('active');
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeModal = () => {
      document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    };

    document.querySelectorAll('.modal-close').forEach(b => b.addEventListener('click', closeModal));
    overlay.querySelector('.modal-backdrop').addEventListener('click', closeModal);
  }
});
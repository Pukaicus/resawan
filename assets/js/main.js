(function(){
  // --- GESTION DU MENU MOBILE ---
  const btn = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  
  if(btn && nav){
    btn.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // --- EFFET D'APPARITION DOUCE (Scroll Reveal) ---
  const observerOptions = {
    threshold: 0.12 
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const elementsToReveal = document.querySelectorAll(
    'h1, h2, h3, .lead, .card, .cta-row, .pill, .hero-aside, .callout, .prose p, .bullets li, .form-card'
  );
  
  elementsToReveal.forEach(el => {
    el.style.opacity = "0.1"; 
    el.style.transform = "translateY(25px)";
    el.style.transition = "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    observer.observe(el);
  });

  // --- GESTION DES MESSAGES DE RETOUR FORMULAIRE ---
  // On vérifie l'URL pour afficher les alertes de succès ou d'erreur
  const urlParams = new URLSearchParams(globalThis.location.search);
  
  if (urlParams.has('success')) {
    const successBox = document.getElementById('successMessage');
    if (successBox) successBox.style.display = 'block';
  }

  if (urlParams.has('error')) {
    const errorBox = document.getElementById('errorMessage');
    if (errorBox) {
      errorBox.innerText = "X Une erreur technique est survenue. Veuillez réessayer.";
      errorBox.style.display = 'block';
    }
  }

})();
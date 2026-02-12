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

  /**
   * Cible les éléments clés pour l'animation
   * On ne déclare la variable QU'UNE SEULE FOIS ici
   */
  const elementsToReveal = document.querySelectorAll(
    'h1, h2, h3, .lead, .card, .cta-row, .pill, .hero-aside, .callout, .prose p, .bullets li, .form-card'
  );
  
  elementsToReveal.forEach(el => {
    el.style.opacity = "0.1"; 
    el.style.transform = "translateY(25px)";
    el.style.transition = "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    
    // On lance l'observation immédiatement
    observer.observe(el);
  });

globalThis.fakeSubmit = function(ev) {
    ev.preventDefault();
    const form = ev.target;
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');

    // On change le texte du bouton pour faire patienter l'utilisateur
    const originalText = submitBtn.innerText;
    submitBtn.innerText = "Envoi en cours...";
    submitBtn.disabled = true;

    fetch('send_mail.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(result => {
        if (result.trim() === "success") {
            alert("✅ Message envoyé avec succès !");
            form.reset();
        } else {
            alert("❌ Erreur lors de l'envoi.");
        }
    })
    .catch(error => {
        console.error('Erreur:', error);
        alert("❌ Impossible de contacter le serveur.");
    })
    .finally(() => {
        submitBtn.innerText = originalText;
        submitBtn.disabled = false;
    });

    return false;
};
})();
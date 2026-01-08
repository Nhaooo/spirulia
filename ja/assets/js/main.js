document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initAccordion();
  initSizeSelector();
  initBuyModal();
});

/* Mobile Menu */
function initMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', nav.classList.contains('open'));
    });
  }
}

/* Accordion */
function initAccordion() {
  const headers = document.querySelectorAll('.accordion-header');

  headers.forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      const isOpen = header.classList.contains('active');

      // Close others (optional, but cleaner)
      document.querySelectorAll('.accordion-header').forEach(h => {
        h.classList.remove('active');
        h.nextElementSibling.style.maxHeight = null;
      });

      if (!isOpen) {
        header.classList.add('active');
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });
}

/* Size Selector & Price Update */
function initSizeSelector() {
  const sizeBtns = document.querySelectorAll('.size-btn');
  const priceDisplay = document.querySelector('.pd-price');
  const productImage = document.querySelector('.pd-image img');

  if (sizeBtns.length > 0 && priceDisplay) {
    sizeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all
        sizeBtns.forEach(b => b.classList.remove('active'));
        // Add to clicked
        btn.classList.add('active');
        // Update price
        const newPrice = btn.getAttribute('data-price');
        if (newPrice) {
          priceDisplay.textContent = newPrice;

          // Optional: simple fade animation
          priceDisplay.style.opacity = 0;
          setTimeout(() => priceDisplay.style.opacity = 1, 150);
        }

        // Resize image based on size
        if (productImage) {
          const sizeText = btn.textContent.trim();
          let scale = 1;
          if (sizeText.includes('60g')) {
            scale = 1.15;
          } else if (sizeText.includes('100g')) {
            scale = 1.35;
          }
          productImage.style.transform = `scale(${scale})`;
          productImage.style.transition = 'transform 0.4s ease-out';
        }
      });
    });
  }
}

/* Buy Modal */
function initBuyModal() {
  const buyBtns = document.querySelectorAll('.js-buy-btn');
  const modal = document.querySelector('#buy-modal');
  const closeBtn = document.querySelector('.modal-close');
  const overlay = document.querySelector('.modal-overlay');

  if (buyBtns.length > 0 && modal && overlay) {
    const openModal = (e) => {
      e.preventDefault();
      overlay.classList.add('open');
      overlay.setAttribute('aria-hidden', 'false');
    };

    const closeModal = () => {
      overlay.classList.remove('open');
      overlay.setAttribute('aria-hidden', 'true');
    };

    buyBtns.forEach(btn => btn.addEventListener('click', openModal));
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });

    // Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('open')) {
        closeModal();
      }
    });
  }
}

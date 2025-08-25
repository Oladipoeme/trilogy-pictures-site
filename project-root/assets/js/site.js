// assets/js/site.js

document.addEventListener('DOMContentLoaded', () => {
    const blackout   = document.getElementById('blackout');
    const ccTrigger  = document.getElementById('ccTrigger');
    const overlay    = document.getElementById('commandCenter');
    const ccCloseBtn = document.getElementById('ccClose');
    const panelInner = document.querySelector('.cc-panel-inner');
  
    // Global page fade-in (800ms via CSS)
    document.body.classList.add('loaded');
  
    // Fade-out navigation helper (matches 0.9s CSS blackout)
    function navigateWithFade(url) {
      if (!url) return;
      blackout?.classList.add('on');
      setTimeout(() => { window.location.href = url; }, 950);
    }
  
    // Intercept internal links (outside Command Center)
    document.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      if (
        href &&
        !href.startsWith('#') &&
        !href.startsWith('mailto:') &&
        !href.startsWith('http') &&
        !link.closest('.cc-bars')
      ) {
        link.addEventListener('click', e => {
          e.preventDefault();
          navigateWithFade(href);
        });
      }
    });
  
    if (!ccTrigger || !overlay) return;
  
    let isOpen = false;
    let hoverIntent;
  
    const open = () => {
      if (isOpen) return;
      overlay.classList.add('show');
      overlay.setAttribute('aria-hidden', 'false');
      ccTrigger.setAttribute('aria-expanded', 'true');
      isOpen = true;
      ccCloseBtn?.focus?.();
    };
  
    const close = () => {
      if (!isOpen) return;
      overlay.classList.remove('show');
      overlay.setAttribute('aria-hidden', 'true');
      ccTrigger.setAttribute('aria-expanded', 'false');
      isOpen = false;
      ccTrigger?.focus?.();
    };
  
    // Click to toggle
    ccTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      isOpen ? close() : open();
    });
  
    // Hover-to-open (desktop only)
    ccTrigger.addEventListener('mouseenter', () => {
      if (window.matchMedia('(hover:hover)').matches) {
        clearTimeout(hoverIntent);
        open();
      }
    });
  
    // Leave overlay to close after a short delay
    overlay.addEventListener('mouseleave', () => {
      if (window.matchMedia('(hover:hover)').matches) {
        hoverIntent = setTimeout(close, 250);
      }
    });
  
    // X button
    ccCloseBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      close();
    });
  
    // Click outside panel closes overlay
    overlay.addEventListener('click', () => close());
  
    // Stop clicks inside panel from closing
    panelInner?.addEventListener('click', (e) => e.stopPropagation());
  
    // ESC key closes
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });
  
    // CC links: close + fade navigate
    overlay.querySelectorAll('.cc-bars a').forEach(a => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        const url = a.getAttribute('href');
        close();
        navigateWithFade(url);
      });
    });
  });
  
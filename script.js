document.addEventListener('DOMContentLoaded', () => {

  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('primary-nav');
  const navList = nav ? nav.querySelector('.nav-list') : null;
  const yearSpan = document.getElementById('year');

  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  function setNavOpen(open) {
    if (open) {
      nav.classList.add('mobile-open');
      navToggle.setAttribute('aria-expanded', 'true');
    } else {
      nav.classList.remove('mobile-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  }

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      setNavOpen(!isExpanded);
    });
  }

  if (navList) {
    navList.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        setNavOpen(false);
      }
    });
  }


  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      

      if (href === '#' || !href.startsWith('#')) {
        return;
      }

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        setNavOpen(false);

        const headerHeight = document.querySelector('.site-header').offsetHeight;
        const targetPosition = target.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  let lastScroll = 0;
  const header = document.querySelector('.site-header');

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    if (currentScroll > 0) {
      header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
    } else {
      header.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
  });

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.skill-group, .experience-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      setNavOpen(false);
    }
  });
});

import { DotLottie } from '@lottiefiles/dotlottie-web';

const typewriterTexts = [
  `<span class="system">System</span>.<span class="out">out</span>.<span class="print-write">println</span><span class="parenthesis-b">(</span><span class="message">"Computer Science Graduate"</span><span class="parenthesis-b">)</span>;`,
  `<span class="document"><span style="color: var(--bs-body-color)">&lt;</span>Web Developer<span style="color: var(--bs-body-color)">/&gt;</span></span>`,
  `<span class="document">document</span>.<span class="print-write">write</span><span class="parenthesis-a">(</span><span class="message">"Full-Stack Developer"</span><span class="parenthesis-a">)</span>;`,
  `<span class="select">SELECT</span><span class="column-name"> DATA_ENGINEER</span>`,
  `<span class="print-write">print</span><span class="parenthesis-a">(</span><span class="message">"Data Scientist"</span><span class="parenthesis-a">)</span>`,
  `<span class="document">Console</span>.<span class="document">WriteLine</span><span class="parenthesis-a">(</span><span class="message">"Computer Science Graduate"</span><span class="parenthesis-a">)</span>;`,
  `<span class="class">.Web-Developer</span><span class="parenthesis-a"> {}</span>`,
  `<span class="let">let</span><span class="role"> role</span>:<span class="string"> string</span> = <span class="message">"Full-Stack Developer"</span>;`,
  `<span class="print-write">print</span><span class="parenthesis-a">(</span><span class="message">"Data Engineer"</span><span class="parenthesis-a">)</span>`,
  `<span class="print-write">cat</span><span class="parenthesis-a">(</span><span class="message">"Data Scientist"</span><span class="parenthesis-a">)</span>`
];

function runTypewriter(element, text, callback) {
  const plainText = text.replace(/<[^>]+>/g, '');
  let charIndex = 0;
  let html = '';
  let count = 0;

  function type() {
    charIndex++;
    // Reconstruct HTML
    html = '';
    count = 0;
    text.replace(/(<[^>]+>)|([^<]+)/g, (m, tag, txt) => {
      if (tag) html += tag;
      else if (txt) {
        let remain = charIndex - count;
        if (remain > 0) {
          html += txt.substring(0, remain);
          count += txt.length;
        }
      }
      return '';
    });
    element.innerHTML = html + '<span class="typewriter-dash">|</span>';
    if (charIndex < plainText.length) {
      setTimeout(type, 60);
    } else {
      element.innerHTML = html; // Remove dash at end
      if (callback) callback();
    }
  }
  type();
}

document.addEventListener("DOMContentLoaded", () => {
  const restOfContent = document.querySelectorAll('#content > *:not(#intro)');
  const footer = document.querySelector('footer');
  const introHeaders = document.querySelectorAll('#intro-text .intro-header');
  const introTypewriter = document.querySelector('#intro-text .intro-typewriter');
  const introDescription = document.querySelector('#intro-text .intro-description');
  const navbar = document.querySelector('nav');
  const socials = document.getElementById('socials');
  const typewriterSpan = document.getElementById('typewriter');
  const scrollspyNav = document.getElementById('scrollspy-nav');

  gsap.set([restOfContent, footer], { opacity: 0 });
  gsap.set([introHeaders, introTypewriter, introDescription], { opacity: 0 });

  function showRestOfPage() {
    gsap.to([restOfContent, footer], { opacity: 1, duration: 1 });
  }

  if (!localStorage.getItem('visited')) {
    // Animate headers in
    gsap.to(introHeaders, {
      opacity: 1,
      duration: 0.7,
      stagger: 0.7,
      onComplete: () => {
        // Animate typewriter container in
        gsap.to(introTypewriter, {
          opacity: 1,
          duration: 0.7,
          onComplete: () => {
            // Start typewriter effect for first line
            runTypewriter(typewriterSpan, typewriterTexts[0], () => {
              // Fade in navbar, socials, and intro animation
              gsap.to([navbar, socials, scrollspyNav], {
                opacity: 1,
                duration: 0.7,
                onComplete: () => {
                  // Animate description in
                  gsap.to(introDescription, {
                    opacity: 1,
                    duration: 0.7,
                    onComplete: () => {
                      // Fade in rest of page
                      showRestOfPage();
                      localStorage.setItem('visited', 'true');
                      //Theme toggle, dark then light
                      setTimeout(() => {
                        toggleTheme();
                        setTimeout(() => {
                          toggleTheme();
                        }, 2500);
                      }, 2000);
                      // Start typewriter loop
                      textIndex = 0;
                      charIndex = typewriterTexts[0].replace(/<[^>]+>/g, '').length;
                      isDeleting = true;
                      setTimeout(type, 500);
                    }
                  });
                }
              });
            });
          }
        });
      }
    });
  } else {
    // Show everything instantly
    gsap.set([navbar, socials, scrollspyNav, restOfContent, footer, introHeaders, introTypewriter, introDescription], { opacity: 1 });
    // Start loop
    textIndex = 0;
    charIndex = 0;
    isDeleting = false;
    type();
  }

  // INTRO ANIMATION
  const dotlottie = new DotLottie ({
    autoplay: true,
    loop: true,
    canvas: document.querySelector('#dotlottie-canvas'),
    src: "https://lottie.host/a1bd321c-ed9e-4184-8a2f-db39b0512094/gVrbk5r8vz.lottie",
  });

  // THEME TOGGLE
  document.getElementById("themeToggle").addEventListener("click", toggleTheme);
  document.getElementById("themeToggleScrollSpy").addEventListener("click", toggleTheme);
  const themeToggleMobile = document.getElementById("themeToggleMobile");
  if (themeToggleMobile) {
      themeToggleMobile.addEventListener("click", toggleTheme);
  }
  function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute("data-bs-theme");
    html.setAttribute("data-bs-theme", currentTheme === "light" ? "dark" : "light");
  }
  //BUBBLE ANIMATION
  const cloud = document.querySelector('.icon-cloud');
  if (cloud) {
    const icons = cloud.querySelectorAll('.skill-icon');
    const cloudWidth = cloud.offsetWidth;
    const cloudHeight = cloud.offsetHeight;
    const iconSize = 60;
    const padding = 20;

    icons.forEach(icon => {
      // Random Initial Position
      const x = Math.random() * (cloudWidth - iconSize - padding * 2) + padding;
      const y = Math.random() * (cloudHeight - iconSize - padding * 2) + padding;
      icon.style.left = `${x}px`;
      icon.style.top = `${y}px`;

      // Animate
      gsap.to(icon, {
        x: `+=${Math.random() * 120 - 60}`,
        y: `+=${Math.random() * 120 - 60}`,
        repeat: -1,
        yoyo: true,
        duration: 2 + Math.random() * 2,
        ease: "sine.inOut",
        delay: Math.random()
      });
    });
  }

  // SKILL TOOLTIP
  document.querySelectorAll('#work-projects .position-relative').forEach(group => {
    const tooltip = group.querySelector('.skill-tooltip');
    group.querySelectorAll('.skill').forEach(icon => {
      icon.addEventListener('mouseenter', () => {
        tooltip.textContent = icon.alt;
        tooltip.style.opacity = 1;
      });
      icon.addEventListener('mouseleave', () => {
        tooltip.style.opacity = 0;
      });
    });
  });

  // AUTO SCROLL
  const autoSections = [
  document.getElementById('intro'),
  document.getElementById('about-me'),
  document.getElementById('work-projects')
  ];

  let autoScrollEnabled = !localStorage.getItem('visited');
  let currentSection = 0;
  let isAutoScrolling = false;

  function scrollToSection(index) {
    if (!autoScrollEnabled) return;
    if (index < 0 || index >= autoSections.length) return;
    isAutoScrolling = true;
    autoSections[index].scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => { isAutoScrolling = false; }, 700);
  }

  function handleWheel(e) {
    if (!autoScrollEnabled || isAutoScrolling) return;
    e.preventDefault();
    if (e.deltaY > 0 && currentSection < autoSections.length - 1) {
      currentSection++;
      scrollToSection(currentSection);
      if (autoSections[currentSection].id === 'work-projects') {
        disableAutoScroll();
      }
    } else if (e.deltaY < 0 && currentSection > 0) {
      currentSection--;
      scrollToSection(currentSection);
    }
  }

  //Touch Navigation
  let touchStartY = null;
  function handleTouchStart(e) {
    if (!autoScrollEnabled) return;
    if (e.touches.length === 1) {
      touchStartY = e.touches[0].clientY;
    }
  }
  function handleTouchMove(e) {
    if (!autoScrollEnabled || isAutoScrolling || touchStartY === null) return;
    const touchEndY = e.touches[0].clientY;
    const deltaY = touchStartY - touchEndY;
    if (Math.abs(deltaY) > 60) { // Sensitivity threshold
      if (deltaY > 0 && currentSection < autoSections.length - 1) {
        currentSection++;
        scrollToSection(currentSection);
        if (autoSections[currentSection].id === 'work-projects') {
          disableAutoScroll();
        }
      } else if (deltaY < 0 && currentSection > 0) {
        currentSection--;
        scrollToSection(currentSection);
      }
      touchStartY = null; // Prevent multiple triggers
    }
  }
  function handleTouchEnd() {
    touchStartY = null;
  }
  
  //Disable Auto Scroll
  function disableAutoScroll() {
    autoScrollEnabled = false;
    window.removeEventListener('wheel', handleWheel, { passive: false });
    window.removeEventListener('touchstart', handleTouchStart, { passive: false });
    window.removeEventListener('touchmove', handleTouchMove, { passive: false });
    window.removeEventListener('touchend', handleTouchEnd, { passive: false });
  }

  // Enable on large screens or touch devices
  if (window.innerWidth > 991 || 'ontouchstart' in window) {
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: false });
  }

  //Keep in sync
  function updateCurrentSection() {
  if (!autoScrollEnabled) return;
    for (let i = 0; i < autoSections.length; i++) {
      const rect = autoSections[i].getBoundingClientRect();
      if (rect.top <= 100 && rect.bottom > 100) {
        currentSection = i;
        break;
      }
    }
  }
  window.addEventListener('scroll', updateCurrentSection);

  // EmailJS
  const PUBLIC_KEY = 'AnMHiTtLNpK73Zr6h';
  const SERVICE_ID = 'service_ip7x2fm';
  const TEMPLATE_ID = 'template_qy2l3af';

  window.emailjs.init(PUBLIC_KEY);

  const form = document.getElementById('contact-form');
  if(form) {
    form.addEventListener('submit', function(e){
      e.preventDefault();

      window.emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, this)
        .then(function() {
          alert('Message sent!');
          form.reset();
        }, (error) => {
          alert('Failed to send message.');
          console.error('EmailJS error:', error);
        });
    });
  }
});

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterElement = document.getElementById('typewriter');

function type() {
  const currentText = typewriterTexts[textIndex];
  const plainText = currentText.replace(/<[^>]+>/g, '');
  let displayText;

  if (isDeleting) {
    charIndex--;
    displayText = plainText.substring(0, charIndex);
  } else {
    charIndex++;
    displayText = plainText.substring(0, charIndex);
  }

  // Reconstruct HTML
  let html = '';
  let count = 0;
  currentText.replace(/(<[^>]+>)|([^<]+)/g, (m, tag, text) => {
    if (tag) {
      html += tag;
    } else if (text) {
      let remain = charIndex - count;
      if (remain > 0) {
        html += text.substring(0, remain);
        count += text.length;
      }
    }
    return '';
  });

  typewriterElement.innerHTML = html + '<span class="typewriter-dash">|</span>';

  let typeSpeed = isDeleting ? 30 : 60;

  if (!isDeleting && charIndex === plainText.length) {
    setTimeout(() => isDeleting = true, 1000);
    setTimeout(type, 1000);
    return;
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % typewriterTexts.length;
    setTimeout(type, 500);
    return;
  }

  setTimeout(type, typeSpeed);
}
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
  const typewriterSpan = document.getElementById('typewriter');

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
      stagger: 0.2,
      onComplete: () => {
        // Animate typewriter container in
        gsap.to(introTypewriter, {
          opacity: 1,
          duration: 0.7,
          onComplete: () => {
            // Start typewriter effect
            runTypewriter(typewriterSpan, typewriterTexts[0], () => {
              // Animate description in
              gsap.to(introDescription, {
                opacity: 1,
                duration: 0.7,
                onComplete: () => {
                  // Fade in rest of page
                  showRestOfPage();
                  localStorage.setItem('visited', 'true');
                  // Start loop from second line
                  textIndex = 1;
                  charIndex = 0;
                  isDeleting = false;
                  setTimeout(type, 500);
                }
              });
            });
          }
        });
      }
    });
  } else {
    // Show everything instantly
    gsap.set([restOfContent, footer, introHeaders, introTypewriter, introDescription], { opacity: 1 });
    // Start loop
    textIndex = 0;
    charIndex = 0;
    isDeleting = false;
    type();
  }

  const dotlottie = new DotLottie ({
    autoplay: true,
    loop: true,
    canvas: document.querySelector('#dotlottie-canvas'),
    src: "https://lottie.host/a1bd321c-ed9e-4184-8a2f-db39b0512094/gVrbk5r8vz.lottie",
  });

  document.getElementById("themeToggle").addEventListener("click", () => {
    const html = document.documentElement;
    const currentTheme = html.getAttribute("data-bs-theme");
    html.setAttribute("data-bs-theme", currentTheme === "light" ? "dark" : "light");
  });

  //Bubble Animation
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

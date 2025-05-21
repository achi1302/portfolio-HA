document.getElementById("themeToggle").addEventListener("click", () => {
  const html = document.documentElement;
  const currentTheme = html.getAttribute("data-bs-theme");
  html.setAttribute("data-bs-theme", currentTheme === "light" ? "dark" : "light");
});

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

const typewriterElement = document.getElementById('typewriter');
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const currentText = typewriterTexts[textIndex];
  const plainText = currentText.replace(/<[^>]+>/g, ''); // Remove HTML tags for typing effect
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

type();

document.addEventListener("DOMContentLoaded", () => {
  const cloud = document.querySelector('.icon-cloud');
  const icons = document.querySelectorAll('.skill-icon');
  const cloudWidth = cloud.offsetWidth;
  const cloudHeight = cloud.offsetHeight;
  const iconSize = 60;
  const padding = 20;

  icons.forEach(icon => {
    // Radom Initial Position
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
    })
  })
});

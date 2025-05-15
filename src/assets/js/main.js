document.getElementById("themeToggle").addEventListener("click", () => {
  const html = document.documentElement;
  const currentTheme = html.getAttribute("data-bs-theme");
  html.setAttribute("data-bs-theme", currentTheme === "light" ? "dark" : "light");
});
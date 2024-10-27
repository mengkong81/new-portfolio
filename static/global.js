console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

// Insert dark mode switch HTML at the start of the body
document.body.insertAdjacentHTML(
  'afterbegin',
  `
    <label class="color-scheme" style="position: absolute; top: 1rem; right: 1rem; font-size: 80%;">
      Theme:
      <select id="color-scheme-selector">
        <option value="light dark">Automatic</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </label>
  `
);
const select = document.querySelector("#color-scheme-selector");

// Function to set the color scheme
function setColorScheme(scheme) {
  document.documentElement.style.setProperty('color-scheme', scheme);
  localStorage.colorScheme = scheme; // Save to localStorage
}

// Set the initial color scheme from localStorage if it exists
if ("colorScheme" in localStorage) {
  select.value = localStorage.colorScheme;
  setColorScheme(localStorage.colorScheme);
}

// Event listener for changing the color scheme
select.addEventListener('input', (event) => {
  const scheme = event.target.value;
  setColorScheme(scheme);
});

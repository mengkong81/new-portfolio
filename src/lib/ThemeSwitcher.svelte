<script>
  // Load the color scheme from localStorage only in the browser
  let colorScheme = "light dark";
  if (typeof window !== 'undefined') {
    colorScheme = localStorage.getItem("colorScheme") || "light dark";
  }

  // Function to set the color scheme
  function setColorScheme(scheme) {
    document.documentElement.style.setProperty('color-scheme', scheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem("colorScheme", scheme);
    }
  }

  // Call the function on page load with the current scheme
  setColorScheme(colorScheme);

  // Function to handle user input (since bind:value already updates colorScheme, this is optional)
  function updateScheme(event) {
    setColorScheme(event.target.value);
  }
</script>

<!-- HTML structure -->
<label class="color-scheme" style="position: absolute; top: 1rem; right: 1rem; font-size: 80%;">
  Theme:
  <select bind:value={colorScheme} on:input={updateScheme}>
    <option value="light dark">Automatic</option>
    <option value="light">Light</option>
    <option value="dark">Dark</option>
  </select>
</label>

<style>
  /* Optionally, you can add specific styles here for your theme switcher */
</style>

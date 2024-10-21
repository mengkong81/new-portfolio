<script>
    // Load the color scheme from localStorage
    let colorScheme = localStorage.getItem("colorScheme") || "light dark";
  
    // Function to set the color scheme
    function setColorScheme(scheme) {
      document.documentElement.style.setProperty('color-scheme', scheme);
      localStorage.setItem("colorScheme", scheme);
    }
  
    // Call the function on page load with the current scheme
    setColorScheme(colorScheme);
  
    // Update the theme when the user changes the selection
    function updateScheme(event) {
      colorScheme = event.target.value;
      setColorScheme(colorScheme);
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
  
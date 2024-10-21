<script>
    let theme = localStorage.getItem('theme') || 'light';  // Get the theme from localStorage or set to light

    // Function to toggle between dark and light mode
    function toggleTheme() {
        theme = theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);  // Store the theme preference
    }

    // On load, set the theme
    document.documentElement.setAttribute('data-theme', theme);
</script>

<!-- Simple toggle switch -->
<label class="theme-switch">
    <input type="checkbox" checked={theme === 'dark'} on:change={toggleTheme}>
    <span>Dark Mode</span>
</label>

<style>
    /* Simple styling for the theme switcher */
    .theme-switch {
        position: absolute;
        top: 10px;
        right: 20px;
        font-size: 1rem;
    }
</style>

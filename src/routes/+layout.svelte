<script>
<<<<<<< HEAD
    import { page } from '$app/stores';  // Import $page store
    import '../style.css';  // Import global CSS for hot-reloading

    // Navigation links
    let pages = [
        { url: './', title: 'Home' },
        { url: './projects', title: 'Projects' },
        { url: './contact', title: 'Contact' },
        { url: 'https://linkedin.com/in/mengkongaun', title: 'LinkedIn Profile' },
        { url: 'https://github.com/mengkong81', title: 'GitHub' }
    ];

    // Theme switcher logic
    let colorScheme = localStorage.colorScheme ?? 'light dark';
    let root = globalThis?.document?.documentElement;

    // Reactive statement: Apply the color scheme to the root element
    $: root?.style.setProperty('color-scheme', colorScheme);

    // Save the selected color scheme to localStorage
    $: localStorage.colorScheme = colorScheme;
</script>

<!-- Navigation Menu -->
<nav>
    {#each pages as p }
        <a href={p.url} target={p.url.startsWith('http') ? '_blank' : null} class:current={'.' + $page.route.id === p.url}>
            {p.title}
        </a>
    {/each}
</nav>

<!-- Theme Switcher -->
<label class="color-scheme" style="position: absolute; top: 1rem; right: 1rem; font-size: 80%;">
    Theme:
    <select bind:value={colorScheme}>
        <option value="light dark">Automatic</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
    </select>
</label>

=======
   import { page } from '$app/stores';  // Import the $page store
   import '../style.css';  // Import global CSS
   import ThemeSwitcher from '$lib/ThemeSwitcher.svelte';  // Import ThemeSwitcher component

   let pages = [
      { url: './', title: 'Home' },
      { url: './projects', title: 'Projects' },
      { url: './contact', title: 'Contact' },
      { url: 'https://linkedin.com/in/mengkongaun', title: 'Profile' },
      { url: 'https://github.com/mengkong81', title: 'GitHub' }
   ];

   // Dark mode switcher logic
   function setColorScheme(scheme) {
  document.documentElement.style.setProperty('color-scheme', scheme);  // Apply to the root element
  localStorage.setItem("colorScheme", scheme);  // Save the user's choice in localStorage
}

   let colorScheme = localStorage.getItem("colorScheme") || "light dark";
   setColorScheme(colorScheme);

   function updateScheme(event) {
       const scheme = event.target.value;
       setColorScheme(scheme);
   }
</script>

<!-- HTML for Navigation and Dark Mode Switcher -->
<nav>
   {#each pages as p}
      <a href={p.url} 
         class:current={'.' + $page.url.pathname === p.url} 
         target={ p.url.startsWith('http') ? '_blank' : null }>
         {p.title}
      </a>
   {/each}
</nav>

<!-- Dark mode switcher -->
<label class="color-scheme" style="position: absolute; top: 1rem; right: 1rem; font-size: 80%;">
   Theme:
   <select on:input={updateScheme} bind:value={colorScheme}>
      <option value="light dark">Automatic</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
   </select>
</label>

<!-- Theme Switcher Component -->
<ThemeSwitcher />

<!-- Page Content Slot -->
>>>>>>> parent of 53a08ca (Working Lab 4)
<slot />

<!-- Styles for Navigation and Dark Mode -->
<style>
<<<<<<< HEAD
    nav {
        background-color: #f8f8f8;
        padding: 1rem;
        display: flex;
        gap: 10px;
    }

    a {
        text-decoration: none;
        color: black;
        padding: 0.5em;
        font-weight: bold;
    }

    a:hover {
        background-color: #ddd;
    }

    .current {
        font-weight: bold;
        color: lightseagreen;
        border-bottom: 2px solid lightseagreen;
    }

    .color-scheme {
        background-color: #f0f0f0;
        padding: 0.5rem;
        border-radius: 4px;
    }

    select {
        margin-left: 0.5rem;
    }
=======
   nav {
      background-color: #f8f8f8;
      padding: 1rem;
   }

   a {
      margin-right: 15px;
      text-decoration: none;
      color: black;
   }

   a.current {
      font-weight: bold;
      color: lightseagreen;  /* Highlight the current page */
   }

   .color-scheme {
      font-size: 80%;
      position: absolute;
      top: 1rem;
      right: 1rem;
   }
>>>>>>> parent of 53a08ca (Working Lab 4)
</style>
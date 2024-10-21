<script>
   import { page } from '$app/stores';  // Import the $page store
   import '../style.css';  // Import global CSS
   let pages = [
      { url: './', title: 'Home' },
      { url: './projects', title: 'Projects' },
      { url: './contact', title: 'Contact' },
      { url: 'https://linkedin.com/in/mengkongaun', title: 'Profile' },
      { url: 'https://github.com/mengkong81', title: 'GitHub' }
   ];

   // Dark mode switcher logic (from your previous global.js code)
   // Function to set the color scheme
   function setColorScheme(scheme) {
       document.documentElement.style.setProperty('color-scheme', scheme);
       localStorage.colorScheme = scheme; // Save to localStorage
   }

   // Set the initial color scheme from localStorage if it exists
   let colorScheme = localStorage.getItem("colorScheme") || "light dark";
   setColorScheme(colorScheme);

   // Function to handle changing the theme
   function updateScheme(event) {
       const scheme = event.target.value;
       setColorScheme(scheme);
   }
</script>

<nav>
   {#each pages as p }
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

<slot />

<style>
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
</style>

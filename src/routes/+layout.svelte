<script>
    import { page } from '$app/stores';  // Import $page store
    import '../style.css';  // Import global CSS for hot-reloading
 
    let colorScheme = 'light dark'; // Initialize color scheme variable
    let root = globalThis?.document?.documentElement;
 
    // Reactive statement to update the color scheme dynamically
    $: root?.style.setProperty('color-scheme', colorScheme);
    
    // Load color scheme from localStorage on page load
    let localStorage = globalThis.localStorage ?? {};
    colorScheme = localStorage.colorScheme ?? 'light dark';
 
    // Save color scheme to localStorage whenever it changes
    $: localStorage.colorScheme = colorScheme;
 
    // Pages for navigation
    let pages = [
        { url: './', title: 'Home' },
        { url: './projects', title: 'Projects' },
        { url: './contact', title: 'Contact' },
        { url: './meta', title: 'Meta' },
        { url: 'https://linkedin.com/in/mengkongaun', title: 'LinkedIn Profile' },
        { url: 'https://github.com/mengkong81', title: 'GitHub' }
    ];
 </script>
 
 <nav>
    {#each pages as p }
        <a href={p.url} target={p.url.startsWith('http') ? '_blank' : null} class:current={'.' + $page.route.id === p.url}>
            {p.title}
        </a>
    {/each}
 </nav>
 
 <!-- Theme switcher -->
 <label class="color-scheme">
   Theme:
   <select bind:value={colorScheme}>
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
        position: absolute;
        top: 1rem;
        right: 1rem;
        font-size: 80%;
    }
 </style>
 
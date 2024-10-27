<script>
   import { page } from '$app/stores';  // Import $page store
   import '../style.css';  // Import global CSS for hot-reloading

   let pages = [
       { url: './', title: 'Home' },
       { url: './projects', title: 'Projects' },
       { url: './contact', title: 'Contact' },
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
</style>

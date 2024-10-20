<script>
    import { page } from '$app/stores';  // Import the $page store
    import '../style.css'; // Import global styles

    let pages = [
       { url: '/', title: 'Home' },
       { url: '/projects', title: 'Projects' },
       { url: '/contact', title: 'Contact' },
       { url: 'https://linkedin.com/in/mengkongaun', title: 'Profile' },
       { url: 'https://github.com/mengkong81', title: 'GitHub' }
    ];
</script>

<nav>
    {#each pages as p}
       <a href={p.url} class:current={!p.url.startsWith('http') && $page.url.pathname === p.url} target={p.url.startsWith('http') ? '_blank' : null}>
          {p.title}
       </a>
    {/each}
</nav>

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
       color: blue;  /* Highlight the current page */
    }

    a:hover {
        color: darkblue;
    }
</style>

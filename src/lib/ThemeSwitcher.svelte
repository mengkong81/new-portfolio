<script>
    let theme = localStorage.getItem('theme') || 'light';
  
    function toggleTheme() {
      if (theme === 'light') {
        theme = 'dark';
        localStorage.setItem('theme', 'dark');
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        theme = 'light';
        localStorage.setItem('theme', 'light');
        document.documentElement.setAttribute('data-theme', 'light');
      }
    }
  
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
    }
  </script>
  
  <label>
    <input type="checkbox" on:change={toggleTheme} checked={theme === 'dark'}>
    Dark Mode
  </label>
  
  <style>
    label {
      font-size: 1.2rem;
      display: flex;
      align-items: center;
    }
  
    input[type="checkbox"] {
      margin-right: 0.5rem;
    }
  </style>
  
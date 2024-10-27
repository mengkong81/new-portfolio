<script>
    import projects from '$lib/projects.json';
  </script>
  
  <h1>{projects.length} Projects</h1>
  <p>Here is a showcase of my projects.</p>
  
  <!-- Projects grid container -->
  <div class="projects">
      {#each projects as p}
        <article>
            <h2>{p.title}</h2>
            <img src={p.image} alt="Project image">
            <p>{p.description}</p>
        </article>
      {/each}
  </div>
  
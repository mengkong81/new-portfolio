<script>
    import Project from '$lib/Project.svelte';
    import Pie from '$lib/Pie.svelte'; // Import the Pie component
    import projects from '$lib/projects.json';
</script>

<section>
    <h2>Project Distribution</h2>
    <Pie /> <!-- Render the Pie component here -->
</section>

<h1>{projects.length} Projects</h1>
<p>Here is a showcase of my projects.</p>

<div class="projects">
    {#each projects as p}
        <Project data={p} />
    {/each}
</div>

<!-- Adding the Pie component for visualization -->


<style>
  .projects {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1.5em;
  }
</style>

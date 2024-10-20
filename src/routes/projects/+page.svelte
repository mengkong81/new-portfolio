<script>
    import Project from '$lib/Project.svelte';
    import projects from '$lib/projects.json';
</script>

<h1>Projects ({projects.length})</h1>
<p>Here is a showcase of my projects.</p>

<div class="projects">
    {#each projects as p}
        <Project data={p} />
    {/each}
</div>

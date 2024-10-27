<script>
    import Project from '$lib/Project.svelte'; // Import the Project component
    export let projects = [];  // Accept projects as a prop
    export let hLevel = 2;     // Allow customization of heading level
</script>

<div class="projects">
    {#each projects as project}
        <Project data={project} hLevel={hLevel} />  <!-- Use the Project component -->
    {/each}
</div>

<style>
    /* Add any styling for the project list here */
    .projects {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
    }
</style>

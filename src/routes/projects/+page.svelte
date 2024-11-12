<script>
  import projects from '$lib/projects.json';
  import Project from '$lib/Project.svelte';
  import Pie from '$lib/Pie.svelte';
  import * as d3 from 'd3';

  let query = ''; // Initialize search query
  let selectedYearIndex = -1; // Initialize selected year index

  // Reactive filtered projects based on search query
  let filteredProjects;
  $: filteredProjects = projects.filter((project) => {
    let values = Object.values(project).join('\n').toLowerCase();
    return values.includes(query.toLowerCase());
  });

  // Reactive pie data based on filtered projects
  let pieData;
  $: {
    let rolledData = d3.rollups(
      filteredProjects,
      (v) => v.length,
      (d) => d.year
    );

    pieData = rolledData.map(([year, count]) => {
      return { value: count, label: year };
    });
  }

  // Determine the selected year based on the selectedYearIndex
  let selectedYear;
  $: selectedYear = selectedYearIndex > -1 ? pieData[selectedYearIndex]?.label : null;

  // Filter projects by the selected year if a year is selected
  let filteredByYear;
  $: filteredByYear = filteredProjects.filter((project) =>
    selectedYear ? project.year === selectedYear : true
  );
</script>

<h1>{filteredByYear.length} Projects</h1>

<!-- Pie chart with reactive data and year selection binding -->
<Pie data={pieData} bind:selectedIndex={selectedYearIndex} />

<!-- Search input -->
<input
  type="search"
  bind:value="{query}"
  aria-label="Search projects"
  placeholder="🔍 Search projects…"
/>

<p>Here is a showcase of my projects.</p>

<!-- Projects grid container showing only filtered projects by year -->
<div class="projects">
  {#each filteredByYear as p}
    <Project data={p} />
  {/each}
</div>

<style>
  .projects {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5em;
  }

  /* Optional styling for the search input */
  input[type="search"] {
    padding: 0.5em;
    margin-bottom: 1em;
    width: 100%;
    max-width: 400px;
    font-size: 1em;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
</style>

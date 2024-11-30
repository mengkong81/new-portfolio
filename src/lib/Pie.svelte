<script>
  import * as d3 from 'd3';
  export let data = []; // Accepts pieData as a prop
  export let innerRadius = 0;
  export let outerRadius = 80;
  export let selectedIndex = -1;

  let arcs;
  $: {
    const arcGenerator = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
    const sliceGenerator = d3.pie().value(d => d.value).sort(null);
    const arcData = sliceGenerator(data);
    arcs = arcData.map(d => ({
      path: arcGenerator(d),
      color: d3.schemeTableau10[d.index % 10],
      label: d.data.label,
      value: d.data.value
    }));
  }

  function toggleWedge(index) {
    selectedIndex = selectedIndex === index ? -1 : index;
  }
</script>

<div class="container">
  <svg viewBox="-150 -150 300 300" preserveAspectRatio="xMidYMid meet" class="pie-chart">
    {#each arcs as arc, index (arc.label)}
      <path
        d={arc.path}
        fill={arc.color}
        tabindex="0"
        role="button"
        aria-label="{arc.label}"
        class:selected={selectedIndex === index}
        on:click={() => toggleWedge(index)}
        on:keydown={(e) => e.key === 'Enter' && toggleWedge(index)}
      />
    {/each}
  </svg>

  <ul class="legend">
    {#each arcs as arc, index (arc.label)}
      <li
        role="button"
        tabindex="0"
        class:selected={selectedIndex === index}
        on:click={() => toggleWedge(index)}
        on:keydown={(e) => e.key === 'Enter' && toggleWedge(index)}
      >
        <span class="swatch" style="background-color: {arc.color};"></span>
        {arc.label} ({arc.value})
      </li>
    {/each}
  </ul>
</div>

<style>
  .container {
    display: flex;
    gap: 1em;
    align-items: center;
  }
  .pie-chart {
    max-width: 300px;
    margin: 1rem auto;
  }
  .legend {
    list-style: none;
    padding: 1em;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    border: 1px solid #ddd;
    border-radius: 8px;
  }
  .legend li {
    display: flex;
    align-items: center;
    gap: 0.5em;
    cursor: pointer;
  }
  .swatch {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
  }
  path {
    cursor: pointer;
    transition: transform 300ms ease, fill-opacity 300ms ease;
  }
  .selected path {
    transform: scale(1.1);
    fill-opacity: 1;
  }
  svg:has(path:hover) path:not(:hover) {
    fill-opacity: 0.5;
  }
</style>

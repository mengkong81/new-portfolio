<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';

    let data = [];  // Stores lines of code data
    let commits = [];

    // Load CSV data on component mount
    onMount(async () => {
        try {
            data = await d3.csv('/loc.csv', (row) => ({
                ...row,
                line: +row.line || 0,          // Convert line to a number
                depth: +row.depth || 0,        // Convert depth to a number
                length: +row.length || 0,      // Convert length to a number
                date: new Date(row.date + 'T00:00' + row.timezone),
                datetime: new Date(row.datetime)
            }));
            commits = d3.groups(data, d => d.commit);
        } catch (error) {
            console.error("Error loading or processing CSV data:", error);
        }
    });

    // Computed statistics with checks
    $: totalLOC = data.length || 0;
    $: totalCommits = commits.length || 0;
    $: maxFileLength = data.length > 0 ? d3.max(data, d => d.line) : 0;
    $: avgLineLength = data.length > 0 ? d3.mean(data, d => d.length).toFixed(2) : 0;
    $: numberOfFiles = data.length > 0 ? d3.group(data, d => d.file).size : 0;
    $: maxDepth = data.length > 0 ? d3.max(data, d => d.depth) : 0;
</script>

<h1>Code Meta-Analysis</h1>

<h2>Summary</h2>
<dl class="stats">
  <div class="stat-item">
    <dt>Total <abbr title="Lines of code">LOC</abbr></dt>
    <dd>{totalLOC}</dd>
  </div>
  <div class="stat-item">
    <dt>Commits</dt>
    <dd>{totalCommits}</dd>
  </div>
  <div class="stat-item">
    <dt>Max Lines</dt>
    <dd>{maxFileLength}</dd>
  </div>
  <div class="stat-item">
    <dt>Avg Lines</dt>
    <dd>{avgLineLength}</dd>
  </div>
  <div class="stat-item">
    <dt>Number of Files</dt>
    <dd>{numberOfFiles}</dd>
  </div>
  <div class="stat-item">
    <dt>Maximum Depth</dt>
    <dd>{maxDepth}</dd>
  </div>
</dl>
<style>
    .stats {
      display: flex; /* Use flexbox layout */
      justify-content: space-around; /* Distribute space evenly */
      gap: 1rem;
      text-align: center;
      margin-top: 2rem;
      flex-wrap: wrap; /* Wrap items if screen is too small */
    }
  
    .stat-item {
      min-width: 150px; /* Minimum width for each item */
      flex: 1;
    }
  
    .stat-item dt {
      font-weight: bold;
      font-size: 0.8em;
      color: #666;
      text-transform: uppercase;
      margin-bottom: 0.5rem;
    }
  
    .stat-item dd {
      font-size: 2em;
      margin: 0;
      color: #333;
    }
  
    .stats abbr {
      text-decoration: underline;
      cursor: help;
    }
  </style>
  
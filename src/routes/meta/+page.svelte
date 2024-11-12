<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';

    let data = []; // Stores lines of code data
    let commits = []; // Stores grouped commit data for scatterplot

    // SVG dimensions and margins for the scatterplot
    let width = 1000,
        height = 600,
        margin = { top: 20, right: 30, bottom: 40, left: 50 };

    let xScale, yScale; // Scales for the scatterplot
    let xAxis, yAxis, yAxisGridlines; // Axis and gridline elements

    // Load CSV data on component mount
    onMount(async () => {
        try {
            data = await d3.csv('/loc.csv', (row) => ({
                ...row,
                line: +row.line || 0, // Convert line to a number
                depth: +row.depth || 0, // Convert depth to a number
                length: +row.length || 0, // Convert length to a number
                date: new Date(row.date + 'T00:00' + row.timezone),
                datetime: new Date(row.datetime)
            }));
            commits = d3.groups(data, d => d.commit).map(([commit, lines]) => ({
                commit,
                datetime: new Date(lines[0].datetime),
                hourFrac: lines[0].datetime.getHours() + lines[0].datetime.getMinutes() / 60
            }));
            
            // Define the scales based on the data
            xScale = d3.scaleTime()
                .domain(d3.extent(commits, d => d.datetime))
                .range([margin.left, width - margin.right])
                .nice();

            yScale = d3.scaleLinear()
                .domain([0, 24])
                .range([height - margin.bottom, margin.top]);
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

    // Add the Y axis and gridline elements with D3
    $: {
        if (xScale && yScale) {
            d3.select(xAxis).call(d3.axisBottom(xScale));
            d3.select(yAxis).call(
                d3.axisLeft(yScale).tickFormat(d => `${String(d % 24).padStart(2, '0')}:00`)
            );
            d3.select(yAxisGridlines).call(
                d3.axisLeft(yScale).tickFormat('').tickSize(-width + margin.left + margin.right)
            );
        }
    }
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

<h2>Commits by Time of Day</h2>

<!-- Scatterplot SVG -->
<svg viewBox={`0 0 ${width} ${height}`}>
    <!-- Grid lines for Y axis -->
    <g class="gridlines" transform="translate({margin.left}, 0)" bind:this={yAxisGridlines} />

    <!-- X Axis -->
    <g transform="translate(0, {height - margin.bottom})" bind:this={xAxis} />
    
    <!-- Y Axis -->
    <g transform="translate({margin.left}, 0)" bind:this={yAxis} />

    <!-- Scatterplot circles -->
    <g class="dots">
        {#each commits as commit}
            <circle
                cx={xScale(commit.datetime)}
                cy={yScale(commit.hourFrac)}
                r="5"
                fill="steelblue"
            />
        {/each}
    </g>
</svg>


<style>
    .stats {
      display: flex;
      justify-content: space-around;
      gap: 1rem;
      text-align: center;
      margin-top: 2rem;
      flex-wrap: wrap;
    }
  
    .stat-item {
      min-width: 150px;
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

    /* SVG styling */
    svg {
        overflow: visible;
    }

    .gridlines {
        stroke-opacity: 0.2;
    }
    .gridlines line {
        stroke: #ccc;
    }
</style>

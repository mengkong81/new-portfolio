<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';

    let data = [];
    let commits = [];
    let width = 1000, height = 600, margin = { top: 20, right: 30, bottom: 40, left: 50 };
    let xScale, yScale, rScale, xAxis, yAxis, yAxisGridlines;
    let hoveredIndex = -1;
    let cursor = { x: 0, y: 0 };
    $: hoveredCommit = commits[hoveredIndex] ?? {};

    onMount(async () => {
        try {
            data = await d3.csv('/loc.csv', (row) => ({
                ...row,
                line: +row.line || 0,
                depth: +row.depth || 0,
                length: +row.length || 0,
                date: new Date(row.date + 'T00:00' + row.timezone),
                datetime: new Date(row.datetime)
            }));
            commits = d3.groups(data, d => d.commit).map(([commit, lines]) => ({
                commit,
                datetime: new Date(lines[0].datetime),
                hourFrac: lines[0].datetime.getHours() + lines[0].datetime.getMinutes() / 60,
                url: `https://github.com/your-repo/${commit}`,
                author: lines[0].author,
                linesEdited: lines.length
            }));

            // Sort commits so smaller dots appear on top of larger ones
            commits = d3.sort(commits, d => -d.linesEdited);

            // Define scales
            xScale = d3.scaleTime()
                .domain(d3.extent(commits, d => d.datetime))
                .range([margin.left, width - margin.right])
                .nice();

            yScale = d3.scaleLinear()
                .domain([0, 24])
                .range([height - margin.bottom, margin.top]);

            const minRadius = 2, maxRadius = 30;
            rScale = d3.scaleSqrt()
                .domain(d3.extent(commits, d => d.linesEdited))
                .range([minRadius, maxRadius]);
        } catch (error) {
            console.error("Error loading or processing CSV data:", error);
        }
    });

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
    <dd>{data.length || 0}</dd>
  </div>
  <div class="stat-item">
    <dt>Commits</dt>
    <dd>{commits.length || 0}</dd>
  </div>
  <div class="stat-item">
    <dt>Max Lines</dt>
    <dd>{data.length > 0 ? d3.max(data, d => d.line) : 0}</dd>
  </div>
  <div class="stat-item">
    <dt>Avg Lines</dt>
    <dd>{data.length > 0 ? d3.mean(data, d => d.length).toFixed(2) : 0}</dd>
  </div>
  <div class="stat-item">
    <dt>Number of Files</dt>
    <dd>{data.length > 0 ? d3.group(data, d => d.file).size : 0}</dd>
  </div>
  <div class="stat-item">
    <dt>Maximum Depth</dt>
    <dd>{data.length > 0 ? d3.max(data, d => d.depth) : 0}</dd>
  </div>
</dl>

<h2>Commits by Time of Day</h2>
<svg viewBox={`0 0 ${width} ${height}`}>
    <g class="gridlines" transform="translate({margin.left}, 0)" bind:this={yAxisGridlines} />
    <g transform="translate(0, {height - margin.bottom})" bind:this={xAxis} />
    <g transform="translate({margin.left}, 0)" bind:this={yAxis} />

    <!-- Scatterplot circles with varying sizes -->
    <g class="dots">
        {#each commits as commit, index}
            <circle
                cx={xScale(commit.datetime)}
                cy={yScale(commit.hourFrac)}
                r={rScale(commit.linesEdited)}
                fill="steelblue"
                fill-opacity={hoveredIndex === index ? 1 : 0.6}
                on:mouseenter={(evt) => { hoveredIndex = index; cursor = { x: evt.clientX, y: evt.clientY }; }}
                on:mouseleave={() => hoveredIndex = -1}
                style="transform-origin: center; transform-box: fill-box"
            />
        {/each}
    </g>
</svg>

{#if hoveredIndex > -1}
<dl class="info tooltip" style="top: {cursor.y}px; left: {cursor.x}px">
    <dt>Commit</dt>
    <dd><a href="{hoveredCommit.url}" target="_blank">{hoveredCommit.commit}</a></dd>
    <dt>Author</dt>
    <dd>{hoveredCommit.author}</dd>
    <dt>Date</dt>
    <dd>{hoveredCommit.datetime?.toLocaleDateString("en", { dateStyle: "full" })}</dd>
    <dt>Time</dt>
    <dd>{hoveredCommit.datetime?.toLocaleTimeString("en", { timeStyle: "short" })}</dd>
    <dt>Lines Edited</dt>
    <dd>{hoveredCommit.linesEdited}</dd>
</dl>
{/if}

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

    svg {
        overflow: visible;
    }

    .gridlines {
        stroke-opacity: 0.2;
    }
    .gridlines line {
        stroke: #ccc;
    }

    .tooltip {
        position: fixed;
        background-color: rgba(255, 255, 255, 0.95);
        border: 1px solid #ccc;
        border-radius: 8px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        padding: 1em;
        font-size: 0.85em;
        color: #333;
        pointer-events: none;
        max-width: 250px;
        transition: opacity 0.2s, transform 0.2s ease;
    }

    .tooltip dt {
        font-weight: bold;
        color: #888;
        text-transform: uppercase;
        font-size: 0.75em;
    }

    .tooltip dd {
        margin: 0;
        padding-left: 0.5em;
        color: #333;
    }

    .tooltip a {
        color: #0073e6;
        text-decoration: none;
    }

    .tooltip a:hover {
        text-decoration: underline;
    }

    circle {
        transition: transform 0.2s ease, fill-opacity 0.2s ease;
    }
    circle:hover {
        transform: scale(1.5);
    }
</style>

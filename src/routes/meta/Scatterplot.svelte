<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';

    export let commits = []; // Commits to display

    let width = 1000, height = 600, margin = { top: 20, right: 30, bottom: 40, left: 50 };
    let svg, xAxis, yAxis, yAxisGridlines;
    let xScale, yScale, rScale;

    let hoveredIndex = -1;
    let cursor = { x: 0, y: 0 };
    $: hoveredCommit = commits[hoveredIndex] ?? {};

    onMount(() => {
        initializeScales();
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

    function initializeScales() {
        xScale = d3.scaleTime()
            .domain(d3.extent(commits, d => d.datetime))
            .range([margin.left, width - margin.right])
            .nice();

        yScale = d3.scaleLinear()
            .domain([0, 24])
            .range([height - margin.bottom, margin.top]);

        rScale = d3.scaleSqrt()
            .domain(d3.extent(commits, d => d.linesEdited))
            .range([2, 30]);
    }
</script>

<svg bind:this={svg} viewBox={`0 0 ${width} ${height}`}>
    <!-- Gridlines and Axes -->
    <g class="gridlines" transform="translate({margin.left}, 0)" bind:this={yAxisGridlines} />
    <g transform="translate(0, {height - margin.bottom})" bind:this={xAxis} />
    <g transform="translate({margin.left}, 0)" bind:this={yAxis} />

    <!-- Scatterplot Circles -->
    {#each commits as commit, index (commit.commit)}
        <circle
            cx={xScale(commit.datetime)}
            cy={yScale(commit.hourFrac)}
            r={rScale(commit.linesEdited)}
            fill="steelblue"
            fill-opacity={hoveredIndex === index ? 1 : 0.6}
            on:mouseenter={(evt) => { hoveredIndex = index; cursor = { x: evt.clientX, y: evt.clientY }; }}
            on:mouseleave={() => hoveredIndex = -1}
        />
    {/each}
</svg>

<!-- Tooltip -->
{#if hoveredIndex > -1}
<dl class="tooltip" style="top: {cursor.y}px; left: {cursor.x}px">
    <dt>Commit</dt>
    <dd>{hoveredCommit.commit}</dd>
    <dt>Date</dt>
    <dd>{hoveredCommit.datetime?.toLocaleString()}</dd>
    <dt>Lines Edited</dt>
    <dd>{hoveredCommit.linesEdited}</dd>
</dl>
{/if}

<style>
    svg {
        overflow: visible;
    }

    .gridlines line {
        stroke: #ccc;
        stroke-opacity: 0.3;
    }

    circle {
        transition: transform 0.2s ease, fill-opacity 0.2s ease;
    }

    circle:hover {
        transform: scale(1.5);
    }

    .tooltip {
        position: fixed;
        background-color: white;
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 0.5rem;
        pointer-events: none;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
</style>

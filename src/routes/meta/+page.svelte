<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
    import Scrolly from 'svelte-scrolly';
    import Pie from '$lib/Pie.svelte';
    import Scatterplot from './Scatterplot.svelte';
    import FileLines from './FileLines.svelte';

    let data = [];
    let commits = [];
    let filteredLines = [];
    let commitProgress = 0;
    let raceProgress = 0;
    let colors = d3.scaleOrdinal(d3.schemeTableau10);

    let timeScale;
    let commitMaxTime;
    let pieData = [];
    let filteredCommits = [];

    onMount(async () => {
        try {
            data = await d3.csv('/loc.csv', (row) => ({
                ...row,
                line: +row.line || 0,
                depth: +row.depth || 0,
                length: +row.length || 0,
                datetime: new Date(row.datetime),
                type: row.type,
                file: row.file
            }));

            commits = d3.groups(data, d => d.commit).map(([commit, lines]) => ({
                commit,
                datetime: new Date(lines[0].datetime),
                url: `https://github.com/your-repo/${commit}`,
                author: lines[0].author,
                linesEdited: lines.length,
                lines
            }));

            commits = d3.sort(commits, d => -d.linesEdited);

            timeScale = d3.scaleTime()
                .domain(d3.extent(commits, d => d.datetime))
                .range([0, 1]);
        } catch (error) {
            console.error("Error loading or processing CSV data:", error);
        }
    });

    $: commitMaxTime = timeScale?.invert(commitProgress);
    $: filteredCommits = commits.filter(commit => commit.datetime <= commitMaxTime);
    $: filteredLines = data.filter(line => line.datetime <= commitMaxTime);

    $: typeBreakdown = d3.rollup(
        filteredLines,
        lines => lines.length,
        line => line.type
    );

    $: pieData = Array.from(typeBreakdown, ([type, lines]) => ({
        label: type,
        value: lines
    }));
</script>

<h1>Codebase Evolution</h1>

<!-- Time Slider -->
<div class="filter-container">
    <label>
        Show commits until:
        <input type="range" min="0" max="1" step="0.01" bind:value={commitProgress} />
        <time>{commitMaxTime?.toLocaleString("en", { dateStyle: "long", timeStyle: "short" })}</time>
    </label>
</div>

<!-- Scrolly for Commit Evolution -->
<div class="scrolly-container">
    <Scrolly bind:progress={commitProgress}>
        <div class="story">
            {#each commits as commit, index}
                <p>
                    On {commit.datetime.toLocaleDateString()}, commit <a href="{commit.url}" target="_blank">{commit.commit}</a> edited {commit.linesEdited} lines.
                </p>
            {/each}
        </div>
        <svelte:fragment slot="viz">
            <Scatterplot commits={filteredCommits} width={1000} height={500} />
        </svelte:fragment>
    </Scrolly>
</div>

<!-- Scrolly for File Evolution -->
<div class="scrolly-container">
    <Scrolly bind:progress={raceProgress} --scrolly-layout="viz-first" --scrolly-viz-width="1.5fr">
        <div class="story">
            {#each filteredLines as line, index}
                <p>
                    File <strong>{line.file}</strong> evolved to {line.line} lines of code as of {line.datetime.toLocaleDateString()}.
                </p>
            {/each}
        </div>
        <svelte:fragment slot="viz">
            <FileLines lines={filteredLines} colors={colors} />
        </svelte:fragment>
    </Scrolly>
</div>

<!-- Pie Chart -->
<h2>Technology Breakdown</h2>
<Pie data={pieData} colors={colors} />

<style>
    :global(body) {
        max-width: min(120ch, 80vw);
    }

    .filter-container {
        margin-bottom: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
    }

    .scrolly-container {
        margin: 4rem 0;
    }

    .story {
        font-family: sans-serif;
        line-height: 1.6;
        margin-right: 2rem;
    }

    time {
        font-weight: bold;
    }

    .stats {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin: 2rem 0;
        padding: 0;
        list-style: none;
    }

    .stat-item {
        flex: 1;
        text-align: center;
        min-width: 150px;
    }

    .stat-item dt {
        font-weight: bold;
        color: #888;
    }

    .stat-item dd {
        font-size: 1.5rem;
        margin: 0;
    }

    .file-lines {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
    }
</style>

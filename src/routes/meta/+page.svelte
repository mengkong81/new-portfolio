<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';

    let data = [];     // Stores lines of code data
    let commits = [];  // Holds summarized commit data

    // Load CSV data on component mount
    onMount(async () => {
        // Fetch and parse the CSV file
        data = await d3.csv('/loc.csv', (row) => ({
            ...row,
            line: +row.line,          // Convert line to a number
            depth: +row.depth,        // Convert depth to a number
            length: +row.length,      // Convert length to a number
            date: new Date(row.date + 'T00:00' + row.timezone),
            datetime: new Date(row.datetime)
        }));
        
        // Group data by commit to compute summary info for each commit
        commits = d3.groups(data, d => d.commit).map(([commit, lines]) => {
            let first = lines[0];
            let { author, date, time, timezone, datetime } = first;
            return {
                id: commit,
                url: `https://github.com/your-repo/commit/${commit}`,
                author,
                date,
                time,
                timezone,
                datetime,
                hourFrac: datetime.getHours() + datetime.getMinutes() / 60,
                totalLines: lines.length
            };
        });
    });

    // Compute aggregate statistics
    let maxFileLength = d3.max(data, d => d.length);  // Maximum line length
    let averageLineLength = d3.mean(data, d => d.length); // Average line length
    let maxDepth = d3.max(data, d => d.depth);  // Maximum depth
    let uniqueFiles = d3.groups(data, d => d.file).length; // Number of unique files
</script>

<h1>Code Meta-Analysis</h1>

<!-- Display summary statistics -->
<dl class="stats">
    <dt>Total <abbr title="Lines of code">LOC</abbr></dt>
    <dd>{data.length}</dd>

    <dt>Total Commits</dt>
    <dd>{commits.length}</dd>

    <dt>Maximum File Length (lines)</dt>
    <dd>{maxFileLength}</dd>

    <dt>Average Line Length (characters)</dt>
    <dd>{averageLineLength.toFixed(2)}</dd>

    <dt>Number of Files</dt>
    <dd>{uniqueFiles}</dd>

    <dt>Maximum Depth</dt>
    <dd>{maxDepth}</dd>
</dl>

<style>
    /* Styling for the stats section */
    .stats {
        display: grid;
        grid-template-columns: auto auto;
        gap: 0.5em 1em;
    }

    .stats dt {
        font-weight: bold;
    }

    .stats dd {
        margin: 0;
        text-align: right;
    }
</style>

<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';

    let data = [];  // Stores lines of code data

    // Load CSV data on component mount
    onMount(async () => {
        data = await d3.csv('/loc.csv', (row) => ({
            ...row,
            line: +row.line,          // Convert line to a number
            depth: +row.depth,        // Convert depth to a number
            length: +row.length,      // Convert length to a number
            date: new Date(row.date + 'T00:00' + row.timezone),
            datetime: new Date(row.datetime)
        }));
    });
</script>

<h1>Code Meta-Analysis</h1>
<p>Total lines of code: {data.length}</p>

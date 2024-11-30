<script>
    import * as d3 from 'd3';
    export let lines = [];
    export let colors;

    // Group lines by file and sort by line count
    $: files = d3.groups(lines, d => d.file).map(([file, lines]) => ({
        name: file,
        lines,
    }));

    $: files = d3.sort(files, d => -d.lines.length); // Sort files by descending line count
</script>

<div class="file-lines">
    {#each files as file (file.name)}
        <div class="row">
            <div class="file-name">{file.name}</div>
            <div class="line-dots">
                {#each file.lines as line}
                    <span class="dot" style="background: {colors(line.type)};"></span>
                {/each}
            </div>
        </div>
    {/each}
</div>

<style>
    .file-lines {
        display: flex;
        flex-direction: column;
        gap: 1em;
    }

    .row {
        display: flex;
        gap: 1em;
        align-items: center;
    }

    .file-name {
        font-family: monospace;
        font-size: 0.9rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 200px; /* Adjust width for file names */
        flex-shrink: 0;
    }

    .line-dots {
        display: flex;
        flex-wrap: wrap;
        gap: 0.2em;
    }

    .dot {
        width: 8px;
        height: 8px;
        display: inline-block;
        border-radius: 50%;
    }
</style>

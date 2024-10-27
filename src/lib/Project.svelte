<script>
    // Expecting project data to be passed in via the "data" prop
    export let data = {};
    export let hLevel = 2;  // Default heading level is <h2>
</script>

<article>
    <!-- Dynamic heading element based on the hLevel prop -->
    <svelte:element this={'h' + hLevel}>{data.title}</svelte:element>
    <img src={data.image} alt="Project image for {data.title}">
    <p>{data.description}</p>
</article>

<style>
    article {
        border: 1px solid #ddd;
        padding: 1em;
        border-radius: 8px;
        background-color: #f9f9f9;
        text-align: center;
    }

    img {
        width: 100px;
        height: 100px;
        margin: 0.5em 0;
    }

    p {
        font-size: 0.9em;
        color: #666;
    }

    @media (prefers-color-scheme: dark) {
        article {
            background-color: #222;
            border-color: rgba(255, 255, 255, 0.1);
        }

        p {
            color: #ccc;
        }
    }
</style>

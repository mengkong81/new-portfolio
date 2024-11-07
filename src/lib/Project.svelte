<script>
    export let data = {};
    export let hLevel = 2; // Default to h2
</script>

<article>
    <!-- Use svelte:element to dynamically set heading level -->
    <svelte:element this={"h" + hLevel}>{data.title}</svelte:element>
    <img src={data.image} alt="Project image">
    <div>
        <p>{data.description}</p>
        <p class="year">{data.year}</p> <!-- Display the project year -->
    </div>
</article>

<style>
  article {
      margin-bottom: 20px;
  }

  img {
      width: 100%;
      height: auto;
  }

  /* Styling for the year */
  .year {
      color: gray;
      font-family: Baskerville, serif;
      font-variant-numeric: oldstyle-nums;
      font-size: 0.9em;
      margin-top: 5px;
  }
</style>

<script>
    export let data = {};
    export let hLevel = 2; // Default to h2
</script>

<article>
    <!-- Use svelte:element to dynamically set heading level -->
    <svelte:element this={"h" + hLevel}>{data.title}</svelte:element>
    <img src={data.image} alt="Project image">
    <p>{data.description}</p>
</article>

<style>
  /* You can add project-specific styles here */
  article {
      margin-bottom: 20px;
  }
  img {
      width: 100%;
      height: auto;
  }
</style>

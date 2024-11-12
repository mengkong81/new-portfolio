<script>
  export let data = {};
</script>

<article>
  <h2>{data.title}</h2>
  <img src={data.image} alt="Project image">
  <p>{data.description}</p>
  <p><strong>Year:</strong> {data.year}</p>
</article>

<style>
  article {
      margin-bottom: 20px;
      padding: 1em;
      border: 1px solid #ddd;
      border-radius: 8px;
      background-color: #f9f9f9;
      text-align: center;
  }
  
  h2 {
      font-size: 1.5em;
      margin: 0.5em 0;
  }

  /* Updated image styling */
  img {
      width: 100%; /* Make image fit the container width */
      height: auto; /* Maintain aspect ratio */
      max-height: 200px; /* Optional: limit max height */
      object-fit: cover; /* Crop image if it's too large */
      border-radius: 5px; /* Optional: rounded corners */
      margin: 0.5em 0;
  }
</style>

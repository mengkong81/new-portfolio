<script>
    // Any script or logic for the page

    // Add form handling logic here
    const form = document.querySelector("#contact-form");

    // Add event listener to intercept form submission
    form?.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent default form behavior

        // Create a FormData object
        const formData = new FormData(form);

        // Build the mailto URL using the form's action attribute
        let mailtoUrl = form.action + "?";

        // Iterate through form fields and encode values
        for (let [name, value] of formData) {
            mailtoUrl += `${encodeURIComponent(name)}=${encodeURIComponent(value)}&`;
        }

        // Remove the trailing '&'
        mailtoUrl = mailtoUrl.slice(0, -1);

        // Open the email client with the prefilled data
        location.href = mailtoUrl;
    });
</script>

<svelte:head>
    <title>Contact Me - Mengkong Aun</title>
</svelte:head>

<h1>Contact Me</h1>
<p>If you'd like to reach me, please fill out the form below.</p>  

<!-- Contact Form -->
<form id="contact-form" action="mailto:mengkongaun@gmail.com" method="GET">
    <label for="subject">Subject:</label>
    <input type="text" id="subject" name="subject" required>

    <label for="body">Message:</label>
    <textarea id="body" name="body" rows="5" required></textarea>

    <button type="submit">Send Email</button>
</form>

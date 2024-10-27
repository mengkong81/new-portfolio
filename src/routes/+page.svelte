<script>
    import Project from '$lib/Project.svelte';
    import projects from '$lib/projects.json';
</script>

<h1>Mengkong Aun</h1>

<!-- Adding the profile picture -->
<img src="/images/MengkongAUN_BA.JPG" alt="A photo of Mengkong Aun, Business Analyst" width="300">

<!-- Personal Information Section -->
<section>
    <header>
        <h2>Personal Information</h2>
    </header>
    <p><strong>Name:</strong> Mengkong Aun</p>
    <p><strong>Location:</strong> Bellflower, CA</p>
    <p><strong>Email:</strong> <a href="mailto:mengkongaun@gmail.com">mengkongaun@gmail.com</a></p>
    <p><strong>Phone:</strong> +1 (562) 503-8052</p>
    <p><a href="https://www.linkedin.com/in/mengkongaun/" target="_blank">LinkedIn Profile</a> | 
       <a href="https://github.com/mengkong81" target="_blank">GitHub Projects</a></p>
</section>

<h2>Latest Projects</h2>

<div class="projects highlights">
    {#each projects.slice(0, 3) as p}
        <Project data={p} hLevel={3} />
    {/each}
</div>

<style>
    .projects {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 1.5em;
    }

    .highlights {
        background-color: #f0f8ff;  /* Light background for featured projects */
    }
</style>

<!-- Summary Section -->
<section>
    <header>
        <h2>Summary</h2>
    </header>
    <p>With 4+ years of experience in data analysis research and business strategy, I am pursuing an M.S. in Data Science at UC San Diego. As a Business Unit Analyst at OCTA, I focus on research, budget development, performance tracking, and contract management. Proficient in Python, R, SQL, Tableau, and Power BI, I excel in large data analysis, visualization, and strategic decision-making. My strong communication and research skills make me a valuable contributor to data-driven teams with a proven ability to handle complex datasets and generate actionable insights.</p>
</section>

<!-- Work Experience Section -->
<section>
    <header>
        <h2>Work Experience</h2>
    </header>

    <article>
        <header>
            <h3>Business Unit Analyst - Orange County Transportation Authority (OCTA)</h3>
            <time datetime="2024-07">July 2024 - Present</time>
        </header>
        <p>Developed real-time Power BI dashboards enabling management teams to monitor and optimize operational performance. Conducted in-depth analysis and reporting on performance metrics, providing actionable insights and strategic recommendations for process and policy improvements. Led research and analysis for special projects, creating presentations and assisting in the development and testing of departmental applications and databases.</p>
    </article>  
    
    <article>
        <header>
            <h3>Data Entry Technician - Orange County Probation Department</h3>
            <time datetime="2023-12">December 2023 - June 2024</time>
        </header>
        <p>Employed SQL and Oracle database management tools to interpret and enter data into the Department’s Integrated Case Management System (ICMS) and Juvenile Court and Probation Statistical System (JCPSS). Executed data quality assessments and implemented corrective measures, ensuring compliance with justice system standards.</p>
    </article>

    <article>
        <header>
            <h3>Economic Researcher - University of Western Australia</h3>
            <time datetime="2020-02">February 2020 - December 2020</time>
        </header>
        <p>Designed research methodology for an Australian Government project on enhancing farmers' productivity. Led data collection, cleaning, and analysis using R, STATA, and Excel. Developed logistic regression models and utilized stochastic frontier analysis to assess productivity and efficiency.</p>
    </article>

    <article>
        <header>
            <h3>Business Analyst - SOMA Group</h3>
            <time datetime="2016-03">March 2016 - October 2018</time>
        </header>
        <p>Led the design and development of financial and business models in four sectors: agriculture, real estate, construction, and energy. Managed large datasets and performed complex analyses, contributing to a cumulative profit of $45 million. Provided consultation to the CEO and board members on investment opportunities.</p>
    </article>
</section>

<!-- Education Section -->
<section>
    <header>
        <h2>Education</h2>
    </header>  
    
    <article>
        <p><strong>M.S. Data Science, University of California, San Diego | GPA: 4.0</strong></p>
        <time datetime="2023-09">September 2023 - Present</time>
    </article>

    <article>
        <p><strong>Post Graduate Program in Data Science, Purdue University</strong></p>
        <time datetime="2022-05">May 2022 - January 2023</time>
    </article>

    <article>
        <p><strong>M.S. Agricultural Economics, University of Western Australia | GPA: 3.96</strong></p>
        <time datetime="2019-02">February 2019 - December 2020</time>
    </article>
</section>

<!-- Skills Section -->
<section>
    <header>
        <h2>Skills & Certifications</h2>
    </header>
    <ul>
        <li>Data Analysis, Statistical Modeling, Research, Business & Financial Modeling</li>
        <li>Python, R, SQL, Tableau, Power BI, Excel, Google Suite, Oracle Database</li>
        <li>Tools: Jupyter Notebook, Google Colab, Microsoft Office, GitHub</li>
        <li>Certifications: R Programming for Data Science by IBM, Data Science with Python by IBM</li>
    </ul>
</section>

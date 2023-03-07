
const sort_object = (obj) => {

    const entries = Object.entries(obj);
    entries.sort((a, b) => b[1] - a[1]);
    return Object.fromEntries(entries);

}

exports.serveJobs = (people) => {

    let allJobs = {};
    let totalPeople = 0;

    people.forEach(person => {

        if (!(person.profissao in allJobs)) allJobs[person.profissao] = 0;
        else allJobs[person.profissao]++;

        totalPeople++;

    });

    allJobs = sort_object(allJobs);

    let template =  `
        <!DOCTYPE html>
        <html lang="en">
        
          <head>
              <meta charset="UTF-8">
              <title>Top 10 Jobs</title>
              <link rel="stylesheet" href="styles.css">
          </head>
        
          <body>
        
            <div class="centered">
        
                <div class="details">
        
                    <h3>Distribution of Sports</h3>
        
                    <table>
        
                        <tr class="header">
                            <th>
                                Job
                            </th>
                            <th>
                                Number of People
                            </th>
                            <th>
                                Percentage (%)
                            </th>
                        </tr>
    `;

    let counter = 0;

    for (job of Object.keys(allJobs)) {

        if (counter === 10) break;

        template += `
            <tr>
                <th><a href="/people/jobs/${job}">${job}</a></th>
                <th>${allJobs[job]}</th>
                <th>${Math.round(allJobs[job] / totalPeople * 100)}%</th>
            </tr>
        `;

        counter++;

    }

    template += `
                    </table>
                <script>
                    document.write('<h3><a style="text-decoration: none; color: #404040" href="' + document.referrer + '">Go Back</a></h3>');
                </script>
            </div>
          </div>
        </div>
      </body>
    </html>`;

    return template;
}


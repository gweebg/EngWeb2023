
exports.serveSports = (people) => {

    let allSports = {};
    let totalPeople = 0;

    people.forEach(person => {

        person.desportos.forEach(sport => {

            if (!(sport in allSports)) allSports[sport] = 0;
            else allSports[sport]++;

        });

        totalPeople++;

    });

    let template =  `
        <!DOCTYPE html>
        <html lang="en">
        
          <head>
              <meta charset="UTF-8">
              <title>Distribution of Sports</title>
              <link rel="stylesheet" href="styles.css">
          </head>
        
          <body>
        
            <div class="centered">
        
                <div class="details">
        
                    <h3>Distribution of Sports</h3>
        
                    <table>
        
                        <tr class="header">
                            <th>
                                Sports
                            </th>
                            <th>
                                Number of People
                            </th>
                            <th>
                                Percentage (%)
                            </th>
                        </tr>
    `;

    Object.keys(allSports).forEach(sport => {

        template += `
            <tr>
                <th><a href="/people/sports/${sport}">${sport}</a></th>
                <th>${allSports[sport]}</th>
                <th>${Math.round(allSports[sport] / totalPeople * 100)}%</th>
            </tr>
        `;

    });

    
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



exports.serveGenders = (maleCount, femaleCount, otherCount) => {

    let total = maleCount + femaleCount + otherCount;

    return `
    <!DOCTYPE html>
    <html lang="en">
    
      <head>
          <meta charset="UTF-8">
          <title>Distribution of Genders</title>
          <link rel="stylesheet" href="styles.css">
      </head>
    
      <body>
    
        <div class="centered">
    
            <div class="details">
    
                <h3>Distribution of Gender</h3>
    
                <table>
    
                    <tr class="header">
                        <th>
                            <a href="/people/males">Male</a>
                        </th>
                        <th>
                            <a href="/people/females">Female</a>
                        </th>
                        <th>
                            <a href="/people/others">Other</a>
                        </th>
                    </tr>
    
                    <tr>
                        <th>${maleCount} (${Math.round(maleCount / total * 100)}%)</th>
                        <th>${femaleCount} (${Math.round(femaleCount / total * 100)}%)</th>
                        <th>${otherCount} (${Math.round(otherCount / total * 100)}%)</th>
                    </tr>
    
                </table>
    
                <script>
                    document.write('<h3><a style="text-decoration: none; color: #404040" href="' + document.referrer + '">Go Back</a></h3>');
                </script>
    
            </div>
    
          </div>
    
    
        </div>
    
    
      </body>
    
    </html>
    `;
}


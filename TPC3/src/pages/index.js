
exports.serveIndex = () => {

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

            <h3>A Very Cool NodeJS Application</h3>
            
            <a id="menu" href="/people" class="grid-item">People List</a>
            <a id="menu"  href="/people/genders" class="grid-item">Distribution by Gender</a>
            <a id="menu"  href="/people/sports" class="grid-item">Distribution by Sports</a>
            <a id="menu"  href="/people/jobs" class="grid-item">Top 10 Jobs</a>

        </div>

      </div>


    </div>


  </body>

</html>
    
    `;

};
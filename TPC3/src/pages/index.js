
exports.serveIndex = () => {

    return `
    
<!DOCTYPE html>
<html lang="en">
        
  <head>
      <meta charset="UTF-8">
      <title>Distribution of Genders</title>
      <link rel="stylesheet" href="../styles.css">
  </head>
        
  <body>

    <div class="centered">

        <div class="details">

            <h3>CIA HIT LIST 2023</h3>
            
            <a id="menu" href="/people" class="grid-item">People List</a>
            <a id="menu"  href="/people/genders" class="grid-item">Distribution of Gender</a>
            <a id="menu"  href="/people/males" class="grid-item">Male List</a>
            <a id="menu"  href="/people/females" class="grid-item">Female List</a>
            <a id="menu"  href="/people/others" class="grid-item">Other List</a>

        </div>

      </div>


    </div>


  </body>

</html>
    
    `;

};
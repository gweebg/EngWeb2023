
exports.generateMainPage = (list) => {

    let page = `
    <!DOCTYPE html>
    <html lang="en">

        <head>
            <meta charset="UTF-8">
            <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
            <title>Hit List</title>
        </head>

        <body>

            <div class="w3-card-4">

                <header class="w3-container w3-blue">
                    <h1>CIA Hit List 2022/2023 (${list.length} terrorists)</h1>
                </header>
    
                <table class="w3-table-all">
                
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Age</th>
                      <th>Sex</th>
                      <th>City</th>
                    </tr>
    `;


    list.forEach(element => {

        page += `<tr> 
 
           <th>${element.id}</th>
           <th>${element.nome}</th>
           <th>${element.idade}</th>
           <th>${element.sexo}</th>
           <th>${element.morada.cidade}</th>
 
       </tr>`

    });


    page += `
    </table>
    
                <footer class="w3-container w3-blue">
                    <p></p>
                </footer>

            </div>

        </body>

    </html>`;

    return page;
}


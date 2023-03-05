
exports.servePeople = (personList, title) => {

    let template = `
        <!DOCTYPE html>
        <html lang="en">
        
            <head>
                <meta charset="UTF-8">
                <link rel="stylesheet" href="styles.css">
                <title>Template list users.</title>
            </head>
        
            <script>
                function filterAndDisplay() {
        
                    let input = document.getElementById('input');
                    let filter = input.value.toUpperCase();
        
                    let list = document.getElementById('list');
                    let items = list.getElementsByTagName('a');
        
                    for (let i = 0; i < items.length; i++) {
        
                        let a = items[i];
                        let value = a.textContent || a.innerText;
        
                        if (value.toUpperCase().indexOf(filter) > -1) items[i].style.display = "";
                        else items[i].style.display = "none";
                    }
                }
            </script>
        
            <body>
        
                <div class="centered">
        
                    <div class="list">
        
                        <h3>${title}</h3>
        
                        <input type="text" id="input" onkeyup="filterAndDisplay()" placeholder="Pesquisar pessoas pelo nome..">
        
                        <div class="grid" id="list">
    `;

    personList.forEach(person => {

        template += `
            <a href="/people/${person.id}" class="grid-item">
                ${person.nome}
            </a>
        `;
    });

    template += `
                    </div>
                </div>
            </div>
        </body>
    </html>
    `;

    return template;
};
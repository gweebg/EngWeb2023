
exports.serveJob = (people, jobName) => {

    let include = [];
    jobName = decodeURI(jobName);

    people.forEach(person => {
        if (person.profissao === jobName) include.push(person);
    });

    let template = `
        <!DOCTYPE html>
        <html lang="en">
        
            <head>
                <meta charset="UTF-8">
                <link rel="stylesheet" href="styles.css">
                <title>List of people that play ${jobName}</title>
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
        
                        <h3>Profissão ${jobName}</h3>
        
                        <input type="text" id="input" onkeyup="filterAndDisplay()" placeholder="Pesquisar pessoas pelo nome..">
        
                        <div class="grid" id="list">
    `;

    include.forEach(person => {

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
}


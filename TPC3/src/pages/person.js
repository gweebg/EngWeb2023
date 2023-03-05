
function titleCase(str) {
    return str.toLowerCase().split(' ').map(function(word) {
        return word.replace(word[0], word[0].toUpperCase());
    }).join(' ');
}

exports.servePerson = (person) => {

    let template = `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <title>${person.nome}</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="styles.css">
    </head>
    
    
    <body>
    
    <div class="centered">
    
        <div class="details">
    
            <h3>(${person.BI}) ${person.nome}</h3>
        
            <p class="text">
                <strong>Age: </strong> ${person.idade}
            </p>
    
            <p class="text">
                <strong>Gender: </strong> ${titleCase(person.sexo)}
            </p>
    
            <p class="text">
                <strong>Address: </strong> ${person.morada.cidade}, ${person.morada.distrito}
            </p>
    
            <p class="text">
                <strong>Job: </strong> ${person.profissao}
            </p>
    
            <p class="text">
                <strong>Political Party: </strong> ${person.partido_politico.party_name} ${person.partido_politico.abbr ? (person.partido_politico.abbr) : "" }
            </p>
    
            <p class="text">
                <strong>Religion: </strong> ${person.religiao ? person.religiao : "Not Specified" }
            </p>
    
            <p class="text">
                <strong>Sports: </strong> ${person.desportos.join(', ')}
            </p>
    
            <p class="text">
                <strong>Animals/Pets: </strong> ${person.animais.join(', ')}
            </p>
    
            <p class="text">
                <strong>Celebrities (PT): </strong> ${person.figura_publica_pt.join(', ')}
            </p>
    
            <p class="text">
                <strong>Car Brand: </strong> ${person.marca_carro}
            </p>
    
            <p class="text">
                <strong>Favourite Destinations </strong> ${person.destinos_favoritos.join(', ')}
            </p>
    
            <div class="connections">
    
                <h3>Attributes</h3>
                
                <div class="grid-con">
    `;


    for (let attr in person.atributos) {
        let underscores = RegExp('_', "g")
        if (person.atributos[attr]) template += `<p class="grid-item">${titleCase(attr.replace(underscores, ' '))}</p>`;
    }

    template += `
                            </div>
                        <script>
                            document.write('<h3><a style="text-decoration: none; color: #404040" href="' + document.referrer + '">Go Back</a></h3>');
                        </script>
                    </div>   
                </div>   
            </div>
        </body>
    </html>
    `;

    return template;

};
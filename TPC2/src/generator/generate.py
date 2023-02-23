import json
import math

template_string: str = """
<!DOCTYPE html>
<html lang="en">

    <head>
        <title>Virtual Map</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="app.css" rel="stylesheet">
    </head>

    <body>

        <div class="centered">

                <div class="list">

                    <div class="grid">

"""


def generate() -> None:
    global template_string

    with open("../datasets/map.json", "r") as file:
        data: dict = json.load(file)

    district_cities: dict = {}
    id_cities: dict = {}

    # Process city information.
    for city in data['cidades']:

        id_cities[city['id']] = city

        if (d := city['distrito']) not in district_cities:
            district_cities[d] = []

        district_cities[d].append(city)

    # Build index.html page.
    for district in district_cities:

        template_string += f'<h3> {district} </h3>'

        for city in district_cities[district]:
            template_string += f'<a href=\"{city["id"]}\" class="grid-item district-button"> {city["nome"]} </a>'

    template_string += """
                    </div>
                </div>
            </div>
        </body>
    </html>
    """

    with open("../generated/index.html", "w") as index:
        index.write(template_string)

    city_connections: dict = {}

    # Process connections information.
    for connection in data['ligações']:

        origin_id: str = connection['origem']
        destination_id: str = connection['destino']

        if origin_id not in city_connections:
            city_connections[origin_id] = []

        city_connections[origin_id].append((destination_id, connection['distância']))

    # Build each city page.

    for city in data['cidades']:

        city_template_string: str = """
        <!DOCTYPE html>
        <html lang="en">
    
            <head>
                <title>Mapa Virtual</title>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link href="../app.css" rel="stylesheet">
            </head>
    
            <body>
                <div class="centered">
                    <div class="details">
        """

        city_template_string += f"<h3>{city['nome']}</h3>"

        city_template_string += f"<p class='desc'>{city['descrição']}</p>"

        cons: int = 0
        if city['id'] in city_connections:
            cons = len(city_connections[city['id']])

        city_template_string += f"<p class='text'><strong>District: </strong> {city['distrito']} | " \
                                f"<strong> Population: </strong> {city['população']} | " \
                                f"<strong> Connections:</strong> {cons}</p>"

        city_template_string += f"<div class='connections'> <h3> Connections to {city['nome']}</h3> <div class='grid-con'>"

        if city['id'] in city_connections:
            for connection in city_connections[city['id']]:

                city_id, distance = connection
                city_template_string += f"<a href='#' class='grid-item'>{id_cities[city_id]['nome']} ({math.floor(distance)}km)</a>"

        city_template_string += """
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </html>
        """

        with open(f'../generated/cities/{city["id"]}.html', "w") as out:
            out.write(city_template_string)


def main():
    generate()


if __name__ == '__main__':
    SystemExit(main())

import json

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

    # Filtering data by the districts.

    district_cities: dict = {}

    for city in data['cidades']:

        if (d := city['distrito']) not in district_cities:
            district_cities[d] = []

        district_cities[d].append(city)

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

    with open("../generated/index.html", "a") as index:
        index.write(template_string)


def main():
    generate()


if __name__ == '__main__':
    SystemExit(main())

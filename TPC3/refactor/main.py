import json


def main():

    with open("./refactor/dataset-extra1.json", "r") as file:
        data: dict = json.load(file)

    counter: int = 0
    updated_data: list = []

    for person in data["pessoas"]:
        person["id"] = counter
        counter += 1
        updated_data.append(person)

    with open("./refactor/dataset-extra1-updated.json", "w") as updated:
        json.dump(updated_data, updated)


if __name__ == '__main__':
    SystemExit(main())
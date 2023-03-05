import json


def main():

    with open("../../datasets/dataset-extra1.json", "r") as file:
        data: dict = json.load(file)

    counter: int = 0
    updated_data: dict = {"pessoas": []}

    for person in data["pessoas"]:
        person["id"] = "p" + str(counter)
        counter += 1
        updated_data["pessoas"].append(person)

    with open("../../datasets/dataset-extra1-updated.json", "w") as updated:
        json.dump(updated_data, updated)


if __name__ == '__main__':
    SystemExit(main())
import requests

from enum import Enum
from typing import TypedDict


class Gender(Enum):
    M = 'masculino'
    F = 'feminino'
    O = 'outro'


class Address(TypedDict):
    cidade: str
    distrito: str
    
    
class PoliticalParty(TypedDict):
    party_abbr: str
    party_name: str


class Attributes(TypedDict):
    fumador: bool
    gosta_cinema: bool
    gosta_viajar: bool
    acorda_cedo: bool
    gosta_ler: bool
    gosta_musica: bool
    gosta_comer: bool
    gosta_animais_estimacao: bool
    gosta_dancar: bool
    comida_favorita:str


class Person(TypedDict):
    _id: str
    nome: str
    idade: int
    sexo: Gender
    morada: Address
    BI: str
    profissao: str
    partido_politico: PoliticalParty
    religiao: str
    desportos: list[str]
    animais: list[str]
    figura_publica_pt: list[str]
    marca_carro: str
    destinos_favoritos: list[str]
    atributos: Attributes
    


def get_person(person_id: str):
    
    response = requests.get(f"http://localhost:3000/people/{person_id}")
    
    if response.status_code != 200:
        raise Exception(f"Error fetching person {person_id}.")
    
    return response.json()


def get_people():
    
    response = requests.get("http://localhost:3000/people")
    
    if response.status_code != 200:
        raise Exception("Error fetching people.")
    
    return response.json()


def create_person(person: Person):
    
    response = requests.post("http://localhost:3000/people", json=person)
    
    if response.status_code != 201:
        raise Exception("Error creating person.")
    
    return response.json()


def update_person(person_id: str, person: Person):
    
    response = requests.put(f"http://localhost:3000/people/{person_id}", json=person)
    
    if response.status_code != 200:
        raise Exception(f"Error updating person {person_id}.")
    
    return response.json()


def delete_person(person_id: str):
    
    response = requests.delete(f"http://localhost:3000/people/{person_id}")
    
    if response.status_code != 200:
        raise Exception(f"Error deleting person {person_id}.")
    
    return response.json()

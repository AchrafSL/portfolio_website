---
title: "Chapter 14_API Requests"
description: "Fetching data from APIs using the Requests library and parsing JSON responses."
pubDate: "Jan 26 2026"
---

# Introduction to API requests

> - An API returns an HTTP response
> - The response contains:
>   - status code (200, 404, …)
>   - headers
>   - a body (often JSON)
>
> - `requests` handles the HTTP plumbing
> - `.json()` parses JSON text → Python objects
>

```python
import requests

base_url = "https://pokeapi.co/api/v2/"

def get_pokemon_info(name):
    url = f"{base_url}/pokemon/{name}"
    response = requests.get(url) # response object 

    if response.status_code == 200:
        pokemon_data = response.json() # json.loads(response.text) parses the JSON response body (text) into native Python objects (dicts, lists, etc.)

        return pokemon_data
    else:
        print(f"Failed to retrieve data {response.status_code}")


pokemon_name = "pikachu"
pokemon_info = get_pokemon_info(pokemon_name)

if pokemon_info:
    print(pokemon_info["name"])
    print(pokemon_info["id"])
    print(pokemon_info["height"])


```

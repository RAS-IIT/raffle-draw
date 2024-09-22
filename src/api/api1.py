import requests
import json

url = "https://instagram-scraper-api2.p.rapidapi.com/v1/followers"

querystring = {"username_or_id_or_url": "ieeeras_iit"}

headers = {
    "x-rapidapi-key": "8dadfb53f2msh64c26112588c5fbp140632jsnce1e4e91eda3",
    "x-rapidapi-host": "instagram-scraper-api2.p.rapidapi.com"
}

response = requests.get(url, headers=headers, params=querystring)


with open('api/api1.json', 'w') as json_file:
    json.dump(response.json(), json_file, indent=4)

print("Response saved to instagram_followers.json")

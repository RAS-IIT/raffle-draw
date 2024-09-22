import requests
import json
url = "https://instagram-scraper-api3.p.rapidapi.com/user_followers"

querystring = {"username_or_id":"ieeeras_iit"}

headers = {
	"x-rapidapi-key": "8dadfb53f2msh64c26112588c5fbp140632jsnce1e4e91eda3",
	"x-rapidapi-host": "instagram-scraper-api3.p.rapidapi.com"
}

response = requests.get(url, headers=headers, params=querystring)

with open('api3newschecker1.json', 'w') as json_file:
    json.dump(response.json(), json_file, indent=4)


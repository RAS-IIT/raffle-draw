import requests
import json
url = "https://rocketapi-for-instagram.p.rapidapi.com/instagram/user/get_followers"

payload = {
	"id": 61743036933,
	"count": 12,
	"max_id": None
}
headers = {
	"x-rapidapi-key": "8dadfb53f2msh64c26112588c5fbp140632jsnce1e4e91eda3",
	"x-rapidapi-host": "rocketapi-for-instagram.p.rapidapi.com",
	"Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

with open('api/api4.json', 'w') as json_file:
    json.dump(response.json(), json_file, indent=4)

print("Response saved to instagram_followers.json")
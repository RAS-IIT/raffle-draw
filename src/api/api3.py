import requests
import json

url = "https://instagram243.p.rapidapi.com/userfollowers/61743036933/12/%7Bend_cursor%7D"

headers = {
	"x-rapidapi-key": "8dadfb53f2msh64c26112588c5fbp140632jsnce1e4e91eda3",
	"x-rapidapi-host": "instagram243.p.rapidapi.com"
}

response = requests.get(url, headers=headers)

print(response.json())


with open('api/api3after1.json', 'w') as json_file:
    json.dump(response.json(), json_file, indent=4)

print("Response saved to instagram_followers.json")
import requests
import json


def save_usernames_to_json(input_file, output_file):
    
    with open(input_file, 'r') as file:
        data = json.load(file) 
    usernames = [{"username": follower["username"]} for follower in data["new_followers"]]
    with open(output_file, 'w') as file:
        json.dump(usernames, file, indent=4)
    print(f"Usernames saved to {output_file}")

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
followers_after = response.json()


print(followers_after)


if 'response' in followers_after and 'body' in followers_after['response']:
    after_users = {user['pk'] for user in followers_after['response']['body']['users']}
else:
    raise KeyError("Expected keys 'response' and 'body' not found in the API response.")

with open('api4.json', 'r') as f:
    followers_before = json.load(f)

before_users = {user['pk'] for user in followers_before['response']['body']['users']}

new_followers = after_users - before_users

new_followers_list = [user for user in followers_after['response']['body']['users'] if user['pk'] in new_followers]

output = {
    "status": "done",
    "new_followers": new_followers_list
}

with open('FINAL-new-followers-api4.json', 'w') as f:
    json.dump(output, f, indent=4)

save_usernames_to_json("FINAL-new-followers-api4.json", "correctstructure.json")
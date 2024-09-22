import json

def save_usernames_to_json(input_file, output_file):
    
    with open(input_file, 'r') as file:
        data = json.load(file)
    
    
    usernames = [{"username": follower["username"]} for follower in data["new_followers"]]
    
    with open(output_file, 'w') as file:
        json.dump(usernames, file, indent=4)
    
    print(f"Usernames saved to {output_file}")

# Usage
input_file = 'FINAL-new-followers-api4.json'
output_file = 'correctstructure.json'  

save_usernames_to_json(input_file, output_file)

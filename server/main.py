
from flask import Flask, jsonify, redirect
import requests
from info import get_user_projects, user, project


app = Flask(__name__, template_folder='templates', static_folder='static')

# # Supabase setup
# supabase_url = "https://btahofdsulgqngacxslu.supabase.co"
# supabase_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0YWhvZmRzdWxncW5nYWN4c2x1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMzNjIwMDAsImV4cCI6MjAzODkzODAwMH0.3PO4D2OoJ1achcgcBkAC8E7ciZ5CUQvsViNBFNW1_d4"
# supabase: Client = create_client(supabase_url, supabase_key)

# def save_user_to_db(user_data):
#     # Prepare user payload
#     user_payload = {
#         "username": user_data.get("username"),
#         "name": user_data.get("name"),
#         "bio": user_data.get("bio"),
#         "location": user_data.get("location"),
#         "skills": user_data.get("skills"),
#         "interests": user_data.get("interests"),
#         "header_color": user_data.get("header", {}).get("color"),
#         "image_url": user_data.get("image"),
#         "github": user_data.get("links", {}).get("github"),
#         "linkedin": user_data.get("links", {}).get("linkedin"),
#         "twitter": user_data.get("links", {}).get("twitter"),
#         "website": user_data.get("links", {}).get("website")
#     }

#     # Check if the user already exists
#     existing_user = supabase.table('users').select('id').eq('username', user_payload["username"]).execute()

#     if existing_user.data:
#         # User exists, update the existing record
#         user_id = existing_user.data[0]['id']
#         response = supabase.table('users').update(user_payload).eq('id', user_id).execute()
#     else:
#         # User does not exist, insert a new record
#         response = supabase.table('users').insert(user_payload).execute()

#     # Save associated projects for the user
#     for project in user_data.get("project_details", []):
#         project_data = save_project_to_db(project)

#         # Link user and project in the association table
#         if project_data and response.data:
#             user_id = response.data[0]['id']
#             project_id = project_data.data[0]['id']
#             supabase.table('user_projects').upsert({"user_id": user_id, "project_id": project_id}).execute()

#     return response

# def save_project_to_db(project_data):
#     project_payload = {
#         "project_name": project_data.get("name"),
#         "content": project_data.get("content"),
#         "built_with": project_data.get("built_with"),
#         "gallery": project_data.get("gallery"),
#         "submissions": project_data.get("submissions"),
#         "submitted_to": project_data.get("submitted_to"),
#         "created_by": project_data.get("created_by")
#     }

#     response = supabase.table('projects').upsert(project_payload).execute()

#     return response


@app.route("/")
def homepath():
  return jsonify({"Usage": "/user/USERNAME to query a user and /project/NAME to query a project"})

@app.route("/user/<username>")
def userpath(username):
  mainreq = requests.get('https://devpost.com/' + username, headers={'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36'})
  if mainreq.status_code != 404:
    user_data = user(mainreq, username)
    # save_user_to_db(user_data)
  else:
    return jsonify({"Error": "UserNotFoundError"})
  return jsonify(user(mainreq, username))

@app.route("/project/<name>")
def projectpath(name):
  mainreq = requests.get('https://devpost.com/software/' + name, headers={'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36'})
  if mainreq.status_code != 404:
    project_data = project(mainreq, name)
    # save_project_to_db(project_data)
    return jsonify(project_data)
  else:
    return jsonify({"Error": "ProjectNotFoundError"})

@app.route("/project-list/<username>")
def project_list(username):
    projects = get_user_projects(username)
    if projects is not None:
        return jsonify(projects)
    else:
        return jsonify({"Error": "UserNotFoundError"})

@app.errorhandler(404)
def page_not_found(e):
  return jsonify({"Error": "PathNotFoundError (usage: /user/USERNAME to query a user and /project/NAME to query a project)"}), 404

if __name__ == "__main__":
  app.run(host='0.0.0.0', port=8080, debug=True)
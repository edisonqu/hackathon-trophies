from urllib.parse import urlparse
from bs4 import BeautifulSoup
from datetime import datetime
import subprocess
import requests
import uuid
import re

def fixurl(url):
  if url[:2] == "//":
    return "https:" + url
  elif url[0] == "/":
    return "https://devpost.com" + url
  else:
    return url

def checkurl(url):
  return re.match(re.compile('^(?:http|ftp)s?://(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\\.)+(?:[A-Z]{2,6}\\.?|[A-Z0-9-]{2,}\\.?)\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3})(?::\\d+)?(?:/?|[/?]\\S+)$', re.IGNORECASE), url) is not None

def user(mainreq, username):
  info = {}

  soup = BeautifulSoup(mainreq.text, 'html.parser')

  photo = fixurl(soup.find("div", {"id": "portfolio-user-photo"}).img['src'])
  info['image'] = photo

  for li in soup.findAll("li", class_=None):
    location = li.findChildren("span", class_="ss-location")
    if len(location) != 0:
      location = li.text.lstrip().rstrip()
      break
  info['location'] = location

  skills = []
  for div in soup.findAll("div", class_="tag-list"):
    if div.span.strong.text == "Skills":
      for skill in div.ul.findChildren("li"):
        skills.append(skill.text.lstrip().rstrip())
  info['skills'] = skills

  interests = []
  for div in soup.findAll("div", class_="tag-list"):
    if div.span.strong.text == "Interests":
      for interest in div.ul.findChildren("li"):
        interests.append(interest.text.lstrip().rstrip())
  info['interests'] = interests

  bio = soup.find("p", {"id": "portfolio-user-bio"}).text.lstrip().rstrip()
  if len(bio) != 0:
    info['bio'] = bio
  else:
    info['bio'] = None

  header = {}
  stylestr = soup.find_all('style')[0].text
  styles = re.match(r'\s*([^{]+)\s*\{\s*([^}]*?)\s*}', stylestr)[2].split("\n")
  tempstyle = {}
  for style in styles:
    if len(style) != 0:
      name = style.lstrip().split(": ")[0]
      value = style.lstrip().split(": ")[1][:-1]
      tempstyle[name] = value
  header['color'] = tempstyle['background-color']
  if "background-image" in tempstyle.keys():
    header['image'] = tempstyle['background-image'][4:-1]
  info['header'] = header

  namestr = soup.find("h1", {"id": "portfolio-user-name"})
  name = namestr.text.lstrip().rstrip().split("\n")[0].lstrip().rstrip()
  info['name'] = name

  namestr = soup.find("h1", {"id": "portfolio-user-name"})
  username = namestr.text.lstrip().rstrip().split("\n")[1].lstrip().rstrip()[1:-1]
  info['username'] = username

  if soup.find("span", class_="ss-link"):
    website = soup.find("span", class_="ss-link").parent.a['href'].lstrip().rstrip()
  else:
    website = None
  info['website'] = website

  if soup.find("span", class_="ss-octocat"):
    github = soup.find("span", class_="ss-octocat").parent.a['href'].lstrip().rstrip()
  else:
    github = None
  info['github'] = github

  if soup.find("span", class_="ss-twitter"):
    twitter = soup.find("span", class_="ss-twitter").parent.a['href'].lstrip().rstrip()
  else:
    twitter = None
  info['twitter'] = twitter

  if soup.find("span", class_="ss-linkedin"):
    linkedin = soup.find("span", class_="ss-linkedin").parent.a['href'].lstrip().rstrip()
  else:
    linkedin = None
  info['linkedin'] = linkedin




  projs = []
  for proj in soup.findAll("a", class_="link-to-software"):
    projs.append(proj['href'].replace("https://devpost.com/software/", ""))
  info['projects'] = projs

  info['project_details'] = []
  for project_name in projs:
      project_url = f"https://devpost.com/software/{project_name}"
      project_req = requests.get(project_url, headers={'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36'})
      project_info = project(project_req, project_name)
      info['project_details'].append(project_info)


  hackathons = []
  for hack in BeautifulSoup(requests.get("https://devpost.com/" + username + "/challenges", headers={'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36'}).text, 'html.parser').findAll("a", {"data-role": "featured_challenge"}):
    hackathons.append(urlparse(hack['href']).hostname.split('.')[0])
  info['hackathons'] = hackathons

  info['links'] = {}
  info['links']['github'] = info['github']
  info['links']['linkedin'] = info['linkedin']
  info['links']['twitter'] = info['twitter']
  info['links']['website'] = info['website']
  del info['github']
  del info['linkedin']
  del info['twitter']
  del info['website']
  
  return info

def project(mainreq, name):
  info = {}

  soup = BeautifulSoup(mainreq.text, 'html.parser')

  try:
    gallery = []
    for li in soup.find("div", {"id": "gallery"}).findChildren("li"):
      try:
        url = fixurl(li.find("a")['href'])
        caption = li.p.i.text.lstrip().rstrip()
        gallery.append({"url": url, "caption": caption})
      except:
        url = fixurl(li.findChildren("iframe")[0]['src'])
        try:
          caption = li.p.i.text.lstrip().rstrip()
        except:
          caption = None
        gallery.append({"url": url, "caption": caption})
    info['gallery'] = gallery
  except:
    info['gallery'] = []

  for div in soup.findAll("div", class_=None):
    if len(dict(div.attrs).keys()) == 0:
      multipart_form_data = {
        'forceInNewWindow': (None, 'true'),
        'htmlString': (None, str(div)),
        'encoding': (None, "UTF-8"),
        'indentation': (None, "TABS")
      }
      response = requests.post('https://www.freeformatter.com/html-formatter.html', files=multipart_form_data)
      content = response.text
      break
  info['content'] = content.translate(dict([(ord(x), ord(y)) for x, y in zip(u"‘’´“”–-", u"'''\"\"--")]))

  try:
    built_with = []
    for li in soup.find("div", {"id": "built-with"}).findChildren("li"):
      built_with.append(li.text.lstrip().rstrip())
    info['built_with'] = built_with
  except:
    info['built_with'] = []

  try:
    app_links = []
    for link in soup.find("nav", {"class": "app-links"}).findChildren("a"):
      app_links.append(link['href'])
    info['app_links'] = app_links
  except:
    info['app_links'] = []
  try:
    submissions = []
    submissions_div = soup.find("div", {"id": "submissions"})
    if submissions_div:
        for li in submissions_div.findAll("li"):
            submission = {}
            # Get the submission title and URL
            submission_link = li.find("a", href=True)
            if submission_link:
                submission['title'] = submission_link.text.strip()
                submission['url'] = submission_link['href']

            # Check if the submission has a winner label
            winner_label = li.find("span", class_="winner")
            if winner_label:
                submission['winner_label'] = winner_label.text.strip()
                submission['winner_description'] = winner_label.next_sibling.strip() if winner_label.next_sibling else None

            submissions.append(submission)
    info['submissions'] = submissions
  except Exception as e:
    info['submissions'] = []
    print(f"Error scraping submissions: {e}")
  try:
    submitted_to = []
    for hackathon in soup.findAll("div", class_="software-list-content"):
      submitted_to.append(hackathon.text.lstrip().rstrip().split("\n")[0])
    info['submitted_to'] = submitted_to
  except:
    info['submitted_to'] = []

  created_by = []
  for hackathon in soup.findAll("li", class_="software-team-member"):
    created_by.append(hackathon.findChildren("img")[0]['title'])
  info['created_by'] = created_by

  ids = []
  temphtml = []
  mastercomments = []
  users = []
  times = []
  for art in soup.findAll("article"):
    if "data-commentable-id" in dict(art.attrs).keys():
      templist = []
      ids.append(art['data-commentable-id'])
      for text in art.findChildren("p"):
        if len(dict(text.attrs).keys()) == 0:
          templist.append(str(text))
      temphtml.append("\n".join(templist))
      try:
        users.append(art.find("a").attrs['href'].replace("https://devpost.com/", ""))
      except:
        users.append("Private user")
      times.append(datetime.strptime(art.time.attrs['datetime'].replace(art.time.attrs['datetime'].split(":")[-2:][0][2:] + ":" + art.time.attrs['datetime'].split(":")[-2:][1], art.time.attrs['datetime'].split(":")[-2:][0][2:] + art.time.attrs['datetime'].split(":")[-2:][1]), '%Y-%m-%dT%H:%M:%S%z').strftime("%Y-%m-%dT%H:%M:%S") + ".000Z")

  pages = []
  for li in soup2.findAll("li"):
    if len(dict(li.attrs).keys()) == 0:
      try:
        pages.append(int(li.string))
      except:
        pass

  return info
#This scraper has been developed for escritores.org
#- Need to add the Poets and writers scrapping, will do it in another .py file
from bs4 import BeautifulSoup
import requests
from datetime import datetime
import uuid
import os

url = "https://www.escritores.org/concursos/concursos-1/concursos-cuento-relato"
response = requests.get(url)

soup = BeautifulSoup(response.text, 'html.parser')

concursos = soup.find("div", id="cuento")
names = concursos.find_all("a")
date = concursos.find_all('span', attrs={'style':'color: #005b7f;'})

i = 0

arr = [datetime.strptime(elem.text[1:11], "%d:%m:%Y") for elem in date]

for item in names:
    _text = item.text
    _link = "https://www.escritores.org" + item['href']
    _id = str(uuid.uuid4())
    _release = arr[i]
    i = i + 1
    
    import psycopg2

    conn = psycopg2.connect(
                dbname=os.getenv('DATABASE_NAME'),
                user=os.getenv('USER'),
                password=os.getenv('PASS'),
                host=os.getenv('HOS'),
                port=os.getenv('POR')
            )

    cursor = conn.cursor()

    cursor.execute("INSERT INTO concursos (id, posted_date, title, link) VALUES (%s, %s, %s, %s) ON CONFLICT (id) DO UPDATE SET posted_date = excluded.posted_date, title = excluded.title, link = excluded.link;", (_id, _release, _text, _link))

    

    conn.commit()
    cursor.close()
    conn.close()

print("Crawling " + url + " complete.")
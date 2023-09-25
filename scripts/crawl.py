import requests
from bs4 import BeautifulSoup
from dateutil.parser import parse
import os


# Initialize your starting URL
start_url = "https://www.pw.org/grants?field_entry_fee_value=All&filter1=32&field_deadline_value=1&sort_by=field_deadline_value&sort_order=ASC&items_per_page=25"

# Initialize a list or queue to hold the URLs to crawl
url_queue = [start_url]

# Set a limit to the number of pages you want to crawl (optional)
max_pages_to_crawl = 2
crawled_pages = 0

while url_queue and crawled_pages < max_pages_to_crawl:
    # Get the next URL to crawl
    
    current_url = url_queue.pop(0)
    # Send a GET request to the URL
    response = requests.get(current_url)
    
    if response.status_code == 200:
        # Parse the HTML content
        soup = BeautifulSoup(response.text, "html.parser")
        
        # Extract data and perform processing here
        contests = soup.find_all("a", {"class": "title"})
        dates = soup.find_all("div", {"class": "views-field views-field-field-deadline"})

        ar = []
        i = 0

        for elem in dates:
            match_str = parse(elem.text, fuzzy=True)
            ar.append(match_str)
            

        if crawled_pages >= 1:
            count = 26
        else:
            count = 1

        for item in contests:     
            _text = item.text
            _link = "https://www.pw.org" + item['href']
            _id = count
            _release = ar[i]
            i += 1
    
            import psycopg2

            conn = psycopg2.connect(
                dbname=os.getenv('DATABASE_NAME'),
                user=os.getenv('USER'),
                password=os.getenv('PASS'),
                host=os.getenv('HOS'),
                port=os.getenv('POR')
            )

            cursor = conn.cursor()

            cursor.execute("INSERT INTO entry (id, title, release, link) VALUES (%s, %s, %s, %s) ON CONFLICT (id) DO UPDATE SET title = excluded.title, release = excluded.release, link = excluded.link;", (_id, _text, _release, _link))

            count = count + 1

            conn.commit()
            cursor.close()
            conn.close()
        
        # Check for a next page link
        pager = soup.find("li", class_="pager-item")
        next_page_link = pager.find("a", {"title": "Go to page 2"})

        
        if next_page_link:
            # Extract the URL of the next page
            next_page_url = "https://www.pw.org" + next_page_link.get("href")
            
            # Add the next page URL to the queue
            url_queue.append(next_page_url)
        
        # Increment the crawled pages counter
        crawled_pages += 1

    else:
        print(f"Failed to fetch {current_url}")

print("Crawling " + start_url + " complete")

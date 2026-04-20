import requests
import time
from typing import List, Dict

def get_publications(institution_openalex_id: str, topic_id: str, limit: int = 50) -> List[Dict]:
    """ Fetch publications from OpenAlex API for a specific research topic """

    # API endpoint
    base_url = 'https://api.openalex.org/works'

    openalex_id = institution_openalex_id.replace('https://openalex.org/', '') if institution_openalex_id.startswith('https://openalex.org/') else institution_openalex_id

    params = {
        'filter': f'institutions.id:{openalex_id},topics.id:{topic_id}',
        'per-page': min(limit, 50),
        'sort': 'publication_date:desc',
        'select': 'id,doi,title,publication_year,publication_date,cited_by_count,authorships,primary_location,type,referenced_works_count,grants,fwci',
        'mailto': 'jwc602@msstate.edu'
    }

    max_retries = 5
    base_delay = 5

    for attempt in range(max_retries):
        try:
            response = requests.get(base_url, params=params, timeout=30)
            if response.status_code == 200:
                data = response.json()
                return data.get('results', [])
            elif response.status_code == 429:
                retry_after = response.headers.get('Retry-After', base_delay)
                wait_time = int(retry_after)
                print(f"Rate limited. Waiting {wait_time} seconds...")
                time.sleep(wait_time)
            else:
                print(f"HTTP {response.status_code}: {response.text[:200]}")
                response.raise_for_status()
        except requests.RequestException as e:
            if attempt < max_retries - 1:
                wait_time = min(int(base_delay * (1.8 ** attempt)), 60)
                print(f"Request failed: {e}. Waiting {wait_time} seconds...")
                time.sleep(wait_time)
            else:
                print(f"Final error for topic '{topic_id}': {e}")
                return []
    return []


def fetch_crossref_metadata(doi: str, mailto: str = "jwc602@msstate.edu") -> dict:
    """ Fetch metadata from Crossref for a given DOI """
    
    # url = f"https://api.crossref.org/works/{doi}"
    url = doi;
    try:
        r = requests.get(url, params={"mailto": mailto}, timeout=30)
        if r.status_code != 200:
            print(f"Crossref error {r.status_code} for DOI {doi}")
            return {}
        msg = r.json().get("message", {})
        return msg
    except requests.RequestException as e:
        print(f"Crossref request failed for {doi}: {e}")
        return {}


def fetch_funder_registry_details(funder_doi: str, mailto: str = 'jwc602@msstate.edu') -> dict:
    """ Fetch metadata for each funder from the Crossref Funder Registry """
    
    if not funder_doi:
        return{}

    url = f"https://api.crossref.org/funders/{funder_doi}"
    try:
        r = requests.get(url, params = {"mailto" : mailto}, timeout = 30)
        if r.status_code != 200:
            return{}
        return r.json().get("message",{})
    except requests.RequestException as e:
        print(f"Funder registery request failed for {funder_doi} : {e}")
        return {}
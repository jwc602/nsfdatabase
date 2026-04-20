import pandas as pd
import time
from pathlib import Path
from tqdm import tqdm
from API_Fetchv2 import fetch_crossref_metadata
import requests
import json
import traceback
import os
import sys
def fetch_openalex_by_doi(doi: str) -> dict:
    """Fetch publication data from OpenAlex using DOI"""
    
    if not doi:
        return {}
    
    # url = f"https://api.openalex.org/works/doi:{doi}"
    url = doi;
    params = {'mailto': 'jwc602@msstate.edu'}
    
    try:
        response = requests.get(url, params=params, timeout=30)
        if response.status_code == 200:
            return response.json()
        else:
            print(f"OpenAlex error {response.status_code} for DOI {doi}")
            return {}
    except requests.RequestException as e:
        print(f"OpenAlex request failed for {doi}: {e}")
        return {}

def process_csv_file(csv_file_path: str):
    """Process CSV file containing DOIs and extract publication data"""
    
    try:
        # Read the CSV file
        df = pd.read_csv(csv_file_path)
        
        # Check if DOI column exists
        if 'id' not in df.columns:
            print("Error: 'id' column not found in CSV file")
            print(f"Available columns: {', '.join(df.columns)}")
            return
        
        print(f"Processing {len(df)} publications from CSV file...")
        print(f"Columns in CSV: {', '.join(df.columns)}\n")
        
        # Create output directory
        output_dir = Path('trimmeddodentities') / 'bulkjsonsmit'
        output_dir.mkdir(parents=True, exist_ok=True)
        
        publications_processed = 0
        
        for i in range(1, 11, 1):
            doi_clean = "https://api.openalex.org/works?page=" + str(i) + "&filter=authorships.institutions.lineage:i63966007,funders.id:f4320337654|f4320338295|f4320337790|f4320333448|f4320337629|f4320337657|f4320337345|f4320338279|f4320338406|f4320332925|f4320306078|f4320332467|f4320332201|f4320332923|f4320337532|f4320337656|f4320332958|f4320337633|f4320332959|f4320332975|f4320332180|f4320334259|f4320337538|f4320311089|f4320332447|f4320332954|f4320332263|f4320337630|f4320332186|f4320332264|f4320332165|f4320338273|f4320338325|f4320338390|f4320337644|f4320338281,publication_year:2023+-+2025&sort=cited_by_count:desc&per_page=200&mailto=ui@openalex.org"
    
            
            # Fetch raw JSON from both APIs
            openalex_data = fetch_openalex_by_doi(doi_clean)
            # crossref_data = fetch_crossref_metadata(doi_clean)
            
            # if not openalex_data and not crossref_data:
                # print(f"No data found for DOI: {doi_clean}")
                # continue
            
            # Combine into single JSON structure
            combined_json = {
                'openalex': openalex_data
                #'crossref': crossref_data
            }
            
            
            filename = "doddump" + str(i);
            #filename = filename[21:]
            output_file = output_dir / f'{filename}.json'
            
            # Save as individual JSON file
            with open(output_file, 'w', encoding='utf-8') as f:
                json.dump(combined_json, f, indent=2, ensure_ascii=False)
            
            publications_processed += 1
            time.sleep(1)  # Rate limiting
        
        print(f'Total publications processed: {publications_processed}')
        print(f'JSON files saved to: {output_dir}')
        
        
    except FileNotFoundError:
        print(f"Error: The file '{csv_file_path}' was not found.")
    except Exception as e:
        print(f"Error processing CSV: {e}")
        traceback.print_exc()

if __name__ == '__main__':
    
    CSV_FILE_PATH ="H:\\openalextesting\\trimmeddodentities.csv"
    process_csv_file(csv_file_path=CSV_FILE_PATH)
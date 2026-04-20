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
    url = doi[:8] + "api." + doi[8:]
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

def process_csv_file(csv_file_path: str, enttype: str):
    """Process CSV file containing DOIs and extract publication data"""
    
    try:
        # Read the CSV file
        #df = pd.read_csv(csv_file_path)
        
        # Check if DOI column exists
        # if 'id' not in df.columns:
            # print("Error: 'id' column not found in CSV file")
            # print(f"Available columns: {', '.join(df.columns)}")
            # return
        
        # print(f"Processing {len(df)} publications from CSV file...")
        # print(f"Columns in CSV: {', '.join(df.columns)}\n")
        
        # Create output directory
        output_dir = Path(sys.argv[3])
        print(output_dir)
        #output_dir = Path('clayjson_dump')
        #output_dir.mkdir(parents=True, exist_ok=True)
        print(output_dir)
        # publications_processed = 0
        
        # for idx, row in tqdm(df.iterrows(), total=len(df), desc="Processing DOIs"):
            # doi = row.get('id')
            
            # if pd.isna(doi) or not doi:
                # print(f"Skipping row {idx}: No id found")
                # continue
        doi = CSV_FILE_PATH
        doi_clean = str(doi).strip()
        
        # Fetch raw JSON from both APIs
        openalex_data = fetch_openalex_by_doi(doi_clean)
        crossref_data = fetch_crossref_metadata(doi_clean)
        
        
        # Combine into single JSON structure
        combined_json = {
            'doi': doi_clean,
            'openalex': openalex_data,
            'crossref': crossref_data
        }
            
            
        filename = doi_clean.replace('/', '_').replace('\\', '_').replace(':', '_').replace('.', '_')
        filename = filename[21:]
        output_file = output_dir / f'{filename}.json'
        
        # Save as individual JSON file
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(combined_json, f, indent=2, ensure_ascii=False)
        
        #publications_processed += 1
        time.sleep(1)  # Rate limiting
        
        #print(f'Total publications processed: {publications_processed}')
        print(f'JSON files saved to: {output_dir}')
        print(f'JSON files saved as: {output_file}')
        print(f'JSON files saved with type: {enttype}')
        os.system(f'node H:\\openalextesting\\openalexrecurstest.js {output_file} {enttype} {output_dir} {sys.argv[4]}')
        
    except FileNotFoundError:
        print(f"Error: The file '{csv_file_path}' was not found.")
    except Exception as e:
        print(f"Error processing CSV: {e}")
        traceback.print_exc()

if __name__ == '__main__':
    
    # CSV_FILE_PATH = "https://openalex.org/I1279970786"
    CSV_FILE_PATH = sys.argv[1]
    process_csv_file(csv_file_path=CSV_FILE_PATH, enttype=sys.argv[2])
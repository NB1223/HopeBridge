import requests
import feedparser
from flask import Flask, jsonify
import openai
from datetime import datetime, timedelta
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
import json

app = Flask(__name__)

# OpenAI API Key (Replace with your OpenAI API key)
openai.api_key = ""  # Your OpenAI API Key here

# Step 1: Fetch News from Multiple Sources (CNN, NBC, The New York Times)
def get_emergency_news():
    news_list = []
    
    # Define the URLs for the RSS feeds
    rss_urls = [
        "https://rss.cnn.com/rss/cnn_us.rss",  # CNN US
        "https://www.nbcnews.com/rss",  # NBC News US-focused
        "https://rss.nytimes.com/services/xml/rss/nyt/US.xml",  # The New York Times US News
        "https://feeds.bbci.co.uk/news/rss.xml",  # BBC News
    ]
    
    date_120_days_ago = datetime.now() - timedelta(days=120)  # Increase the range to 120 days
    
    for url in rss_urls:
        feed = feedparser.parse(url)
        
        for entry in feed.entries:
            published_date = datetime(*entry.published_parsed[:6])
            if published_date >= date_120_days_ago:
                title = entry.title
                link = entry.link
                region = extract_region_from_category(entry)  # Extract region from <category> tag
                
                # Only consider news with a title and a region to make it more relevant
                if title and region:
                    news_list.append({
                        "title": title,
                        "link": link,
                        "source": "News Source",  # Generic for now, you can add specific names per source
                        "published_date": published_date.strftime('%Y-%m-%d'),
                        "region": region
                    })
    return news_list

# Step 2: Extract Region from <category> Tag (from RSS Feed)
def extract_region_from_category(entry):
    try:
        # Check if category exists
        if 'category' in entry and entry.category:
            return entry.category
        else:
            return "Unknown"  # If category is missing, return "Unknown"
    except AttributeError:
        return "Unknown"  # If an AttributeError occurs, return "Unknown"

# Step 3: Use OpenAI to Check if News is Related to Emergency
def is_emergency_news(news_title):
    try:
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[{
                "role": "system",
                "content": "You are an AI that classifies news as emergency-related or not, with a focus on clear and urgent events."
            }, {
                "role": "user",
                "content": f"""
Classify the following news title as either **Emergency** or **Not an Emergency**.

**Emergency News** includes:
- **Natural Disasters** (e.g., Earthquakes, Floods, Wildfires, Hurricanes, Tornadoes, Volcanic Eruptions, Tsunamis, and Mudslides)
- **Humanitarian Crises** (e.g., Refugee Crises, Famines, Epidemics, Mass Casualties, Armed Conflicts, Human Rights Violations)
- **Urgent Relief Efforts** (e.g., Rescue Operations, Emergency Aid, Government Disaster Responses, Evacuations)
- **Mass Casualty Events** (e.g., Terrorist Attacks, Plane Crashes, School Shootings)

**DO NOT consider**:
- Events related to **political news**, **sports**, **technology**, **entertainment**, **finance**, or **business**.
- Events such as **celebrations**, **achievements**, or **regular weather occurrences** (e.g., normal seasonal weather changes).

ONLY respond with:
- **Emergency** (if the title suggests an urgent or disaster-related situation)
- **Not an Emergency** (if the title is unrelated to urgent matters)

**DO NOT include any explanations or additional information.**

Here is the news title: "{news_title}"
"""
            }], 
            max_tokens=5
        )
        
        result = response["choices"][0]["message"]["content"].strip()
        
        return result.lower() == "emergency"
    
    except Exception as e:
        print(f"[ERROR] OpenAI API Failed: {e}")
        return False

# Step 4: Use OpenAI to Identify Region from News Title
def extract_region_from_news_title(news_title):
    try:
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[{
                "role": "system",
                "content": "You are an AI that identifies the region (city or state) from news articles."
            }, {
                "role": "user",
                "content": f"""
You will be provided with either the title of a news article or the full article text. Your task is to extract the region (city or state) mentioned. If no specific region is clearly mentioned, respond with "Unknown".

Here are some examples to guide you:

Example 1:
News title or article:
Major Earthquake Rocks San Francisco, Thousands Evacuate
Response: San Francisco

Example 2:
News title or article:
Local Elections See Record Voter Turnout
Response: Unknown

Example 3:
News title or article:
Widespread Flooding Hits Northern California, Emergency Declared
Response: Northern California

Example 4:
News title or article:
Tech Conference Announces New Innovations in AI
Response: Unknown

Now, review the news title or article provided below and respond accordingly.

News title or article:
{news_title}
"""
            }],
            max_tokens=10
        )
        
        region = response["choices"][0]["message"]["content"].strip()
        return region if region.lower() != "unknown" else "Unknown"

    except Exception as e:
        print(f"[ERROR] OpenAI API Failed for region extraction: {e}")
        return "Unknown"  # Default to "Unknown" in case of failure

# Step 5: Remove Duplicate News Based on Title or Link
def remove_duplicates(news_list):
    seen_titles = set()
    unique_news = []
    
    for news in news_list:
        if news["title"] not in seen_titles and news["link"] not in seen_titles:
            unique_news.append(news)
            seen_titles.add(news["title"])
            seen_titles.add(news["link"])
    
    return unique_news

# Step 6: Filter News Based on Context (Emergency or Not)
def filter_relevant_news(news_list):
    relevant_news = []
    
    for news in news_list:
        is_emergency = is_emergency_news(news["title"])  # Call OpenAI function to classify emergency
        news["is_emergency"] = is_emergency  # Store classification
        
        # Extract the region information (even from the title)
        region = extract_region_from_news_title(news["title"])  # Extract region
        news["region"] = region  # Store region in the output

        if is_emergency:
            relevant_news.append(news)  # Only add emergency news
    
    return relevant_news

# Step 7: Check Similarity of Articles to Avoid Redundant News
def check_similarity(news_list):
    texts = [news['title'] for news in news_list]
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(texts)
    cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)
    
    unique_news = []
    seen = set()
    
    for i, news in enumerate(news_list):
        if i not in seen:
            similar_news = [i]
            for j in range(i+1, len(news_list)):
                if cosine_sim[i][j] > 0.75:  # Threshold for similarity
                    similar_news.append(j)
                    seen.add(j)
            if all(news_list[idx]['title'] not in seen for idx in similar_news):
                unique_news.append(news_list[i])
    
    return unique_news

# Step 8: API Endpoint to Get Processed Emergency Data
# @app.route('/get_emergency_data', methods=['GET'])
# def get_emergency_data():
#     news_list = get_emergency_news()  # Fetch latest news
#     unique_news = remove_duplicates(news_list)  # Remove duplicates
#     relevant_news = filter_relevant_news(unique_news)  # Filter emergency news and extract regions
#     final_news = check_similarity(relevant_news)  # Filter similar articles
    
#     # Save the final emergency news to a JSON file
#     with open('relevant_emergency_news.json', 'w') as json_file:
#         json.dump({"relevant_emergency_news": final_news}, json_file, indent=4)

@app.route('/get_emergency_data', methods=['GET'])
def get_emergency_data():
    news_list = get_emergency_news()  # Fetch latest news
    unique_news = remove_duplicates(news_list)  # Remove duplicates
    relevant_news = filter_relevant_news(unique_news)  # Filter emergency news
    final_news = check_similarity(relevant_news)  # Filter similar articles
    with open('relevant_emergency_news.json', 'w') as json_file:
         json.dump({"relevant_emergency_news": final_news}, json_file, indent=4)
    return jsonify({"relevant_emergency_news": final_news})

    

# Add Home Route to Prevent 404 Errors
@app.route('/home')
def home():
    return "Welcome to the Emergency News API! Use /get_emergency_data to fetch relevant emergency news."

# Run the Flask Server
if __name__ == '__main__':
    app.run(debug=True, port=5000)

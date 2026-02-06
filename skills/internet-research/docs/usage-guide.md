# Usage Guide

This guide provides detailed examples and best practices for using the Internet Research Skill.

## Basic Workflow

The typical research workflow consists of three steps:

1. **Search** - Find relevant URLs using SearchAPI
2. **Extract** - Get clean content from URLs using Jina AI
3. **Analyze** - Process and summarize the extracted information

## Step 1: Performing Searches

### Basic Search

```bash
curl -s "https://www.searchapi.io/api/v1/search?engine=google&api_key=${SEARCHAPI_KEY}&q=your+search+query" | jq '.' > search_results.json
```

### Search with Filters

```bash
# Search with date filter (past year)
curl -s "https://www.searchapi.io/api/v1/search?engine=google&api_key=${SEARCHAPI_KEY}&q=AI+trends&tbs=qdr:y" | jq '.' > ai_trends.json

# Search specific site
curl -s "https://www.searchapi.io/api/v1/search?engine=google&api_key=${SEARCHAPI_KEY}&q=site:github.com+machine+learning" | jq '.' > github_ml.json

# Search with location
curl -s "https://www.searchapi.io/api/v1/search?engine=google&api_key=${SEARCHAPI_KEY}&q=restaurants&location=New+York" | jq '.' > nyc_restaurants.json
```

### Extracting Search Results

```bash
# Get top 5 organic results
jq '.organic_results[0:5] | .[] | {title: .title, link: .link, snippet: .snippet}' search_results.json

# Get just the URLs
jq -r '.organic_results[].link' search_results.json

# Get featured snippet
jq '.answer_box' search_results.json

# Get knowledge graph
jq '.knowledge_graph' search_results.json
```

## Step 2: Extracting Content from URLs

### Basic Content Extraction

```bash
curl -s "https://r.jina.ai/https://example.com" \
  -H "Authorization: Bearer ${JINA_TOKEN}" \
  -H "X-Return-Format: text" > content.txt
```

### Different Output Formats

```bash
# Markdown format (preserves structure)
curl -s "https://r.jina.ai/https://example.com" \
  -H "Authorization: Bearer ${JINA_TOKEN}" \
  -H "X-Return-Format: markdown" > content.md

# HTML format (clean HTML)
curl -s "https://r.jina.ai/https://example.com" \
  -H "Authorization: Bearer ${JINA_TOKEN}" \
  -H "X-Return-Format: html" > content.html

# JSON format (structured data)
curl -s "https://r.jina.ai/https://example.com" \
  -H "Authorization: Bearer ${JINA_TOKEN}" \
  -H "X-Return-Format: json" > content.json
```

### Advanced Options

```bash
# Target specific CSS selector
curl -s "https://r.jina.ai/https://example.com" \
  -H "Authorization: Bearer ${JINA_TOKEN}" \
  -H "X-Return-Format: text" \
  -H "X-Target-Selector: article.main-content" > article.txt

# Remove specific elements
curl -s "https://r.jina.ai/https://example.com" \
  -H "Authorization: Bearer ${JINA_TOKEN}" \
  -H "X-Return-Format: text" \
  -H "X-Remove-Selector: nav,footer,.ads" > clean_content.txt

# Set timeout
curl -s --max-time 30 "https://r.jina.ai/https://example.com" \
  -H "Authorization: Bearer ${JINA_TOKEN}" \
  -H "X-Return-Format: text" > content.txt
```

## Step 3: Complete Research Workflows

### Example 1: Research Topic with Multiple Sources

```bash
#!/bin/bash
# Research workflow for "Best No-Code App Builders"

TOPIC="Best No-Code App Builders"
QUERY=$(echo "$TOPIC" | sed 's/ /+/g')
OUTPUT_DIR="research_$(date +%Y%m%d_%H%M%S)"

mkdir -p "$OUTPUT_DIR"

# Step 1: Search
echo "Searching for: $TOPIC"
curl -s "https://www.searchapi.io/api/v1/search?engine=google&api_key=${SEARCHAPI_KEY}&q=${QUERY}" \
  | jq '.' > "$OUTPUT_DIR/search_results.json"

# Step 2: Extract top 3 URLs
echo "Extracting URLs..."
jq -r '.organic_results[0:3] | .[] | .link' "$OUTPUT_DIR/search_results.json" > "$OUTPUT_DIR/urls.txt"

# Step 3: Extract content from each URL
counter=1
while IFS= read -r url; do
  echo "Extracting content from: $url"
  curl -s "https://r.jina.ai/$url" \
    -H "Authorization: Bearer ${JINA_TOKEN}" \
    -H "X-Return-Format: markdown" > "$OUTPUT_DIR/article_${counter}.md"
  counter=$((counter + 1))
  sleep 2  # Rate limiting
done < "$OUTPUT_DIR/urls.txt"

echo "Research complete! Results in: $OUTPUT_DIR"
```

### Example 2: Reddit Research

```bash
#!/bin/bash
# Research Reddit discussions

TOPIC="machine learning frameworks"
QUERY="site:old.reddit.com ${TOPIC}"
ENCODED_QUERY=$(echo "$QUERY" | sed 's/ /+/g')

# Search Reddit
curl -s "https://www.searchapi.io/api/v1/search?engine=google&api_key=${SEARCHAPI_KEY}&q=${ENCODED_QUERY}" \
  | jq '.' > reddit_search.json

# Extract Reddit thread URLs
jq -r '.organic_results[] | select(.link | contains("reddit.com")) | .link' reddit_search.json > reddit_urls.txt

# Extract content from first thread
FIRST_URL=$(head -1 reddit_urls.txt)
curl -s "https://r.jina.ai/$FIRST_URL" \
  -H "Authorization: Bearer ${JINA_TOKEN}" \
  -H "X-Return-Format: markdown" > reddit_thread.md

echo "Reddit research complete!"
```

### Example 3: Competitive Analysis

```bash
#!/bin/bash
# Analyze competitor websites

COMPETITORS=(
  "https://competitor1.com/features"
  "https://competitor2.com/pricing"
  "https://competitor3.com/about"
)

mkdir -p competitor_analysis

for url in "${COMPETITORS[@]}"; do
  filename=$(echo "$url" | sed 's/https:\/\///g' | sed 's/\//_/g')
  
  echo "Analyzing: $url"
  curl -s "https://r.jina.ai/$url" \
    -H "Authorization: Bearer ${JINA_TOKEN}" \
    -H "X-Return-Format: markdown" > "competitor_analysis/${filename}.md"
  
  sleep 2
done

echo "Competitive analysis complete!"
```

## Caching Strategy

To minimize API calls and costs, implement caching:

```bash
#!/bin/bash
# Search with caching

CACHE_DIR="$HOME/.research_cache"
mkdir -p "$CACHE_DIR"

search_with_cache() {
  local query="$1"
  local cache_key=$(echo "$query" | md5sum | cut -d' ' -f1)
  local cache_file="$CACHE_DIR/${cache_key}.json"
  
  # Check if cache exists and is less than 24 hours old
  if [ -f "$cache_file" ] && [ $(find "$cache_file" -mtime -1) ]; then
    echo "Using cached results..."
    cat "$cache_file"
  else
    echo "Fetching fresh results..."
    curl -s "https://www.searchapi.io/api/v1/search?engine=google&api_key=${SEARCHAPI_KEY}&q=${query}" \
      | tee "$cache_file"
  fi
}

# Usage
search_with_cache "best+practices+python"
```

## Best Practices

### 1. Rate Limiting

```bash
# Add delays between requests
for url in "${urls[@]}"; do
  curl -s "https://r.jina.ai/$url" -H "Authorization: Bearer ${JINA_TOKEN}" > output.txt
  sleep 2  # Wait 2 seconds between requests
done
```

### 2. Error Handling

```bash
# Check HTTP status codes
response=$(curl -s -w "\n%{http_code}" "https://r.jina.ai/https://example.com" \
  -H "Authorization: Bearer ${JINA_TOKEN}")

http_code=$(echo "$response" | tail -n1)
content=$(echo "$response" | head -n-1)

if [ "$http_code" -eq 200 ]; then
  echo "$content" > output.txt
else
  echo "Error: HTTP $http_code"
fi
```

### 3. Logging

```bash
# Log all operations
LOG_FILE="research_$(date +%Y%m%d).log"

log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

log "Starting research..."
log "Searching for: $QUERY"
# ... rest of script
```

### 4. Using old.reddit.com

Always prefer `old.reddit.com` over `www.reddit.com` for better content extraction:

```bash
# Good
curl -s "https://r.jina.ai/https://old.reddit.com/r/programming/comments/xyz" \
  -H "Authorization: Bearer ${JINA_TOKEN}"

# Avoid
curl -s "https://r.jina.ai/https://www.reddit.com/r/programming/comments/xyz" \
  -H "Authorization: Bearer ${JINA_TOKEN}"
```

### 5. Batch Processing

```bash
# Process multiple URLs efficiently
urls_file="urls.txt"
output_dir="extracted_content"
mkdir -p "$output_dir"

cat "$urls_file" | xargs -I {} -P 3 bash -c '
  url="{}"
  filename=$(echo "$url" | md5sum | cut -d" " -f1)
  curl -s "https://r.jina.ai/$url" \
    -H "Authorization: Bearer $JINA_TOKEN" \
    -H "X-Return-Format: markdown" > "'$output_dir'/${filename}.md"
  sleep 1
'
```

## Common Use Cases

### News Monitoring

```bash
# Monitor news about a topic
curl -s "https://www.searchapi.io/api/v1/search?engine=google&api_key=${SEARCHAPI_KEY}&q=AI+news&tbs=qdr:d&tbm=nws" \
  | jq '.news_results'
```

### Academic Research

```bash
# Search Google Scholar
curl -s "https://www.searchapi.io/api/v1/search?engine=google_scholar&api_key=${SEARCHAPI_KEY}&q=machine+learning" \
  | jq '.organic_results'
```

### Product Research

```bash
# Search shopping results
curl -s "https://www.searchapi.io/api/v1/search?engine=google&api_key=${SEARCHAPI_KEY}&q=best+laptops&tbm=shop" \
  | jq '.shopping_results'
```

## Troubleshooting

### Content Extraction Issues

If Jina fails to extract content properly:

1. Try different return formats (text, markdown, html)
2. Use X-Target-Selector to focus on specific elements
3. Check if the site requires JavaScript (Jina handles most cases)
4. Verify the URL is accessible

### Search Quality Issues

To improve search results:

1. Use specific keywords
2. Add site filters: `site:example.com`
3. Use date filters: `&tbs=qdr:y` (past year)
4. Try different search engines: `&engine=bing`

## Next Steps

- Explore [Example Scripts](../examples/) for ready-to-use code
- Check [Command Reference](reference.md) for all parameters
- Review [API Limits](api-limits.md) for usage guidelines

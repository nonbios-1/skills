# Command Reference

Complete reference for all commands and parameters used in the Internet Research Skill.

## SearchAPI Commands

### Basic Search

```bash
curl -s "https://www.searchapi.io/api/v1/search?engine=ENGINE&api_key=API_KEY&q=QUERY"
```

### Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `engine` | string | Search engine to use | `google`, `bing`, `google_scholar` |
| `api_key` | string | Your SearchAPI key | `your_api_key` |
| `q` | string | Search query (URL encoded) | `best+practices` |
| `location` | string | Geographic location | `New+York,USA` |
| `gl` | string | Country code | `us`, `uk`, `ca` |
| `hl` | string | Language code | `en`, `es`, `fr` |
| `num` | integer | Number of results (1-100) | `10` |
| `start` | integer | Result offset for pagination | `0`, `10`, `20` |
| `tbs` | string | Time-based search filters | See below |
| `tbm` | string | Search type | `nws` (news), `shop` (shopping), `isch` (images) |
| `safe` | string | Safe search | `active`, `off` |

### Time-Based Filters (tbs)

| Filter | Description |
|--------|-------------|
| `qdr:h` | Past hour |
| `qdr:d` | Past 24 hours |
| `qdr:w` | Past week |
| `qdr:m` | Past month |
| `qdr:y` | Past year |
| `cdr:1,cd_min:MM/DD/YYYY,cd_max:MM/DD/YYYY` | Custom date range |

### Search Engines

| Engine | Description |
|--------|-------------|
| `google` | Google Search (default) |
| `bing` | Bing Search |
| `google_scholar` | Google Scholar |
| `google_news` | Google News |
| `youtube` | YouTube Search |
| `google_maps` | Google Maps |

### Response Structure

```json
{
  "search_metadata": {
    "id": "search_id",
    "status": "Success",
    "created_at": "timestamp",
    "processed_at": "timestamp",
    "total_time_taken": 1.23
  },
  "search_parameters": {
    "engine": "google",
    "q": "search query",
    "device": "desktop"
  },
  "organic_results": [
    {
      "position": 1,
      "title": "Page Title",
      "link": "https://example.com",
      "displayed_link": "example.com",
      "snippet": "Description text...",
      "date": "2 days ago"
    }
  ],
  "answer_box": {
    "type": "organic_result",
    "title": "Featured Snippet Title",
    "answer": "Featured snippet content..."
  },
  "knowledge_graph": {
    "title": "Entity Name",
    "type": "Entity Type",
    "description": "Description..."
  },
  "related_searches": [
    {
      "query": "Related query 1"
    }
  ]
}
```

## Jina AI Commands

### Basic Content Extraction

```bash
curl -s "https://r.jina.ai/URL" \
  -H "Authorization: Bearer TOKEN" \
  -H "X-Return-Format: FORMAT"
```

### Headers

| Header | Type | Description | Values |
|--------|------|-------------|--------|
| `Authorization` | string | Bearer token (required) | `Bearer jina_xxx` |
| `X-Return-Format` | string | Output format | `text`, `markdown`, `html`, `json` |
| `X-Target-Selector` | string | CSS selector to extract | `.article`, `#content` |
| `X-Remove-Selector` | string | CSS selector to remove | `nav,footer,.ads` |
| `X-Wait-For-Selector` | string | Wait for element to load | `.dynamic-content` |
| `X-Timeout` | integer | Request timeout (ms) | `30000` |
| `X-With-Links-Summary` | boolean | Include links summary | `true`, `false` |
| `X-With-Images-Summary` | boolean | Include images summary | `true`, `false` |

### Return Formats

#### Text Format
```bash
curl -s "https://r.jina.ai/https://example.com" \
  -H "Authorization: Bearer ${JINA_API_KEY}" \
  -H "X-Return-Format: text"
```
Returns clean, plain text content.

#### Markdown Format
```bash
curl -s "https://r.jina.ai/https://example.com" \
  -H "Authorization: Bearer ${JINA_API_KEY}" \
  -H "X-Return-Format: markdown"
```
Returns content in Markdown format with preserved structure.

#### HTML Format
```bash
curl -s "https://r.jina.ai/https://example.com" \
  -H "Authorization: Bearer ${JINA_API_KEY}" \
  -H "X-Return-Format: html"
```
Returns cleaned HTML content.

#### JSON Format
```bash
curl -s "https://r.jina.ai/https://example.com" \
  -H "Authorization: Bearer ${JINA_API_KEY}" \
  -H "X-Return-Format: json"
```
Returns structured JSON with metadata.

### Advanced Extraction

#### Target Specific Content
```bash
curl -s "https://r.jina.ai/https://example.com" \
  -H "Authorization: Bearer ${JINA_API_KEY}" \
  -H "X-Return-Format: text" \
  -H "X-Target-Selector: article.main-content"
```

#### Remove Unwanted Elements
```bash
curl -s "https://r.jina.ai/https://example.com" \
  -H "Authorization: Bearer ${JINA_API_KEY}" \
  -H "X-Return-Format: text" \
  -H "X-Remove-Selector: nav,footer,.sidebar,.ads"
```

#### Wait for Dynamic Content
```bash
curl -s "https://r.jina.ai/https://example.com" \
  -H "Authorization: Bearer ${JINA_API_KEY}" \
  -H "X-Return-Format: text" \
  -H "X-Wait-For-Selector: .loaded-content"
```

#### Include Summaries
```bash
curl -s "https://r.jina.ai/https://example.com" \
  -H "Authorization: Bearer ${JINA_API_KEY}" \
  -H "X-Return-Format: json" \
  -H "X-With-Links-Summary: true" \
  -H "X-With-Images-Summary: true"
```

### Response Structure (JSON Format)

```json
{
  "code": 200,
  "status": "success",
  "data": {
    "title": "Page Title",
    "description": "Page description",
    "url": "https://example.com",
    "content": "Extracted content...",
    "text": "Plain text version...",
    "markdown": "Markdown version...",
    "html": "Clean HTML...",
    "links": [
      {
        "text": "Link text",
        "href": "https://example.com/link"
      }
    ],
    "images": [
      {
        "src": "https://example.com/image.jpg",
        "alt": "Image description"
      }
    ]
  }
}
```

## jq Commands for JSON Processing

### Basic Extraction

```bash
# Pretty print JSON
jq '.' file.json

# Get specific field
jq '.field_name' file.json

# Get nested field
jq '.parent.child' file.json

# Get array element
jq '.array[0]' file.json
```

### SearchAPI Results Processing

```bash
# Extract all organic result titles
jq '.organic_results[].title' search_results.json

# Extract titles and links
jq '.organic_results[] | {title: .title, link: .link}' search_results.json

# Get first 5 results
jq '.organic_results[0:5]' search_results.json

# Filter by domain
jq '.organic_results[] | select(.link | contains("github.com"))' search_results.json

# Get featured snippet
jq '.answer_box.answer' search_results.json

# Get related searches
jq '.related_searches[].query' search_results.json

# Count results
jq '.organic_results | length' search_results.json
```

### Advanced jq Queries

```bash
# Extract URLs to file
jq -r '.organic_results[].link' search_results.json > urls.txt

# Create CSV output
jq -r '.organic_results[] | [.position, .title, .link] | @csv' search_results.json

# Filter and transform
jq '[.organic_results[] | select(.date != null) | {title, link, date}]' search_results.json

# Group by domain
jq 'group_by(.link | split("/")[2])' search_results.json

# Sort by position
jq '.organic_results | sort_by(.position)' search_results.json
```

## curl Options

### Common Options

| Option | Description | Example |
|--------|-------------|---------|
| `-s` | Silent mode (no progress bar) | `curl -s URL` |
| `-o` | Output to file | `curl -o file.txt URL` |
| `-H` | Add header | `curl -H "Header: Value" URL` |
| `-X` | HTTP method | `curl -X POST URL` |
| `-d` | POST data | `curl -d "key=value" URL` |
| `-L` | Follow redirects | `curl -L URL` |
| `-w` | Write out format | `curl -w "%{http_code}" URL` |
| `--max-time` | Timeout in seconds | `curl --max-time 30 URL` |
| `-A` | User agent | `curl -A "Mozilla/5.0" URL` |

### Error Handling

```bash
# Get HTTP status code
curl -s -o /dev/null -w "%{http_code}" URL

# Show errors
curl -sS URL

# Retry on failure
curl --retry 3 --retry-delay 2 URL

# Fail on HTTP errors
curl -f URL
```

## Shell Scripting Helpers

### URL Encoding

```bash
# Encode spaces
echo "search query" | sed 's/ /+/g'

# Full URL encoding
urlencode() {
  python3 -c "import urllib.parse; print(urllib.parse.quote('$1'))"
}
```

### File Operations

```bash
# Create timestamped directory
mkdir -p "research_$(date +%Y%m%d_%H%M%S)"

# Generate unique filename
filename=$(echo "$url" | md5sum | cut -d' ' -f1)

# Check file age
find file.txt -mtime -1  # Less than 1 day old
```

### Loops and Iteration

```bash
# Loop through URLs
while IFS= read -r url; do
  echo "Processing: $url"
done < urls.txt

# Loop with counter
counter=1
for url in "${urls[@]}"; do
  echo "Processing $counter: $url"
  counter=$((counter + 1))
done

# Parallel processing
cat urls.txt | xargs -I {} -P 3 bash -c 'process_url "{}"'
```

## Environment Variables

### Setting Variables

```bash
# Temporary (current session)
export SEARCHAPI_KEY="your_key"
export JINA_API_KEY="your_token"

# Permanent (add to ~/.bashrc or ~/.zshrc)
echo 'export SEARCHAPI_KEY="your_key"' >> ~/.bashrc
source ~/.bashrc
```

### Using Variables

```bash
# In URLs
curl "https://api.example.com?key=${API_KEY}"

# In scripts
if [ -z "$SEARCHAPI_KEY" ]; then
  echo "Error: SEARCHAPI_KEY not set"
  exit 1
fi
```

## Rate Limiting

### Built-in Delays

```bash
# Sleep between requests
sleep 2  # 2 seconds

# Random delay
sleep $((1 + RANDOM % 3))  # 1-3 seconds
```

### Token Bucket Implementation

```bash
# Simple rate limiter
RATE_LIMIT=10  # requests per minute
INTERVAL=$((60 / RATE_LIMIT))

for url in "${urls[@]}"; do
  process_url "$url"
  sleep $INTERVAL
done
```

## Error Codes

### HTTP Status Codes

| Code | Meaning | Action |
|------|---------|--------|
| 200 | Success | Continue |
| 400 | Bad Request | Check parameters |
| 401 | Unauthorized | Check API key |
| 403 | Forbidden | Check permissions |
| 404 | Not Found | Check URL |
| 429 | Rate Limited | Wait and retry |
| 500 | Server Error | Retry later |

### Exit Codes

```bash
# Success
exit 0

# General error
exit 1

# Invalid arguments
exit 2

# API error
exit 3
```

## Best Practices Summary

1. **Always use environment variables for API keys**
2. **Implement caching to reduce API calls**
3. **Add rate limiting between requests**
4. **Handle errors gracefully**
5. **Log operations for debugging**
6. **Use old.reddit.com for Reddit content**
7. **Validate inputs before making API calls**
8. **Set reasonable timeouts**
9. **Clean up temporary files**
10. **Monitor API usage and costs**

## Quick Reference Card

```bash
# Search
curl -s "https://www.searchapi.io/api/v1/search?engine=google&api_key=${SEARCHAPI_KEY}&q=QUERY" | jq '.'

# Extract content
curl -s "https://r.jina.ai/URL" -H "Authorization: Bearer ${JINA_API_KEY}" -H "X-Return-Format: text"

# Get URLs from search
jq -r '.organic_results[].link' search.json

# Process multiple URLs
cat urls.txt | while read url; do curl -s "https://r.jina.ai/$url" -H "Authorization: Bearer ${JINA_API_KEY}"; sleep 2; done
```

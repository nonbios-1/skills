| name | description |
|------|-------------|
| internet-research | Conduct comprehensive internet research using SearchAPI for Google searches and Jina AI for clean content extraction from any URL. Ideal for gathering information, analyzing topics, and extracting structured data from web sources. |

## When to Use This Skill

Use this skill when you need to:
- Research topics using Google search results
- Extract clean text content from web articles
- Gather information from multiple sources
- Analyze Reddit discussions (use old.reddit.com for better structure)
- Get AI-synthesized overviews of search topics
- Build knowledge bases from web content

## Core Workflow

1. **Search**: Use SearchAPI to get Google search results with titles, links, and snippets
2. **Extract URLs**: Parse JSON results to identify relevant sources
3. **Get Content**: Use Jina AI to extract clean, readable text from URLs

## Prerequisites

You need API credentials for:
- **SearchAPI**: Sign up at https://www.searchapi.io/
- **Jina AI**: Sign up at https://jina.ai/

Set credentials as environment variables:
```bash
export SEARCHAPI_KEY="your_key_here"
export JINA_TOKEN="your_token_here"
```

## Basic Commands

### Search with SearchAPI
```bash
curl -s "https://www.searchapi.io/api/v1/search?engine=google&api_key=${SEARCHAPI_KEY}&q=YOUR_QUERY" | jq '.' > results.json
```

### Extract Top URLs
```bash
jq '.organic_results[0:5] | .[] | {title, link, snippet}' results.json
```

### Get Clean Content with Jina
```bash
curl -s "https://r.jina.ai/URL_HERE" \
  -H "Authorization: Bearer ${JINA_TOKEN}" \
  -H "X-Return-Format: text" > content.txt
```

## Advanced Techniques

### Site-Specific Search
Target specific websites:
```bash
q=topic+site:reddit.com
q=topic+site:github.com
```

### Reddit Research
Use `old.reddit.com` for cleaner, bot-friendly structure:
```bash
curl -s "https://r.jina.ai/https://old.reddit.com/r/subreddit/comments/ID/" \
  -H "Authorization: Bearer ${JINA_TOKEN}" \
  -H "X-Return-Format: text"
```

### AI Overview
SearchAPI includes synthesized answers:
```bash
jq '.ai_overview.markdown' results.json
```

## Cost Management

- **Cache results**: Save JSON files to avoid repeated searches
- **Use SearchAPI sparingly**: Each search counts against your quota
- **Batch URL extractions**: Get multiple URLs from one search
- **Site-specific searches**: More targeted results, fewer searches needed

## Output Formats

- **Search Results**: JSON with titles, links, snippets, AI overview, related searches
- **Content Extraction**: Clean plain text (typically 1000+ lines per article)
- **Ready for**: Analysis, summarization, data extraction, or further processing

## Example Workflow

```bash
# 1. Search for information
curl -s "https://www.searchapi.io/api/v1/search?engine=google&api_key=${SEARCHAPI_KEY}&q=best+practices+python+testing" | jq '.' > search.json

# 2. View AI overview
jq '.ai_overview.markdown' search.json

# 3. Extract top 5 URLs
jq '.organic_results[0:5] | .[] | {title, link}' search.json

# 4. Get content from first result
URL=$(jq -r '.organic_results[0].link' search.json)
curl -s "https://r.jina.ai/${URL}" \
  -H "Authorization: Bearer ${JINA_TOKEN}" \
  -H "X-Return-Format: text" > article.txt

# 5. Analyze the content
wc -l article.txt
head -50 article.txt
```

## Tips for Best Results

1. **Use specific queries**: More specific = better results
2. **Check AI overview first**: Often provides quick answers
3. **Verify sources**: Check multiple sources for accuracy
4. **Cache aggressively**: Save all JSON and text files
5. **Use old.reddit.com**: Better structure for Reddit content
6. **Batch processing**: Extract multiple URLs from one search

## Troubleshooting

- **Empty results**: Check API key validity and quota
- **Jina timeout**: Some URLs may be slow; increase timeout if needed
- **Malformed JSON**: Ensure proper URL encoding in search queries
- **Rate limits**: Implement delays between requests if hitting limits

## Further Documentation

See the `docs/` folder for:
- Detailed setup instructions
- Advanced usage patterns
- Command reference
- Example scripts

#!/bin/bash
# Reddit Search Example
# Searches Reddit using old.reddit.com for bot-friendly results

# Check if API key is set
if [ -z "$SEARCHAPI_KEY" ]; then
  echo "Error: SEARCHAPI_KEY environment variable not set"
  echo "Set it with: export SEARCHAPI_KEY='your_key_here'"
  exit 1
fi

# Get search query from command line argument
QUERY="${1:-best practices}"
SUBREDDIT="${2}"

if [ -z "$SUBREDDIT" ]; then
  # Search all of Reddit
  SEARCH_QUERY="site:old.reddit.com ${QUERY}"
else
  # Search specific subreddit
  SEARCH_QUERY="site:old.reddit.com/r/${SUBREDDIT} ${QUERY}"
fi

ENCODED_QUERY=$(echo "$SEARCH_QUERY" | sed 's/ /+/g')

echo "Searching Reddit for: $QUERY"
if [ -n "$SUBREDDIT" ]; then
  echo "Subreddit: r/$SUBREDDIT"
fi
echo "----------------------------------------"

# Perform search
curl -s "https://www.searchapi.io/api/v1/search?engine=google&api_key=${SEARCHAPI_KEY}&q=${ENCODED_QUERY}" \
  | jq -r '.organic_results[0:5] | .[] | "[\(.position)] \(.title)\n    \(.link)\n    \(.snippet)\n"'

echo "----------------------------------------"
echo "Tip: Use old.reddit.com URLs with Jina for better content extraction"
echo "Example: curl -s \"https://r.jina.ai/https://old.reddit.com/r/...\" -H \"Authorization: Bearer \$JINA_API_KEY\""

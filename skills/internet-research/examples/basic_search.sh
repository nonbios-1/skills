#!/bin/bash
# Basic Search Example
# Performs a simple Google search and displays results

# Check if API key is set
if [ -z "$SEARCHAPI_KEY" ]; then
  echo "Error: SEARCHAPI_KEY environment variable not set"
  echo "Set it with: export SEARCHAPI_KEY='your_key_here'"
  exit 1
fi

# Get search query from command line argument
QUERY="${1:-best practices python}"
ENCODED_QUERY=$(echo "$QUERY" | sed 's/ /+/g')

echo "Searching for: $QUERY"
echo "----------------------------------------"

# Perform search
curl -s "https://www.searchapi.io/api/v1/search?engine=google&api_key=${SEARCHAPI_KEY}&q=${ENCODED_QUERY}" \
  | jq -r '.organic_results[0:5] | .[] | "[\(.position)] \(.title)\n    \(.link)\n    \(.snippet)\n"'

echo "----------------------------------------"
echo "Search complete!"

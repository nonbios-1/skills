#!/bin/bash
# Content Extraction Example
# Extracts clean text content from a URL using Jina AI

# Check if API key is set
if [ -z "$JINA_API_KEY" ]; then
  echo "Error: JINA_API_KEY environment variable not set"
  echo "Set it with: export JINA_API_KEY='your_key_here'"
  exit 1
fi

# Get URL from command line argument
URL="${1}"

if [ -z "$URL" ]; then
  echo "Usage: $0 <url>"
  echo "Example: $0 https://example.com/article"
  exit 1
fi

echo "Extracting content from: $URL"
echo "----------------------------------------"

# Extract content
curl -s "https://r.jina.ai/${URL}" \
  -H "Authorization: Bearer ${JINA_API_KEY}" \
  -H "X-Return-Format: text"

echo ""
echo "----------------------------------------"
echo "Extraction complete!"

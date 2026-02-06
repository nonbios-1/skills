# Setup Guide

This guide walks you through setting up the Internet Research Skill for Claude Code.

## Prerequisites

- Linux/Unix environment (macOS, Ubuntu, WSL on Windows)
- `curl` command-line tool
- `jq` for JSON parsing (optional but recommended)
- Active internet connection

## Step 1: Get API Keys

### SearchAPI

1. Visit [https://www.searchapi.io/](https://www.searchapi.io/)
2. Click "Sign Up" or "Get Started"
3. Create an account (free tier available)
4. Navigate to your dashboard
5. Copy your API key

**Free Tier Includes:**
- 100 searches per month
- Google search engine access
- AI overview feature

### Jina AI

1. Visit [https://jina.ai/](https://jina.ai/)
2. Sign up for an account
3. Navigate to API settings or dashboard
4. Generate an API token
5. Copy your token (starts with `jina_`)

**Free Tier Includes:**
- Generous usage limits
- Content extraction from any URL
- Multiple format options

## Step 2: Install Required Tools

### Install jq (JSON Parser)

**Ubuntu/Debian:**
```bash
sudo apt-get update
sudo apt-get install jq
```

**macOS:**
```bash
brew install jq
```

**Verify Installation:**
```bash
jq --version
```

### Verify curl

```bash
curl --version
```

curl is typically pre-installed on most systems.

## Step 3: Configure Environment Variables

### Temporary Setup (Current Session Only)

```bash
export SEARCHAPI_KEY="your_searchapi_key_here"
export JINA_TOKEN="your_jina_token_here"
```

### Permanent Setup

Add to your shell configuration file:

**For Bash (~/.bashrc):**
```bash
echo 'export SEARCHAPI_KEY="your_searchapi_key_here"' >> ~/.bashrc
echo 'export JINA_TOKEN="your_jina_token_here"' >> ~/.bashrc
source ~/.bashrc
```

**For Zsh (~/.zshrc):**
```bash
echo 'export SEARCHAPI_KEY="your_searchapi_key_here"' >> ~/.zshrc
echo 'export JINA_TOKEN="your_jina_token_here"' >> ~/.zshrc
source ~/.zshrc
```

### Verify Environment Variables

```bash
echo $SEARCHAPI_KEY
echo $JINA_TOKEN
```

Both should display your API credentials.

## Step 4: Test Your Setup

### Test SearchAPI

```bash
curl -s "https://www.searchapi.io/api/v1/search?engine=google&api_key=${SEARCHAPI_KEY}&q=test" | jq '.search_metadata.status'
```

**Expected Output:** `"Success"`

### Test Jina AI

```bash
curl -s "https://r.jina.ai/https://example.com" \
  -H "Authorization: Bearer ${JINA_TOKEN}" \
  -H "X-Return-Format: text" | head -5
```

**Expected Output:** Clean text from example.com

## Step 5: Create Working Directory

```bash
mkdir -p ~/research-workspace
cd ~/research-workspace
```

This directory will store your search results and extracted content.

## Step 6: Install Skill in Claude Code

### Method 1: From GitHub (Recommended)

```bash
# In Claude Code, run:
/plugin install internet-research-skill@your-github-username
```

### Method 2: Local Installation

```bash
# Clone the repository
git clone https://github.com/your-username/internet-research-skill.git

# In Claude Code, run:
/plugin install /path/to/internet-research-skill
```

### Verify Installation

```bash
# In Claude Code, list installed plugins:
/plugin list
```

You should see `internet-research-skill` in the list.

## Troubleshooting

### Issue: "Command not found: jq"

**Solution:** Install jq using the commands in Step 2.

### Issue: "Invalid API key"

**Solution:** 
- Verify your API key is correct
- Check for extra spaces or quotes
- Ensure environment variable is set: `echo $SEARCHAPI_KEY`

### Issue: "Authorization failed" (Jina)

**Solution:**
- Verify your Jina token starts with `jina_`
- Check token is correctly set: `echo $JINA_TOKEN`
- Ensure Bearer token format is correct in curl command

### Issue: "Rate limit exceeded"

**Solution:**
- Wait for rate limit reset (usually hourly or daily)
- Implement caching to reduce API calls
- Consider upgrading to paid tier for higher limits

### Issue: Environment variables not persisting

**Solution:**
- Ensure you added exports to correct shell config file
- Run `source ~/.bashrc` or `source ~/.zshrc`
- Restart terminal session

## Security Best Practices

1. **Never commit API keys to version control**
   - Add `.env` files to `.gitignore`
   - Use environment variables only

2. **Restrict API key permissions**
   - Use read-only keys when possible
   - Set up IP restrictions if available

3. **Monitor API usage**
   - Check dashboards regularly
   - Set up usage alerts
   - Implement rate limiting in scripts

4. **Rotate keys periodically**
   - Change keys every 3-6 months
   - Revoke old keys after rotation

## Next Steps

- Read the [Usage Guide](usage-guide.md) for detailed examples
- Check the [Command Reference](reference.md) for all available commands
- Explore [Example Scripts](../examples/) for ready-to-use code

## Getting Help

- Check [SearchAPI Documentation](https://www.searchapi.io/docs)
- Review [Jina AI Documentation](https://jina.ai/docs)
- Open an issue on GitHub
- Contact support for API-specific issues

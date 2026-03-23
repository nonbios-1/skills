| name | description |
|------|-------------|
| seo-content-writing | Create SEO-optimized content that ranks well in both traditional search engines and AI tools (ChatGPT, Perplexity, Gemini) using 2025 best practices. Focuses on E-E-A-T principles, semantic architecture, and content structuring for maximum visibility. |

## When to Use This Skill

Use this skill when you need to:
- Write blog posts, articles, or web content that ranks well in search engines
- Optimize existing content for better search visibility
- Structure content for AI search tools and featured snippets
- Build topical authority through content clusters
- Create FAQ sections with proper schema markup
- Ensure content meets Google's Helpful Content System requirements

## Core Philosophy: E-E-A-T + AI Visibility

Google's March 2024 update fundamentally shifted priorities:
- **Quality over quantity** (reduced indexed pages by 40% for low-quality sites)
- **E-E-A-T is non-negotiable**: Experience, Expertise, Authoritativeness, Trustworthiness
- **Dual optimization**: Traditional search + AI tools (ChatGPT, Perplexity, Gemini)
- **Zero-click reality**: 65%+ searches don't click - optimize for visibility itself

## Content Structure Checklist

### 1. Semantic Architecture
- [ ] Use **semantic keywords naturally** (LSI, not stuffing)
- [ ] Implement **hierarchical heading structure** (H1 → H2 → H3)
- [ ] Create **modular, scannable sections** (2-4 sentence paragraphs max)
- [ ] Add **visual breaks every 200-300 words** (images, lists, tables)

### 2. Technical SEO Elements
- [ ] **FAQ section with schema markup** (jump links for crawlability)
- [ ] **Structured data** for all applicable content types
- [ ] **Descriptive page titles** (helpful, not clickbait)
- [ ] **Clear internal linking** within content clusters
- [ ] **Mobile-first responsive design**

### 3. Quality Signals (Google's Helpful Content System)
- [ ] **Original information/research/analysis** (not rewrites)
- [ ] **Clear sourcing and evidence** of expertise
- [ ] **Author attribution** + comprehensive About pages
- [ ] **First-hand experience** demonstrated with real examples
- [ ] Answer: **Who created it? How? Why?**

### 4. Content Depth & Intent Alignment
- [ ] **Match search intent precisely** (informational/navigational/transactional)
- [ ] **Comprehensive coverage** of topic (but avoid fluff)
- [ ] **Answer follow-up questions** users will have
- [ ] **Provide actionable takeaways** (not just information)

## 2025 Strategic Priorities

### Topical Authority via Content Clusters
```
Pillar Page (broad topic)
    ↓
Cluster Pages (specific subtopics)
    ↓
Internal linking creates semantic web
```

**Implementation:**
- 1 pillar page per core topic
- 5-10 cluster pages supporting each pillar
- Bidirectional internal links
- Consistent keyword themes

### AI Search Optimization
**New reality:** Content must rank in:
- Traditional Google search
- ChatGPT/Perplexity citations
- Google AI Overviews
- Featured snippets

**Tactics:**
- Use **clear, quotable statements**
- Structure for **easy extraction** (lists, tables, definitions)
- Include **data and statistics** (AI tools cite these)
- Add **FAQ sections** (directly feeds AI responses)

### Featured Snippet Optimization
- **Paragraph snippets**: 40-60 word answers to specific questions
- **List snippets**: Numbered/bulleted steps or items
- **Table snippets**: Comparison data in clean tables
- Use **question-based H2s** that match search queries

## Content Format Best Practices

### Opening Section (First 100 words)
- State **primary topic clearly**
- Include **target keyword naturally**
- Preview **what user will learn**
- Hook with **relevance or urgency**

### Body Structure
```markdown
## Main Section (H2)
Brief intro to section topic (2-3 sentences)

### Subsection (H3)
- Bullet points for scannability
- Short paragraphs (2-4 sentences)
- Visual elements every 200-300 words

**Key insight boxes** for important points
```

### FAQ Section (Required)
- Minimum **5-10 questions**
- Use **actual search queries** (People Also Ask)
- Implement **FAQ schema markup**
- Keep answers **concise** (2-3 sentences)
- Add **jump links** for navigation

### Conclusion
- **Summarize key takeaways** (3-5 bullet points)
- **Clear call-to-action**
- **Related content links** (internal)

## What's Changed in 2025

### ❌ Deprecated Practices
- Keyword density targets
- Exact match anchor text overuse
- Thin content with ads
- AI-generated content without human expertise
- Guest posting for links only

### ✅ New Priorities
- **Topical authority** over individual keywords
- **Content clusters** replacing isolated posts
- **AI tool optimization** alongside Google
- **Author expertise** prominently displayed
- **User engagement metrics** (dwell time, scroll depth)
- **Semantic search** understanding over exact matches

## Example Workflow

### Step 1: Research & Planning
```bash
# Use internet-research skill to gather information
curl -s "https://www.searchapi.io/api/v1/search?engine=google&api_key=${SEARCHAPI_KEY}&q=YOUR_TOPIC" | jq '.' > research.json

# Analyze "People Also Ask" questions
jq '.related_questions' research.json

# Check competitor content structure
curl -s "https://r.jina.ai/COMPETITOR_URL" -H "Authorization: Bearer ${JINA_API_KEY}" > competitor.txt
```

### Step 2: Content Structure
```markdown
# [Primary Keyword]: [Benefit/Solution]

[Opening paragraph: 40-60 words stating topic, keyword, and value]

## Table of Contents
- [Section 1]
- [Section 2]
- [FAQ]

## [H2: Main Topic Section]
[2-3 sentence intro]

### [H3: Specific Subtopic]
- Bullet point 1
- Bullet point 2

[Short paragraph with actionable insight]

## FAQ
### [Question from People Also Ask]?
[2-3 sentence answer with keyword]

## Conclusion
**Key Takeaways:**
- Point 1
- Point 2
- Point 3

[Call to action]
```

### Step 3: Optimization
- Add structured data (FAQ schema, Article schema)
- Optimize meta description (150-160 characters)
- Add internal links to related content
- Include alt text for all images
- Verify mobile responsiveness

## Quality Checklist Before Publishing

- [ ] Content demonstrates **first-hand experience**
- [ ] **Author bio** included with credentials
- [ ] All claims **backed by sources**
- [ ] **FAQ section** with schema markup
- [ ] **Internal links** to 3-5 related pages
- [ ] **Images optimized** with descriptive alt text
- [ ] **Meta description** compelling and accurate
- [ ] **Mobile preview** looks good
- [ ] **Readability score** appropriate for audience
- [ ] Content answers **"Who, How, Why"** questions

## Common Mistakes to Avoid

1. **Keyword stuffing**: Use semantic variations naturally
2. **Thin content**: Aim for comprehensive coverage (1500+ words for competitive topics)
3. **No expertise signals**: Always show credentials and experience
4. **Ignoring search intent**: Match what users actually want
5. **Poor structure**: Use clear headings and short paragraphs
6. **Missing FAQ**: Essential for AI tool visibility
7. **No internal linking**: Weakens topical authority
8. **Generic content**: Add unique insights and examples

## Measuring Success

Track these metrics:
- **Organic traffic** growth over 3-6 months
- **Featured snippet** appearances
- **AI tool citations** (search your content in ChatGPT/Perplexity)
- **Dwell time** and scroll depth
- **Internal link clicks**
- **Ranking positions** for target keywords

## Additional Resources

- Google Search Central: https://developers.google.com/search
- Schema.org for structured data: https://schema.org/
- Google's E-E-A-T guidelines: Search Quality Rater Guidelines

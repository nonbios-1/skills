# Skills Repository

This repository contains custom skills built by **nonbios** for use in **nonbios AI coding agents**. These skills follow the [Agent Skills specification](https://agentskills.io) for wider compatibility and can be used with other AI coding applications including Claude AI, Cursor, and any compatible AI development tools.

## What are Skills?

Skills are folders of instructions, scripts, and resources that AI coding agents load dynamically to improve performance on specialized tasks. Each skill teaches the AI how to complete specific tasks in a repeatable way. These skills are designed for nonbios but are compatible with Claude AI and other AI development tools that support the Agent Skills specification.

## Repository Structure

```
skills/
├── skills/              # Individual skill folders
│   └── internet-research/
│       ├── SKILL.md    # Skill definition and instructions
│       ├── docs/       # Additional documentation
│       └── examples/   # Example scripts
├── README.md           # This file
├── LICENSE             # Apache 2.0 License
├── CONTRIBUTING.md     # Contribution guidelines
├── CHANGELOG.md        # Version history
└── .gitignore          # Git ignore rules
```

## Available Skills

### Internet Research

**Location:** `skills/internet-research/`

Conduct comprehensive internet research using SearchAPI for Google searches and Jina AI for clean content extraction from any URL. Ideal for gathering information, analyzing topics, and extracting structured data from web sources.

**Key Features:**
- Google search integration via SearchAPI
- Clean content extraction from any URL using Jina AI
- Reddit-optimized research (using old.reddit.com)
- AI-synthesized search overviews
- Cost-effective with caching strategies

**Prerequisites:**
- SearchAPI account (https://www.searchapi.io/)
- Jina AI account (https://jina.ai/)

**Documentation:**
- [Skill Definition](skills/internet-research/SKILL.md)
- [Setup Guide](skills/internet-research/docs/setup.md)
- [API Documentation](skills/internet-research/docs/api.md)
- [Examples](skills/internet-research/examples/)

## Using Skills

### In nonbios

To install this skill in nonbios, prompt the AI agent to learn from the GitHub repository:

```
Learn skill from https://raw.githubusercontent.com/nonbios-1/skills/main/skills/internet-research/SKILL.md
```

Once learned, you can use the skill in your conversations:
```
Use the internet-research skill to find information about [topic]
```

### In Claude Code

1. Register this repository as a plugin marketplace:
   ```
   /plugin marketplace add nonbios/skills
   ```

2. Install the skills:
   ```
   /plugin install internet-research@skills
   ```

### In Claude.ai

Skills can be loaded by referencing the SKILL.md file in your conversations.

### In Other Compatible AI Tools

Any AI coding application that supports the Agent Skills specification can use these skills by loading the SKILL.md files.

### Via API

Include skill instructions in your system prompts or use Claude's skills API when available.

## Creating Custom Skills

Each skill should:
1. Be in its own folder under `skills/`
2. Contain a `SKILL.md` file with:
   - Metadata table (name, description)
   - When to use the skill
   - Prerequisites and setup
   - Core instructions and commands
   - Examples and best practices
3. Include a `docs/` folder for additional documentation
4. Include an `examples/` folder with working examples

See the [template](https://github.com/anthropics/skills/tree/main/template) from Anthropic's skills repository for reference.

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a list of changes and version history.

## License

This repository is licensed under the Apache 2.0 License. See [LICENSE](LICENSE) file for details.

## Resources

- [nonbios](https://nonbios.ai) - AI coding agents platform
- [Agent Skills Specification](https://agentskills.io) - Standard format for AI skills
- [Anthropic Skills Repository](https://github.com/anthropics/skills) - Reference implementation
- [Claude Documentation](https://docs.anthropic.com) - Claude AI documentation

## Disclaimer

These skills are provided for demonstration and educational purposes. Always test skills thoroughly in your own environment before relying on them for critical tasks. API keys and credentials should never be committed to the repository.

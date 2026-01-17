# Content Management

This directory contains all content files for micro-tool pages.

## Directory Structure

```
content/
├── tools/          # MDX files for tool pages
└── schemas/        # JSON schema files for structured markup
```

## Tool Pages (MDX Files)

Each tool page is defined by an MDX file in the `tools/` directory. The filename should match the URL slug (e.g., `word-counter.mdx` for `/word-counter`).

### Frontmatter Structure

Each MDX file must include frontmatter with the following fields:

```yaml
---
title: "Tool Name"
description: "Brief description for meta tags"
ogTitle: "Open Graph Title (optional)"
ogDescription: "Open Graph Description (optional)"
ogImage: "/og/image-name.png"
canonical: "https://toolur.com/tool-slug"
category: "Tool Category"
---
```

### Required Fields

- `title`: Page title (used in `<title>` tag)
- `description`: Meta description
- `canonical`: Canonical URL for SEO
- `category`: Tool category (e.g., "PDF Tool", "Image Tool", "Text Tool")

### Optional Fields

- `ogTitle`: Open Graph title (defaults to `title`)
- `ogDescription`: Open Graph description (defaults to `description`)
- `ogImage`: Open Graph image path

### Example MDX File

```markdown
---
title: "Word Counter Tool"
description: "Count words and characters instantly."
ogTitle: "Word Counter Tool - Free Online"
ogDescription: "Free online word counter with no limits."
ogImage: "/og/word-counter.png"
canonical: "https://toolur.com/word-counter"
category: "Text Tool"
---

# Word Counter Tool

Your markdown content here...
```

## Schema Files (JSON-LD)

Structured markup schema files are stored in the `schemas/` directory. Each schema file should match the tool slug (e.g., `word-counter.json` for `/word-counter`).

### Schema Structure

Use JSON-LD format following Schema.org specifications. Example:

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Tool Name",
  "description": "Tool description",
  "url": "https://toolur.com/tool-slug",
  "applicationCategory": "UtilityApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}
```

## URL Structure

Tool URLs follow the pattern: `toolur.com/{slug}`

The slug should match:
- MDX filename (without `.mdx` extension)
- Schema filename (without `.json` extension)

Examples:
- `/word-counter` → `content/tools/word-counter.mdx` + `content/schemas/word-counter.json`
- `/merge-pdf` → `content/tools/merge-pdf.mdx` + `content/schemas/merge-pdf.json`

## Adding New Tools

1. Create MDX file in `content/tools/` with proper frontmatter
2. Create corresponding schema file in `content/schemas/`
3. The page will be automatically available at `/tool-slug`

## Editing Content

Simply edit the MDX files in `content/tools/` and schema files in `content/schemas/`. Changes will be reflected after rebuilding the site.


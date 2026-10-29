# Search crawlers

The public website allows all paths in `robots.txt`. This includes Googlebot,
OAI-SearchBot and Claude-SearchBot; it introduces no change to training permissions.
Search visibility does not require enabling a training crawler. OpenAI separates
OAI-SearchBot from GPTBot; Anthropic separates Claude-SearchBot from ClaudeBot.

When a firewall or hosting policy changes, check both the user agent and the
provider's published network information. A request with a matching user agent
does not prove access from the real crawler's IP addresses.

## Sitemap entries

Add an absolute canonical URL when a new indexable page is published. This branch
lists only the homepage because the other proposed pages live on separate branches.
Do not list demo contact routes, fragments, unpublished pages or files under `docs/`.
Use a `lastmod` only when it represents a real content update.

## Demo indexing

The demo is hosted on a separate subdomain. Its indexing policy belongs to the
application's demo build, not this website's robots file. Keep it crawlable so
search engines can read its `noindex` directive.

## References

Checked on 28 October 2026:

- [OpenAI crawler roles](https://developers.openai.com/api/docs/bots)
- [Anthropic crawler roles](https://privacy.anthropic.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler)
- [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)

export function getCanonicalUrl(siteUrl: string, slug: string): string {
  return `${siteUrl}/${slug}`;
}

export function getNewsUrl(siteUrl: string, slug: string): string {
  return `${siteUrl}/news/${slug}`;
}

import { useSiteMetadata } from "../hooks/use-site-metadata";

export function featuredImage(featuredImage?: {
  publicURL: string;
}): string | undefined {
  if (featuredImage) {
    const metadata = useSiteMetadata();
    return `${metadata.siteUrl}${featuredImage.publicURL}`;
  }
}

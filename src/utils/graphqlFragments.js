// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import { graphql } from 'gatsby';

// ─────────────────────────────────────────────────────────────────────────────
// Graphql Query Fragments
// ─────────────────────────────────────────────────────────────────────────────

export const SITE_METADATA = graphql`
  fragment SITE_METADATA on Site {
    siteMetadata {
      siteTitle
    }
  }
`;

export const META_FRAGMENT = graphql`
  fragment META_FRAGMENT on MdxFrontmatter {
    meta {
      description
      permalink
      title
    }
  }
`;

export const HEADER_NAV_FRAGMENT = graphql`
  fragment HEADER_NAV_FRAGMENT on Mdx {
    frontmatter {
      links {
        text
        url
      }
    }
  }
`;

export const FOOTER_NAV_FRAGMENT = graphql`
  fragment FOOTER_NAV_FRAGMENT on Mdx {
    frontmatter {
      title
      links {
        url
        type
        title
        text
        mdx
        links {
          text
          url
        }
      }
    }
  }
`;

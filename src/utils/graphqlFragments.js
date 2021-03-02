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

export const CHILD_FLUID = graphql`
  fragment CHILD_FLUID on File {
    childImageSharp {
      fluid(maxWidth: 1024, maxHeight: 1024, quality: 75) {
        ...GatsbyImageSharpFluid_noBase64
      }
    }
    publicURL
    name
    id
  }
`;

export const CHILDREN_FIXED_230_170 = graphql`
  fragment CHILDREN_FIXED_230_170 on File {
    childrenImageSharp {
      fixed(width: 230, height: 170, quality: 75) {
        ...GatsbyImageSharpFixed_noBase64
      }
    }
    publicURL
    name
    id
  }
`;

export const CHILD_FIXED_230_170 = graphql`
  fragment CHILD_FIXED_230_170 on File {
    childImageSharp {
      fixed(width: 230, height: 170, quality: 75) {
        ...GatsbyImageSharpFixed_noBase64
      }
    }
    publicURL
    name
    id
  }
`;

export const CHILD_FIXED_150_150 = graphql`
  fragment CHILD_FIXED_150_150 on File {
    childImageSharp {
      fixed(width: 150, height: 150, quality: 75) {
        ...GatsbyImageSharpFixed_noBase64
      }
    }
    publicURL
    name
    id
  }
`;

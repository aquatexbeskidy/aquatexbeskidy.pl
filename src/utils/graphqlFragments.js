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
      copyright
      nomadsCodes {
        madeBy
        name
        url
      }
      quickContact {
        title
        desc
        link {
          text
          url
          type
        }
      }
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

export const CONTACT_FRAGMENT = graphql`
  fragment CONTACT_FRAGMENT on Mdx {
    frontmatter {
      contact {
        title
        subTitle
        pinTitle
        pinDesc
        buttons {
          text
          icon
          url
          type
        }
      }
    }
  }
`;

export const META_VIDEO_FRAGMENT = graphql`
  fragment META_VIDEO_FRAGMENT on Mdx {
    frontmatter {
      videos {
        title
        date
        videoId
        videoTitle
      }
    }
  }
`;

export const CHILD_FLUID = graphql`
  fragment CHILD_FLUID on File {
    childImageSharp {
      gatsbyImageData(
        transformOptions: { cropFocus: CENTER }
        breakpoints: [320, 768, 1024]
        layout: FULL_WIDTH
        placeholder: NONE
        quality: 75
      )
    }
    publicURL
    name
    id
  }
`;

export const CHILDREN_FLUID = graphql`
  fragment CHILDREN_FLUID on File {
    childrenImageSharp {
      gatsbyImageData(
        transformOptions: { cropFocus: CENTER }
        breakpoints: [320, 768, 1024]
        layout: FULL_WIDTH
        placeholder: NONE
        width: 540
        quality: 75
      )
    }
    publicURL
    name
    id
  }
`;

export const CHILDREN_FLUID_860_480 = graphql`
  fragment CHILDREN_FLUID_860_480 on File {
    childrenImageSharp {
      gatsbyImageData(
        transformOptions: { cropFocus: CENTER }
        breakpoints: [320, 768, 1024]
        layout: FULL_WIDTH
        placeholder: NONE
        height: 480
        width: 840
        quality: 75
      )
    }
    publicURL
    name
    id
  }
`;

export const CHILDREN_FIXED_400_225 = graphql`
  fragment CHILDREN_FIXED_400_225 on File {
    childrenImageSharp {
      gatsbyImageData(
        transformOptions: { cropFocus: CENTER }
        breakpoints: [320, 768, 1024]
        placeholder: NONE
        height: 225
        width: 400
        quality: 75
      )
    }
    publicURL
    name
    id
  }
`;

export const CHILDREN_FIXED_75_75 = graphql`
  fragment CHILDREN_FIXED_75_75 on File {
    childrenImageSharp {
      gatsbyImageData(
        transformOptions: { cropFocus: CENTER }
        breakpoints: [320, 768, 1024]
        placeholder: NONE
        height: 75
        width: 75
        quality: 75
      )
    }
    publicURL
    name
    id
  }
`;

export const CHILD_FIXED_400_225 = graphql`
  fragment CHILD_FIXED_400_225 on File {
    childImageSharp {
      gatsbyImageData(
        transformOptions: { cropFocus: CENTER }
        placeholder: NONE
        layout: FIXED
        height: 225
        width: 400
        quality: 75
      )
    }
    publicURL
    name
    id
  }
`;

export const CHILD_FIXED_150_150 = graphql`
  fragment CHILD_FIXED_150_150 on File {
    childImageSharp {
      gatsbyImageData(
        transformOptions: { cropFocus: CENTER }
        placeholder: BLURRED
        layout: FIXED
        height: 150
        width: 150
        quality: 75
      )
    }
    publicURL
    name
    id
  }
`;

export const DUOTONE_176ED3_40_FLUID = graphql`
  fragment DUOTONE_176ED3_40_FLUID on File {
    childImageSharp {
      gatsbyImageData(
        transformOptions: { duotone: { highlight: "#176ED3", shadow: "#176ED3", opacity: 40 } }
      )
    }
    publicURL
    name
    id
  }
`;

export const DUOTONE_176ED3_90_FLUID = graphql`
  fragment DUOTONE_176ED3_90_FLUID on File {
    childImageSharp {
      gatsbyImageData(
        transformOptions: { duotone: { highlight: "#176ED3", shadow: "#176ED3", opacity: 76 } }
      )
    }
    publicURL
    name
    id
  }
`;

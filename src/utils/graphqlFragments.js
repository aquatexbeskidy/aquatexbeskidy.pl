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
      atbLogo
      nomadsCodes {
        madeBy
        name
        url
        icon
      }
      quickContact {
        title
        desc
        link {
          text
          url
          type
          icon
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

export const WORKS_FRAGMENT = graphql`
  fragment WORKS_FRAGMENT on Mdx {
    frontmatter {
      photosTitle
      videosTitle
    }
  }
`;

export const ABOUT_FRAGMENT = graphql`
  fragment ABOUT_FRAGMENT on Mdx {
    frontmatter {
      about {
        mainTitle
        contentBlocks {
          title
          contentList {
            desc
          }
        }
        viewOfWorkImgList {
          image {
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
          }
        }
        subTitle
        whyUsList {
          title
          desc
        }
      }
    }
  }
`;

export const OFFER_FRAGMENT = graphql`
  fragment OFFER_FRAGMENT on Mdx {
    frontmatter {
      offer {
        mainTitle
        mainContent
        subContent
        subTitle
        offerList {
          title
          price
        }
        reviewImgList {
          image {
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
          }
        }
      }
    }
  }
`;

export const DEEPWELL_FRAGMENT = graphql`
  fragment DEEPWELL_FRAGMENT on Mdx {
    frontmatter {
      deepWell {
        mainTitle
        mainContent
        additionList {
          description
          contentList {
            desc
          }
          image {
            childrenImageSharp {
              gatsbyImageData(
                transformOptions: { cropFocus: CENTER }
                breakpoints: [320, 768, 1024]
                placeholder: NONE
                height: 337
                width: 600
                quality: 75
              )
            }
          }
        }
        waterSearchTitle
        waterSearchDesc
        waterSearchId
        waterConnectTitle
        waterConnectDesc
        waterConnectId
      }
    }
  }
`;

export const BOREHOLE_FRAGMENT = graphql`
  fragment BOREHOLE_FRAGMENT on Mdx {
    frontmatter {
      borehole {
        mainTitle
        mainContent
        equipmentImgList {
          image {
            childrenImageSharp {
              gatsbyImageData(
                transformOptions: { cropFocus: CENTER }
                breakpoints: [320, 768, 1024]
                placeholder: NONE
                height: 337
                width: 600
                quality: 75
              )
            }
          }
        }
        subContent
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
        breakpoints: [320, 768, 1024, 1200]
        placeholder: BLURRED
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

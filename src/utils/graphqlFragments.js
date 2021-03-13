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

export const WORKS_FRAGMENT = graphql`
  fragment WORKS_FRAGMENT on Mdx {
    frontmatter {
      photosTitle
      videosTitle
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
          photo
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
          title
          contentList {
            desc
          }
          photo
        }
        waterSearchTitle
        waterSearchDesc
        waterConnectTitle
        waterConnectDesc
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
          photo
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

// fit: [INSIDE, OUTSIDE, FILL, CONTAIN, COVER]
// cropFocus: [CENTER, NORTH, NORTHEAST, EAST, SOUTHEAST, SOUTH, SOUTHWEST, WEST, NORTHWEST, ENTROPY, ATTENTION]
export const CHILD_FLUID = graphql`
  fragment CHILD_FLUID on File {
    childImageSharp {
      fluid(
        srcSetBreakpoints: [320, 768, 1024, 1200]
        cropFocus: CENTER
        maxHeight: 1024
        maxWidth: 1024
        quality: 90
      ) {
        ...GatsbyImageSharpFluid_noBase64
      }
    }
    publicURL
    name
    id
  }
`;

// fit: [INSIDE, OUTSIDE, FILL, CONTAIN, COVER]
// cropFocus: [CENTER, NORTH, NORTHEAST, EAST, SOUTHEAST, SOUTH, SOUTHWEST, WEST, NORTHWEST, ENTROPY, ATTENTION]
export const CHILDREN_FLUID = graphql`
  fragment CHILDREN_FLUID on File {
    childrenImageSharp {
      fluid(
        srcSetBreakpoints: [320, 768, 1024, 1200]
        cropFocus: CENTER
        maxWidth: 540
        quality: 95
      ) {
        ...GatsbyImageSharpFluid_noBase64
      }
    }
    publicURL
    name
    id
  }
`;

// fit: [INSIDE, OUTSIDE, FILL, CONTAIN, COVER]
// cropFocus: [CENTER, NORTH, NORTHEAST, EAST, SOUTHEAST, SOUTH, SOUTHWEST, WEST, NORTHWEST, ENTROPY, ATTENTION]
export const CHILDREN_FLUID_860_480 = graphql`
  fragment CHILDREN_FLUID_860_480 on File {
    childrenImageSharp {
      fluid(
        srcSetBreakpoints: [320, 768, 1024, 1200]
        cropFocus: CENTER
        maxHeight: 480
        maxWidth: 840
        quality: 95
      ) {
        ...GatsbyImageSharpFluid_noBase64
      }
    }
    publicURL
    name
    id
  }
`;

// fit: [INSIDE, OUTSIDE, FILL, CONTAIN, COVER]
// cropFocus: [CENTER, NORTH, NORTHEAST, EAST, SOUTHEAST, SOUTH, SOUTHWEST, WEST, NORTHWEST, ENTROPY, ATTENTION]
export const CHILDREN_FIXED_400_225 = graphql`
  fragment CHILDREN_FIXED_400_225 on File {
    childrenImageSharp {
      fixed(width: 400, height: 225, quality: 75, cropFocus: CENTER) {
        ...GatsbyImageSharpFixed_noBase64
      }
    }
    publicURL
    name
    id
  }
`;

// fit: [INSIDE, OUTSIDE, FILL, CONTAIN, COVER]
// cropFocus: [CENTER, NORTH, NORTHEAST, EAST, SOUTHEAST, SOUTH, SOUTHWEST, WEST, NORTHWEST, ENTROPY, ATTENTION]
export const CHILDREN_FIXED_150_150 = graphql`
  fragment CHILDREN_FIXED_150_150 on File {
    childrenImageSharp {
      fixed(width: 150, height: 150, quality: 75, cropFocus: CENTER) {
        ...GatsbyImageSharpFixed_noBase64
      }
    }
    publicURL
    name
    id
  }
`;

// fit: [INSIDE, OUTSIDE, FILL, CONTAIN, COVER]
// cropFocus: [CENTER, NORTH, NORTHEAST, EAST, SOUTHEAST, SOUTH, SOUTHWEST, WEST, NORTHWEST, ENTROPY, ATTENTION]
export const CHILDREN_FIXED_75_75 = graphql`
  fragment CHILDREN_FIXED_75_75 on File {
    childrenImageSharp {
      fixed(width: 75, height: 75, quality: 75, cropFocus: CENTER) {
        ...GatsbyImageSharpFixed_noBase64
      }
    }
    publicURL
    name
    id
  }
`;

// fit: [INSIDE, OUTSIDE, FILL, CONTAIN, COVER]
// cropFocus: [CENTER, NORTH, NORTHEAST, EAST, SOUTHEAST, SOUTH, SOUTHWEST, WEST, NORTHWEST, ENTROPY, ATTENTION]
export const CHILD_FIXED_400_225 = graphql`
  fragment CHILD_FIXED_400_225 on File {
    childImageSharp {
      fixed(width: 400, height: 225, quality: 75, cropFocus: CENTER) {
        ...GatsbyImageSharpFixed_noBase64
      }
    }
    publicURL
    name
    id
  }
`;

// fit: [INSIDE, OUTSIDE, FILL, CONTAIN, COVER]
// cropFocus: [CENTER, NORTH, NORTHEAST, EAST, SOUTHEAST, SOUTH, SOUTHWEST, WEST, NORTHWEST, ENTROPY, ATTENTION]
export const CHILD_FIXED_150_150 = graphql`
  fragment CHILD_FIXED_150_150 on File {
    childImageSharp {
      fixed(width: 150, height: 150, quality: 75, cropFocus: CENTER) {
        ...GatsbyImageSharpFixed_noBase64
      }
    }
    publicURL
    name
    id
  }
`;

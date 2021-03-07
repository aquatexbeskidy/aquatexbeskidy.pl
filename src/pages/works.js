// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';

import { Video } from '~components';
import { RootContainer } from '~containers';
import { GalleryOffer } from '~components';

// ─────────────────────────────────────────────────────────────────────────────
//  Component
// ─────────────────────────────────────────────────────────────────────────────

const WorksPage = ({
  data: {
    page: {
      frontmatter: { meta },
    },
    videos: {
      frontmatter: { videos },
    },
    images: { nodes },
  },
}) => (
  <RootContainer meta={meta}>
    <div>{meta.title}</div>
    {nodes.map(({ id, name, childrenImageSharp }) => (
      <Img fixed={childrenImageSharp[0].fixed} title={name} alt={name} key={id} />
    ))}
    {videos.map(({ videoId, videoTitle }) => (
      <Video videoId={videoId} videoTitle={videoTitle} key={videoId} />
    ))}
  </RootContainer>
);

export default WorksPage;

// ─────────────────────────────────────────────────────────────────────────────
// Extended Default Styles
// ─────────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────
// Graphql Query
// ─────────────────────────────────────────────────────────────────────────────

export const query = graphql`
  {
    page: mdx(
      fileAbsolutePath: { regex: "/markdown/pages/" }
      frontmatter: { meta: { permalink: { eq: "/works/" } } }
    ) {
      frontmatter {
        ...META_FRAGMENT
      }
    }

    images: allFile(
      filter: { absolutePath: { regex: "/works/" }, extension: { regex: "/(jpg)|(jpeg)|(png)/" } }
    ) {
      nodes {
        ...CHILDREN_FIXED_230_170
        publicURL
        name
        id
      }
    }

    videos: mdx(
      fileAbsolutePath: { regex: "/markdown/pages/" }
      frontmatter: { meta: { permalink: { eq: "/works/" } } }
    ) {
      ...META_VIDEO_FRAGMENT
    }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// Others
// ─────────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect } from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { graphql } from 'gatsby';

import { Video, ImageLightbox } from '~components';
import { RootContainer } from '~containers';

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
    images_860_480,
    images_400_225,
    images_75_75,
  },
}) => {
  const [currentImageId, setCurrentImageId] = useState(0);
  const [isLightbox, setIsLightbox] = useState(false);

  const handleLightbox = () => setIsLightbox((prev) => !prev);

  const onChangeHandler = (index) => {
    setCurrentImageId(index);
    handleLightbox();
  };

  return (
    <RootContainer meta={meta}>
      <div>{meta.title}</div>

      {images_400_225.nodes && (
        <Wrapper>
          {images_400_225.nodes.map(({ id, name, childrenImageSharp }, index) => (
            <Thumbnail onClick={() => onChangeHandler(index)} key={id}>
              <GatsbyImage image={getImage(childrenImageSharp[0])} title={name} alt={name} />
            </Thumbnail>
          ))}
        </Wrapper>
      )}

      {videos && (
        <Wrapper>
          {videos.map(({ videoId, videoTitle }) => (
            <Video videoId={videoId} videoTitle={videoTitle} key={videoId} />
          ))}
        </Wrapper>
      )}

      {images_860_480.nodes && images_75_75.nodes && (
        <ImageLightbox
          currentImageId={currentImageId}
          thumbnails={images_75_75.nodes}
          images={images_860_480.nodes}
          onClose={handleLightbox}
          isOpen={isLightbox}
        />
      )}
    </RootContainer>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Extended Default Styles
// ─────────────────────────────────────────────────────────────────────────────

const Thumbnail = styled.div`
  display: inline-flex;
  cursor: pointer;
`;

const Wrapper = styled.div`
  flex-wrap: wrap;
  display: flex;
`;

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

    images_400_225: allFile(
      filter: { absolutePath: { regex: "/works/" }, extension: { regex: "/(jpg)|(jpeg)|(png)/" } }
    ) {
      nodes {
        ...CHILDREN_FIXED_400_225
        publicURL
        name
        id
      }
    }

    images_860_480: allFile(
      filter: { absolutePath: { regex: "/works/" }, extension: { regex: "/(jpg)|(jpeg)|(png)/" } }
    ) {
      nodes {
        ...CHILDREN_FLUID_860_480
        publicURL
        name
        id
      }
    }

    images_fluid: allFile(
      filter: { absolutePath: { regex: "/works/" }, extension: { regex: "/(jpg)|(jpeg)|(png)/" } }
    ) {
      nodes {
        ...CHILDREN_FLUID
        publicURL
        name
        id
      }
    }

    images_75_75: allFile(
      filter: { absolutePath: { regex: "/works/" }, extension: { regex: "/(jpg)|(jpeg)|(png)/" } }
    ) {
      nodes {
        ...CHILDREN_FIXED_75_75
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

export default WorksPage;

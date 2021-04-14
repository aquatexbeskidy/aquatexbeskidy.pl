// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React, { useState } from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';

import { Video, ImageLightbox } from '~components';
import { RootContainer } from '~containers';
import { mq } from '~theme';

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
    content: {
      frontmatter: { photosTitle, videosTitle },
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
      <WorksWrapper>
        <Headline>{photosTitle}</Headline>
        {images_400_225.nodes && (
          <Wrapper>
            {images_400_225.nodes.map(({ id, name, childrenImageSharp }, index) => (
              <Thumbnail onClick={() => onChangeHandler(index)} key={id}>
                <GatsbyImage image={getImage(childrenImageSharp[0])} title={name} alt={name} />
              </Thumbnail>
            ))}
          </Wrapper>
        )}

        <Headline>{videosTitle}</Headline>
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
      </WorksWrapper>
    </RootContainer>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Extended Default Styles
// ─────────────────────────────────────────────────────────────────────────────

const Headline = styled.h2`
  margin: 30px 0 35px;
  ${mq.min.tablet_base} {
    margin-bottom: 50px;
  }
`;

const WorksWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 50px;
  padding: 0 20px;
  ${Headline} {
    margin-top: 50px;
    &:first-child {
      margin-top: 30px;
    }
  }
`;

const Thumbnail = styled.div`
  display: inline-flex;
  cursor: pointer;
`;

const Wrapper = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(1, 1fr);
  ${mq.min.mobile_big} {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 15px;
  }
  ${mq.min.tablet_big} {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 18px;
  }
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

    content: mdx(
      fileAbsolutePath: { regex: "/markdown/pages/" }
      frontmatter: { meta: { permalink: { eq: "/works/" } } }
    ) {
      ...WORKS_FRAGMENT
    }

    images_400_225: allFile(
      filter: { absolutePath: { regex: "/works/" }, extension: { regex: "/(jpg)|(jpeg)|(png)/" } }
      sort: { order: DESC, fields: name }
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

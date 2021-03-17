// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import BackgroundImage from 'gatsby-background-image';
import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import React from 'react';

import { ImagePlaceholder } from '~components';

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────
//    How to use:
//    <ImageBackground name="home-photo-1.jpg">
//      <!-- CHILDREN HERE -->
//    </ImageBackground>
//
// ─────────────────────────────────────────────────────────────────────────────

const Background = ({ name, tag, children }) => {
  const {
    format_FLUID: { nodes },
  } = useStaticQuery(
    graphql`
      query {
        format_FLUID: allImageSharp {
          nodes {
            fluid(maxWidth: 1024, quality: 75) {
              ...GatsbyImageSharpFluid_withWebp_noBase64
              originalName
            }
            id
          }
        }
      }
    `,
  );

  if (!name) {
    return <ImagePlaceholder format={`100%x100%`} showText={false} />;
  }

  const image = nodes.find(({ fluid: { originalName } }) => originalName === name).fluid;

  return (
    <BackgroundImage fluid={image} Tag={tag}>
      {children}
    </BackgroundImage>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Extended Default Styles
// ─────────────────────────────────────────────────────────────────────────────

const ImageBackground = styled(Background)`
  background-position: bottom center;
  background-repeat: repeat-y;
  background-size: cover;
  width: 100%;
`;

// ─────────────────────────────────────────────────────────────────────────────
// Others
// ─────────────────────────────────────────────────────────────────────────────

ImageBackground.displayName = 'Image';

ImageBackground.propTypes = {
  name: PropTypes.string.isRequired,
  tag: PropTypes.string,
};

ImageBackground.defaultProps = {
  name: false,
  tag: 'section',
};

export default ImageBackground;

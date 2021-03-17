// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import { graphql, useStaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import { GatsbyImage } from "gatsby-plugin-image";
import React from 'react';

import { imageAcceptableFormats } from '~utils';
import { ImagePlaceholder } from '~components';

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────
//    How to use:
//
//    A) fixed:
//    <Image name="home-photo-1.jpg" type="fixed" format={SIZE_400_225} />
//
//    B) fluid:
//    <Image name="home-photo-1.jpg" type="fluid" />
//
// ─────────────────────────────────────────────────────────────────────────────

const [SIZE_400_225, SIZE_75_75] = imageAcceptableFormats;

const Image = ({ name, type, format }) => {
  const formats = useStaticQuery(graphql`
    query {
      format_400_225: allImageSharp {
        nodes {
          fixed(width: 400, height: 225, quality: 95, cropFocus: CENTER) {
            ...GatsbyImageSharpFixed_withWebp_noBase64
            originalName
          }
          id
        }
      }
      format_75_75: allImageSharp {
        nodes {
          fixed(width: 75, height: 75, quality: 95, cropFocus: CENTER) {
            ...GatsbyImageSharpFixed_withWebp_noBase64
            originalName
          }
          id
        }
      }
      format_FLUID: allImageSharp {
        nodes {
          fluid(
            srcSetBreakpoints: [320, 768, 1024, 1200]
            cropFocus: CENTER
            maxHeight: 480
            maxWidth: 840
            quality: 95
          ) {
            ...GatsbyImageSharpFluid_withWebp_noBase64
            originalName
          }
          id
        }
      }
    }
  `);

  if (!name) {
    return <ImagePlaceholder format={format || SIZE_400_225} />;
  }

  const find = (nodes) => nodes.find(({ [type]: { originalName } }) => originalName === name);

  const getImageProps = () => {
    const { format_400_225, format_75_75, format_FLUID } = formats;

    if (type === 'fixed') {
      switch (format) {
        case SIZE_400_225:
          return {
            [type]: find(format_400_225.nodes)[type],
          };
          break;
        case SIZE_75_75:
          return {
            [type]: find(format_75_75.nodes)[type],
          };
          break;
      }
    }

    if (type === 'fluid') {
      return {
        [type]: find(format_FLUID.nodes)[type],
      };
    }
  };

  const imageProps = getImageProps();

  return <GatsbyImage {...imageProps} />;
};

// ─────────────────────────────────────────────────────────────────────────────
// Extended Default Styles
// ─────────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────
// Others
// ─────────────────────────────────────────────────────────────────────────────

Image.displayName = 'Image';

Image.propTypes = {
  format: PropTypes.oneOf(imageAcceptableFormats),
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

Image.defaultProps = {
  format: SIZE_400_225,
  type: 'fixed',
  name: false,
};

export default Image;

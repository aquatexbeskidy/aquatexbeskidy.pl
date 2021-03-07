// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import { graphql, useStaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import React from 'react';

import { imageAcceptableFormats } from '~utils';
import { ImagePlaceholder } from '~components';

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────
//    How to use:
//
//    A) fixed:
//    <Image name="home-photo-1.jpg" type="fixed" format={SIZE_230_170} />
//
//    B) fluid:
//    <Image name="home-photo-1.jpg" type="fluid" />
//
// ─────────────────────────────────────────────────────────────────────────────

const [SIZE_230_170, SIZE_150_150] = imageAcceptableFormats;

const Image = ({ name, type, format }) => {
  const formats = useStaticQuery(graphql`
    query {
      format_230_170: allImageSharp {
        nodes {
          fixed(width: 230, height: 170, quality: 75) {
            ...GatsbyImageSharpFixed_withWebp_noBase64
            originalName
          }
          id
        }
      }
      format_150_150: allImageSharp {
        nodes {
          fixed(width: 150, height: 150, quality: 75) {
            ...GatsbyImageSharpFixed_withWebp_noBase64
            originalName
          }
          id
        }
      }
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
  `);

  if (!name) {
    return <ImagePlaceholder format={format || SIZE_230_170} />;
  }

  const find = (nodes) => nodes.find(({ [type]: { originalName } }) => originalName === name);

  const getImageProps = () => {
    const { format_230_170, format_150_150, format_FLUID } = formats;

    if (type === 'fixed') {
      switch (format) {
        case SIZE_230_170:
          return {
            [type]: find(format_230_170.nodes)[type],
          };
          break;
        case SIZE_150_150:
          return {
            [type]: find(format_150_150.nodes)[type],
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

  return <Img {...imageProps} />;
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
  format: SIZE_230_170,
  type: 'fixed',
  name: false,
};

export default Image;

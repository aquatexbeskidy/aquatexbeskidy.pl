// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import React from 'react';

import { stringIncludesHTML } from '~utils';

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

const Reviews = ({ reviews }) => {
  return reviews.map(({ description, image: { childrenImageSharp } }, index) => {
    const descriptionChildren = stringIncludesHTML(description)
      ? { dangerouslySetInnerHTML: { __html: description } }
      : { children: description };

    // console.log(childrenImageSharp);

    return (
      <Wrapper key={index}>
        {description && <Description {...descriptionChildren} />}
        {childrenImageSharp && (
          <GatsbyImage
            image={getImage(childrenImageSharp[0])}
            title={description}
            alt={description}
          />
        )}
      </Wrapper>
    );
  });
};

// ─────────────────────────────────────────────────────────────────────────────
// Extended Default Styles
// ─────────────────────────────────────────────────────────────────────────────

const Wrapper = styled.div``;

const Description = styled.div``;

// ─────────────────────────────────────────────────────────────────────────────
// Others
// ─────────────────────────────────────────────────────────────────────────────

Reviews.displayName = 'Reviews';

Reviews.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Reviews.defaultProps = {
  reviews: {},
};

export default Reviews;

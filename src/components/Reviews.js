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

const Reviews = ({ reviews }) => (
  <Wrapper>
    {reviews.map(({ description, image: { childrenImageSharp } }, index) => {
      let descriptionChildren = '';
      let imgDetails = description ? description : index.toString();
      if (description) {
        descriptionChildren = stringIncludesHTML(description)
          ? { dangerouslySetInnerHTML: { __html: description } }
          : { children: description };
      }
      return (
        <Review key={index}>
          {description && <Description {...descriptionChildren} />}
          {childrenImageSharp && (
            <GatsbyImage
              image={getImage(childrenImageSharp[0])}
              title={imgDetails}
              alt={imgDetails}
            />
          )}
        </Review>
      );
    })}
  </Wrapper>
);

// ─────────────────────────────────────────────────────────────────────────────
// Extended Default Styles
// ─────────────────────────────────────────────────────────────────────────────

export const Wrapper = styled.div`
  margin: 70px 0;
`;

const Description = styled.p`
  width: 100%;
  max-width: 400px;
  line-height: 30px;
  padding: 0 40px;
`;

export const Review = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  &:nth-child(2n + 1) {
    ${Description} {
      order: 2;
    }
  }
`;

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

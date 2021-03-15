// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import { getSrcSet } from 'gatsby-plugin-image';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import React from 'react';

import { stringIncludesHTML, SIZE_HERO } from '~utils';
import { Link } from '~components';

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

const Hero2 = ({ hero2 }) => {
  const { heading, image, buttons } = hero2;
  const { childImageSharp } = image;

  const headingChildren = stringIncludesHTML(heading)
    ? { dangerouslySetInnerHTML: { __html: heading } }
    : { children: heading };

  const background = getSrcSet(childImageSharp).split(',')[2].split(' ')[0];

  return (
    <Wrapper style={{ backgroundImage: `url(${background})` }}>
      <Inner>
        {heading && <Heading {...headingChildren} />}

        {buttons &&
          buttons.map(({ title, link, type }, index) => (
            <Link to={link} look={type} key={index}>
              {title}
            </Link>
          ))}
      </Inner>
    </Wrapper>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Extended Default Styles
// ─────────────────────────────────────────────────────────────────────────────

const [, height] = SIZE_HERO.split('x');

const Wrapper = styled.div`
  background-repeat: no-repeat;
  background-position: left;
  background-size: cover;

  justify-content: flex-start;
  align-items: flex-start;
  display: flex;

  width: 100%;
`;

const Inner = styled.div``;

const Heading = styled.h2``;

// ─────────────────────────────────────────────────────────────────────────────
// Others
// ─────────────────────────────────────────────────────────────────────────────

Hero2.displayName = 'Hero2';

Hero2.propTypes = {
  heading: PropTypes.string.isRequired,
  buttons: PropTypes.arrayOf(PropTypes.object),
  image: PropTypes.bool,
};

Hero2.defaultProps = {
  heading: '',
  buttons: [],
  image: true,
};

export default Hero2;

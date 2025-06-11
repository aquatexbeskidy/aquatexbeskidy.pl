// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import React, { useEffect } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled, { keyframes } from 'styled-components';
import Cookies from 'js-cookie';

import { mq } from '~theme';
import { Link } from '~components';

// ─────────────────────────────────────────────────────────────────────────────
//  Component
// ─────────────────────────────────────────────────────────────────────────────

const vibrate = keyframes`
  0.50%, 10%, 20%, 30%, 40%, 50%
  {
    -webkit-transform: translate3d(0.5px, 0, 0);
    transform: translate3d(0.5px, 0, 0);
  }
  5%, 15%, 25%, 35%, 45%
  {
    -webkit-transform: translate3d(-1px, 0, 0);
    transform: translate3d(-1px, 0, 0);
  }
  100% {
    -webkit-transform: translate3d(0.5px, 0, 0);
    transform: translate3d(0.5px, 0, 0);
  }
`;

const YoutubeUp = ({}) => {
  const { content } = useStaticQuery(graphql`
    {
      content: mdx(
        fileAbsolutePath: { regex: "/markdown/globals/" }
        frontmatter: { title: { eq: "Content" } }
      ) {
        ...YOUTUBE_FRAGMENT
      }
    }
  `);
  const {
    youtube: { title, icon, url },
  } = content.frontmatter;

  const position = Cookies.get('PrivacyPolicy') ? '12%' : '41%';

  return (
    <Wrapper style={{ bottom: `${position}` }}>
      {icon && icon.includes('/icons/') && (
        <Link to={url} look="primary">
          <PhoneImage alt={title} src={require(`../${icon}`)} />
        </Link>
      )}
    </Wrapper>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Extended Default Styles
// ─────────────────────────────────────────────────────────────────────────────

const Wrapper = styled.div`
  position: fixed;
  right: 18px;
  bottom: 60%;
  z-index: 9999;

  a {
    display: flex;
    background: ${({ theme }) => theme.color.white};
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
  }
`;

const PhoneImage = styled.img`
  animation: ${vibrate} ease-in-out 3s infinite alternate;
  width: 40px;
`;

// ─────────────────────────────────────────────────────────────────────────────
// Others
// ─────────────────────────────────────────────────────────────────────────────

YoutubeUp.displayName = 'YoutubeUp';

export default YoutubeUp;

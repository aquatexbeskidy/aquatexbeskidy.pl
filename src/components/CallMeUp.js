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

const CallMeUp = ({}) => {
  const { content } = useStaticQuery(graphql`
    {
      content: mdx(
        fileAbsolutePath: { regex: "/markdown/globals/" }
        frontmatter: { title: { eq: "Content" } }
      ) {
        ...CALL_ME_UP_FRAGMENT
      }
    }
  `);
  const {
    callMeUp: { title, icon, url },
  } = content.frontmatter;

  const position = Cookies.get('PrivacyPolicy') ? '3%' : '25%';

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
  bottom: 25%;
  z-index: 9999;

  ${mq.min.desktop_small} {
    display: none;
  }

  a {
    display: flex;
    background: ${({ theme }) => theme.color.primary};
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
  }
`;

const PhoneImage = styled.img`
  animation: ${vibrate} ease-in-out 1.5s infinite alternate;
  width: 25px;
`;

// ─────────────────────────────────────────────────────────────────────────────
// Others
// ─────────────────────────────────────────────────────────────────────────────

CallMeUp.displayName = 'CallMeUp';

export default CallMeUp;

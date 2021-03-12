// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import { graphql, useStaticQuery } from 'gatsby';
import styled, { css } from 'styled-components';
import React from 'react';

import { Nav, Link } from '~components';
import ATBLogo from '../assets/icons/atb_logo.svg';

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

const HeaderContainer = (props) => {
  const { top, bottom, site } = useStaticQuery(graphql`
    {
      site: site {
        ...SITE_METADATA
      }

      top: mdx(
        fileAbsolutePath: { regex: "/markdown/navigations/" }
        frontmatter: { title: { eq: "HeaderTop" } }
      ) {
        ...HEADER_NAV_FRAGMENT
      }

      bottom: mdx(
        fileAbsolutePath: { regex: "/markdown/navigations/" }
        frontmatter: { title: { eq: "HeaderBottom" } }
      ) {
        ...HEADER_NAV_FRAGMENT
      }
    }
  `);

  return (
    <>
      <Section isTop>
        <Nav links={top.frontmatter.links} />
      </Section>

      <Section isBottom>
        <StyledH1>
          {site.siteMetadata.siteTitle}
          <Link to="/" look="primary">
            <Logo
              src={ATBLogo}
              alt={site.siteMetadata.siteTitle}
              title={site.siteMetadata.siteTitle}
            />
          </Link>
        </StyledH1>

        <div>
          <Nav links={bottom.frontmatter.links} />
        </div>
      </Section>
    </>
  );
};

export default HeaderContainer;

// ─────────────────────────────────────────────────────────────────────────────
// Variants
// ─────────────────────────────────────────────────────────────────────────────

const sectionBottom = css`
  height: 8rem;

  h1 {
    a {
      font-size: ${({ theme }) => theme.font.size['2xl']};
    }
  }
`;

const sectionTop = css`
  background-color: rgba(0, 0, 0, 0.04);
  height: 4rem;

  a {
    font-size: ${({ theme }) => theme.font.size.base};
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// Extended Default Styles
// ─────────────────────────────────────────────────────────────────────────────

const Section = styled.section`
  ${({ isBottom }) => isBottom && sectionBottom}
  ${({ isTop }) => isTop && sectionTop}

  justify-content: space-between;
  align-items: center;
  display: flex;
`;

const Logo = styled.img`
  width: 95px;
  height: auto;
`;

const StyledH1 = styled.h1`
  font-size: 0;
`;

// ─────────────────────────────────────────────────────────────────────────────
// Others
// ─────────────────────────────────────────────────────────────────────────────

HeaderContainer.displayName = 'HeaderContainer';

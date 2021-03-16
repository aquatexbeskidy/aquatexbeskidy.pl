// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import { graphql, useStaticQuery } from 'gatsby';
import styled, { css } from 'styled-components';
import React, { useState } from 'react';

import { Nav, Link, Hamburger, MobileNavigation } from '~components';
import { ReactComponent as BrandLogo } from '../assets/icons/atb_logo.svg';
import { mq } from '~theme';

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

  const [isMobileNavigation, setMobileNavigation] = useState(false);
  const handleMobileNavigation = () => setMobileNavigation((prev) => !prev);

  return (
    <>
      <Section isTop>
        <Nav links={top.frontmatter.links} />
      </Section>

      <Section isBottom>
        <StyledH1>
          {site.siteMetadata.siteTitle}
          <Link to="/">
            <BrandLogo title={site.siteMetadata.siteTitle} alt={site.siteMetadata.siteTitle} />
          </Link>
        </StyledH1>

        <Navbar>
          <Nav links={bottom.frontmatter.links} />
          <Hamburger
            onClickHandler={() => handleMobileNavigation()}
            isActive={isMobileNavigation}
          />
        </Navbar>
      </Section>

      <MobileNavigation
        links={bottom.frontmatter.links}
        onClose={handleMobileNavigation}
        isOpen={isMobileNavigation}
      />
    </>
  );
};

export default HeaderContainer;

// ─────────────────────────────────────────────────────────────────────────────
// Variants
// ─────────────────────────────────────────────────────────────────────────────

const sectionBottom = css`
  height: 5rem;
  justify-content: space-between;

  h1 {
    a {
      font-size: ${({ theme }) => theme.font.size['2xl']};
    }
  }
`;

const sectionTop = css`
  background-color: rgba(0, 0, 0, 0.01);
  border-bottom: 1px solid rgba(0, 0, 0, 0.03);
  justify-content: flex-end;
  height: 3rem;

  a {
    font-size: ${({ theme }) => theme.font.size.xs};
    font-weight: ${({ theme }) => theme.font.weight.light};
  }
`;

const Navbar = styled.div`
  nav {
    display: none;
    ${mq.min.desktop_small} {
      display: block;
    }
  }
  button {
    margin: 20px 20px 0 0;
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// Extended Default Styles
// ─────────────────────────────────────────────────────────────────────────────

const Section = styled.section`
  ${({ isBottom }) => isBottom && sectionBottom}
  ${({ isTop }) => isTop && sectionTop}

  align-items: center;
  display: flex;
`;

const ATBLogo = styled.img`
  max-width: 100%;
  height: auto;
`;

const StyledH1 = styled.h1`
  font-size: 0;
`;

// ─────────────────────────────────────────────────────────────────────────────
// Others
// ─────────────────────────────────────────────────────────────────────────────

HeaderContainer.displayName = 'HeaderContainer';

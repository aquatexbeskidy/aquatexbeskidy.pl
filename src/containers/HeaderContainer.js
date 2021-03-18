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
        <Wrapper>
          <Nav links={top.frontmatter.links} />
        </Wrapper>
      </Section>

      <Section isBottom>
        <Wrapper>
          <StyledH1>
            {site.siteMetadata.siteTitle}
            <Link to="/">
              <BrandLogo title={site.siteMetadata.siteTitle} alt={site.siteMetadata.siteTitle} />
            </Link>
          </StyledH1>
          <Navbar>
            <Nav links={bottom.frontmatter.links.filter((link, index) => index !== 0)} />
            <Hamburger
              onClickHandler={() => handleMobileNavigation()}
              isActive={isMobileNavigation}
            />
          </Navbar>
        </Wrapper>
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
  height: 7rem;
  justify-content: space-between;
  ${mq.min.tablet_base} {
    height: 5rem;
  }

  h1 {
    a {
      font-size: ${({ theme }) => theme.font.size['2xl']};
    }
  }
`;

const sectionTop = css`
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
    margin: 0;
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// Extended Default Styles
// ─────────────────────────────────────────────────────────────────────────────

const Wrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Section = styled.section`
  &:first-child {
    background-color: rgba(0, 0, 0, 0.01);
    border-bottom: 1px solid rgba(0, 0, 0, 0.03);
  }
  ${Wrapper} {
    ${({ isBottom }) => isBottom && sectionBottom}
    ${({ isTop }) => isTop && sectionTop}

    align-items: center;
    display: flex;
  }
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

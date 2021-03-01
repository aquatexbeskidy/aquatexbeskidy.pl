// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import { graphql, useStaticQuery, Link } from 'gatsby';
import styled, { css } from 'styled-components';
import React from 'react';

import { Nav } from '~components';

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
        <h1>
          <Link to="/">{site.siteMetadata.siteTitle}</Link>
        </h1>

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
      font-size: ${({ theme }) => theme.font.size['4xl']};
    }
  }
`;

const sectionTop = css`
  background-color: rgba(0, 0, 0, 0.04);
  height: 4rem;

  a {
    font-size: ${({ theme }) => theme.font.size.xl};
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

// ─────────────────────────────────────────────────────────────────────────────
// Others
// ─────────────────────────────────────────────────────────────────────────────

HeaderContainer.displayName = 'HeaderContainer';

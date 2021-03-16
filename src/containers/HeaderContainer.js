// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import { graphql, useStaticQuery } from 'gatsby';
import styled, { css } from 'styled-components';
import React from 'react';

import { Nav, Link } from '~components';

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
        <Wrapper>
          <Nav links={top.frontmatter.links} />
        </Wrapper>
      </Section>

      <Section isBottom>
        <Wrapper>
          <StyledH1>
            {site.siteMetadata.siteTitle}
            <Link to="/">
              <ATBLogo
                src={require(`../${bottom.frontmatter.icon}`)}
                title={site.siteMetadata.siteTitle}
                alt={site.siteMetadata.siteTitle}
              />
            </Link>
          </StyledH1>
          <Nav links={bottom.frontmatter.links} />
        </Wrapper>
      </Section>
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
  height: 3rem;
  justify-content: flex-end;

  a {
    font-size: ${({ theme }) => theme.font.size.xs};
    font-weight: ${({ theme }) => theme.font.weight.light};
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// Extended Default Styles
// ─────────────────────────────────────────────────────────────────────────────

const Wrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const Section = styled.section`
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

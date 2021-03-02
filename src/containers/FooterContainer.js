// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import React from 'react';

import { Nav } from '~components';

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

const FooterContainer = () => {
  const { footer } = useStaticQuery(graphql`
    {
      site: site {
        ...SITE_METADATA
      }

      footer: mdx(
        fileAbsolutePath: { regex: "/markdown/navigations/" }
        frontmatter: { title: { eq: "Footer" } }
      ) {
        ...FOOTER_NAV_FRAGMENT
      }
    }
  `);

  return (
    <Footer>
      {footer.frontmatter.links.map(({ title, links, type }) => {
        return (
          <Section key={title}>
            <h3>{title}</h3>
            {type === 'nested' && <Nav links={links} />}
          </Section>
        );
      })}
    </Footer>
  );
};

export default FooterContainer;

// ─────────────────────────────────────────────────────────────────────────────
// Extended Default Styles
// ─────────────────────────────────────────────────────────────────────────────

const Footer = styled.footer`
  display: flex;
`;

export const Section = styled.section`
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  width: calc(100% / 4);
  display: flex;

  ul {
    align-items: flex-start;
    flex-direction: column;

    li {
      margin-top: 1rem;
      padding: 0;
    }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// Others
// ─────────────────────────────────────────────────────────────────────────────

FooterContainer.displayName = 'FooterContainer';

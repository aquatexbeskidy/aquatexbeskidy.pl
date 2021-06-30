// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import styled from 'styled-components';
import { graphql } from 'gatsby';
import React from 'react';

import { RootContainer } from '~containers';
import { QuickContact } from '~containers/FooterContainer';
import { MapLeaflet, Link } from '~components';
import { mq } from '~theme';

// ─────────────────────────────────────────────────────────────────────────────
//  Component
// ─────────────────────────────────────────────────────────────────────────────

const NoveltiesPage = ({
  data: {
    page: {
      frontmatter: { meta },
    },
    content: {
      frontmatter: {
        novelties: { mainTitle },
      },
    },
  },
}) => (
  <RootContainer meta={meta}>
    <NoveltiesWrapper>
      <Heading>{mainTitle}</Heading>
    </NoveltiesWrapper>
  </RootContainer>
);

export default NoveltiesPage;

// ─────────────────────────────────────────────────────────────────────────────
// Extended Default Styles
// ─────────────────────────────────────────────────────────────────────────────

const NoveltiesWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 50px;
  padding: 0 20px;
`;

const Heading = styled.h2`
  margin: 30px 0 30px;
  ${mq.min.tablet_base} {
    margin-bottom: 50px;
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// Graphql Query
// ─────────────────────────────────────────────────────────────────────────────

export const query = graphql`
  {
    page: mdx(
      fileAbsolutePath: { regex: "/markdown/pages/" }
      frontmatter: { meta: { permalink: { eq: "/novelties/" } } }
    ) {
      frontmatter {
        ...META_FRAGMENT
      }
    }

    content: mdx(
      fileAbsolutePath: { regex: "/markdown/pages/" }
      frontmatter: { meta: { permalink: { eq: "/novelties/" } } }
    ) {
      ...NOVELTIES_FRAGMENT
    }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// Others
// ─────────────────────────────────────────────────────────────────────────────

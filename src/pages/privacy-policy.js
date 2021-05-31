// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import React from 'react';

import { RootContainer } from '~containers';
import { mq } from '~theme';

// ─────────────────────────────────────────────────────────────────────────────
//  Component
// ─────────────────────────────────────────────────────────────────────────────

const PrivacyPolicyPage = ({
  data: {
    page: {
      frontmatter: { meta },
    },
    content: { body },
  },
}) => {
  return (
    <RootContainer meta={meta}>
      <PrivacyPolicyWrapper>
        <MDXProvider>
          <MDXRenderer>{body}</MDXRenderer>
        </MDXProvider>
      </PrivacyPolicyWrapper>
    </RootContainer>
  );
};

export default PrivacyPolicyPage;

// ─────────────────────────────────────────────────────────────────────────────
// Extended Default Styles
// ─────────────────────────────────────────────────────────────────────────────

const PrivacyPolicyWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 50px;
  padding: 0 20px;
  line-height: 30px;
  a {
    word-break: break-all;
    color: ${({ theme }) => theme.color.primary};
    text-decoration: none;
    font-weight: ${({ theme }) => theme.font.weight.medium};
  }
  h2 {
    font-size: ${({ theme }) => theme.font.size.xxl};
    margin: 30px 0;
    ${mq.min.tablet_base} {
      margin-bottom: 50px;
    }
  }
  h3 {
    text-align: center;
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// Graphql Query
// ─────────────────────────────────────────────────────────────────────────────

export const query = graphql`
  {
    page: mdx(
      fileAbsolutePath: { regex: "/markdown/pages/" }
      frontmatter: { meta: { permalink: { eq: "/privacy-policy/" } } }
    ) {
      frontmatter {
        ...META_FRAGMENT
      }
    }

    content: mdx(
      fileAbsolutePath: { regex: "/markdown/pages/" }
      frontmatter: { meta: { permalink: { eq: "/privacy-policy/" } } }
    ) {
      ...PRIVACYPOLICY_FRAGMENT
    }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import { graphql } from 'gatsby';
import React from 'react';

import { stringIncludesHTML } from '~utils';
import { RootContainer } from '~containers';

// ─────────────────────────────────────────────────────────────────────────────
//  Component
// ─────────────────────────────────────────────────────────────────────────────

const DeepWellPage = ({
  data: {
    page: {
      frontmatter: { meta },
    },
    content: {
      frontmatter: {
        deepWell: {
          mainTitle,
          mainContent,
          additionList,
          waterSearchTitle,
          waterSearchDesc,
          waterConnectTitle,
          waterConnectDesc,
        },
      },
    },
  },
}) => {
  const mainContentChildren = stringIncludesHTML(mainContent)
    ? { dangerouslySetInnerHTML: { __html: mainContent } }
    : { children: mainContent };

  const waterSearchDescChildren = stringIncludesHTML(waterSearchDesc)
    ? { dangerouslySetInnerHTML: { __html: waterSearchDesc } }
    : { children: waterSearchDesc };

  const waterConnectDescChildren = stringIncludesHTML(waterConnectDesc)
    ? { dangerouslySetInnerHTML: { __html: waterConnectDesc } }
    : { children: waterConnectDesc };

  return (
    <RootContainer meta={meta}>
      <div>
        <h2>{mainTitle}</h2>
        <p {...mainContentChildren} />
        <h3>{waterSearchTitle}</h3>
        <p {...waterSearchDescChildren} />
        <h3>{waterConnectTitle}</h3>
        <p {...waterConnectDescChildren} />
      </div>
    </RootContainer>
  );
};

export default DeepWellPage;

// ─────────────────────────────────────────────────────────────────────────────
// Extended Default Styles
// ─────────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────
// Graphql Query
// ─────────────────────────────────────────────────────────────────────────────

export const query = graphql`
  {
    page: mdx(
      fileAbsolutePath: { regex: "/markdown/pages/" }
      frontmatter: { meta: { permalink: { eq: "/deep-well/" } } }
    ) {
      frontmatter {
        ...META_FRAGMENT
      }
    }

    content: mdx(
      fileAbsolutePath: { regex: "/markdown/pages/" }
      frontmatter: { meta: { permalink: { eq: "/deep-well/" } } }
    ) {
      ...DEEPWELL_FRAGMENT
    }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// Others
// ─────────────────────────────────────────────────────────────────────────────

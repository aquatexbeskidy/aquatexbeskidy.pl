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

const BoreholePage = ({
  data: {
    page: {
      frontmatter: { meta },
    },
    content: {
      frontmatter: {
        borehole: { mainTitle, mainContent, equipmentImgList, subContent },
      },
    },
  },
}) => {
  const mainContentChildren = stringIncludesHTML(mainContent)
    ? { dangerouslySetInnerHTML: { __html: mainContent } }
    : { children: mainContent };

  const subContentChildren = stringIncludesHTML(subContent)
    ? { dangerouslySetInnerHTML: { __html: subContent } }
    : { children: subContent };

  return (
    <RootContainer meta={meta}>
      <div>
        <h2>{mainTitle}</h2>
        <p {...mainContentChildren} />
        <p {...subContentChildren} />
      </div>
    </RootContainer>
  );
};

export default BoreholePage;

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
      frontmatter: { meta: { permalink: { eq: "/borehole/" } } }
    ) {
      frontmatter {
        ...META_FRAGMENT
      }
    }

    content: mdx(
      fileAbsolutePath: { regex: "/markdown/pages/" }
      frontmatter: { meta: { permalink: { eq: "/borehole/" } } }
    ) {
      ...BOREHOLE_FRAGMENT
    }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// Others
// ─────────────────────────────────────────────────────────────────────────────

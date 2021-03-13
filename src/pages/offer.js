// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import { graphql } from 'gatsby';
import React from 'react';

import { RootContainer } from '~containers';

// ─────────────────────────────────────────────────────────────────────────────
//  Component
// ─────────────────────────────────────────────────────────────────────────────

const OfferPage = ({
  data: {
    page: {
      frontmatter: { meta },
    },
    content: {
      frontmatter: {
        offer: { mainTitle, mainContent, subContent, subTitle, offerList, reviewImgList },
      },
    },
  },
}) => (
  <RootContainer meta={meta}>
    <div>
      <h2>{mainTitle}</h2>
      <p>{mainContent}</p>
      <p>{subContent}</p>
      <h3>{subTitle}</h3>
      <ul>
        {offerList.map(({ title, price }, index) => (
          <li key={index}>
            <p>{title}</p>
            <span>{price}</span>
          </li>
        ))}
      </ul>
    </div>
  </RootContainer>
);

export default OfferPage;

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
      frontmatter: { meta: { permalink: { eq: "/offer/" } } }
    ) {
      frontmatter {
        ...META_FRAGMENT
      }
    }

    content: mdx(
      fileAbsolutePath: { regex: "/markdown/pages/" }
      frontmatter: { meta: { permalink: { eq: "/offer/" } } }
    ) {
      ...OFFER_FRAGMENT
    }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// Others
// ─────────────────────────────────────────────────────────────────────────────

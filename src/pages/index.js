// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';

import { RootContainer } from '~containers';

// ─────────────────────────────────────────────────────────────────────────────
//  Component
// ─────────────────────────────────────────────────────────────────────────────

const HomePage = ({
  data: {
    page: {
      frontmatter: { meta },
    },
    photo1,
    photo2,
    photo3,
    hero,
    works,
  },
}) => (
  <RootContainer meta={meta}>
    <div>{meta.title}</div>

    <div
      style={{
        maxHeight: `750px`,
        overflow: `hidden`,
      }}
    >
      <Img
        style={{ height: '100%' }}
        imgStyle={{ objectFit: 'contain' }}
        fluid={hero.childImageSharp.fluid}
        alt={hero.name}
      />
    </div>
    <Img fixed={photo1.childImageSharp.fixed} alt={photo1.name} />
    <Img fixed={photo2.childImageSharp.fixed} alt={photo2.name} />
    <Img fixed={photo3.childImageSharp.fixed} alt={photo3.name} />
    <Img fluid={works.childImageSharp.fluid} alt={works.name} />
  </RootContainer>
);

export default HomePage;

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
      frontmatter: { meta: { permalink: { eq: "/" } } }
    ) {
      frontmatter {
        ...META_FRAGMENT
      }
    }

    hero: file(relativePath: { eq: "home/home-photo-1.jpg" }) {
      ...CHILD_FLUID
    }

    works: file(relativePath: { eq: "home/home-photo-5.jpg" }) {
      ...CHILD_FLUID
    }

    photo1: file(relativePath: { eq: "home/home-photo-2.jpg" }) {
      ...CHILD_FIXED_230_170
    }

    photo2: file(relativePath: { eq: "home/home-photo-3.jpg" }) {
      ...CHILD_FIXED_230_170
    }

    photo3: file(relativePath: { eq: "home/home-photo-4.jpg" }) {
      ...CHILD_FIXED_230_170
    }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// Others
// ─────────────────────────────────────────────────────────────────────────────

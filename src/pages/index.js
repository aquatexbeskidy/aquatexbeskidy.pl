// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { graphql } from 'gatsby';
import React from 'react';

import { RootContainer } from '~containers';
import { HeroSection } from '~components';

// ─────────────────────────────────────────────────────────────────────────────
//  Component
// ─────────────────────────────────────────────────────────────────────────────

const HomePage = ({
  data: {
    page: {
      frontmatter: { meta, hero },
    },
    photo1,
    photo2,
    photo3,
    heroImage,
    works,
  },
}) => {
  return (
    <RootContainer meta={meta}>
      <HeroSection {...(hero.image && { imageData: heroImage })} {...hero} />

      <GatsbyImage image={getImage(photo1)} alt="" style={{ display: 'inline-block' }} />
      <GatsbyImage image={getImage(photo2)} alt="" style={{ display: 'inline-block' }} />
      <GatsbyImage image={getImage(photo3)} alt="" style={{ display: 'inline-block' }} />
      <GatsbyImage image={getImage(works)} alt="" style={{ display: 'inline-block' }} />
    </RootContainer>
  );
};

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
        hero {
          title
          subtitle
          image
          buttons {
            title
            link
            type
          }
        }
      }
    }
    heroImage: file(relativePath: { eq: "home/home-photo-1.jpg" }) {
      ...DUOTONE_176ED3_40_FLUID
    }
    works: file(relativePath: { eq: "home/home-photo-5.jpg" }) {
      ...DUOTONE_176ED3_90_FLUID
    }
    photo1: file(relativePath: { eq: "home/home-photo-2.jpg" }) {
      ...CHILD_FIXED_400_225
    }
    photo2: file(relativePath: { eq: "home/home-photo-3.jpg" }) {
      ...CHILD_FIXED_400_225
    }
    photo3: file(relativePath: { eq: "home/home-photo-4.jpg" }) {
      ...CHILD_FIXED_400_225
    }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// Others
// ─────────────────────────────────────────────────────────────────────────────

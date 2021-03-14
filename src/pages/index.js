// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';

import { HeroSection, Features, Toggler } from '~components';
import { RootContainer } from '~containers';

// ─────────────────────────────────────────────────────────────────────────────
//  Component
// ─────────────────────────────────────────────────────────────────────────────

const HomePage = ({
  data: {
    page: {
      frontmatter: { meta, hero, features, advantages, howWorks, frequentlyAskedQuestions },
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
      <HeroSection {...hero} {...(hero.image && { fluid: heroImage.childImageSharp.fluid })} />
      <Features features={features} />
      <Features features={advantages.advList} />

      <Img fixed={photo1.childImageSharp.fixed} alt={photo1.name} />
      <Img fixed={photo2.childImageSharp.fixed} alt={photo2.name} />
      <Img fixed={photo3.childImageSharp.fixed} alt={photo3.name} />
      <Img fluid={works.childImageSharp.fluid} alt={works.name} />
      <Toggler toggleItems={frequentlyAskedQuestions.toggleList}/>
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
            type
            link
          }
        }
        features {
          title
          icon
          link {
            title
            url
          }
        }
        quickReviews {
          desc
          photo
        }
        advantages {
          advList {
            title
            icon
            desc
          }
        }
        howWorks {
          title
          link
        }
        frequentlyAskedQuestions {
          title
          toggleList {
            title
            content
            icon
          }
        }
      }
    }
    heroImage: file(relativePath: { eq: "home/home-photo-1.jpg" }) {
      ...CHILD_FLUID
    }
    works: file(relativePath: { eq: "home/home-photo-5.jpg" }) {
      ...CHILD_FLUID
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

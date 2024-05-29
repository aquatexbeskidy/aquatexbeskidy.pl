// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import { graphql } from 'gatsby';
import React from 'react';

import { Hero2, Hero, Features, Spot, Reviews, Toggler, CountMeUp } from '~components';
import { RootContainer } from '~containers';

// ─────────────────────────────────────────────────────────────────────────────
//  Component
// ─────────────────────────────────────────────────────────────────────────────

const HomePage = ({
  data: { advantages, howWorks, features, spot, reviews, homeCountUp, hero, meta, faq },
}) => {
  return (
    <RootContainer meta={meta.frontmatter.meta}>
      <Hero hero={hero.frontmatter.hero} />
      <CountMeUp homeCountUp={homeCountUp.frontmatter.homeCountUp} />
      <Features features={features.frontmatter.features} />
      <Spot spot={spot.frontmatter.spot} />
      <Reviews reviews={reviews.frontmatter.reviews} />
      <Features
        features={advantages.frontmatter.advantages.advList}
        title={advantages.frontmatter.advantages.title}
      />
      <Hero2 hero2={howWorks.frontmatter.howWorks} />
      <Toggler faq={faq.frontmatter.faq} />
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
    meta: mdx(
      fileAbsolutePath: { regex: "/markdown/pages/" }
      frontmatter: { meta: { permalink: { eq: "/" } } }
    ) {
      frontmatter {
        ...META_FRAGMENT
      }
    }

    homeCountUp: mdx(
      fileAbsolutePath: { regex: "/markdown/pages/" }
      frontmatter: { meta: { permalink: { eq: "/" } } }
    ) {
      frontmatter {
        homeCountUp {
          title
          subTitle
          count
          score
          iconSmile
          iconStars
          iconGoogle
          googleOpinions
          opinions {
            user
            message
          }
        }
      }
    }

    faq: mdx(
      fileAbsolutePath: { regex: "/markdown/pages/" }
      frontmatter: { meta: { permalink: { eq: "/" } } }
    ) {
      frontmatter {
        faq {
          headline
          list {
            title
            content
            icon
          }
        }
      }
    }

    howWorks: mdx(
      fileAbsolutePath: { regex: "/markdown/pages/" }
      frontmatter: { meta: { permalink: { eq: "/" } } }
    ) {
      frontmatter {
        howWorks {
          heading
          image {
            childImageSharp {
              gatsbyImageData(
                transformOptions: {
                  duotone: { highlight: "#176ED3", shadow: "#176ED3", opacity: 90 }
                }
                breakpoints: [320, 768, 1024, 1200]
              )
            }
            publicURL
            name
            id
          }
          buttons {
            title
            type
            link
          }
        }
      }
    }

    advantages: mdx(
      fileAbsolutePath: { regex: "/markdown/pages/" }
      frontmatter: { meta: { permalink: { eq: "/" } } }
    ) {
      frontmatter {
        advantages {
          title
          advList {
            title
            icon
            desc
          }
        }
      }
    }

    features: mdx(
      fileAbsolutePath: { regex: "/markdown/pages/" }
      frontmatter: { meta: { permalink: { eq: "/" } } }
    ) {
      frontmatter {
        features {
          title
          icon
          link {
            title
            url
          }
        }
      }
    }

    spot: mdx(
      fileAbsolutePath: { regex: "/markdown/pages/" }
      frontmatter: { meta: { permalink: { eq: "/" } } }
    ) {
      frontmatter {
        spot {
          videoId
          videoTitle
        }
      }
    }

    hero: mdx(
      fileAbsolutePath: { regex: "/markdown/pages/" }
      frontmatter: { meta: { permalink: { eq: "/" } } }
    ) {
      frontmatter {
        hero {
          title
          subtitle
          image {
            childImageSharp {
              gatsbyImageData(
                transformOptions: {
                  duotone: { highlight: "#176ED3", shadow: "#176ED3", opacity: 40 }
                }
                breakpoints: [320, 768, 1024, 1200]
              )
            }
            publicURL
            name
            id
          }
          buttons {
            title
            type
            link
          }
        }
      }
    }

    reviews: mdx(
      fileAbsolutePath: { regex: "/markdown/pages/" }
      frontmatter: { meta: { permalink: { eq: "/" } } }
    ) {
      frontmatter {
        reviews {
          description
          image {
            childrenImageSharp {
              gatsbyImageData(
                transformOptions: { cropFocus: CENTER }
                breakpoints: [320, 768, 1024]
                placeholder: NONE
                height: 337
                width: 600
                quality: 75
              )
            }
            publicURL
            name
            id
          }
        }
      }
    }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// Others
// ─────────────────────────────────────────────────────────────────────────────

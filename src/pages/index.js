// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import { graphql } from 'gatsby';
import React from 'react';

import { Hero2, Hero, Features, Spot, Reviews, Toggler, CustomModal } from '~components';
import { RootContainer } from '~containers';

// ─────────────────────────────────────────────────────────────────────────────
//  Component
// ─────────────────────────────────────────────────────────────────────────────

const HomePage = ({
  data: { advantages, howWorks, features, spot, masSpot, reviews, homeInfoModal, hero, meta, faq },
}) => {
  return (
    <RootContainer meta={meta.frontmatter.meta}>
      <CustomModal homeInfoModal={homeInfoModal.frontmatter.homeInfoModal} />
      <Hero hero={hero.frontmatter.hero} />
      <Features features={features.frontmatter.features} />
      <Spot spot={masSpot.frontmatter.masSpot} />
      <Reviews reviews={reviews.frontmatter.reviews} />
      <Spot spot={spot.frontmatter.spot} />
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

    homeInfoModal: mdx(
      fileAbsolutePath: { regex: "/markdown/pages/" }
      frontmatter: { meta: { permalink: { eq: "/" } } }
    ) {
      frontmatter {
        homeInfoModal {
          title
          mainText
          subText
          summaryText
          warning
          success
          image {
            childImageSharp {
              gatsbyImageData(breakpoints: [320, 768, 1024, 1200])
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

    masSpot: mdx(
      fileAbsolutePath: { regex: "/markdown/pages/" }
      frontmatter: { meta: { permalink: { eq: "/" } } }
    ) {
      frontmatter {
        masSpot {
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
